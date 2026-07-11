export const metadata = {
  title: { absolute: 'About | Teknamin Labs' },
  description: 'About Teknamin Labs, an independent research practice for AI control planes, distributed systems, and long-running software architecture.',
  alternates: { canonical: '/about/' },
  openGraph: {
    title: 'About | Teknamin Labs',
    description: 'About Teknamin Labs, an independent research practice for AI control planes, distributed systems, and long-running software architecture.',
    url: '/about/',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'About | Teknamin Labs',
    description: 'About Teknamin Labs, an independent research practice for AI control planes, distributed systems, and long-running software architecture.',
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">About Teknamin Labs</h1>

      <p className="mt-8 leading-7 site-soft">
        Teknamin Labs is an independent research and writing practice focused on AI control planes, distributed systems, deterministic software architecture, and long-running AI applications.
      </p>

      <p className="mt-4 leading-7 site-soft">
        Founded in 2015 as <em>Technology in a Minute</em>, the work began as short explainers and
        evolved toward underlying structure: systems, incentives, intelligence, and design tradeoffs.
      </p>

      <hr className="my-10 site-divider" />

      <h2 className="text-xl font-semibold">Author</h2>
      <p className="mt-3 site-soft">
        Aravind Ravi — Founder and primary author<br />
        <a className="site-link underline underline-offset-4" href="https://www.raviaravind.com">
          www.raviaravind.com
        </a>
      </p>
    </main>
  );
}
