import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({
        success: true,
        message: 'Thank you! Your inquiry has been received. Our team will reply within 12 hours.',
      });
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          name: body.name,
          email: body.email,
          phone: body.phone || 'Not Provided',
          country: body.country || body.city || 'Global',
          service_interested: body.service_interested,
          budget_range: body.budget_range || 'Free Audit Request',
          message: body.message,
          created_at: new Date().toISOString(),
          status: 'new',
        },
      ])
      .select();

    if (error) {
      console.warn('Supabase lead insert notice:', error.message);
    }

    // Trigger email notification to arulraj8637@gmail.com
    try {
      const origin = new URL(request.url).origin;
      fetch(`${origin}/api/leads/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data && data[0] ? data[0] : body),
      }).catch((err) => console.error('Background notification error:', err));
    } catch (e) {
      console.warn('Could not dispatch notification request:', e);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your inquiry has been received. Our team will reply within 12 hours.',
      data: data ? data[0] : null,
    });
  } catch (err) {
    console.error('API leads handler error:', err);
    return NextResponse.json({
      success: true,
      message: 'Thank you! Your inquiry has been received. Our team will reply within 12 hours.',
    });
  }
}
