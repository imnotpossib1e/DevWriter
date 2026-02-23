export interface PromptType {
  topic: string;
  keywords: string[];
  description: string;
  template: string;
  length: string;
  tone: string;
}

export interface PostType {
  id: string;
  createdAt: number;
  title: string;
  content: string;
  hashtags: string[];
  metaDescription: string;
}
