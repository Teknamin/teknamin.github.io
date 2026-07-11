export const metadata = {
  title: { absolute: "HNIR | Deterministic Intent Routing Control Plane" },
  description: "HNIR is Teknamin Labs' deterministic intent-routing control plane work for distributed conversational systems.",
  alternates: { canonical: "/hnir/" },
  openGraph: {
    title: "HNIR | Deterministic Intent Routing Control Plane",
    description: "HNIR is Teknamin Labs' deterministic intent-routing control plane work for distributed conversational systems.",
    url: "/hnir/",
    type: "article"
  },
  twitter: {
    card: "summary",
    title: "HNIR | Deterministic Intent Routing Control Plane",
    description: "HNIR is Teknamin Labs' deterministic intent-routing control plane work for distributed conversational systems."
  }
};

import { SITE } from "@/lib/site";

export default function HnirPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            "@id": "https://doi.org/10.5281/zenodo.18110920",
            name: "HNIR: A Deterministic Intent Routing Control Plane for Distributed Conversational Systems",
            author: {
              "@type": "Person",
              "@id": `${SITE.founderUrl}/#aravind-ravi`,
              name: SITE.founderName,
              url: SITE.founderUrl
            },
            publisher: {
              "@type": "Organization",
              name: "Zenodo"
            },
            isPartOf: {
              "@type": "Organization",
              "@id": `${SITE.url}/#teknamin-labs`,
              name: SITE.name,
              url: SITE.url
            },
            sameAs: ["https://doi.org/10.5281/zenodo.18110920"]
          })
        }}
      />
      <h1 className="text-3xl font-semibold tracking-tight">HNIR</h1>
      <p className="mt-3 site-muted">
        Hybrid Neuro-Symbolic Intent Routing — deterministic control planes for distributed conversational systems.
      </p>

      <div className="mt-10 space-y-3">
        <p className="site-soft">
          Publication (DOI):{" "}
          <a className="site-link underline underline-offset-4" href="https://doi.org/10.5281/zenodo.18110920">
            https://doi.org/10.5281/zenodo.18110920
          </a>
        </p>
        <p className="site-soft">
          This page collects the HNIR preprint, implementation links, and evaluation notes for deterministic intent routing in distributed conversational systems.
        </p>
      </div>
    </main>
  );
}
