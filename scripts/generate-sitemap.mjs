import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = process.env.SITE_URL || "https://www.teknamin.com";
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function tagToSlug(tag) {
  return tag.trim().toLowerCase().replace(/\s+/g, "-");
}

function getPosts() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data } = matter(raw);
    return {
      slug,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : []
    };
  });
}

const staticPages = [
  "/",
  "/about/",
  "/hnir/",
  "/archive/",
  "/blog/"
];

const posts = getPosts();
const postUrls = posts.map((p) => `/blog/${p.slug}/`);

const tagSet = new Set();
posts.forEach((p) => p.tags.forEach((t) => tagSet.add(tagToSlug(t))));
const tagUrls = Array.from(tagSet).map((t) => `/tags/${t}/`);

const allPaths = [...staticPages, ...postUrls, ...tagUrls];

const now = new Date().toISOString();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths
  .map(
    (p) => `  <url>
    <loc>${SITE_URL}${p}</loc>
    <lastmod>${now}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), xml);
console.log(`Generated public/sitemap.xml with ${allPaths.length} URLs and SITE_URL=${SITE_URL}`);
