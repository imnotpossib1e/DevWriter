import { PostType, PromptType } from '@/types/generate';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HistoryItem {
  id: string;
  post: PostType;
  prompt: PromptType;
  createdAt: number;
}

interface HistoryStore {
  history: HistoryItem[];
  addHistory: (post: PostType, prompt: PromptType) => void;
  removeHistory: (id: string) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      history: [],

      addHistory: (post, prompt) =>
        set(state => {
          const newItem: HistoryItem = {
            id: Date.now().toString(),
            post,
            prompt,
            createdAt: Date.now(),
          };

          // 중복 저장 방지
          const exists = state.history.some(item => item.id === newItem.id);
          if (exists) return state;

          return {
            // 최대 10개 저장
            history: [newItem, ...state.history].slice(0, 10),
          };
        }),

      removeHistory: id =>
        set(state => ({
          history: state.history.filter(item => item.id !== id),
        })),

      clearHistory: () => set({ history: [] }),
    }),

    {
      name: 'post-history',
      partialize: state => ({ history: state.history.slice(0, 10) }),
    },
  ),
);
