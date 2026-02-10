'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import { Plus, Sparkles } from 'lucide-react';
import { useState } from 'react';
import GenerateResult from '@/app/generator/GenerateResult';
import { PostType } from '@/types/generate';

export default function GenerateForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PostType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const topic = (formData.get('topic') as string) || '';
      const description = (formData.get('description') as string) || '';
      const template = (formData.get('template') as string) || '';
      const length = (formData.get('length') as string) || 'normal';
      const tone = (formData.get('tone') as string) || 'professional';

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          description,
          template,
          length,
          tone,
        }),
      });

      if (!res.ok) throw new Error('생성 실패');

      const data = await res.json();

      console.log('API 응답', data);
      setResult(data);
    } catch (error) {
      console.error(error);
      setError('글 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      // 로딩중 표현
      setIsLoading(false);
    }
  };

  if (result) {
    return <GenerateResult post={result} />;
  }

  return (
    <div className="bg-white/10 border border-white/50 rounded-lg p-10">
      <form
        onSubmit={e => {
          e.preventDefault();
          handleGenerate(new FormData(e.currentTarget));
        }}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="topic" className="font-bold text-lg">
            주제
          </label>
          <Input
            name="topic"
            placeholder="e.g. 'Node.js와 Express로 RESR API 구축하기'"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-bold text-lg">
            추가 설명
          </label>
          <Textarea
            name="description"
            placeholder="주제에 대한 세부 설명, 강조할 포인트 등을 입력"
            required
          />
        </div>
        {/* <div className="flex flex-col gap-2">
          <label htmlFor="topic" className="font-bold text-lg">
            키워드 태그
          </label>
          <div className="flex gap-2.5">
            <Input placeholder="키워드를 입력하고 엔터를 누르세요" required />
            <Button size="sm">
              <Plus />
            </Button>
          </div>
        </div> */}
        <div className="flex flex-3 gap-8 w-full pb-4">
          <div className="flex flex-col w-full gap-2.5">
            <label htmlFor="template">템플릿 유형</label>
            <select
              name="template"
              id="template"
              className="bg-white/10 border border-white/50 rounded-lg py-3 px-4"
              required
            >
              <option value="">템플릿 선택</option>
              <option value="tutorial">Step-by-Step 튜토리얼</option>
              <option value="til">TIL</option>
              <option value="troubleShooting">트러블 슈팅</option>
              <option value="projectReview">프로젝트 리뷰</option>
            </select>
          </div>
          <div className="flex flex-col w-full gap-2.5">
            <label htmlFor="length">길이</label>
            <select
              name="length"
              id="length"
              className="bg-white/10 border border-white/50 rounded-lg py-3 px-4"
              required
            >
              <option value="">길이 선택</option>
              <option value="short">짧음 (~300)</option>
              <option value="normal">보통 (~500)</option>
              <option value="long">길음 (~1000)</option>
            </select>
          </div>
          <div className="flex flex-col w-full gap-2.5">
            <label htmlFor="tone">톤 앤 매너</label>
            <select
              name="tone"
              id="tone"
              className="bg-white/10 border border-white/50 rounded-lg py-3 px-4"
            >
              <option value="">톤 앤 매너 선택</option>
              <option value="friendly">친근한</option>
              <option value="professional">전문적</option>
              <option value="casual">캐주얼</option>
            </select>
          </div>
        </div>
        <Button type="submit">
          <Sparkles className="w-5" />
          {isLoading ? '생성중...' : 'Generate Blog Post'}
        </Button>
      </form>
    </div>
  );
}
