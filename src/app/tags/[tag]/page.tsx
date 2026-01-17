import { getAllPosts } from "@/lib/content";

function tagToSlug(tag: string) {
  return tag.trim().toLowerCase().replace(/\s+/g, "-");
}

export function generateStaticParams() {
  const posts = getAllPosts();

  const slugs = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => slugs.add(tagToSlug(t))));

  // IMPORTANT: return slugs, not raw tags
  return Array.from(slugs).map((tag) => ({ tag }));
}

export default async function TagPage({
  params
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params; // ✅ await params

  const posts = getAllPosts().filter((p) =>
    p.tags.some((t) => tagToSlug(t) === tag)
  );

  // For display, recover the "pretty" tag if possible
  const displayTag =
    posts.flatMap((p) => p.tags).find((t) => tagToSlug(t) === tag) ?? tag;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <a className="underline underline-offset-4 opacity-80" href="/blog/">
        ← Back to Writing
      </a>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight">#{displayTag}</h1>

      <div className="mt-10 space-y-8">
        {posts.map((p) => (
          <article key={p.slug}>
            <a
              className="text-lg font-semibold underline underline-offset-4"
              href={`/blog/${p.slug}/`}
            >
              {p.title}
            </a>
            <div className="mt-1 text-sm opacity-70">{p.date}</div>
            <p className="mt-2 opacity-90">{p.summary}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
