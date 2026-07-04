'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CopyIP from '@/components/CopyIP';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => {
        if (!d.user) router.replace('/login');
        else setUser(d.user);
      })
      .catch(() => router.replace('/login'));
  }, [router]);

  if (user === undefined) {
    return (
      <div className="min-h-[60vh] grid place-items-center text-ink-muted">جارٍ التحميل…</div>
    );
  }
  if (!user) return null;

  const joined = new Date(user.createdAt).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="relative bg-grid min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
        {/* رأس الحساب */}
        <div className="card-border rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 grid place-items-center rounded-2xl bg-mint-cyan text-night-900 font-display font-black text-4xl pixel-corners shadow-glow">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="text-center sm:text-right flex-1">
            <h1 className="font-display font-black text-2xl sm:text-3xl" dir="ltr">
              {user.username}
            </h1>
            <p className="text-ink-muted text-sm mt-1">عضو منذ {joined}</p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-mint/10 text-mint font-bold text-sm">
            رتبة: {user.rank}
          </div>
        </div>

        {/* بطاقات سريعة */}
        <div className="grid gap-4 sm:grid-cols-3 mt-6">
          <div className="card-border rounded-2xl p-6">
            <div className="text-xs text-ink-muted mb-1">رصيد الكوين</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🪙</span>
              <span className="font-display font-black text-3xl text-gold tabular-nums">
                {user.coins.toLocaleString('ar-EG')}
              </span>
            </div>
            <Link href="/shop" className="mt-4 inline-block text-sm text-mint hover:underline">
              اشحن المزيد →
            </Link>
          </div>

          <div className="card-border rounded-2xl p-6">
            <div className="text-xs text-ink-muted mb-1">عدد المشتريات</div>
            <div className="font-display font-black text-3xl text-gradient tabular-nums">
              {user.purchases?.length || 0}
            </div>
            <Link href="/shop" className="mt-4 inline-block text-sm text-mint hover:underline">
              تصفّح المتجر →
            </Link>
          </div>

          <div className="card-border rounded-2xl p-6 flex flex-col justify-between">
            <div className="text-xs text-ink-muted mb-3">آيبي السيرفر</div>
            <CopyIP />
          </div>
        </div>

        {/* سجل المشتريات */}
        <div className="card-border rounded-2xl p-6 sm:p-8 mt-6">
          <h2 className="font-display font-bold text-lg mb-5">سجل المشتريات</h2>
          {user.purchases?.length ? (
            <ul className="divide-y divide-white/5">
              {[...user.purchases].reverse().map((p, i) => (
                <li key={i} className="flex items-center justify-between py-3.5">
                  <div>
                    <div className="font-medium">{p.itemName}</div>
                    <div className="text-xs text-ink-faint">
                      {new Date(p.date).toLocaleDateString('ar-EG')}
                    </div>
                  </div>
                  <span className="font-mono text-gold text-sm">
                    -{p.price.toLocaleString('ar-EG')} كوين
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">🛒</div>
              <p className="text-ink-muted text-sm">ما عندك مشتريات بعد.</p>
              <Link
                href="/shop"
                className="mt-4 inline-block px-6 py-2.5 rounded-xl bg-mint-cyan text-night-900 font-bold text-sm pixel-corners"
              >
                روح للمتجر
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
