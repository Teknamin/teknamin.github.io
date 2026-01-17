export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">About Teknamin Labs</h1>

      <p className="mt-8 leading-7 opacity-90">
        Teknamin Labs is not a company or a product. It is a long-running independent research and
        writing practice focused on systems, technology, and intelligence.
      </p>

      <p className="mt-4 leading-7 opacity-90">
        Founded in 2015 as <em>Technology in a Minute</em>, the work began as short explainers and
        evolved toward underlying structure: systems, incentives, intelligence, and design tradeoffs.
      </p>

      <hr className="my-10 opacity-30" />

      <h2 className="text-xl font-semibold">Author</h2>
      <p className="mt-3 opacity-90">
        Aravind Ravi — Founder and primary author<br />
        <a className="underline underline-offset-4" href="https://www.raviaravind.com">
          www.raviaravind.com
        </a>
      </p>
    </main>
  );
}
