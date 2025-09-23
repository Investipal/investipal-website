const https = require('https');
const { BlobServiceClient } = require('@azure/storage-blob');

const ZAPIER_WEBHOOK_URL = process.env.ZAPIER_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/12151325/umco5zo/';
const STORAGE_CONNECTION_STRING = process.env.STORAGE_CONNECTION_STRING;
const STORAGE_CONTAINER = process.env.STORAGE_CONTAINER || 'newsletter-signups';

function parseBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      const ct = (req.headers['content-type'] || '').toLowerCase();
      try {
        if (ct.includes('application/json')) {
          const obj = JSON.parse(data || '{}');
          return resolve({ email: (obj.email || '').toString().trim() });
        }
        if (ct.includes('application/x-www-form-urlencoded')) {
          const params = new URLSearchParams(data);
          return resolve({ email: (params.get('email') || '').toString().trim() });
        }
      } catch (_) {}
      resolve({ email: '' });
    });
  });
}

async function persistSignup(email, meta) {
  if (!STORAGE_CONNECTION_STRING) return; // optional
  const bsc = BlobServiceClient.fromConnectionString(STORAGE_CONNECTION_STRING);
  const container = bsc.getContainerClient(STORAGE_CONTAINER);
  await container.createIfNotExists({ access: 'private' });
  const key = new Date().toISOString().replace(/[:.]/g, '-') + '_' + Buffer.from(email).toString('hex') + '.json';
  const block = container.getBlockBlobClient(key);
  const body = JSON.stringify({ email, ts: Date.now(), ...meta });
  await block.upload(body, Buffer.byteLength(body), { blobHTTPHeaders: { blobContentType: 'application/json' } });
}

function postToZapier(email, meta) {
  return new Promise((resolve, reject) => {
    try {
      const payload = JSON.stringify({ email, ...meta });
      const url = new URL(ZAPIER_WEBHOOK_URL);
      const req = https.request({
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) }
      }, (res) => {
        // consider any 2xx success
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) resolve();
        else reject(new Error('Zapier non-2xx: ' + res.statusCode));
      });
      req.on('error', reject);
      req.write(payload);
      req.end();
    } catch (e) {
      reject(e);
    }
  });
}

async function forwardWithRetry(email, meta) {
  const attempts = 3;
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      await postToZapier(email, meta);
      return;
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 500 * (i + 1)));
    }
  }
  throw lastErr;
}

module.exports = async function (context, req) {
  // CORS
  context.res = context.res || {};
  context.res.headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  if (req.method === 'OPTIONS') {
    context.res.status = 204;
    return;
  }

  const { email } = await parseBody(req);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    context.res.status = 400;
    context.res.body = { ok: false };
    return;
  }

  const meta = {
    page: (req.headers['x-page'] || '').toString(),
    title: (req.headers['x-title'] || '').toString(),
    ua: (req.headers['user-agent'] || '').toString()
  };

  try {
    await persistSignup(email, meta);
  } catch (_) {
    // ignore storage errors
  }

  try {
    await forwardWithRetry(email, meta);
  } catch (_) {
    // still return success to avoid UX interruption; investigate via logs
  }

  context.res.status = 204;
};




