'use client';

import MarkdownViewer from '@/app/generator/MarkdownViewer';
import Button from '@/components/Button';
import Tag from '@/components/Tag';
import { PostType, PromptType } from '@/types/generate';
import { useHistoryStore } from '@/zustand/useHistoryStore';
import { CircleCheckBig, Save, Sparkles } from 'lucide-react';

interface Props {
  post: PostType;
  prompt: PromptType;
  onRegenerate: () => void;
}

export default function GenerateResult({ post, prompt, onRegenerate }: Props) {
  const addHistory = useHistoryStore(state => state.addHistory);

  const handleSave = () => {
    addHistory(post, prompt);
    console.log('저장');
  };

  // console.log('생성된 포스트', post);
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex flex-col gap-4 bg-[#78DB88]/10 border border-[#78DB88]/50 rounded-lg py-3 px-4">
          <div className="flex items-center gap-2.5">
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
          <hr className="text-[#78DB88]/20 border" />
          <div className="flex flex-col gap-2 px-3">
            <div className="flex gap-1.5 items-center">
              <span>주제 :</span>
              <span>{prompt.topic}</span>
            </div>
            <div className="flex flex-row gap-3 mt-1.5">
              <Tag varient="green">
                {prompt.template === 'tutorial'
                  ? '튜토리얼'
                  : prompt.template === 'til'
                    ? 'TIL'
                    : '트러블슈팅'}
              </Tag>
              <Tag varient="green">
                {prompt.length === 'shirt'
                  ? '짧게 (~800자)'
                  : prompt.length === 'normal'
                    ? '보통 (~1200자)'
                    : '길게 (~2000자)'}
              </Tag>
              <Tag varient="green">
                {prompt.tone === 'friendly'
                  ? '친근한'
                  : prompt.tone === 'professional'
                    ? '전문적'
                    : '캐주얼'}
              </Tag>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 bg-white/10 border border-white/50 rounded-lg p-10">
        {post.title && <h1 className="font-bold text-3xl">{post.title}</h1>}
        <hr className="text-white/20 border" />
        {post.content && <MarkdownViewer content={post.content} />}
        <hr className="text-white/20 border" />
        {/* seo */}
        {/* {post.metaDescription && <div>{post.metaDescription}</div>} */}
        <div className="flex gap-3">
          {post.hashtags &&
            post.hashtags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>
      </div>
      <div className="flex gap-5">
        <Button onClick={handleSave}>
          <Save />
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
