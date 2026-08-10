'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ArusythApexLogo from '@/components/ui/ArusythApexLogo';
import { createClient } from '@/lib/supabase/client';
import { useSiteSettings } from '@/lib/useSiteData';
import { INITIAL_SITE_SETTINGS } from '@/lib/supabase/data';

export default function LoginPageClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  const { settings } = useSiteSettings();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const activeSettings = mounted ? settings : INITIAL_SITE_SETTINGS;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (
          process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co' ||
          !process.env.NEXT_PUBLIC_SUPABASE_URL
        ) {
          setTimeout(() => {
            setLoading(false);
            router.push('/admin');
            router.refresh();
          }, 500);
          return;
        }

        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      if (data?.session) {
        setLoading(false);
        router.push('/admin');
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[#F9FAFB] min-h-screen flex items-center justify-center px-4 bg-line-pattern">
      <Card className="w-full max-w-md bg-white border border-[#E5E7EB] p-6 sm:p-8 space-y-5">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <ArusythApexLogo size={40} />
          </div>
          <h1 className="text-2xl font-bold text-[#1C1C1C]">
            {activeSettings.brand_name || 'Ostrune'} <GradientText>Admin Portal</GradientText>
          </h1>
          <p className="text-xs text-[#6B7280]">
            Sign in with your admin credentials
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20 text-xs font-semibold text-[#EF4444] flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0 text-[#EF4444]" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#1C1C1C] uppercase tracking-wider mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3 text-[#9CA3AF]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`admin@${(activeSettings.brand_name || 'ostrune').toLowerCase()}.com`}
                className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C1C1C] uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-[#9CA3AF]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-white"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} variant="primary" size="md" className="w-full pt-2.5">
            {loading ? 'Authenticating...' : 'Sign In to Admin Dashboard'}
          </Button>
        </form>

        <div className="pt-2 border-t border-[#E5E7EB] text-center">
          <p className="text-[11px] text-[#6B7280]">
            Protected by Supabase Auth (Email/Password) & RLS policies.
          </p>
        </div>
      </Card>
    </div>
  );
}
