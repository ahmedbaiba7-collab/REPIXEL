import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// نخزّن الاتصال في الذاكرة حتى ما نفتح اتصال جديد مع كل طلب (مهم على Vercel)
let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI غير معرّف — أضِفه في ملف .env.local');
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        maxPoolSize: 10,
      })
      .then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
