import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';
import { hashPassword, signToken, setSessionCookie } from '@/lib/auth';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

const schema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'الاسم قصير (٣ أحرف على الأقل)')
    .max(16, 'الاسم طويل (١٦ حرف كحد أقصى)')
    .regex(/^[a-zA-Z0-9_]+$/, 'الاسم يقبل حروف إنجليزية وأرقام و _ فقط (مثل اسم اللاعب)'),
  email: z.string().trim().email('البريد غير صحيح'),
  password: z.string().min(8, 'كلمة المرور ٨ أحرف على الأقل'),
});

export async function POST(req) {
  // حماية ضد التكرار السريع
  const ip = getClientIp(req);
  const rl = rateLimit(`register:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: `محاولات كثيرة، حاول بعد ${rl.retryAfter} ثانية` },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'طلب غير صالح' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const { username, email, password } = parsed.data;

  try {
    await connectDB();

    // نتأكد أن الاسم أو الإيميل غير مستخدم
    const exists = await User.findOne({
      $or: [{ username }, { email: email.toLowerCase() }],
    });
    if (exists) {
      return NextResponse.json(
        { error: 'الاسم أو البريد مستخدم من قبل' },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const user = await User.create({ username, email, passwordHash, coins: 100 });

    const token = signToken({ uid: user._id.toString(), username: user.username });
    setSessionCookie(token);

    return NextResponse.json({ user: user.toSafeJSON() }, { status: 201 });
  } catch (err) {
    console.error('register error:', err);
    return NextResponse.json({ error: 'صار خطأ بالسيرفر، حاول لاحقاً' }, { status: 500 });
  }
}
