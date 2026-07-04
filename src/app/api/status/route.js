import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const IP = process.env.NEXT_PUBLIC_SERVER_IP || 'play.repixel.net';
const PORT = process.env.NEXT_PUBLIC_SERVER_PORT || '25565';

// نجلب حالة السيرفر الحقيقية من mcsrvstat (مجاني). لو فشل، نرجّع حالة افتراضية.
export async function GET() {
  const target = PORT === '25565' ? IP : `${IP}:${PORT}`;
  try {
    const res = await fetch(`https://api.mcsrvstat.us/3/${target}`, {
      next: { revalidate: 30 }, // كاش ٣٠ ثانية
    });
    const data = await res.json();

    return NextResponse.json({
      online: !!data.online,
      players: data.players?.online ?? 0,
      max: data.players?.max ?? 0,
      version: data.version ?? null,
      source: 'live',
    });
  } catch {
    return NextResponse.json({
      online: false,
      players: 0,
      max: 0,
      version: null,
      source: 'fallback',
    });
  }
}
