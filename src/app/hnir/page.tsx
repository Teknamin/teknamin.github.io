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
      <p className="mt-3 opacity-80">
        Hybrid Neuro-Symbolic Intent Routing — deterministic control planes for distributed conversational systems.
      </p>

      <div className="mt-10 space-y-3">
        <p>
          Publication (DOI):{" "}
          <a className="underline underline-offset-4" href="https://doi.org/10.5281/zenodo.18110920">
            https://doi.org/10.5281/zenodo.18110920
          </a>
        </p>
        <p className="opacity-90">
          This page will host the canonical HNIR overview, diagrams, and links.
        </p>
      </div>
    </main>
  );
}
