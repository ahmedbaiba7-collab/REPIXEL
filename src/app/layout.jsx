import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'RePixel — سيرفر ماينكرافت',
  description:
    'ادخل عالم RePixel — سيرفر ماينكرافت عربي بأنماط لعب فريدة، رتب مميّزة، متجر آمن، ومجتمع نشط.',
  keywords: ['ماينكرافت', 'سيرفر', 'RePixel', 'minecraft', 'عربي'],
  openGraph: {
    title: 'RePixel — سيرفر ماينكرافت',
    description: 'ادخل عالم RePixel وابدأ مغامرتك.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#0A0F1E',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&family=Tajawal:wght@400;500;700&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
