import PostContent from '@/app/generatePosts/[_id]/Post';
import Post from '@/app/generatePosts/[_id]/Post';

interface GeneratePostProps {
  params: Promise<{
    _id: string;
  }>;
}

export default async function GeneratePost({ params }: GeneratePostProps) {
  const _id = (await params)._id;
  return (
    <main className="min-h-screen flex-1 flex flex-col">
      <PostContent postId={_id} />
    </main>
  );
}
