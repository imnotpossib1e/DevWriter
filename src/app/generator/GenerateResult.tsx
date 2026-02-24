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
    const exists = useHistoryStore
      .getState()
      .history.some(item => item.id === post.id);

    if (exists) {
      alert('이미 저장된 포스트입니다.');
      return;
    }

    try {
      addHistory(post, prompt);
      alert('저장되었습니다.');
    } catch (error) {
      console.error('저장에 실패했습니다.', error);
      alert('저장에 실패했습니다.');
    }
  };

  // console.log('생성된 포스트', post);
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex flex-col md:gap-4 gap-2 bg-[#78DB88]/10 border border-[#78DB88]/50 rounded-lg md:py-3 md:px-4 py-2 px-3">
          <div className="flex items-center gap-2.5">
            <CircleCheckBig className="text-[#78DB88]" />
            <div className="flex flex-col ">
              <span className="text-[#9FECB2] font-bold">
                Post Generated Successfully!
              </span>
              <span className="text-[#509262] font-semibold text-sm">
                Review your content below and save
              </span>
            </div>
          </div>
          <hr className="text-[#78DB88]/20 border" />
          <div className="flex flex-col md:gap-2 gap-1.5 px-3">
            <div className="flex gap-1.5 items-center">
              <span>{prompt.topic}</span>
            </div>
            <div className="flex flex-row gap-3">
              <Tag varient="green">
                {prompt.template === 'tutorial'
                  ? '튜토리얼'
                  : prompt.template === 'til'
                    ? 'TIL'
                    : '트러블슈팅'}
              </Tag>
              <Tag varient="green">
                {prompt.length === 'short'
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
      <div className="flex flex-col md:gap-6 gap-4 bg-white/10 border border-white/50 rounded-lg md:p-10 p-5">
        {post.title && <h1 className="font-bold text-2xl">{post.title}</h1>}
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
          <Save className="md:w-5 md:h-5 w-4 h-4" />
          Save Post
        </Button>
        <Button onClick={onRegenerate} variant="white" size="lg">
          <Sparkles className="md:w-5 md:h-5 w-4 h-4" />
          Regenerate
        </Button>
      </div>
    </div>
  );
}
