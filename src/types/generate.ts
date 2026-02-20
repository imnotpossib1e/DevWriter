export interface PromptType {
  topic: string;
  keywords: string[];
  description: string;
  template: string;
  length: string;
  tone: string;
}

export interface PostType {
  title: string;
  content: string;
  hashtags: string[];
  metaDescription: string;
}
