export const dynamic = "force-static";

export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: https://www.teknamin.com/sitemap.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain" }
  });
}