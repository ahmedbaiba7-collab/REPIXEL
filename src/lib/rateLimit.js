// محدّد بسيط لعدد المحاولات لكل IP — حماية أولية ضد محاولات الاختراق المتكررة.
// ملاحظة: للإنتاج على نطاق واسع استخدم Redis/Upstash بدل الذاكرة.
const buckets = new Map();

export function rateLimit(key, { limit = 5, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now > entry.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((entry.reset - now) / 1000) };
  }

  entry.count += 1;
  return { ok: true, remaining: limit - entry.count };
}

export function getClientIp(req) {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}
