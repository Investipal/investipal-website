// Resend is ESM; use dynamic import for CommonJS runtime compatibility

function parseBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      const ct = (req.headers['content-type'] || '').toLowerCase();
      try {
        if (ct.includes('application/json')) {
          const obj = JSON.parse(data || '{}');
          return resolve(obj || {});
        }
        if (ct.includes('application/x-www-form-urlencoded')) {
          const params = new URLSearchParams(data);
          const out = {};
          params.forEach((v, k) => (out[k] = v));
          return resolve(out);
        }
      } catch (_) {}
      resolve({});
    });
  });
}

async function sendWithResend({ apiKey, fromEmail, fromName, toEmail, toName, subject, text, html, replyTo }) {
  const { Resend } = await import('resend');
  const resend = new Resend(apiKey);
  const replyToHeader = replyTo && replyTo.Email ? `${replyTo.Name || ''} <${replyTo.Email}>`.trim() : undefined;
  const fromHeader = `${fromName || 'Website'} <${fromEmail}>`;
  const toHeader = toName ? `${toName} <${toEmail}>` : toEmail;
  const { error } = await resend.emails.send({
    from: fromHeader,
    to: [toHeader],
    subject,
    text,
    html: html || text,
    ...(replyToHeader ? { reply_to: replyToHeader } : {})
  });
  if (error) {
    throw new Error('Resend error: ' + error.message);
  }
}

module.exports = async function (context, req) {
  context.log('Contact function started');
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  if (req.method === 'OPTIONS') {
    context.log('OPTIONS request');
    context.res = { status: 204, headers: corsHeaders };
    return;
  }

  try {
    const body = await parseBody(req);
    context.log('Parsed body:', body);
  const firstName = (body.firstName || '').toString().trim();
  const lastName = (body.lastName || '').toString().trim();
  const email = (body.email || '').toString().trim();
  const phone = (body.phone || '').toString().trim();
  const message = (body.message || '').toString().trim();
  const trap = (body.website || '').toString().trim();

  if (trap) { // honeypot
    context.res = { status: 204, headers: corsHeaders };
    return;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
    context.res = { status: 400, headers: corsHeaders, body: { ok: false } };
    return;
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const MAIL_FROM = process.env.MAIL_FROM || 'info@investipal.co';
  const MAIL_FROM_NAME = process.env.MAIL_FROM_NAME || 'The Investipal Team';
  const MAIL_TO = process.env.MAIL_TO || 'cameron@investipal.co';
  const MAIL_TO_NAME = process.env.MAIL_TO_NAME || 'Cameron';

  if (!RESEND_API_KEY) {
    context.log('Missing RESEND_API_KEY');
    context.res = { status: 500, headers: corsHeaders, body: { ok: false, code: 'missing_api_key' } };
    return;
  }

  const subject = `New Contact Submission from ${firstName || ''} ${lastName || ''}`.trim();
  const textParts = [
    `Name: ${firstName} ${lastName}`.trim(),
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Message: ${message}`
  ].filter(Boolean);
  const text = textParts.join('\n');
  const html = `<p><strong>Name:</strong> ${firstName} ${lastName}</p>
<p><strong>Email:</strong> ${email}</p>
${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
<p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`;

  try {
    await sendWithResend({
      apiKey: RESEND_API_KEY,
      fromEmail: MAIL_FROM,
      fromName: MAIL_FROM_NAME,
      toEmail: MAIL_TO,
      toName: MAIL_TO_NAME,
      subject,
      text,
      html,
      replyTo: { Email: email, Name: `${firstName} ${lastName}`.trim() }
    });
  } catch (e) {
    context.log('Resend send error:', e && (e.stack || e.message || e));
    context.res = { status: 502, headers: corsHeaders, body: { ok: false, code: 'send_failed', error: (e && e.message) || 'unknown' } };
    return;
  }

  context.res = { status: 204, headers: corsHeaders };
};




