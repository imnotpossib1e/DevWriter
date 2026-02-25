import PostContent from '@/app/generatePosts/[_id]/Post';
import Post from '@/app/generatePosts/[_id]/Post';
import { Metadata } from 'next';

interface GeneratePostProps {
  params: Promise<{
    _id: string;
  }>;
}

export async function generateMetadata({
  params,
}: GeneratePostProps): Promise<Metadata> {
  const { _id } = await params;
  return {
    title: `생성 포스트 - DevWriterAI`,
    description: `내가 생성한 기술 블로그`,
    openGraph: {
      title: `생성 포스트 - DevWriterAI`,
      description: `내가 생성한 기술 블로그`,
      url: `/generatePosts/${_id}`,
      images: {
        url: 'https://devwriterai.vercel.app/DevWriterAI.png',
      },
    },
  };
}

export default async function GeneratePost({ params }: GeneratePostProps) {
  const _id = (await params)._id;
  return (
    <main className="flex-1 flex flex-col">
      <PostContent postId={_id} />
    </main>
  );
}
