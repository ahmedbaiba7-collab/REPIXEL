// كتالوج المتجر — عدّل الأسعار والمزايا من هنا بسهولة.
// الأسعار بالكوين (العملة داخل الموقع). اربطها ببوابة دفع حقيقية لاحقاً.

export const RANKS = [
  {
    id: 'knight',
    name: 'فارس',
    latin: 'KNIGHT',
    price: 500,
    color: '#8A93A8',
    glow: 'rgba(138,147,168,0.5)',
    perks: ['لون خاص بالدردشة', 'كِت يومي', '3 نقاط منزل', 'أولوية دخول'],
  },
  {
    id: 'hero',
    name: 'بطل',
    latin: 'HERO',
    price: 1200,
    color: '#38BDF8',
    glow: 'rgba(56,189,248,0.55)',
    popular: true,
    perks: ['كل مزايا فارس', 'تأثير جناحين', '6 نقاط منزل', 'صندوق أسبوعي', 'أوامر /fly في اللوبي'],
  },
  {
    id: 'legend',
    name: 'أسطورة',
    latin: 'LEGEND',
    price: 2500,
    color: '#F5C451',
    glow: 'rgba(245,196,81,0.5)',
    perks: ['كل مزايا بطل', 'تاج ذهبي', 'نقاط منزل غير محدودة', 'حيوان أليف خاص', 'دعم أولوية', 'اسم متوهّج'],
  },
];

export const COIN_PACKS = [
  { id: 'coins-500', name: '٥٠٠ كوين', coins: 500, price: 5, tag: null },
  { id: 'coins-1200', name: '١٢٠٠ كوين', coins: 1200, price: 10, tag: 'الأكثر طلباً' },
  { id: 'coins-3000', name: '٣٠٠٠ كوين', coins: 3000, price: 20, tag: '+٢٠٪ مجاناً' },
  { id: 'coins-8000', name: '٨٠٠٠ كوين', coins: 8000, price: 45, tag: '+٣٠٪ مجاناً' },
];

export const KEYS = [
  { id: 'key-knayth', name: 'مفتاح Knayth', price: 150, color: '#5BF3AC' },
  { id: 'key-hero', name: 'مفتاح Hero', price: 350, color: '#38BDF8' },
  { id: 'key-legend', name: 'مفتاح Legend', price: 700, color: '#F5C451' },
];

// نبحث عن أي عنصر قابل للشراء بالكوين (رتبة أو مفتاح)
export function findBuyable(id) {
  return (
    RANKS.find((r) => r.id === id) ||
    KEYS.find((k) => k.id === id) ||
    null
  );
}

export function findCoinPack(id) {
  return COIN_PACKS.find((p) => p.id === id) || null;
}
