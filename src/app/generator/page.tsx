import GenerateForm from '@/app/generator/GenerateForm';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `AI 기술 블로그 생성 - DevWriterAI`,
    description: `개발자를 위한 AI 기술 블로그 생성 플랫폼`,
    openGraph: {
      title: `AI 기술 블로그 생성 - DevWriterAI`,
      description: `주제를 입력하여 개발 블로그를 생성하세요.`,
      url: `/generator`,
      images: {
        url: '',
      },
    },
  };
}

export default function Generator() {
  return (
    <main className="h-full flex-1 flex flex-col">
      <GenerateForm />
    </main>
  );
}
