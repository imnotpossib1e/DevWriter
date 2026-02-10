'use client';

import { GeneratePost } from '@/data/action/generate';
import { ApiRes } from '@/types/api';
import { PromptType } from '@/types/generate';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import { Sparkles } from 'lucide-react';
import { useActionState, useState } from 'react';
import GenerateResult from '@/app/generator/GenerateResult';

export default function GenerateForm() {
  // const [prompt, setPrompt] = useState('');
  // const [blog, setBlog] = useState('');
  // const [loading, setLoading] = useState(false);

  // const [res, setRes] = useState<ApiRes<PromptType> | null>(null);

  const [generateState, generateAction] = useActionState(GeneratePost, null);
  const isGenerated = !!generateState?.ok && generateState.item?.content;
  // setBlog(data.content);
  // setLoading(false);

  if (isGenerated) {
    return <GenerateResult post={generateState.item.content!} />;
  }

  return (
    <div className="bg-white/10 border border-white/50 rounded-lg p-10">
      <form action={generateAction} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="topic" className="font-bold text-lg">
            주제
          </label>
          <Input
            name="topic"
            placeholder="e.g. 'Node.js와 Express로 RESR API 구축하기'"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-bold text-lg">
            추가 설명
          </label>
          <Textarea
            name="description"
            placeholder="주제에 대한 세부 설명, 강조할 포인트 등을 입력"
          />
        </div>
        {/* <div className="flex flex-col gap-2">
            <label htmlFor="topic" className="font-bold text-lg">
              키워드 태그
            </label>
            <div className="flex gap-2.5">
              <Input placeholder="키워드를 입력하고 엔터를 누르세요" />
              <Button>
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
        <Button>
          <Sparkles className="w-5" />
          Generate Blog Post
        </Button>
      </form>
    </div>
  );
}
