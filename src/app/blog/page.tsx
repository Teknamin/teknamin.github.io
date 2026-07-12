export const metadata = {
  title: { absolute: "Writing | Teknamin Labs" },
  description:
    "Research notes from Teknamin Labs on AI control planes, distributed systems, evaluation, and software architecture.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: "Writing | Teknamin Labs",
    description:
      "Research notes from Teknamin Labs on AI control planes, distributed systems, evaluation, and software architecture.",
    url: "/blog/",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Writing | Teknamin Labs",
    description:
      "Research notes from Teknamin Labs on AI control planes, distributed systems, evaluation, and software architecture.",
  },
};

import { getAllPosts } from "@/lib/content";
import Link from "next/link";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Writing</h1>
      <p className="mt-4 site-soft">
        Research notes and essays from Teknamin Labs.
      </p>

      <div className="mt-10 space-y-8">
        {posts.map((p) => (
          <article key={p.slug}>
            <Link
              className="site-link-muted text-lg font-semibold underline underline-offset-4"
              href={`/blog/${p.slug}/`}
            >
              {p.title}
            </Link>
            <div className="site-meta mt-1 text-sm">{p.date}</div>
            <p className="mt-2 site-soft">{p.summary}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.tags.map((t) => {
                const slug = t.trim().toLowerCase().replace(/\s+/g, "-");
                return (
                  <Link
                    key={t}
                    className="site-link-muted text-xs underline underline-offset-4"
                    href={`/tags/${slug}/`}
                  >
                    #{t}
                  </Link>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
