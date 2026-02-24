'use client';

import MarkdownContent from '@/app/generatePosts/[_id]/MarkDownContent';
import Button from '@/components/Button';
import LinkButton from '@/components/LinkButton';
import Tag from '@/components/Tag';

import { useHistoryStore } from '@/zustand/useHistoryStore';
import MDEditor from '@uiw/react-md-editor';
import {
  Calendar,
  Copy,
  Dot,
  Download,
  FileText,
  PencilLine,
  PencilOff,
  Save,
  TextSelect,
} from 'lucide-react';
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

  const handleCopy = async (post: string) => {
    try {
      await navigator.clipboard.writeText(post);
      alert('복사되었습니다.');
    } catch (error) {
      console.error('복사에 실패했습니다.', error);
      alert('복사에 실패했습니다');
    }
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
    return (
      <div className="h-full flex flex-col justify-center items-center gap-6 my-auto ">
        <TextSelect className="w-30 h-30" strokeWidth={2} />
        <span className="flex flex-col items-center text-xl font-semibold text-center">
          해당 포스트를 찾을 수 없습니다
        </span>
        <LinkButton href="/generatePosts" size="lg">
          목록으로 돌아가기
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex md:flex-row flex-col justify-between md:items-end gap-4">
        <div className="flex flex-col gap-3 items-start">
          <p className="text-2xl font-bold">{history.prompt.topic}</p>
          <div className="flex w-full md:gap-6 md:items-end justify-between">
            <div className="flex md:gap-1 items-center gap-0 md:text-base text-sm font-light text-white/60">
              <span className="flex gap-2">
                <Calendar className="md:w-5 md:h-5 w-4 h-4" />
                {new Date(history.createdAt).toLocaleDateString('ko-KR')}
              </span>
              <Dot />
              <span className="flex gap-2">
                <FileText className="md:w-5 md:h-5 w-4 h-4" />
                {history.post.content.length} words
              </span>
            </div>
            <div className="flex md:gap-4 gap-2">
              <Tag template={history.prompt.template}>
                {history.prompt.template === 'tutorial'
                  ? '튜토리얼'
                  : history.prompt.template === 'til'
                    ? 'TIL'
                    : '트러블슈팅'}
              </Tag>
              <Tag>
                {history.prompt.tone === 'friendly'
                  ? '친근한'
                  : history.prompt.tone === 'professional'
                    ? '전문적'
                    : '캐주얼'}
              </Tag>
            </div>
          </div>
        </div>
        <div>
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
                <Download className="md:w-5 md:h-5 w-4 h-4" />
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
                <Download className="md:w-5 md:h-5 w-4 h-4" />
                HTML
              </Button>
              <Button
                size="sm2"
                onClick={() => handleCopy(history.post.content)}
              >
                <Copy className="md:w-5 md:h-5 w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full md:gap-6 gap-4 bg-white/10 border border-white/50 rounded-lg md:p-10 p-5">
        <div className="flex md:flex-row flex-col w-full md:justify-between md:gap-8 gap-4 md:items-start items-end">
          {history?.post.title && (
            <h1 className="font-bold text-2xl">{history?.post.title}</h1>
          )}
          <div className="flex gap-4">
            <Button
              size="xs"
              variant="white"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <span className="flex gap-2 items-center text-sm">
                  <PencilOff className="w-4 h-4" />
                  Cancel
                </span>
              ) : (
                <span className="flex gap-2 items-center text-sm">
                  <PencilLine className="w-4 h-4" />
                  Edit
                </span>
              )}
            </Button>
            {isEditing && (
              <Button size="xs" onClick={handleUpdate}>
                <span className="flex gap-2 items-center text-sm">
                  <Save className="w-4 h-4" />
                  Save
                </span>
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
              hideToolbar
              preview="edit"
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
