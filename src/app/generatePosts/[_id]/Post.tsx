'use client';

import MarkdownContent from '@/app/generatePosts/[_id]/MarkDownContent';
import Button from '@/components/Button';
import Tag from '@/components/Tag';

import { useHistoryStore } from '@/zustand/useHistoryStore';
import MDEditor, { fullscreen } from '@uiw/react-md-editor';
import { Download, PencilLine, PencilOff } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PostContent({ postId }: { postId: string }) {
  const history = useHistoryStore(state =>
    state.history.find(item => item.id === postId),
  );

  const updateHistoryPost = useHistoryStore(state => state.updateHistoryPost);
  const [editContent, setEditContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (history?.post.content) {
      setEditContent(history.post.content);
    }
  }, [history]);

  const handleUpdate = () => {
    if (history && editContent) {
      const updatePost = { ...history.post, content: editContent };
      updateHistoryPost(history.id, updatePost);
      setIsEditing(false);
    }
  };

  if (!history) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      {/* <div className="flex gap-4">
        <Button
          size="sm"
          variant="white"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <PencilOff /> : <PencilLine />}
        </Button>
        {isEditing && (
          <Button size="sm" onClick={handleUpdate}>
            <Download />
          </Button>
        )}
      </div> */}
      <div className="flex flex-col gap-5 bg-white/10 border border-white/50 rounded-lg p-10">
        <div className="flex justify-between gap-3 items-start">
          {history?.post.title && (
            <h1 className="font-bold text-3xl">{history?.post.title}</h1>
          )}
          <div className="flex gap-4">
            <Button
              size="sm"
              variant="white"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <PencilOff /> : <PencilLine />}
            </Button>
            {isEditing && (
              <Button size="sm" onClick={handleUpdate}>
                <Download />
              </Button>
            )}
          </div>
        </div>
        <hr className="text-white/20 border" />
        {isEditing ? (
          <div className="h-250">
            <MDEditor
              value={editContent}
              onChange={value => value && setEditContent(value)}
              highlightEnable={false}
              height="100%"
              // autoFocus={false}
              hideToolbar
              // minHeight={1000}
            />
          </div>
        ) : (
          <MarkdownContent content={history?.post.content} />
        )}
        {/* {history?.post.content && (
          <MarkdownContent content={history?.post.content} />
        )} */}
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
    </div>
  );
}
