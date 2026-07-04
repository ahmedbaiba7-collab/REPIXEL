'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
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
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'تعذّر إنشاء الحساب');
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
          <h1 className="mt-4 font-display font-black text-3xl">أنشئ حسابك</h1>
          <p className="mt-2 text-ink-muted text-sm">دقيقة وحدة وتصير جزء من العالم.</p>
        </div>

        <form onSubmit={submit} className="card-border rounded-2xl p-6 sm:p-8 space-y-4">
          <Field
            label="اسم اللاعب"
            hint="حروف إنجليزية وأرقام و _ فقط"
            value={form.username}
            onChange={(v) => update('username', v)}
            placeholder="Steve_99"
            dir="ltr"
            autoComplete="username"
          />
          <Field
            label="البريد الإلكتروني"
            type="email"
            value={form.email}
            onChange={(v) => update('email', v)}
            placeholder="you@example.com"
            dir="ltr"
            autoComplete="email"
          />
          <Field
            label="كلمة المرور"
            type="password"
            hint="٨ أحرف على الأقل"
            value={form.password}
            onChange={(v) => update('password', v)}
            placeholder="••••••••"
            dir="ltr"
            autoComplete="new-password"
          />

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
            {loading ? 'جارٍ الإنشاء…' : 'إنشاء الحساب'}
          </button>

          <p className="text-center text-sm text-ink-muted pt-2">
            عندك حساب؟{' '}
            <Link href="/login" className="text-mint hover:underline font-medium">
              سجّل دخولك
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({ label, hint, value, onChange, type = 'text', ...props }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-medium text-ink">{label}</span>
        {hint && <span className="text-xs text-ink-faint">{hint}</span>}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-night-900/60 border border-white/10 focus:border-mint text-ink placeholder:text-ink-faint outline-none transition-colors"
        {...props}
      />
    </label>
  );
}
