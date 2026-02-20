'use client';

import { ArrowLeft, NotebookText, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col mx-auto w-5xl pt-15 gap-6">
        <Link
          href="/generatePosts"
          className="flex flex-wrap gap-4 font-bold text-gray-400"
        >
          <ArrowLeft className="w-5" />
          Back to Posts
        </Link>
        {children}
      </div>
    </>
  );
}
