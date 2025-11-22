import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { loadSubmissions } from "@/lib/blog/actions";
import { sortSubmissions } from "@/lib/blog/utils";
import BlogContent from "@/components/blog/BlogContent";
import { Loader2 } from "lucide-react";

export const revalidate = 30; // Revalidate every 30 seconds

async function getPublishedPosts() {
  const submissions = await loadSubmissions();
  const sorted = sortSubmissions(submissions);
  return sorted.filter((submission) => submission.status === "accepted");
}

export default async function BlogPage() {
  const publishedPosts = await getPublishedPosts();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-blue-500/30">
      <Navbar />

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          </div>
        }
      >
        <BlogContent initialPosts={publishedPosts} />
      </Suspense>
    </div>
  );
}
