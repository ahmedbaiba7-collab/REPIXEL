'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RANKS, COIN_PACKS, KEYS } from '@/lib/shop';

export default function ShopPage() {
  const [user, setUser] = useState(undefined); // undefined = يحمّل، null = زائر
  const [tab, setTab] = useState('ranks');
  const [toast, setToast] = useState(null);
  const [busy, setBusy] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .catch(() => setUser(null));
  }, []);

  function notify(msg, kind = 'ok') {
    setToast({ msg, kind });
    setTimeout(() => setToast(null), 2600);
  }

  async function buy(itemId) {
    if (!user) return notify('سجّل دخولك أولاً', 'err');
    setBusy(itemId);
    try {
      const res = await fetch('/api/shop/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId }),
      });
      const data = await res.json();
      if (!res.ok) {
        notify(data.error || 'تعذّر الشراء', 'err');
      } else {
        setUser(data.user);
        notify('تم الشراء بنجاح! 🎉', 'ok');
      }
    } catch {
      notify('صار خطأ، حاول مرة ثانية', 'err');
    } finally {
      setBusy(null);
    }
  }

  async function topup(packId) {
    if (!user) return notify('سجّل دخولك أولاً', 'err');
    setBusy(packId);
    try {
      const res = await fetch('/api/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packId }),
      });
      const data = await res.json();
      if (!res.ok) notify(data.error || 'تعذّرت العملية', 'err');
      else {
        setUser(data.user);
        notify('تمت إضافة الكوين لحسابك! 🪙', 'ok');
      }
    } catch {
      notify('صار خطأ، حاول مرة ثانية', 'err');
    } finally {
      setBusy(null);
    }
  }

  const TABS = [
    { id: 'ranks', label: 'الرتب' },
    { id: 'coins', label: 'شحن كوين' },
    { id: 'keys', label: 'المفاتيح' },
  ];

  return (
    <div className="relative bg-grid min-h-screen">
      {/* رأس */}
      <div className="relative spotlight border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 text-center">
          <span className="font-pixel text-[10px] text-gold">STORE</span>
          <h1 className="mt-3 font-display font-black text-4xl sm:text-5xl">المتجر</h1>
          <p className="mt-3 text-ink-muted">ادعم السيرفر واحصل على مزايا حصرية داخل اللعبة.</p>

          {/* شريط الرصيد */}
          <div className="mt-8 inline-flex items-center gap-4 px-5 py-3 rounded-2xl card-border">
            {user === undefined ? (
              <span className="text-ink-muted text-sm">جارٍ التحميل…</span>
            ) : user ? (
              <>
                <span className="flex items-center gap-2 text-sm">
                  <span className="w-7 h-7 grid place-items-center rounded-full bg-gold/20 text-gold">🪙</span>
                  رصيدك:
                  <span className="font-display font-black text-gold text-lg tabular-nums">
                    {user.coins.toLocaleString('ar-EG')}
                  </span>
                  كوين
                </span>
                <span className="text-ink-faint">·</span>
                <span className="text-sm text-ink-muted">
                  رتبتك: <span className="text-mint font-bold">{user.rank}</span>
                </span>
              </>
            ) : (
              <span className="text-sm text-ink-muted">
                <Link href="/login" className="text-mint hover:underline">سجّل دخولك</Link> عشان
                تشتري وتشحن.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* تبويبات */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-xl card-border">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 sm:px-7 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                  tab === t.id ? 'bg-mint-cyan text-night-900' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* الرتب */}
        {tab === 'ranks' && (
          <div className="grid gap-5 sm:grid-cols-3 max-w-4xl mx-auto">
            {RANKS.map((r) => {
              const owned = user?.rank === r.name;
              return (
                <div
                  key={r.id}
                  className={`relative card-border rounded-2xl p-6 flex flex-col ${r.popular ? 'sm:-translate-y-3' : ''}`}
                  style={{ boxShadow: r.popular ? `0 0 50px -18px ${r.glow}` : undefined }}
                >
                  {r.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-mint-cyan text-night-900 text-xs font-bold whitespace-nowrap">
                      الأكثر شعبية
                    </span>
                  )}
                  <span className="font-pixel text-[10px]" style={{ color: r.color }}>{r.latin}</span>
                  <h3 className="mt-2 font-display font-black text-2xl">{r.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="font-display text-3xl font-black" style={{ color: r.color }}>
                      {r.price.toLocaleString('ar-EG')}
                    </span>
                    <span className="text-sm text-ink-muted">كوين</span>
                  </div>
                  <ul className="mt-5 space-y-2.5 flex-1">
                    {r.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-ink-muted">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 shrink-0 stroke-mint" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <button
                    disabled={busy === r.id || owned}
                    onClick={() => buy(r.id)}
                    className="mt-6 py-3 rounded-xl font-bold text-night-900 transition-shadow pixel-corners disabled:opacity-50"
                    style={{ background: `linear-gradient(120deg, ${r.color}, ${r.color}dd)` }}
                  >
                    {owned ? 'رتبتك الحالية' : busy === r.id ? '…' : 'اشترِ الآن'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* شحن كوين */}
        {tab === 'coins' && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
              {COIN_PACKS.map((p) => (
                <div key={p.id} className="card-border rounded-2xl p-6 text-center flex flex-col">
                  {p.tag && (
                    <span className="self-center px-3 py-1 mb-3 rounded-full bg-gold/15 text-gold text-xs font-bold">
                      {p.tag}
                    </span>
                  )}
                  <div className="text-4xl mb-2">🪙</div>
                  <div className="font-display font-black text-xl">{p.name}</div>
                  <div className="mt-1 text-sm text-ink-muted">${p.price}</div>
                  <button
                    disabled={busy === p.id}
                    onClick={() => topup(p.id)}
                    className="mt-5 py-3 rounded-xl font-bold text-night-900 bg-gold hover:shadow-glow-gold transition-shadow pixel-corners disabled:opacity-50"
                  >
                    {busy === p.id ? '…' : 'اشحن'}
                  </button>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-xs text-ink-faint max-w-lg mx-auto">
              ملاحظة: زر «اشحن» حالياً للتجربة ويضيف الكوين مباشرة. اربطه ببوابة دفع
              حقيقية (Stripe / PayPal / بوابة محلية) قبل النشر — الشرح موجود في ملف
              README.
            </p>
          </>
        )}

        {/* المفاتيح */}
        {tab === 'keys' && (
          <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {KEYS.map((k) => (
              <div key={k.id} className="card-border rounded-2xl p-6 text-center flex flex-col">
                <div className="text-4xl mb-2">🗝️</div>
                <div className="font-display font-black text-lg">{k.name}</div>
                <div className="mt-2 flex items-baseline justify-center gap-1.5">
                  <span className="font-display text-2xl font-black" style={{ color: k.color }}>
                    {k.price.toLocaleString('ar-EG')}
                  </span>
                  <span className="text-sm text-ink-muted">كوين</span>
                </div>
                <button
                  disabled={busy === k.id}
                  onClick={() => buy(k.id)}
                  className="mt-5 py-3 rounded-xl font-bold text-night-900 transition-shadow pixel-corners disabled:opacity-50"
                  style={{ background: `linear-gradient(120deg, ${k.color}, ${k.color}dd)` }}
                >
                  {busy === k.id ? '…' : 'اشترِ'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-xl font-bold shadow-card animate-fade-up ${
            toast.kind === 'ok' ? 'bg-mint text-night-900' : 'bg-red-500 text-white'
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}
