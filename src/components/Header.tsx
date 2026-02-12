'use client';

import LinkButton from '@/components/LinkButton';
import { CodeXml, Link2, NotebookText, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// import './layout.css'; // nav 메뉴 해당 경로에서 active 시키는 css. header/footer 에서만 사용

export default function Header() {
  // 주소창의 path 값 추출
  const pathname = usePathname();
  const isActive = (path: string) =>
    pathname.startsWith(path) ? 'nav-active' : '';

  return (
    <header className="flex flex-wrap justify-between items-center w-full bg-bg-dark-blue z-20 px-5.5 h-16 sticky top-0">
      <h1>
        <Link
          href="/"
          target="_self"
          title="홈 바로 가기"
          className="flex flex-wrap gap-2.5 font-extrabold text-2xl"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="36" height="36" rx="10" fill="#873FE3" />
            <path
              d="M23.5 21.6666L27.1667 17.9999L23.5 14.3333"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.5 14.3333L8.83337 17.9999L12.5 21.6666"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.2917 10.6667L15.7084 25.3334"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="flex flex-wrap items-center">
            <span>DevWriter</span>
            <span className="text-purple">AI</span>
          </span>
        </Link>
      </h1>
      <nav>
        <ul className="flex gap-5.5">
          <li>
            <LinkButton href="/" target="_self" title="DevWriterAI 페이지 이동">
              <CodeXml className="w-5" />
              Home
            </LinkButton>
          </li>
          <li>
            <LinkButton
              href="/"
              target="_self"
              title="DevWriterAI 생성 페이지 이동"
            >
              <Sparkles className="w-5" />
              Generate
            </LinkButton>
          </li>
          <li>
            <LinkButton
              href="/"
              target="_self"
              title="DevWriterAI 포스트 목록 이동"
            >
              <NotebookText className="w-5" />
              Posts
            </LinkButton>
          </li>
        </ul>
      </nav>
    </header>
  );
}
