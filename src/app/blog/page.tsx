import { getAllPosts } from "@/lib/content";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Writing</h1>
      <p className="mt-4 opacity-90">
        Research notes and essays from Teknamin Labs.
      </p>

      <div className="mt-10 space-y-8">
        {posts.map((p) => (
          <article key={p.slug}>
            <a className="text-lg font-semibold underline underline-offset-4" href={`/blog/${p.slug}/`}>
              {p.title}
            </a>
            <div className="mt-1 text-sm opacity-70">{p.date}</div>
            <p className="mt-2 opacity-90">{p.summary}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.tags.map((t) => {
                const slug = t.trim().toLowerCase().replace(/\s+/g, "-");
                return (
                  <a
                    key={t}
                    className="text-xs underline underline-offset-4 opacity-80"
                    href={`/tags/${slug}/`}
                  >
                    #{t}
                  </a>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
