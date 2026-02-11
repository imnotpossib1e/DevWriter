export interface PromptType {
  content: string;
  topic: string;
  keywords: string;
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
// interface GeneratedContent {
//   title: string;
//   content: string;
//   hashtags: string[];
//   metaDescription: string;
// }
