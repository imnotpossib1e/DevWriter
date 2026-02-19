'use client';

import MarkdownContent from '@/app/generatePosts/[_id]/MarkDownContent';
import Button from '@/components/Button';
import Tag from '@/components/Tag';

import { useHistoryStore } from '@/zustand/useHistoryStore';
import MDEditor from '@uiw/react-md-editor';
import { Copy, Download, PencilLine, PencilOff, Save } from 'lucide-react';
import { marked } from 'marked';
import { useEffect, useState } from 'react';

export default function PostContent({ postId }: { postId: string }) {
  const history = useHistoryStore(state =>
    state.history.find(item => item.id === postId),
  );

  const [loading, setLoading] = useState(false);

  const downloadMarkdown = (markdown: string, filename: string) => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    downloadFile(blob, filename);
  };

  const downloadHTML = (markdown: string, filename: string) => {
    marked.setOptions({ breaks: true });
    const html = marked.parse(markdown);
    const fullHTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>포스트</title><style>body{font-family:system-ui,sans-serif;max-width:800px;margin:40px auto;padding:20px;line-height:1.7;}</style></head><body>${html}</body></html>`;
    const blob = new Blob([fullHTML], { type: 'text/html;charset=utf-8' });
    downloadFile(blob, filename);
  };

  const downloadFile = async (blob: Blob, filename: string) => {
    setLoading(true);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setLoading(false);
  };

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
    <div className="flex flex-col gap-6">
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
      {!isEditing && (
        <div className="flex gap-4 justify-end">
          <Button
            size="base"
            onClick={() =>
              downloadMarkdown(
                history.post.content || '',
                `${history.post.title}.md`,
              )
            }
          >
            <Download className="w-5 h-5" />
            Markdown
          </Button>
          <Button
            size="base"
            onClick={() =>
              downloadHTML(
                history.post.content || '',
                `${history.post.title}.html`,
              )
            }
          >
            <Download className="w-5 h-5" />
            HTML
          </Button>
          <Button
            size="base"
            onClick={() =>
              downloadHTML(
                history.post.content || '',
                `${history.post.title}.html`,
              )
            }
          >
            <Copy className="w-5 h-5" />
          </Button>
        </div>
      )}
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
              {isEditing ? (
                <PencilOff className="w-5 h-5" />
              ) : (
                <PencilLine className="w-5 h-5" />
              )}
            </Button>
            {isEditing && (
              <Button size="sm" onClick={handleUpdate}>
                <Save className="w-5 h-5" />
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
