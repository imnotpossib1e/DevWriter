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
    <div className="flex flex-col mx-auto w-5xl pt-15 gap-6">
      <Link href="/" className="flex flex-wrap gap-4 font-bold text-gray-400">
        <ArrowLeft className="w-5" />
        Back to Home
      </Link>
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex justify-center items-center h-12.5 w-12.5 rounded-lg bg-[#252159]">
          <Sparkles className="text-purple  " />
        </div>
        <div className="flex flex-col font-bold">
          <h2 className="text-2xl">Blog Generator</h2>
          <span className="text-gray-400">
            Create technical content in seconds
          </span>
        </div>
      </div>

      {children}
    </div>
  );
}
