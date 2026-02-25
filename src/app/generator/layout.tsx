'use client';

import GenerateResult from '@/app/generator/GenerateResult';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen h-full lg:w-5xl w-full lg:mx-auto md:pt-15 pt-10 md:px-10 px-5 gap-6">
      <Link
        href="/"
        className="flex flex-nowrap items-center md:gap-4 gap-2 font-bold md:text-base text-sm text-(--text-layout)"
      >
        <ArrowLeft className="md:w-5 md:h-5 w-4 h-4" />
        Back to Home
      </Link>
      <div className="flex flex-nowrap gap-4 items-center">
        <div className="flex justify-center items-center md:h-12.5 md:w-12.5 h-10 w-10 rounded-lg bg-[#252159]">
          <Sparkles className="text-purple md:w-5 md:h-5 w-4 h-4" />
        </div>
        <div className="flex flex-col font-bold">
          <h2 className="md:text-2xl text-lg">Blog Generator</h2>
          <span className="text-(--text-layout) md:text-base text-sm">
            몇 초 만에 완성되는 기술 블로그
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
