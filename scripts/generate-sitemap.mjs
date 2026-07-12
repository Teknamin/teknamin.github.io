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
      date: data.date,
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

// Build tag date map
const tagDateMap = new Map();
posts.forEach(post => {
  post.tags.forEach(tag => {
    const slug = tagToSlug(tag);
    if (!tagDateMap.has(slug)) {
      tagDateMap.set(slug, []);
    }
    tagDateMap.get(slug).push(post.date);
  });
});

function formatDateForLastmod(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) {
    throw new Error(`Invalid date string: ${dateStr}`);
  }
  return d.toISOString();
}

function getNewestDate(dates) {
  return dates.reduce((max, current) => {
    const maxDate = new Date(max);
    const currentDate = new Date(current);
    return currentDate > maxDate ? current : max;
  });
}

const xmlEntries = allPaths.map(p => {
  let loc = `${SITE_URL}${p}`;
  let lastmod;

  // Static pages
  if (staticPages.includes(p)) {
    return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
  }

  // Blog post URLs
  if (p.startsWith('/blog/')) {
    const slug = p.replace(/^\/blog\//, '').replace(/\/$/, '');
    const post = posts.find(p => p.slug === slug);
    if (!post) {
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
    }
    lastmod = formatDateForLastmod(post.date);
  }

  // Tag URLs
  else if (p.startsWith('/tags/')) {
    const tagSlug = p.replace(/^\/tags\//, '').replace(/\/$/, '');
    const dates = tagDateMap.get(tagSlug);
    if (!dates || dates.length === 0) {
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
    }
    const newestDate = getNewestDate(dates);
    lastmod = formatDateForLastmod(newestDate);
  }

  return `  <url>\n    <loc>${loc}</loc>\n    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}\n  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries.join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), xml);
console.log(`Generated public/sitemap.xml with ${allPaths.length} URLs and SITE_URL=${SITE_URL}`);
