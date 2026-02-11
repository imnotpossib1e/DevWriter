'use client';

import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';

interface MarkdownViewerProps {
  content: string;
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);
  return (
    <div className="prose prose-lg max-w-none prose-p:mb-4 prose-headings:mb-2 text-sm">
      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p className="mb-6 leading-relaxed">{children}</p>
          ),
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <pre className={`language-${match[1]}`}>
                <code className={`language-${match[1]}`} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
