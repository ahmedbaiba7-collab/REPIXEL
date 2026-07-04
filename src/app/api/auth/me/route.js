import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  try {
    await connectDB();
    const user = await User.findById(session.uid);
    if (!user) return NextResponse.json({ user: null }, { status: 200 });
    return NextResponse.json({ user: user.toSafeJSON() });
  } catch (err) {
    console.error('me error:', err);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
