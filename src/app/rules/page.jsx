import Link from 'next/link';

export const metadata = {
  title: 'القوانين — RePixel',
};

const RULES = [
  {
    title: 'احترم الجميع',
    desc: 'ممنوع السب أو التنمّر أو أي كلام مسيء. اللعب متعة للكل — خلها كذا.',
  },
  {
    title: 'ممنوع الغش',
    desc: 'أي هاكات، X-Ray، أو برامج مساعدة تؤدي لحظر دائم بدون إنذار.',
  },
  {
    title: 'لا سبام ولا إعلانات',
    desc: 'ممنوع نشر سيرفرات ثانية أو روابط مشبوهة في الدردشة أو الخاص.',
  },
  {
    title: 'لعب نظيف',
    desc: 'ممنوع استغلال الثغرات (Bugs). لو لقيت ثغرة، بلّغ الطاقم وبتنكافأ.',
  },
  {
    title: 'ممنوع النصب',
    desc: 'أي عملية بيع أو تبادل تتم خارج نظام السيرفر مسؤوليتك وحدك.',
  },
  {
    title: 'قرار الطاقم نهائي',
    desc: 'الطاقم موجود لخدمتك. لو عندك اعتراض، افتح تذكرة في الديسكورد بأدب.',
  },
];

export default function RulesPage() {
  return (
    <div className="relative bg-grid min-h-screen">
      <div className="relative spotlight border-b border-white/5">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 sm:py-20 text-center">
          <span className="font-pixel text-[10px] text-mint">RULES</span>
          <h1 className="mt-3 font-display font-black text-4xl sm:text-5xl">قوانين السيرفر</h1>
          <p className="mt-3 text-ink-muted">
            قوانين بسيطة تخلي التجربة عادلة وممتعة للكل. دخولك السيرفر معناه موافقتك عليها.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <div className="space-y-4">
          {RULES.map((r, i) => (
            <div key={i} className="card-border rounded-2xl p-6 flex gap-4">
              <span className="shrink-0 w-10 h-10 grid place-items-center rounded-xl bg-mint/10 text-mint font-display font-black">
                {(i + 1).toLocaleString('ar-EG')}
              </span>
              <div>
                <h3 className="font-display font-bold text-lg mb-1">{r.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 card-border rounded-2xl p-8 text-center">
          <h3 className="font-display font-bold text-xl">عندك سؤال أو بلاغ؟</h3>
          <p className="mt-2 text-ink-muted text-sm">طاقم الدعم موجود في الديسكورد على مدار الساعة.</p>
          <Link
            href="/"
            className="mt-5 inline-block px-6 py-3 rounded-xl bg-mint-cyan text-night-900 font-bold pixel-corners"
          >
            رجوع للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
