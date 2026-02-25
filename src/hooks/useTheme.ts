'use client';

import { useEffect, useState } from 'react';

export function useTheme() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    setMounted(true);

    // localStorage에서 테마 불러오기
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) {
      document.documentElement.dataset.theme = savedTheme;
    } else {
      // 기본값: 다크모드
      document.documentElement.dataset.theme = 'dark';
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.dataset.theme;

    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    setTheme(newTheme);
    html.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  return { toggleTheme, mounted, theme };
}
