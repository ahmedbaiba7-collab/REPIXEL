'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const LINKS = [
  { href: '/', label: 'الرئيسية' },
  { href: '/shop', label: 'المتجر' },
  { href: '/rules', label: 'القوانين' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .catch(() => {});
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/');
    router.refresh();
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-night-900/85 backdrop-blur-xl border-b border-white/5 shadow-card'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* اللوقو */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-9 h-9 rounded-lg bg-mint-cyan text-night-900 font-pixel text-xs pixel-corners shadow-glow">
            R
          </span>
          <span className="font-pixel text-[13px] tracking-tight">
            <span className="text-mint">Re</span>
            <span className="text-ink">Pixel</span>
          </span>
        </Link>

        {/* روابط سطح المكتب */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === l.href
                  ? 'text-mint bg-mint/10'
                  : 'text-ink-muted hover:text-ink hover:bg-white/5'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* أزرار الحساب */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors"
              >
                <span className="w-6 h-6 grid place-items-center rounded bg-mint-cyan text-night-900 font-bold text-xs">
                  {user.username.charAt(0).toUpperCase()}
                </span>
                {user.username}
              </Link>
              <button
                onClick={logout}
                className="px-3 py-2 rounded-lg text-sm text-ink-muted hover:text-red-400 transition-colors"
              >
                خروج
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg text-sm font-medium text-ink-muted hover:text-ink transition-colors"
              >
                دخول
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-lg text-sm font-bold text-night-900 bg-mint-cyan hover:shadow-glow transition-shadow pixel-corners"
              >
                إنشاء حساب
              </Link>
            </>
          )}
        </div>

        {/* زر القائمة للجوال */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden grid place-items-center w-10 h-10 rounded-lg bg-white/5 text-ink"
          aria-label="القائمة"
          aria-expanded={open}
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-current transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-current transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </div>
        </button>
      </nav>

      {/* قائمة الجوال */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 bg-night-900/95 backdrop-blur-xl border-b border-white/5 ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-3 space-y-1">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                pathname === l.href ? 'text-mint bg-mint/10' : 'text-ink-muted'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/5 flex gap-2">
            {user ? (
              <>
                <Link href="/dashboard" className="flex-1 text-center px-4 py-3 rounded-lg bg-white/5 text-sm font-medium">
                  حسابي ({user.username})
                </Link>
                <button onClick={logout} className="px-4 py-3 rounded-lg text-sm text-red-400 bg-white/5">
                  خروج
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="flex-1 text-center px-4 py-3 rounded-lg bg-white/5 text-sm font-medium">
                  دخول
                </Link>
                <Link href="/register" className="flex-1 text-center px-4 py-3 rounded-lg bg-mint-cyan text-night-900 text-sm font-bold">
                  إنشاء حساب
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
