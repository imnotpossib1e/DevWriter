'use client';

import MarkdownContent from '@/app/generatePosts/[_id]/MarkDownContent';
import Tag from '@/components/Tag';

import { useHistoryStore } from '@/zustand/useHistoryStore';

export default function PostContent({ postId }: { postId: string }) {
  const history = useHistoryStore(state =>
    state.history.find(item => item.id === postId),
  );

  return (
    <div className="flex flex-col gap-5 bg-white/10 border border-white/50 rounded-lg p-10">
      {history?.post.title && (
        <h1 className="font-bold text-3xl">{history?.post.title}</h1>
      )}
      <hr className="text-white/20 border" />
      {history?.post.content && (
        <MarkdownContent content={history?.post.content} />
      )}
      <hr className="text-white/20 border" />
      <div className="flex gap-3">
        {history?.post.hashtags &&
          history.post.hashtags.map(tag => (
            <Tag varient="purple" key={tag}>
              {tag}
            </Tag>
          ))}
      </div>
    </div>
  );
}
