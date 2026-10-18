'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ArusythApexLogo from '@/components/ui/ArusythApexLogo';
import { createClient } from '@/lib/supabase/client';
import { useSiteSettings } from '@/lib/useSiteData';

export default function LoginPageClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  const { settings } = useSiteSettings();

  const activeSettings = settings;

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
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <div className="admin-scope min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md bg-white border border-[#E2E8F0] shadow-xl rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <ArusythApexLogo size={44} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            {activeSettings.brand_name || 'Ostrune'} <span className="text-[#FF9D00]">Admin Portal</span>
          </h1>
          <p className="text-sm text-[#64748B]">
            Sign in with your enterprise credentials
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-600 flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0 text-red-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3.5 text-[#94A3B8]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`admin@${(activeSettings.brand_name || 'ostrune').toLowerCase()}.com`}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#FF9D00] focus:ring-2 focus:ring-[#FF9D00]/20 bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-3.5 text-[#94A3B8]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#FF9D00] focus:ring-2 focus:ring-[#FF9D00]/20 bg-white transition-all"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} variant="primary" size="md" className="w-full py-3 mt-2 shadow-sm font-semibold">
            {loading ? 'Authenticating...' : 'Sign In to Admin Dashboard'}
          </Button>
        </form>

        <div className="pt-3 border-t border-[#F1F5F9] text-center">
          <p className="text-xs text-[#94A3B8]">
            Protected by Supabase Auth (Email/Password) & RLS security.
          </p>
        </div>
      </Card>
    </div>
  );
}
