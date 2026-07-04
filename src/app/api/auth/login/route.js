import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';
import { verifyPassword, signToken, setSessionCookie } from '@/lib/auth';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

const schema = z.object({
  login: z.string().trim().min(1, 'أدخل الاسم أو البريد'),
  password: z.string().min(1, 'أدخل كلمة المرور'),
});

export async function POST(req) {
  const ip = getClientIp(req);
  const rl = rateLimit(`login:${ip}`, { limit: 8, windowMs: 60_000 });
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
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { login, password } = parsed.data;

  try {
    await connectDB();
    const user = await User.findOne({
      $or: [{ username: login }, { email: login.toLowerCase() }],
    });

    // رسالة عامة حتى لا نكشف إن كان الحساب موجوداً أم لا
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json(
        { error: 'بيانات الدخول غير صحيحة' },
        { status: 401 }
      );
    }

    const token = signToken({ uid: user._id.toString(), username: user.username });
    setSessionCookie(token);

    return NextResponse.json({ user: user.toSafeJSON() });
  } catch (err) {
    console.error('login error:', err);
    return NextResponse.json({ error: 'صار خطأ بالسيرفر، حاول لاحقاً' }, { status: 500 });
  }
}
