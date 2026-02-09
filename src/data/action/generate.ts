'use server';

import { ApiRes, ApiResPromise } from '@/types/api';
import { PromptType } from '@/types/generate';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function GeneratePost(
  state: ApiRes<PromptType> | null,
  formData: FormData,
): ApiResPromise<PromptType> {
  const topic = (formData.get('topic') as string) || '';
  const description = (formData.get('description') as string) || '';
  const template = (formData.get('template') as string) || '';
  const length = (formData.get('length') as string) || 'normal';
  const tone = (formData.get('tone') as string) || 'professional';

  let data: ApiRes<PromptType>;

  try {
    const prompt = `주제: ${topic}
      추가 설명: ${description}
      템플릿: ${template}
      글 길이: ${length} (${length === 'short' ? '~300자' : length === 'normal' ? '~500자' : '~1000자'})
      톤 앤 매너: ${tone}
      위 조건에 맞춰서 블로그 글을 작성해줘
      `;
    const res = await openai.chat.completions.create({
      model: 'gpt-5.2',
      // input: prompt,
      messages: [{ role: 'user', content: prompt }],
      max_completion_tokens:
        length === 'short' ? 500 : length === 'normal' ? 1000 : 2000,
    });

    const content = res.choices[0]?.message?.content || '';

    const result: PromptType = {
      content,
      topic,
      description,
      template,
      length,
      tone,
    };

    revalidatePath('/');
    redirect(`/generatePost`);

    return { ok: 1, item: result };
  } catch (error) {
    console.error(error);
    return { ok: 0, message: 'AI 생성 중 오류가 발생했습니다.' };
  }
}
