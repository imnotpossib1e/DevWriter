'use client';

import MarkdownViewer from '@/app/generator/MarkdownViewer';
import Button from '@/components/Button';
import LinkButton from '@/components/LinkButton';
import { PostType } from '@/types/generate';
import { CircleCheckBig, Download, Sparkles } from 'lucide-react';

interface Props {
  post: PostType;
  onRegenerate: () => void;
}

export default function GenerateResult({ post, onRegenerate }: Props) {
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
        {post.content && <MarkdownViewer content={post.content} />}
        <hr className="text-white/20 border" />
        {/* seo */}
        {/* {post.metaDescription && <div>{post.metaDescription}</div>} */}
        <div className="flex gap-3">
          {post.hashtags &&
            post.hashtags.map(tag => (
              <span
                key={tag}
                className="flex justify-center items-center gap-2 w-fit bg-purple/40 border border-purple/90 px-2 py-1 rounded-lg text-sm"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>
      <div className="flex gap-5">
        <Button>
          <Download />
          Save Post
        </Button>
        <Button onClick={onRegenerate} variant="white" size="lg">
          <Sparkles className="w-5" />
          Regenerate
        </Button>
      </div>
    </div>
  );
}
