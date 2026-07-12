import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `/blog/${post.slug}/`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.summary
    }
  };
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

// We'll define tagToSlug in a shared utility in Fix B
function tagToSlug(tag: string) {
  return tag.trim().toLowerCase().replace(/\s+/g, "-");
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ await params
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link className="site-link-muted underline underline-offset-4" href="/blog/">
        ← Back to Writing
      </Link>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight">{post.title}</h1>
      <div className="site-meta mt-2 text-sm">{post.date}</div>

      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <Link
            key={t}
            className="site-link-muted text-xs underline underline-offset-4"
            href={`/tags/${tagToSlug(t)}/`}
          >
            #{t}
          </Link>
        ))}
      </div>

      <article className="blog-prose prose prose-neutral mt-10 max-w-none dark:prose-invert">
        <MDXRemote source={post.content} />
      </article>
    </main>
  );
}
