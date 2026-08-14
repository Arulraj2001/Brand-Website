import fs from 'fs';

const envContent = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, ...vals] = line.split('=');
  if (key && vals.length > 0) {
    envVars[key.trim()] = vals.join('=').trim();
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = envVars.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = envVars.RESEND_API_KEY;

async function testSubmissions() {
  console.log('--- Testing Multi-Currency Submissions (USD, INR, EUR, GBP, AUD, CAD) ---');

  // Test 1: Auto Popup Form Submission (EUR currency test)
  const eurPopupLead = {
    name: 'Euro Prospect Test',
    email: 'test.euro@example.com',
    phone: '+49 151 12345678',
    country: 'Germany',
    service_interested: 'Website Development',
    budget_range: '€920–€2,760 (Popular)',
    message: 'Auto Popup Strategy Request - Currency test (EUR €)',
    created_at: new Date().toISOString(),
    status: 'new',
  };

  const res1 = await fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      'apikey': serviceRoleKey,
      'Authorization': `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify([eurPopupLead]),
  });

  if (res1.ok) {
    const data1 = await res1.json();
    console.log('✅ Auto Popup Form (EUR) lead inserted successfully into Supabase:');
    console.log(`   ID: ${data1[0].id} | Budget: ${data1[0].budget_range}`);
  } else {
    console.error('❌ EUR lead insert failed:', res1.status, await res1.text());
  }

  // Test 2: Contact Page Form Submission (INR currency test)
  const inrContactLead = {
    name: 'INR Contact Test User',
    email: 'test.inr@example.com',
    phone: '+91 98765 43210',
    country: 'India',
    service_interested: 'SEO Optimization',
    budget_range: '₹50,000–₹1,00,000 (Popular)',
    message: 'Contact Page Strategy Request - Currency test (INR ₹)',
    created_at: new Date().toISOString(),
    status: 'new',
  };

  const res2 = await fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      'apikey': serviceRoleKey,
      'Authorization': `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify([inrContactLead]),
  });

  if (res2.ok) {
    const data2 = await res2.json();
    console.log('✅ Contact Page Form (INR) lead inserted successfully into Supabase:');
    console.log(`   ID: ${data2[0].id} | Budget: ${data2[0].budget_range}`);
  } else {
    console.error('❌ INR lead insert failed:', res2.status, await res2.text());
  }

  // Check Resend Email Notification setup
  if (resendApiKey) {
    console.log('\n--- Testing Resend Email Notification for Currency-Aware Lead ---');
    const fromAddress = envVars.RESEND_FROM_EMAIL || 'Ostrune Leads <onboarding@resend.dev>';
    
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: ['arulraj8637@gmail.com'],
        subject: `🔥 New Lead: Euro Prospect Test - Website Development (€920–€2,760)`,
        html: `
        <h2>New Lead Captured via Auto Popup Form</h2>
        <p><strong>Name:</strong> Euro Prospect Test</p>
        <p><strong>Email:</strong> test.euro@example.com</p>
        <p><strong>Phone:</strong> +49 151 12345678</p>
        <p><strong>Service:</strong> Website Development</p>
        <p><strong>Budget Range:</strong> €920–€2,760 (Popular)</p>
        `,
      }),
    });

    if (emailRes.ok) {
      const emailData = await emailRes.json();
      console.log('✅ Multi-currency notification email dispatched to arulraj8637@gmail.com. Email ID:', emailData.id);
    } else {
      console.error('❌ Notification email dispatch failed:', emailRes.status, await emailRes.text());
    }
  } else {
    console.log('\nℹ️ RESEND_API_KEY is pending in .env.local.');
  }
}

testSubmissions();
