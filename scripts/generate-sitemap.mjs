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
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      date: new Date(data.date)
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

// Build tag-to-latest-date mapping
const tagLastModMap = {};
tagSet.forEach((tag) => {
  const postsWithTag = posts.filter((post) =>
    post.tags.includes(tag)
  );
  let latestDate = new Date(0);
  postsWithTag.forEach((post) => {
    if (post.date > latestDate) {
      latestDate = post.date;
    }
  });
  tagLastModMap[tag] = latestDate;
});

// Generate XML entries dynamically
const urlEntries = [];

// Static pages omit <lastmod>
staticPages.forEach((p) => {
  urlEntries.push({
    loc: `${SITE_URL}${p}`,
    lastmod: undefined
  });
});

// Blog posts use frontmatter date
postUrls.forEach((url) => {
  const slug = url.replace("/blog/", "").replace("/", "");
  const post = posts.find((p) => `/blog/${p.slug}/` === url);
  urlEntries.push({
    loc: `${SITE_URL}${url}`,
    lastmod: post.date
  });
});

// Tag pages use newest post date among tag members
tagUrls.forEach((url) => {
  const tag = url.replace("/tags/", "").replace("/", "");
  const latestDate = tagLastModMap[tag];
  urlEntries.push({
    loc: `${SITE_URL}${url}`,
    lastmod: latestDate
  });
});

// Build XML string safely with proper formatting
const xmlLines = [];
xmlLines.push(`<?xml version="1.0" encoding="UTF-8"?>`);
xmlLines.push(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`);

urlEntries.forEach((entry) => {
  let urlXml = `  <url>\n    <loc>${entry.loc}</loc>`;
  if (entry.lastmod) {
    urlXml += `\n    <lastmod>${entry.lastmod.toISOString()}</lastmod>`;
  }
  urlXml += `\n  </url>`;
  xmlLines.push(urlXml);
});

xmlLines.push('</urlset>');
const xml = xmlLines.join('\n');

fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), xml);
console.log(`Generated public/sitemap.xml with ${urlEntries.length} URLs and SITE_URL=${SITE_URL}`);
