import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Feed } from "feed";

const siteUrl = "https://www.teknamin.com";
const blogDir = path.join(process.cwd(), "content", "blog");

function getPosts() {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title,
      date: data.date,
      summary: data.summary
    };
  }).sort((a,b) => (a.date < b.date ? 1 : -1));
}

const feed = new Feed({
  title: "Teknamin Labs",
  description: "Writing and research notes from Teknamin Labs.",
  id: siteUrl,
  link: siteUrl,
  language: "en",
  favicon: `${siteUrl}/favicon.ico`,
  copyright: `© ${new Date().getFullYear()} Teknamin Labs`,
  updated: new Date()
});

for (const p of getPosts()) {
  feed.addItem({
    title: p.title,
    id: `${siteUrl}/blog/${p.slug}/`,
    link: `${siteUrl}/blog/${p.slug}/`,
    date: new Date(p.date),
    description: p.summary
  });
}

fs.writeFileSync(path.join(process.cwd(), "public", "rss.xml"), feed.rss2());
console.log("Generated public/rss.xml");