'use client';

import Button from '@/components/Button';
import { PostType } from '@/types/generate';
import { CircleCheckBig, Download, Sparkles } from 'lucide-react';

interface Props {
  post: PostType;
}

export default function GenerateResult({ post }: Props) {
  // console.log('생성된 포스트', post);
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
      <div className="flex flex-col gap-5 bg-white/10 border border-white/50 rounded-lg p-10">
        {post.title && <h2 className="font-bold text-xl">{post.title}</h2>}
        {post.content && <div className="text-sm">{post.content}</div>}
        {post.metaDescription && <div>{post.metaDescription}</div>}
        {post.hashtags && <div>{post.hashtags}</div>}
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
