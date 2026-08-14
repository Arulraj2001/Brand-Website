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

async function runTest() {
  console.log('Testing REST API insertion using Service Role Key into Supabase `leads` table...');

  const testSlug = 'fix-slow-wordpress-website';
  const testCategory = 'website_upgrade';
  const testLead = {
    name: 'Audit Test User',
    email: 'test.audit@example.com',
    phone: 'Not Provided (Blog Audit Request)',
    country: 'Global',
    service_interested: `Old Website Upgrade & Speed Overhaul (Blog: ${testSlug})`,
    budget_range: 'Free Audit Request',
    message: `[Blog Source: /blog/${testSlug} | Category: ${testCategory} | Title: "How to Fix a Slow WordPress Website"]\nWebsite URL: https://test-audit-site.com\nNote: Automated test submission verifying post category and slug capture.`,
    created_at: new Date().toISOString(),
    status: 'new',
  };

  const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      'apikey': serviceRoleKey,
      'Authorization': `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify([testLead]),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('Error inserting lead via REST:', response.status, errText);
  } else {
    const data = await response.json();
    console.log('SUCCESS! Test lead inserted into `leads` table using Service Role:');
    console.log(JSON.stringify(data, null, 2));
  }
}

runTest();
