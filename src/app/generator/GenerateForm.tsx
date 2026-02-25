'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import { Plus, Sparkles, TriangleAlert, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import GenerateResult from '@/app/generator/GenerateResult';
import { PostType } from '@/types/generate';
import { FadeLoader } from 'react-spinners';
import Tag from '@/components/Tag';

type Keyword = string;

export default function GenerateForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PostType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState<Keyword[]>([]);

  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [template, setTemplate] = useState('');
  const [length, setLength] = useState('');
  const [tone, setTone] = useState('');

  const handleKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = keywordInput.trim();

      if (!value) return;
      // 중복 방지
      if (keywords.includes(value)) return;

      setKeywords(prev => [...prev, value]);
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (tag: string) => {
    setKeywords(prev => prev.filter(k => k !== tag));
  };

  const handleGenerate = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      // const topic = (formData.get('topic') as string) || '';
      // const description = (formData.get('description') as string) || '';
      // const keywords = (formData.get('keywords') as string) || '';
      // const template = (formData.get('template') as string) || '';
      // const length = (formData.get('length') as string) || 'normal';
      // const tone = (formData.get('tone') as string) || 'professional';

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          // keyword: keywords
          //   .split(',')
          //   .map(k => k.trim())
          //   .filter(Boolean),
          keywords,
          description,
          template,
          length,
          tone,
        }),
      });

      // if (!res.ok) throw new Error('생성 실패');
      if (!res.ok) {
        const errarData = await res.json();
        setError(errarData.error || '생성 실패');
        return;
      }

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

  if (error) {
    return (
      <div className="flex flex-col items-center md:gap-8 gap-4 bg-white/10 border border-white/50 rounded-lg p-10 md:my-30 md:mx-50 m-5 md:text-2xl text-lg">
        <TriangleAlert className="md:w-20 md:h-20 w-10 h-10" />
        <div className="flex flex-col items-center gap-1">
          <span>글 생성에 실패했습니다.</span>
          <span>다시 시도해주세요.</span>
        </div>
        <Button
          onClick={() => {
            setError(null);
            setIsLoading(false);
          }}
        >
          다시 시도하기
        </Button>
      </div>
    );
  }

  if (result) {
    return (
      <GenerateResult
        post={result}
        prompt={{
          topic,
          description,
          keywords,
          template,
          length,
          tone,
        }}
        onRegenerate={() => {
          setResult(null);
          setError(null);
        }}
      />
    );
  }

  return (
    <div className="relative overflow-hidden bg-white/10 border border-white/50 rounded-lg md:p-10 p-5">
      {isLoading && (
        <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="absolute w-full h-full bg-black/30 z-11 animate-pulse"></div>
          <div className="flex flex-col items-center gap-4 animate-none z-12">
            <FadeLoader color="white" />
            <span className="text-xl font-bold animate-none">
              AI가 글을 생성중입니다...
            </span>
          </div>
        </div>
      )}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleGenerate(new FormData(e.currentTarget));
        }}
        className="flex flex-col md:gap-5 gap-4"
      >
        <div className="flex flex-col md:gap-2 gap-1">
          <label
            htmlFor="topic"
            className="flex items-center font-bold md:text-lg text-base gap-2"
          >
            주제<span className="text-xs text-white/50">(*필수)</span>
          </label>
          <Input
            name="topic"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="e.g. 'Node.js와 Express로 RESR API 구축하기'"
            required
          />
        </div>
        <div className="flex flex-col md:gap-2 gap-1">
          <label
            htmlFor="description"
            className="flex items-center font-bold md:text-lg text-base gap-2"
          >
            추가 설명<span className="text-xs text-white/50">(선택)</span>
          </label>
          <Textarea
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="주제에 대한 세부 설명, 강조할 포인트 등을 입력"
          />
        </div>
        <div className="flex flex-col md:gap-2 gap-1.5">
          <label
            htmlFor="keyword"
            className="flex items-center font-bold md:text-lg text-base gap-2"
          >
            키워드 태그<span className="text-xs text-white/50">(*필수)</span>
          </label>
          <div className="flex gap-2.5 h-fit">
            <Input
              name="keyword"
              placeholder="키워드를 입력하고 엔터를 누르세요"
              value={keywordInput}
              onChange={e => setKeywordInput(e.target.value)}
              onKeyDown={handleKeyword}
              required={keywords.length === 0}
            />
            <Button
              type="button"
              size="sm"
              onClick={() => {
                const value = keywordInput.trim();
                if (!value) return;
                if (keywords.includes(value)) return;
                setKeywords(prev => [...prev, value]);
                setKeywordInput('');
              }}
            >
              <Plus className="md:w-5 w-5.5 h-4" strokeWidth={2} />
            </Button>
            <input
              type="hidden"
              name="keywords"
              value={JSON.stringify(keywords)}
            />
          </div>
          <div className="flex flex-wrap md:gap-3 gap-2">
            {keywords.map(tag => (
              <Tag key={tag}>
                {tag}
                <button type="button" onClick={() => handleRemoveKeyword(tag)}>
                  <X className="w-3 h-3 text-white" />
                </button>
              </Tag>
            ))}
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:gap-8 gap-4 w-full pb-4 h-fit overflow-visible">
          <div className="flex flex-col w-full md:gap-2.5 gap-1">
            <label
              htmlFor="template"
              className="flex items-center font-bold md:text-lg text-base gap-2"
            >
              템플릿 유형<span className="text-xs text-white/50">(*필수)</span>
            </label>
            <select
              name="template"
              id="template"
              value={template}
              onChange={e => setTemplate(e.target.value)}
              className="w-full bg-white/10 border border-white/50 rounded-lg md:py-3 py-2 md:px-4 px-2 md:text-base text-sm"
              required
            >
              <option value="">템플릿 선택</option>
              <option value="tutorial">Step-by-Step 튜토리얼</option>
              <option value="til">TIL</option>
              <option value="troubleShooting">트러블 슈팅</option>
            </select>
          </div>
          <div className="flex flex-col w-full md:gap-2.5 gap-1">
            <label
              htmlFor="length"
              className="flex items-center font-bold md:text-lg text-base gap-2"
            >
              길이<span className="text-xs text-white/50">(*필수)</span>
            </label>
            <select
              name="length"
              id="length"
              value={length}
              onChange={e => setLength(e.target.value)}
              className="w-full bg-white/10 border border-white/50 rounded-lg md:py-3 py-2 md:px-4 px-2 md:text-base text-sm"
              required
            >
              <option value="">길이 선택</option>
              <option value="short">짧게 (~800자)</option>
              <option value="normal">보통 (~1200자)</option>
              <option value="long">길게 (~2000자)</option>
            </select>
          </div>
          <div className="flex flex-col w-full md:gap-2.5 gap-1">
            <label
              htmlFor="tone"
              className="flex items-center font-bold md:text-lg text-base gap-2"
            >
              톤 앤 매너<span className="text-xs text-white/50">(*필수)</span>
            </label>
            <select
              name="tone"
              id="tone"
              value={tone}
              onChange={e => setTone(e.target.value)}
              className="w-full bg-white/10 border border-white/50 rounded-lg md:py-3 py-2 md:px-4 px-2 md:text-base text-sm"
            >
              <option value="">톤 앤 매너 선택</option>
              <option value="friendly">친근한</option>
              <option value="professional">전문적</option>
              <option value="casual">캐주얼</option>
            </select>
          </div>
        </div>
        <Button type="submit">
          <Sparkles className="md:w-5 md:h-5 w-4 h-4" />
          Generate Post
        </Button>
      </form>
    </div>
  );
}
