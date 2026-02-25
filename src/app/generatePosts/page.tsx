import GeneratePostList from '@/app/generatePosts/GeneratePostList';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `생성 히스토리 - DevWriterAI`,
    description: `내가 생성한 기술 블로그 목록`,
    openGraph: {
      title: `생성 히스토리 - DevWriterAI`,
      description: `내가 생성한 기술 블로그 목록`,
      url: `/generatePosts`,
      images: {
        url: 'https://devwriterai.vercel.app/DevWriterAI.png',
      },
    },
  };
}

export default function GeneratePosts() {
  return (
    <main className="h-full flex-1 flex flex-col">
      <GeneratePostList />
    </main>
  );
}
