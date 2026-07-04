'use client';

import { useState } from 'react';

const IP = process.env.NEXT_PUBLIC_SERVER_IP || 'play.repixel.net';

export default function CopyIP({ className = '' }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(IP);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // متصفحات قديمة
      const t = document.createElement('textarea');
      t.value = IP;
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      document.body.removeChild(t);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }

  return (
    <button
      onClick={copy}
      className={`group relative flex items-center gap-3 px-5 py-3.5 rounded-xl card-border pixel-corners hover:shadow-glow transition-shadow ${className}`}
      aria-label="نسخ آيبي السيرفر"
    >
      <span className="text-[10px] font-pixel text-mint hidden sm:block">IP</span>
      <span className="font-mono text-base sm:text-lg text-ink font-bold tracking-wide" dir="ltr">
        {IP}
      </span>
      <span className="mr-auto flex items-center gap-1.5 text-xs font-medium text-ink-muted group-hover:text-mint transition-colors">
        {copied ? (
          <>
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-mint" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span className="text-mint">تم النسخ!</span>
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            انسخ
          </>
        )}
      </span>
    </button>
  );
}
