import Link from 'next/link';

const IP = process.env.NEXT_PUBLIC_SERVER_IP || 'play.repixel.net';
const DISCORD = process.env.NEXT_PUBLIC_DISCORD_URL || '#';

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-night-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="grid place-items-center w-9 h-9 rounded-lg bg-mint-cyan text-night-900 font-pixel text-xs pixel-corners">
                R
              </span>
              <span className="font-pixel text-[13px]">
                <span className="text-mint">Re</span>
                <span className="text-ink">Pixel</span>
              </span>
            </div>
            <p className="text-ink-muted text-sm leading-relaxed max-w-sm">
              سيرفر ماينكرافت عربي بعالم من صنع اللاعبين. انضم لآلاف اللاعبين وابدأ
              مغامرتك اليوم — الآيبي: <span className="text-mint font-mono">{IP}</span>
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm mb-4">روابط</h4>
            <ul className="space-y-2.5 text-sm text-ink-muted">
              <li><Link href="/" className="hover:text-mint transition-colors">الرئيسية</Link></li>
              <li><Link href="/shop" className="hover:text-mint transition-colors">المتجر</Link></li>
              <li><Link href="/rules" className="hover:text-mint transition-colors">القوانين</Link></li>
              <li><Link href="/register" className="hover:text-mint transition-colors">إنشاء حساب</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm mb-4">المجتمع</h4>
            <a
              href={DISCORD}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#5865F2]/15 text-[#98a0f5] hover:bg-[#5865F2]/25 transition-colors text-sm font-medium"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.2.4c1.6.5 2.4 1 3.3 1.6a13.5 13.5 0 0 0-10.9 0c.9-.6 1.8-1.1 3.3-1.6L10.6 3a19.8 19.8 0 0 0-4.9 1.4C2.6 9 1.7 13.5 2.1 17.9A19.9 19.9 0 0 0 8.1 21l.4-.6c-.7-.3-1.4-.6-2-1l.5-.4a14.2 14.2 0 0 0 12 0l.5.4c-.6.4-1.3.7-2 1l.4.6a19.9 19.9 0 0 0 6-3.1c.5-5.1-.9-9.6-3.9-13.5ZM8.9 15.5c-1 0-1.7-.9-1.7-2s.8-2 1.7-2 1.7.9 1.7 2-.8 2-1.7 2Zm6.2 0c-1 0-1.7-.9-1.7-2s.8-2 1.7-2 1.7.9 1.7 2-.8 2-1.7 2Z" />
              </svg>
              انضم للديسكورد
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-faint">
          <p>© {new Date().getFullYear()} RePixel. جميع الحقوق محفوظة.</p>
          <p>
            لسنا تابعين لـ Mojang أو Microsoft. ماينكرافت علامة تجارية مملوكة لأصحابها.
          </p>
        </div>
      </div>
    </footer>
  );
}
