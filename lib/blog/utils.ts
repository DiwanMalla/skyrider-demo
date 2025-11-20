import { BlogSubmission } from "./types";

export function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function createExcerpt(content: string, length = 240): string {
  const clean = content.replace(/\s+/g, " ").trim();
  if (clean.length <= length) return clean;
  return `${clean.slice(0, length).trim()}…`;
}

export function sortSubmissions(
  submissions: BlogSubmission[]
): BlogSubmission[] {
  return [...submissions].sort((a, b) => {
    const dateA = new Date(a.submittedAt).getTime();
    const dateB = new Date(b.submittedAt).getTime();
    return dateB - dateA;
  });
}
