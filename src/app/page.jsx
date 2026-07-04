import Link from 'next/link';
import CopyIP from '@/components/CopyIP';
import LiveStatus from '@/components/LiveStatus';
import { RANKS } from '@/lib/shop';

const FEATURES = [
  {
    title: 'أنماط لعب فريدة',
    desc: 'سيرفايفل، بوابات، بوسّات، ومهمات مصممة يدوياً — تجربة ما تلقاها بأي مكان ثاني.',
    icon: 'M12 2 4 7v10l8 5 8-5V7z M12 2v20 M4 7l8 5 8-5',
  },
  {
    title: 'اقتصاد ورتب',
    desc: 'نظام كوين واقتصاد متكامل، رتب مدفوعة من فارس إلى أسطورة بمزايا حصرية.',
    icon: 'M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  },
  {
    title: 'حماية قوية',
    desc: 'حسابات مؤمّنة بتشفير، حماية ضد الغش، ونظام صلاحيات دقيق للطاقم.',
    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4',
  },
  {
    title: 'مجتمع نشط',
    desc: 'ديسكورد فعّال، فعاليات أسبوعية، وطاقم دعم عربي يساعدك على مدار الساعة.',
    icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  },
  {
    title: 'أداء عالي',
    desc: 'سيرفر مستقر بلا لاق، محسّن على Paper، يشتغل ٢٤/٧ بدون انقطاع.',
    icon: 'M13 2 3 14h9l-1 8 10-12h-9z',
  },
  {
    title: 'يشتغل على جوالك',
    desc: 'الموقع مصمّم للجوال أولاً — تصفّح المتجر وادِر حسابك من الأندرويد بسهولة.',
    icon: 'M5 2h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z M12 18h.01',
  },
];

// مكعبات بكسل عائمة للزينة
const BLOCKS = [
  { top: '12%', left: '6%', size: 42, color: '#2DE68F', delay: '0s', anim: 'animate-float' },
  { top: '22%', left: '86%', size: 30, color: '#38BDF8', delay: '1.2s', anim: 'animate-float-slow' },
  { top: '62%', left: '10%', size: 26, color: '#38BDF8', delay: '0.6s', anim: 'animate-float-slow' },
  { top: '70%', left: '90%', size: 38, color: '#2DE68F', delay: '1.8s', anim: 'animate-float' },
  { top: '40%', left: '92%', size: 20, color: '#F5C451', delay: '0.9s', anim: 'animate-float' },
  { top: '80%', left: '48%', size: 22, color: '#5BF3AC', delay: '2.2s', anim: 'animate-float-slow' },
];

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative spotlight bg-grid overflow-hidden">
        {/* مكعبات عائمة */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {BLOCKS.map((b, i) => (
            <span
              key={i}
              className={`absolute rounded-md ${b.anim} pixel-corners`}
              style={{
                top: b.top,
                left: b.left,
                width: b.size,
                height: b.size,
                background: b.color,
                opacity: 0.25,
                animationDelay: b.delay,
                boxShadow: `0 0 24px ${b.color}66`,
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-24 sm:pt-24 sm:pb-32 text-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full card-border text-xs sm:text-sm text-ink-muted mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
              الموسم الجديد متاح الآن — إصدار 1.21
            </span>
          </div>

          <h1
            className="animate-fade-up font-display font-black leading-[1.1] text-4xl sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '0.1s' }}
          >
            ادخل عالم
            <br />
            <span className="text-gradient font-pixel text-3xl sm:text-5xl lg:text-6xl inline-block mt-3 tracking-tight">
              RePixel
            </span>
          </h1>

          <p
            className="animate-fade-up mt-6 mx-auto max-w-xl text-ink-muted text-base sm:text-lg leading-relaxed"
            style={{ animationDelay: '0.2s' }}
          >
            سيرفر ماينكرافت عربي بعالم من صنع اللاعبين — أنماط لعب فريدة، رتب مميّزة،
            ومجتمع ما ينام. مغامرتك تبدأ من هنا.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
            style={{ animationDelay: '0.3s' }}
          >
            <CopyIP className="w-full sm:w-auto" />
            <Link
              href="/shop"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-mint-cyan text-night-900 font-bold text-center hover:shadow-glow transition-shadow pixel-corners"
            >
              تصفّح المتجر
            </Link>
          </div>

          <div
            className="animate-fade-up mt-9 flex items-center justify-center"
            style={{ animationDelay: '0.4s' }}
          >
            <LiveStatus variant="pill" />
          </div>
        </div>

        {/* تدرّج سفلي */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-night-800 to-transparent pointer-events-none" />
      </section>

      {/* ===== STATS ===== */}
      <section className="relative mx-auto max-w-5xl px-4 sm:px-6 -mt-8">
        <div className="grid grid-cols-3 gap-3 sm:gap-6 rounded-2xl card-border p-6 sm:p-8">
          <LiveStatus variant="stat" />
          <div className="text-center border-x border-white/5">
            <div className="font-display text-3xl sm:text-4xl font-black text-gradient">12K+</div>
            <div className="text-xs sm:text-sm text-ink-muted mt-1">لاعب مسجّل</div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl sm:text-4xl font-black text-gradient">99.9%</div>
            <div className="text-xs sm:text-sm text-ink-muted mt-1">وقت التشغيل</div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-pixel text-[10px] text-mint">FEATURES</span>
          <h2 className="mt-3 font-display font-black text-3xl sm:text-4xl">
            ليش تلعب في <span className="text-gradient">RePixel؟</span>
          </h2>
          <p className="mt-4 text-ink-muted">
            بنينا كل تفصيلة عشان تجربتك تكون أسرع، أمتع، وأكثر عدلاً.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="card-border rounded-2xl p-6 group hover:-translate-y-1 transition-transform"
            >
              <div className="w-12 h-12 rounded-xl bg-mint/10 grid place-items-center mb-4 group-hover:bg-mint/20 transition-colors">
                <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-mint" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={f.icon} />
                </svg>
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SHOP PREVIEW ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-pixel text-[10px] text-gold">STORE</span>
          <h2 className="mt-3 font-display font-black text-3xl sm:text-4xl">
            رتب تفتح لك <span className="text-gradient">عالم كامل</span>
          </h2>
          <p className="mt-4 text-ink-muted">ادعم السيرفر واحصل على مزايا حصرية داخل اللعبة.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3 max-w-4xl mx-auto">
          {RANKS.map((r) => (
            <div
              key={r.id}
              className={`relative card-border rounded-2xl p-6 flex flex-col ${
                r.popular ? 'sm:-translate-y-3' : ''
              }`}
              style={{ boxShadow: r.popular ? `0 0 50px -18px ${r.glow}` : undefined }}
            >
              {r.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-mint-cyan text-night-900 text-xs font-bold">
                  الأكثر شعبية
                </span>
              )}
              <span className="font-pixel text-[10px]" style={{ color: r.color }}>
                {r.latin}
              </span>
              <h3 className="mt-2 font-display font-black text-2xl">{r.name}</h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-display text-3xl font-black" style={{ color: r.color }}>
                  {r.price.toLocaleString('ar-EG')}
                </span>
                <span className="text-sm text-ink-muted">كوين</span>
              </div>
              <ul className="mt-5 space-y-2.5 flex-1">
                {r.perks.slice(0, 4).map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-ink-muted">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 shrink-0 stroke-mint" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href="/shop"
                className="mt-6 text-center py-3 rounded-xl font-bold text-night-900 transition-shadow pixel-corners"
                style={{ background: `linear-gradient(120deg, ${r.color}, ${r.color}dd)` }}
              >
                اطّلع على الرتبة
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-4">
        <div className="relative overflow-hidden rounded-3xl card-border p-10 sm:p-16 text-center bg-grid">
          <div className="spotlight absolute inset-0" />
          <div className="relative">
            <h2 className="font-display font-black text-3xl sm:text-5xl leading-tight">
              جاهز تبدأ <span className="text-gradient">مغامرتك؟</span>
            </h2>
            <p className="mt-4 text-ink-muted max-w-md mx-auto">
              سوِّ حسابك بأقل من دقيقة، انسخ الآيبي، وادخل عالم RePixel الحين.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-mint-cyan text-night-900 font-bold hover:shadow-glow transition-shadow pixel-corners"
              >
                أنشئ حسابك المجاني
              </Link>
              <CopyIP className="w-full sm:w-auto" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
