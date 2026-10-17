import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid or malformed JSON in request body.' },
        { status: 400 }
      );
    }

    const {
      toEmail,
      toName,
      subject,
      bodyText,
      previewUrl,
      apiKey: clientApiKey,
      provider = 'resend',
    } = body;

    if (!toEmail || !toEmail.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid recipient email (toEmail) is required.' },
        { status: 400 }
      );
    }

    if (!subject || !bodyText) {
      return NextResponse.json(
        { success: false, error: 'Email subject and body text are required.' },
        { status: 400 }
      );
    }

    const resendApiKey = clientApiKey || process.env.RESEND_API_KEY;
    const brevoApiKey = clientApiKey || process.env.BREVO_API_KEY;

    // Convert newlines in plain text to clean paragraphs
    const formattedBodyHtml = bodyText
      .split(/\r?\n\r?\n/)
      .map((para: string) => `<p style="margin:0 0 16px 0; color:#2D3748; font-size:14px; line-height:1.7;">${para.replace(/\r?\n/g, '<br/>')}</p>`)
      .join('');

    const fullPreviewUrl = previewUrl
      ? previewUrl.startsWith('http')
        ? previewUrl
        : `https://ostrune.netlify.app${previewUrl}`
      : null;

    // Premium HTML Email Template
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0; padding:0; background-color:#F7FAFC; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#F7FAFC; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:580px; background-color:#FFFFFF; border-radius:16px; border:1px solid #E2E8F0; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
          <!-- Top Accent Bar -->
          <tr>
            <td style="background:linear-gradient(90deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%); height:5px;"></td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:32px 28px;">
              ${formattedBodyHtml}

              ${
                fullPreviewUrl
                  ? `
              <div style="margin: 28px 0; text-align: left;">
                <a href="${fullPreviewUrl}" target="_blank" style="display:inline-block; background:linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%); color:#FFFFFF; text-decoration:none; padding:12px 24px; font-size:13px; font-weight:700; border-radius:8px; box-shadow:0 4px 8px rgba(79,70,229,0.25);">
                  View Live Sample Preview &rarr;
                </a>
              </div>
              `
                  : ''
              }

              <!-- Signature -->
              <div style="margin-top:32px; padding-top:20px; border-top:1px solid #EDF2F7;">
                <p style="margin:0 0 4px 0; font-size:14px; font-weight:700; color:#1A202C;">Arulraj S</p>
                <p style="margin:0 0 8px 0; font-size:12px; color:#718096;">Founder & Software Architect • Ostrune Web Architecture</p>
                <p style="margin:0; font-size:12px; color:#4A5568;">
                  📱 Direct / WhatsApp: <a href="https://wa.me/918637474067" style="color:#4F46E5; text-decoration:none; font-weight:600;">+91 8637474067</a>
                  &nbsp;•&nbsp;
                  🌐 <a href="https://ostrune.netlify.app" style="color:#4F46E5; text-decoration:none; font-weight:600;">ostrune.netlify.app</a>
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F7FAFC; padding:16px; border-top:1px solid #EDF2F7; text-align:center; font-size:11px; color:#A0AEC0;">
              This email was sent specifically regarding your Google Maps listing. If you do not wish to receive further notes, reply with "unsubscribe".
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // 1. PROVIDER: BREVO (Sendinblue)
    if (provider === 'brevo') {
      if (!brevoApiKey) {
        return NextResponse.json(
          {
            success: false,
            error: 'BREVO_API_KEY is not configured. Add it in .env.local or enter it in the pitch modal.',
          },
          { status: 400 }
        );
      }

      const brevoFromEmail = process.env.BREVO_FROM_EMAIL || 'arulraj8637@gmail.com';
      const brevoFromName = process.env.BREVO_FROM_NAME || 'Arulraj S | Ostrune';

      const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': brevoApiKey,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          sender: { name: brevoFromName, email: brevoFromEmail },
          to: [{ email: toEmail, name: toName || toEmail }],
          subject,
          htmlContent,
          textContent: bodyText,
        }),
      });

      if (!brevoResponse.ok) {
        const errText = await brevoResponse.text();
        console.error('[Client Hunter] Brevo API Error:', brevoResponse.status, errText);
        let cleanErr = errText;
        try {
          const parsed = JSON.parse(errText);
          if (parsed.message) cleanErr = parsed.message;
        } catch {}
        return NextResponse.json(
          { success: false, error: `Brevo API error: ${cleanErr}` },
          { status: brevoResponse.status }
        );
      }

      const brevoData = await brevoResponse.json();
      return NextResponse.json({
        success: true,
        provider: 'brevo',
        messageId: brevoData.messageId,
      });
    }

    // 2. PROVIDER: RESEND (Default)
    if (!resendApiKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'RESEND_API_KEY is not configured. Add it in .env.local or enter it in the pitch modal.',
        },
        { status: 400 }
      );
    }

    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Arulraj | Ostrune <onboarding@resend.dev>';

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [toEmail],
        subject,
        html: htmlContent,
        text: bodyText,
      }),
    });

    if (!resendResponse.ok) {
      const errText = await resendResponse.text();
      console.error('[Client Hunter] Resend API Error:', resendResponse.status, errText);

      let cleanError = errText;
      try {
        const parsed = JSON.parse(errText);
        if (parsed.message) cleanError = parsed.message;
      } catch {}

      // Handle Resend onboarding@resend.dev sandbox restriction
      if (
        cleanError.includes('testing email address') ||
        cleanError.includes('example.com') ||
        cleanError.includes('only send to your own email') ||
        cleanError.includes('validation_error')
      ) {
        cleanError = `Resend Free Sandbox Note: While using the default "onboarding@resend.dev", Resend only permits sending test emails to your registered account email (e.g. arulraj8637@gmail.com) or "delivered@resend.dev". To send to any external client email, verify your custom domain in the Resend dashboard, or switch to Brevo in the modal.`;
      }

      return NextResponse.json(
        { success: false, error: cleanError },
        { status: resendResponse.status }
      );
    }

    const resendData = await resendResponse.json();
    return NextResponse.json({
      success: true,
      provider: 'resend',
      messageId: resendData.id,
    });
  } catch (err: unknown) {
    console.error('[Client Hunter] Send email exception:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Internal server error while dispatching email.' },
      { status: 500 }
    );
  }
}
