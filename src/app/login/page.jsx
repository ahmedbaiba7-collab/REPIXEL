'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ login: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
    setError('');
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'تعذّر تسجيل الدخول');
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch {
      setError('صار خطأ بالاتصال، حاول مرة ثانية');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative bg-grid min-h-[calc(100vh-4rem)] grid place-items-center px-4 py-12">
      <div className="spotlight absolute inset-0 pointer-events-none" />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <span className="font-pixel text-[11px]">
            <span className="text-mint">Re</span>
            <span className="text-ink">Pixel</span>
          </span>
          <h1 className="mt-4 font-display font-black text-3xl">أهلاً بعودتك</h1>
          <p className="mt-2 text-ink-muted text-sm">سجّل دخولك وكمّل مغامرتك.</p>
        </div>

        <form onSubmit={submit} className="card-border rounded-2xl p-6 sm:p-8 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-ink mb-1.5 block">الاسم أو البريد</span>
            <input
              value={form.login}
              onChange={(e) => update('login', e.target.value)}
              placeholder="Steve_99"
              dir="ltr"
              autoComplete="username"
              className="w-full px-4 py-3 rounded-xl bg-night-900/60 border border-white/10 focus:border-mint text-ink placeholder:text-ink-faint outline-none transition-colors"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink mb-1.5 block">كلمة المرور</span>
            <input
              type="password"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              placeholder="••••••••"
              dir="ltr"
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-xl bg-night-900/60 border border-white/10 focus:border-mint text-ink placeholder:text-ink-faint outline-none transition-colors"
            />
          </label>

          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-mint-cyan text-night-900 font-bold hover:shadow-glow transition-shadow pixel-corners disabled:opacity-60"
          >
            {loading ? 'جارٍ الدخول…' : 'تسجيل الدخول'}
          </button>

          <p className="text-center text-sm text-ink-muted pt-2">
            ما عندك حساب؟{' '}
            <Link href="/register" className="text-mint hover:underline font-medium">
              أنشئ واحد
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
