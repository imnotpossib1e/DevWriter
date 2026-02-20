import LinkButton from '@/components/LinkButton';
import { PencilLine } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center gap-11 l pb-20 pt-44">
      <h2 className="text-center text-6xl font-extrabold">
        <span>Generate Tech Blogs</span>
        <br />
        <span className="text-purple">In Seconds</span>
      </h2>
      <h3 className="text-white/80 font-medium">
        주제만 입력하세요, AI가 개발자용 기술 블로그 글을 완성합니다.
      </h3>
      <div className="flex flex-wrap gap-3">
        <LinkButton href="/generator" size="lg">
          Start Generating
          <PencilLine className="w-5" />
        </LinkButton>
        <LinkButton href="/generatePosts" variant="white" size="lg">
          View Posts
        </LinkButton>
      </div>
    </main>
  );
}
