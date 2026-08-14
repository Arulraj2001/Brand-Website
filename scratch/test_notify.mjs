import fs from 'fs';

const envContent = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, ...vals] = line.split('=');
  if (key && vals.length > 0) {
    envVars[key.trim()] = vals.join('=').trim();
  }
});

const resendApiKey = envVars.RESEND_API_KEY;

if (!resendApiKey) {
  console.log('NOTE: RESEND_API_KEY is not yet added in .env.local.');
  console.log('Once you add RESEND_API_KEY=re_... to .env.local, email notifications will be sent automatically to arulraj8637@gmail.com.');
  process.exit(0);
}

async function sendTestNotification() {
  console.log('Sending test lead email notification via Resend API to arulraj8637@gmail.com...');

  const leadName = 'Arulraj Lead Test';
  const leadEmail = 'arulraj8637@gmail.com';
  const leadPhone = '+1 (555) 234-5678';
  const serviceInterested = 'Old Website Upgrade & Speed Overhaul (Blog: fix-slow-wordpress-website)';
  const budgetRange = '$1,000–$3,000';
  const message = '[Blog Source: /blog/fix-slow-wordpress-website | Category: website_upgrade]\nWebsite URL: https://example.com\nNote: Real-time lead email test.';

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <body style="font-family:sans-serif; padding:20px; background-color:#F9FAFB;">
    <div style="max-width:600px; margin:0 auto; background:#fff; border:2px solid #FFD21E; border-radius:12px; padding:24px;">
      <h2 style="color:#1C1C1C;">🔥 New Lead Captured: ${leadName}</h2>
      <p><strong>Email:</strong> ${leadEmail}</p>
      <p><strong>Phone:</strong> ${leadPhone}</p>
      <p><strong>Service:</strong> ${serviceInterested}</p>
      <p><strong>Budget:</strong> ${budgetRange}</p>
      <p><strong>Message:</strong> ${message}</p>
    </div>
  </body>
  </html>
  `;

  const fromAddress = envVars.RESEND_FROM_EMAIL || 'Ostrune Leads <onboarding@resend.dev>';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromAddress,
      to: ['arulraj8637@gmail.com'],
      subject: `🔥 New Lead: ${leadName} - ${serviceInterested}`,
      html: htmlContent,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Resend test failed:', res.status, err);
  } else {
    const data = await res.json();
    console.log('SUCCESS! Test email sent to arulraj8637@gmail.com. Email ID:', data.id);
  }
}

sendTestNotification();
