// Simple Astro server route that accepts JSON or form-encoded POSTs
// Save as: src/pages/api/contact.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function POST({ request }) {
  const contentType = (request.headers.get('content-type') || '').toLowerCase();
  let payload: any = {};

  if (contentType.includes('application/json')) {
    try {
      payload = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } else {
    // handle form submissions (application/x-www-form-urlencoded or multipart/form-data)
    const formData = await request.formData();
    payload = Object.fromEntries(formData.entries());
  }

  const firstName = (payload.firstName || '').trim();
  const lastName = (payload.lastName || '').trim();
  const email = (payload.email || '').trim();
  const company = (payload.company || '').trim();
  const message = (payload.message || '').trim();

  if (!email) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    console.log('Contact submission received:', {
      firstName,
      lastName,
      email,
      company,
      message,
    });

    const data = await resend.emails.send({
      from: 'Chris Jugovic <chris.jugovic@notifications.investipal.co>',
      to: 'info@investipal.co',
      subject: 'Contact Form Submission',
      html: `
      <p>Name: ${firstName} ${lastName}</p>
      <p>Email: ${email}</p>
      <p>Company: ${company}</p><p>${message}</p>
      `,
    });

    console.log('Email sent:', data);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (e) {
    // ignore logging errors
    return new Response(JSON.stringify({ success: false, error: e }), {
      status: 500,
    });
  }
}
