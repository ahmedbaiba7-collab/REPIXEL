import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';
import { getSession } from '@/lib/auth';
import { findCoinPack } from '@/lib/shop';

// ⚠️ مهم: هذا Endpoint للتجربة فقط ويضيف الكوين مباشرة.
// قبل النشر الحقيقي، اربطه ببوابة دفع (Stripe / PayPal / بوابة محلية):
// 1) أنشئ جلسة دفع وأرسل المستخدم لصفحة الدفع.
// 2) استقبل تأكيد الدفع عبر Webmook موقّع.
// 3) بعد التحقق فقط، أضِف الكوين للحساب.
export async function POST(req) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: 'سجّل دخولك أولاً' }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'طلب غير صالح' }, { status: 400 });
  }

  const pack = findCoinPack(body?.packId);
  if (!pack) {
    return NextResponse.json({ error: 'الباقة غير موجودة' }, { status: 404 });
  }

  try {
    await connectDB();
    const user = await User.findById(session.uid);
    if (!user) return NextResponse.json({ error: 'الحساب غير موجود' }, { status: 404 });

    user.coins += pack.coins;
    await user.save();

    return NextResponse.json({ ok: true, user: user.toSafeJSON() });
  } catch (err) {
    console.error('topup error:', err);
    return NextResponse.json({ error: 'صار خطأ بالسيرفر' }, { status: 500 });
  }
}
