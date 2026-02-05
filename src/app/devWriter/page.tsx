// app/page.tsx (메인페이지)
'use client';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [blog, setBlog] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    // 메인페이지에서 API Route 호출
    const res = await fetch('/api/ai-writer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }), // 프롬프트 전달
    });

    const data = await res.json();
    setBlog(data.content);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">AI 블로그 생성기</h1>

      {/* 프롬프트 입력 */}
      <textarea
        placeholder="블로그 주제 입력 (예: Zustand 상태 관리)"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        className="w-full p-4 border rounded-lg mb-4 h-32"
      />

      <button
        onClick={handleGenerate}
        disabled={loading || !prompt}
        className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600"
      >
        {loading ? '생성중...' : '블로그 생성'}
      </button>

      {/* 결과 표시 */}
      {blog && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">📝 생성된 글</h2>
          <div className="prose max-w-none">{blog}</div>
        </div>
      )}
    </div>
  );
}
