import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Feed } from "feed";

const SITE_URL = process.env.SITE_URL || "https://www.teknamin.com";
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function getPosts() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ""),
        summary: String(data.summary ?? "")
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

const feed = new Feed({
  title: "Teknamin Labs",
  description: "Writing and research notes from Teknamin Labs.",
  id: SITE_URL,
  link: SITE_URL,
  language: "en",
  favicon: `${SITE_URL}/favicon.ico`,
  copyright: `© ${new Date().getFullYear()} Teknamin Labs`,
  updated: new Date()
});

for (const p of getPosts()) {
  feed.addItem({
    title: p.title,
    id: `${SITE_URL}/blog/${p.slug}/`,
    link: `${SITE_URL}/blog/${p.slug}/`,
    date: new Date(p.date),
    description: p.summary
  });
}

fs.writeFileSync(path.join(process.cwd(), "public", "rss.xml"), feed.rss2());
console.log(`Generated public/rss.xml with SITE_URL=${SITE_URL}`);