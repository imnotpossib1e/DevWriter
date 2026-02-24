import Header from '@/components/Header';
import './globals.css';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex flex-col h-full min-h-screen bg-linear-to-l from-[#2E1065] via-[#0F172A] to-[#020617]">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
