'use client';

import Button from '@/components/Button';
import Tag from '@/components/Tag';
import { useHistoryStore } from '@/zustand/useHistoryStore';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function GeneratePostList() {
  const { history, removeHistory } = useHistoryStore();

  if (history.length === 0) {
    return <div>저장된 포스트가 없습니다.</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-7">
      {history.map(item => (
        <div
          key={item.id}
          className="flex flex-col justify-between bg-white/10 border border-white/50 p-7 rounded-lg"
        >
          <div className="flex flex-col gap-1">
            <div className="flex gap-5">
              <Link href={`/generatePosts/${item.id}`} className="w-full">
                <h3 className="font-bold">{item.post.title}</h3>
              </Link>
              <Tag template={item.prompt.template}>
                {item.prompt.template === 'tutorial'
                  ? '튜토리얼'
                  : item.prompt.template === 'til'
                    ? 'TIL'
                    : '트러블슈팅'}
              </Tag>
            </div>
            <p className="text-sm text-gray-500">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2 mt-2 items-center">
            <span className="w-full text-sm text-white/90">
              {item.prompt.topic}
            </span>
            <button
              onClick={() => removeHistory(item.id)}
              className="text-white/70 hover:cursor-pointer"
            >
              <Trash2 />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
