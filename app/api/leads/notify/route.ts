import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const resendApiKey = process.env.RESEND_API_KEY;

    // Handle Supabase Webhook payload format if wrapped in record
    const lead = body.record || body;

    const leadName = lead.name || 'Anonymous Prospect';
    const leadEmail = lead.email || 'No email provided';
    const leadPhone = lead.phone || 'Not provided';
    const leadCountry = lead.country || lead.city || 'Global';
    const serviceInterested = lead.service_interested || 'General Inquiry';
    const budgetRange = lead.budget_range || 'Not specified';
    const message = lead.message || 'No additional note';
    const createdAt = lead.created_at
      ? new Date(lead.created_at).toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC'
      : new Date().toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC';

    console.log(`[Lead Notification] Processing lead for ${leadEmail}...`);

    if (!resendApiKey) {
      console.warn('[Lead Notification] RESEND_API_KEY is missing in .env.local. Email dispatch skipped.');
      return NextResponse.json({
        success: false,
        message: 'RESEND_API_KEY is not configured in environment variables.',
        lead: { name: leadName, email: leadEmail },
      }, { status: 400 });
    }

    // Modern HTML Email Template with Ostrune Branding
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Lead Notification</title>
    </head>
    <body style="margin:0; padding:0; background-color:#F9FAFB; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#F9FAFB; padding: 24px 12px;">
        <tr>
          <td align="center">
            <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; background-color:#FFFFFF; border-radius:16px; border:2px solid #FFD21E; overflow:hidden; box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);">
              <!-- Header Gradient -->
              <tr>
                <td style="background: linear-gradient(90deg, #FFD21E 0%, #FF9D00 50%, #3B82F6 100%); height:6px;"></td>
              </tr>
              
              <!-- Content Body -->
              <tr>
                <td style="padding: 28px 24px;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td>
                        <span style="background-color:#FFF9E6; color:#FF9D00; border:1px solid #FFD21E; font-size:11px; font-weight:800; padding:4px 10px; border-radius:4px; text-transform:uppercase; letter-spacing:0.5px;">
                          🔥 NEW LEAD CAPTURED
                        </span>
                        <h1 style="color:#1C1C1C; font-size:22px; font-weight:800; margin:14px 0 6px 0; tracking-tight: -0.5px;">
                          ${leadName} submitted a new inquiry!
                        </h1>
                        <p style="color:#6B7280; font-size:13px; margin:0 0 20px 0;">
                          Captured on <strong>${createdAt}</strong> via Ostrune Web Portal.
                        </p>
                      </td>
                    </tr>

                    <!-- Details Table -->
                    <tr>
                      <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#F9FAFB; border:1px solid #E5E7EB; border-radius:12px; padding:16px; margin-bottom:20px;">
                          <tr>
                            <td style="padding:6px 0; font-size:13px; color:#6B7280; width:140px; font-weight:600;">Full Name:</td>
                            <td style="padding:6px 0; font-size:14px; color:#1C1C1C; font-weight:800;">${leadName}</td>
                          </tr>
                          <tr>
                            <td style="padding:6px 0; font-size:13px; color:#6B7280; font-weight:600;">Work Email:</td>
                            <td style="padding:6px 0; font-size:14px; color:#3B82F6; font-weight:700;">
                              <a href="mailto:${leadEmail}" style="color:#3B82F6; text-decoration:none;">${leadEmail}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:6px 0; font-size:13px; color:#6B7280; font-weight:600;">Phone / WhatsApp:</td>
                            <td style="padding:6px 0; font-size:14px; color:#1C1C1C; font-weight:700;">${leadPhone}</td>
                          </tr>
                          <tr>
                            <td style="padding:6px 0; font-size:13px; color:#6B7280; font-weight:600;">Location / Country:</td>
                            <td style="padding:6px 0; font-size:13px; color:#1C1C1C;">${leadCountry}</td>
                          </tr>
                          <tr>
                            <td style="padding:6px 0; font-size:13px; color:#6B7280; font-weight:600;">Service Interested:</td>
                            <td style="padding:6px 0; font-size:14px; color:#FF9D00; font-weight:800;">${serviceInterested}</td>
                          </tr>
                          <tr>
                            <td style="padding:6px 0; font-size:13px; color:#6B7280; font-weight:600;">Budget (USD $):</td>
                            <td style="padding:6px 0; font-size:13px; color:#10B981; font-weight:800;">${budgetRange}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Note / Message Box -->
                    <tr>
                      <td>
                        <div style="background-color:#FFFDF5; border:1px solid #FFD21E; border-left:4px solid #FF9D00; border-radius:8px; padding:14px 16px; margin-bottom:20px;">
                          <div style="font-size:11px; font-weight:800; color:#FF9D00; text-transform:uppercase; margin-bottom:6px;">
                            MESSAGE / SOURCE NOTE
                          </div>
                          <div style="font-size:13px; color:#1C1C1C; line-height:1.5; white-space:pre-wrap;">
                            ${message}
                          </div>
                        </div>
                      </td>
                    </tr>

                    <!-- Quick Reply CTA Button -->
                    <tr>
                      <td align="center" style="padding-top:10px;">
                        <a href="mailto:${leadEmail}?subject=Re:%20Inquiry%20with%20Ostrune&body=Hi%20${encodeURIComponent(leadName)},%0A%0ATank%20you%20for%20reaching%20out!" style="background-color:#1C1C1C; color:#FFFFFF; font-size:13px; font-weight:800; padding:12px 24px; border-radius:10px; text-decoration:none; display:inline-block;">
                          ✉️ Reply to ${leadName} Instantly
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color:#F9FAFB; padding:16px; border-top:1px solid #E5E7EB; text-align:center; font-size:11px; color:#9CA3AF;">
                  Ostrune Automated Lead Engine • Notification Sent To arulraj8637@gmail.com
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Ostrune Leads <onboarding@resend.dev>';

    // Dispatch email via Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
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

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      console.error('[Lead Notification] Resend API Error:', resendResponse.status, resendError);
      return NextResponse.json({
        success: false,
        error: resendError,
      }, { status: 500 });
    }

    const resendData = await resendResponse.json();
    console.log('[Lead Notification] Email delivered successfully via Resend:', resendData.id);

    return NextResponse.json({
      success: true,
      emailId: resendData.id,
      message: 'Email notification sent successfully to arulraj8637@gmail.com',
    });
  } catch (err: unknown) {
    console.error('[Lead Notification] Exception:', err);
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error dispatching email',
    }, { status: 500 });
  }
}
