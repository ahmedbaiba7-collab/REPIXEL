import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';
import { getSession } from '@/lib/auth';
import { findBuyable, RANKS } from '@/lib/shop';

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

  const item = findBuyable(body?.itemId);
  if (!item) {
    return NextResponse.json({ error: 'العنصر غير موجود' }, { status: 404 });
  }

  try {
    await connectDB();
    const user = await User.findById(session.uid);
    if (!user) return NextResponse.json({ error: 'الحساب غير موجود' }, { status: 404 });

    if (user.coins < item.price) {
      return NextResponse.json(
        { error: 'رصيدك من الكوين غير كافٍ', need: item.price, have: user.coins },
        { status: 402 }
      );
    }

    // نخصم السعر ونسجّل الشراء. لو رتبة، نحدّث رتبة اللاعب.
    user.coins -= item.price;
    user.purchases.push({
      itemId: item.id,
      itemName: item.name,
      price: item.price,
    });
    if (RANKS.some((r) => r.id === item.id)) {
      user.rank = item.name;
    }
    await user.save();

    return NextResponse.json({ ok: true, user: user.toSafeJSON() });
  } catch (err) {
    console.error('buy error:', err);
    return NextResponse.json({ error: 'صار خطأ بالسيرفر' }, { status: 500 });
  }
}
