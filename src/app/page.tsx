export const metadata = {
  title: "Teknamin Labs | AI Control Planes and Distributed Systems Research",
  description: "Independent research lab for AI control planes, distributed systems, and long-running software architecture.",
  canonical: "/",
  openGraph: {
    title: "Teknamin Labs | AI Control Planes and Distributed Systems Research",
    description: "Independent research lab for AI control planes, distributed systems, and long-running software architecture.",
    url: "/",
    type: "website"
  },
  twitter: {
    title: "Teknamin Labs | AI Control Planes and Distributed Systems Research",
    description: "Independent research lab for AI control planes, distributed systems, and long-running software architecture."
  }
};

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Teknamin Labs</h1>
      <p className="mt-3 text-lg site-muted">
        Independent research practice (est. 2015)
      </p>

      <p className="mt-8 leading-7 site-soft">
        Teknamin Labs is an independent research practice for AI control planes, distributed systems, and long-running software architecture. Teknamin began in 2015 as
        <em> Technology in a Minute</em> and has evolved into deeper inquiry: how systems are designed,
        how intelligence is shaped, and how ideas move from abstraction to reality.
      </p>

      <hr className="my-10 site-divider" />

      <h2 className="text-xl font-semibold">Current focus</h2>
      <ul className="site-list mt-4 list-disc space-y-2 pl-6">
        <li>Systems design and architecture</li>
        <li>AI control planes and intent-driven systems</li>
        <li>Research, prototypes, and long-horizon thinking</li>
      </ul>

      <p className="mt-10 site-soft">
        Research authored by{" "}
        <a className="site-link underline underline-offset-4" href="https://www.raviaravind.com">
          Aravind Ravi
        </a>
        .
      </p>

      <div className="mt-10 space-y-2">
        <Link className="site-link underline underline-offset-4" href="/about/">About</Link><br />
        <Link className="site-link underline underline-offset-4" href="/hnir/">HNIR</Link><br />
        <Link className="site-link underline underline-offset-4" href="/blog/">Writing</Link><br />
        <Link className="site-link underline underline-offset-4" href="/archive/">Archive</Link>
      </div>
    </main>
  );
}
