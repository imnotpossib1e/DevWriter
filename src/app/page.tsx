import LinkButton from '@/components/LinkButton';
import { NotebookText, PencilLine, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center gap-11 l pb-20 md:pt-44 pt-20">
      <h2 className="text-center md:text-6xl md:font-extrabold text-3xl font-extrabold">
        <span>Generate Tech Blogs</span>
        <br />
        <span className="text-purple">In Seconds</span>
      </h2>
      <h3 className="text-white/80 font-medium text-sm md:text-base flex flex-col md:flex-row gap-0 md:gap-1 items-center">
        <span>주제만 입력하세요,</span>
        <span>AI가 개발자용 기술 블로그 글을 완성합니다.</span>
      </h3>
      <div className="flex flex-col md:flex-row gap-3">
        <LinkButton href="/generator" size="lg">
          <Sparkles className="md:w-5 md:h-5 w-4 h-4" />
          Start Generating
        </LinkButton>
        <LinkButton href="/generatePosts" variant="white" size="lg">
          <NotebookText className="md:w-5 md:h-5 w-4 h-4" />
          View Posts
        </LinkButton>
      </div>
    </main>
  );
}
