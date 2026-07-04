# RePixel — موقع سيرفر ماينكرافت

موقع كامل لسيرفر ماينكرافت **RePixel**: صفحة رئيسية جذّابة، متجر رتب/مفاتيح/كوين،
نظام حسابات آمن، ولوحة تحكم للاعب. مبني على **Next.js 14 + Tailwind + MongoDB**،
عربي بالكامل (RTL)، ومصمّم للجوال أولاً.

---

## المميزات

- 🎨 تصميم عربي مميّز (كحلي + إميرلد + ذهبي) يشتغل ممتاز على الأندرويد
- 🔐 نظام حسابات آمن: تشفير كلمات المرور (bcrypt)، جلسات JWT بكوكي httpOnly
- 🛒 متجر متكامل: رتب (فارس/بطل/أسطورة)، مفاتيح، وباقات شحن كوين
- 📊 عدّاد لاعبين حي (يجلب حالة السيرفر الحقيقية)
- 👤 لوحة تحكم: الرصيد، الرتبة، سجل المشتريات، نسخ الآيبي
- 🛡️ حماية: تحديد معدّل الطلبات، رؤوس أمان، تحقّق من المدخلات

---

## التشغيل محلياً (Windows / PowerShell)

```powershell
# 1) ثبّت الحزم
npm install

# 2) انسخ ملف البيئة وعدّل القيم
copy .env.example .env.local

# 3) شغّل وضع التطوير
npm run dev
```

بعدها افتح: http://localhost:3000

### إعداد ملف `.env.local`

```
MONGODB_URI="رابط MongoDB Atlas الخاص فيك"
JWT_SECRET="مفتاح سري طويل وعشوائي"
NEXT_PUBLIC_SERVER_IP="play.repixel.net"
NEXT_PUBLIC_SERVER_PORT="25565"
NEXT_PUBLIC_DISCORD_URL="https://discord.gg/your-invite"
```

توليد مفتاح JWT قوي (PowerShell):

```powershell
[Convert]::ToBase64String((1..48 | ForEach-Object { Get-Random -Max 256 }))
```

---

## MongoDB Atlas

1. أنشئ Cluster مجاني على https://cloud.mongodb.com
2. Database Access → أضِف مستخدم بكلمة مرور
3. Network Access → اسمح بـ `0.0.0.0/0` (أو IP فيرسل)
4. Connect → Drivers → انسخ الرابط وحطّه في `MONGODB_URI`

قاعدة البيانات تُنشأ تلقائياً أول ما يسجّل أول لاعب.

---

## النشر على Vercel

1. ارفع المشروع على GitHub
2. https://vercel.com → New Project → اختر الريبو
3. Settings → Environment Variables → أضِف نفس متغيرات `.env.local`
4. Deploy ✅

---

## ⚠️ مهم قبل النشر الحقيقي: بوابة الدفع

زر **«اشحن»** في المتجر حالياً **للتجربة فقط** — يضيف الكوين مباشرة بدون دفع فعلي
(ملف `src/app/api/topup/route.js`).

قبل ما تفتح الموقع للناس، اربطه ببوابة دفع حقيقية:

1. أنشئ جلسة دفع (Stripe Checkout أو PayPal أو بوابة محلية)
2. أرسل اللاعب لصفحة الدفع
3. استقبل تأكيد الدفع عبر **Webhook موقّع**
4. **بعد التحقق من التوقيع فقط** أضِف الكوين للحساب

بهذا ما يقدر أحد يزوّد رصيده بدون دفع.

---

## هيكل المشروع

```
src/
├── app/
│   ├── page.jsx            الصفحة الرئيسية
│   ├── shop/               المتجر
│   ├── login/ register/    الدخول والتسجيل
│   ├── dashboard/          لوحة اللاعب
│   ├── rules/              القوانين
│   └── api/                نقاط النهاية (auth, shop, status, topup)
├── components/             Navbar, Footer, CopyIP, LiveStatus
└── lib/
    ├── mongodb.js          اتصال قاعدة البيانات
    ├── auth.js             التشفير والجلسات
    ├── shop.js             كتالوج المتجر (عدّل الأسعار من هنا)
    └── models/User.js      نموذج المستخدم
```

## تخصيص المتجر

كل الرتب والأسعار والمفاتيح في `src/lib/shop.js` — عدّلها بسهولة بدون لمس باقي الكود.
