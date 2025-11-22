export type SubmissionStatus = "pending" | "accepted" | "rejected";

export interface BlogSubmission {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  authorName: string;
  authorRole?: string;
  authorEmail?: string;
  readTime: string;
  image?: string;
  status: SubmissionStatus;
  submittedAt: string;
}

export interface BlogPostMeta {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  image?: string;
  date: string;
  readTime: string;
  views: number;
  likes: number;
  status: "published" | "draft";
}
