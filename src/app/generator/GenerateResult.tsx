'use client';

import MarkdownViewer from '@/app/generator/MarkdownViewer';
import Button from '@/components/Button';
import Tag from '@/components/Tag';
import { PostType, PromptType } from '@/types/generate';
import { useHistoryStore } from '@/zustand/useHistoryStore';
import { CircleCheckBig, Copy, Download, Save, Sparkles } from 'lucide-react';
import { marked } from 'marked';
import { useState } from 'react';

interface Props {
  post: PostType;
  prompt: PromptType;
  onRegenerate: () => void;
}

export default function GenerateResult({ post, prompt, onRegenerate }: Props) {
  const addHistory = useHistoryStore(state => state.addHistory);

  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    const exists = useHistoryStore
      .getState()
      .history.some(item => item.id === post.id);

    if (exists) {
      alert('이미 저장된 포스트입니다.');
      return;
    }

    try {
      addHistory(post, prompt);
      alert('저장되었습니다.');
    } catch (error) {
      console.error('저장에 실패했습니다.', error);
      alert('저장에 실패했습니다.');
    }
  };

  const markdownContent = `
      title: ${post.title || '제목 없음'}
      ${post.hashtags?.join(' ') || ''}
      meta: ${post.metaDescription || ''}
  
      ${post.content || ''}`;

  const downloadMarkdown = (markdown: string, filename: string) => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    downloadFile(blob, filename);
  };

  const downloadHTML = (post: PostType, filename: string) => {
    marked.setOptions({ breaks: true });
    const metaHTML = `
        <div style="background:#f0f8ff; padding:20px; margin-bottom:30px; border-left:4px solid #007acc;">
          <h2 style="margin:0 0 10px 0; color:#007acc;">${post?.title}</h2>
          <p><strong>해시태그:</strong> ${post?.hashtags?.join(' ')}</p>
          <p><strong>설명:</strong> ${post?.metaDescription}</p>
        </div>
      `;
    const html = metaHTML + marked.parse(post.content);
    const fullHTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${post.title}</title><style>body{font-family:system-ui,sans-serif;max-width:800px;margin:40px auto;padding:20px;line-height:1.7;}</style></head><body>${html}</body></html>`;
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

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex flex-col md:gap-4 gap-2 bg-(--green-10) border border-(--green-50) rounded-lg md:py-3 md:px-4 py-2 px-3">
          <div className="flex items-center gap-2.5">
            <CircleCheckBig className="text-(--text-green)" />
            <div className="flex flex-col ">
              <span className="text-(--text-light-green) font-bold">
                Post Generated Successfully!
              </span>
              <span className="text-[#509262] font-semibold text-sm">
                Review your content below and save
              </span>
            </div>
          </div>
          <hr className="text-(--green-20) border" />
          <div className="flex flex-col md:gap-2 gap-1.5 px-3">
            <div className="flex gap-1.5 items-center">
              <span>{prompt.topic}</span>
            </div>
            <div className="flex flex-row gap-3">
              <Tag varient="green">
                {prompt.template === 'tutorial'
                  ? '튜토리얼'
                  : prompt.template === 'til'
                    ? 'TIL'
                    : '트러블슈팅'}
              </Tag>
              <Tag varient="green">
                {prompt.length === 'short'
                  ? '짧게 (~800자)'
                  : prompt.length === 'normal'
                    ? '보통 (~1200자)'
                    : '길게 (~2000자)'}
              </Tag>
              <Tag varient="green">
                {prompt.tone === 'friendly'
                  ? '친근한'
                  : prompt.tone === 'professional'
                    ? '전문적'
                    : '캐주얼'}
              </Tag>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-between">
        <div className="flex gap-4">
          <Button
            size="base"
            onClick={() =>
              downloadMarkdown(markdownContent, `${post.title}.md`)
            }
          >
            <Download className="md:w-5 md:h-5 w-4 h-4" />
            Markdown
          </Button>
          <Button
            size="base"
            onClick={() => downloadHTML(post || '', `${post.title}.html`)}
          >
            <Download className="md:w-5 md:h-5 w-4 h-4" />
            HTML
          </Button>
        </div>
        <Button size="sm2" onClick={() => handleCopy(markdownContent)}>
          <Copy className="md:w-5 md:h-5 w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-col md:gap-6 gap-4 bg-(--text-10) border border-(--text-50) rounded-lg md:p-10 p-5">
        {post.title && <h1 className="font-bold text-2xl">{post.title}</h1>}
        <hr className="text-(--text-20) border" />
        {post.content && <MarkdownViewer content={post.content} />}
        <hr className="text-(--text-20) border" />
        <div className="flex flex-wrap gap-3">
          {post.hashtags &&
            post.hashtags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>
      </div>
      <div className="flex gap-5">
        <Button onClick={handleSave}>
          <Save className="md:w-5 md:h-5 w-4 h-4" />
          Save Post
        </Button>
        <Button onClick={onRegenerate} variant="white" size="lg">
          <Sparkles className="md:w-5 md:h-5 w-4 h-4" />
          Regenerate
        </Button>
      </div>
    </div>
  );
}
