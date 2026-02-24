'use client';

import EmptyPost from '@/app/generatePosts/EmptyPost';
import Button from '@/components/Button';
import Tag from '@/components/Tag';
import { useHistoryStore } from '@/zustand/useHistoryStore';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function GeneratePostList() {
  const { history, removeHistory } = useHistoryStore();

  if (history.length === 0) {
    return <EmptyPost />;
  }

  return (
    <div className="grid md:grid-cols-2 gird-cols-1 gap-7">
      {history.map(item => (
        <div
          key={item.id}
          className="flex flex-col gap-3 justify-between bg-white/10 border border-white/50 md:p-7 p-5 rounded-lg"
        >
          <div className="flex flex-col">
            <div className="flex md:gap-5 gap-3">
              <Link href={`/generatePosts/${item.id}`} className="w-full">
                <h3 className="font-bold lg:text-lg text-base">
                  {item.post.title}
                </h3>
              </Link>
              <Tag template={item.prompt.template}>
                {item.prompt.template === 'tutorial'
                  ? '튜토리얼'
                  : item.prompt.template === 'til'
                    ? 'TIL'
                    : '트러블슈팅'}
              </Tag>
            </div>
            <p className="flex md:gap-3 gap-2">
              <span className="text-sm text-gray-500">
                {new Date(item.createdAt).toLocaleDateString('ko-KR')}
              </span>
              <span className="text-sm text-gray-500">
                {item.post.content.length} words
              </span>
            </p>
          </div>
          <div className="flex gap-2 mt-2 items-center">
            <span className="w-full md:text-base text-sm text-white/90">
              {item.prompt.topic}
            </span>
            <button
              onClick={() => removeHistory(item.id)}
              className="text-white/60 hover:cursor-pointer"
            >
              <Trash2 className="hover:text-white w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
