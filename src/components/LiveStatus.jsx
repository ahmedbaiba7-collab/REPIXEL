'use client';

import { useEffect, useState } from 'react';

export default function LiveStatus({ variant = 'pill' }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let active = true;
    const load = () =>
      fetch('/api/status')
        .then((r) => r.json())
        .then((d) => active && setStatus(d))
        .catch(() => {});
    load();
    const t = setInterval(load, 30_000);
    return () => {
      active = false;
      clearInterval(t);
    };
  }, []);

  const online = status?.online;
  const players = status?.players ?? 0;

  if (variant === 'stat') {
    return (
      <div className="text-center">
        <div className="font-display text-3xl sm:text-4xl font-black text-gradient tabular-nums">
          {status ? players : '—'}
        </div>
        <div className="text-xs sm:text-sm text-ink-muted mt-1">لاعب متصل الآن</div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full card-border">
      <span className="relative flex w-2.5 h-2.5">
        {online && (
          <span className="absolute inline-flex w-full h-full rounded-full bg-mint animate-pulse-ring" />
        )}
        <span
          className={`relative inline-flex w-2.5 h-2.5 rounded-full ${
            online ? 'bg-mint' : 'bg-ink-faint'
          }`}
        />
      </span>
      <span className="text-sm font-medium">
        {status == null ? (
          'جارٍ التحقق…'
        ) : online ? (
          <>
            <span className="text-mint font-bold tabular-nums">{players}</span> لاعب
            متصل
          </>
        ) : (
          <span className="text-ink-muted">السيرفر غير متصل حالياً</span>
        )}
      </span>
    </div>
  );
}
