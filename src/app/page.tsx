
export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Teknamin Labs</h1>
      <p className="mt-3 text-lg opacity-80">
        Independent research practice (est. 2015)
      </p>

      <p className="mt-8 leading-7 opacity-90">
        An ideas lab exploring systems, technology, and intelligence. Teknamin began in 2015 as
        <em> Technology in a Minute</em> and has evolved into deeper inquiry: how systems are designed,
        how intelligence is shaped, and how ideas move from abstraction to reality.
      </p>

      <hr className="my-10 opacity-30" />

      <h2 className="text-xl font-semibold">Current focus</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 opacity-90">
        <li>Systems design and architecture</li>
        <li>AI control planes and intent-driven systems</li>
        <li>Research, prototypes, and long-horizon thinking</li>
      </ul>

      <p className="mt-10 opacity-90">
        Research authored by{" "}
        <a className="underline underline-offset-4" href="https://www.raviaravind.com">
          Aravind Ravi
        </a>
        .
      </p>

      <div className="mt-10 space-y-2">
        <a className="underline underline-offset-4" href="/about/">About</a><br />
        <a className="underline underline-offset-4" href="/hnir/">HNIR</a><br />
        <a className="underline underline-offset-4" href="/blog/">Writing</a><br />
        <a className="underline underline-offset-4" href="/archive/">Archive</a>
      </div>
    </main>
  );
}
