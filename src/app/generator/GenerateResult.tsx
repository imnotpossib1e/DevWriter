'use client';

import Button from '@/components/Button';
import { PostType } from '@/types/generate';
import { CircleCheckBig, Download, Sparkles } from 'lucide-react';

export default function GenerateResult({ post }: PostType) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2.5 bg-[#78DB88]/10 border border-[#78DB88]/50 rounded-lg py-3 px-4">
        <CircleCheckBig className="text-[#78DB88]" />
        <div className="flex flex-col ">
          <span className="text-[#9FECB2] font-bold">
            Post Generated Successfully!
          </span>
          <span className="text-[#509262] font-semibold text-sm">
            Review your content below and save when ready
          </span>
        </div>
      </div>
      <div className="bg-white/10 border border-white/50 rounded-lg p-10">
        {post}
      </div>
      <div className="flex gap-5">
        <Button>
          <Download />
          Save Post
        </Button>
        <Button variant="white">
          <Sparkles className="w-5" />
          Regenerate
        </Button>
      </div>
    </div>
  );
}
