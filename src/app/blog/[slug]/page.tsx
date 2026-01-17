import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";

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
      <a className="underline underline-offset-4 opacity-80" href="/blog/">
        ← Back to Writing
      </a>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight">{post.title}</h1>
      <div className="mt-2 text-sm opacity-70">{post.date}</div>

      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <a
            key={t}
            className="text-xs underline underline-offset-4 opacity-80"
            href={`/tags/${tagToSlug(t)}/`}
          >
            #{t}
          </a>
        ))}
      </div>

      <article className="prose prose-invert mt-10 max-w-none">
      <MDXRemote source={post.content} />
      </article>
    </main>
  );
}
