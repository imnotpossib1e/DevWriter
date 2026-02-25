import Header from '@/components/Header';
import './globals.css';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-theme="light" suppressHydrationWarning>
      <body className="flex flex-col h-full min-h-screen ">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
