export default function ArchivePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Archive</h1>

      <p className="mt-8 leading-7 opacity-90">
        Early work from 2015 is preserved as a historical archive.
      </p>

      <ul className="mt-6 list-disc space-y-2 pl-6">
        <li>
          Blog archive:{" "}
          <a className="underline underline-offset-4" href="https://teknamin.blogspot.com">
            teknamin.blogspot.com
          </a>
        </li>
        <li>
          X account:{" "}
          <a className="underline underline-offset-4" href="https://x.com/teknamin">
            x.com/teknamin
          </a>
        </li>
        <li>
          Facebook page:{" "}
          <a className="underline underline-offset-4" href="https://facebook.com/teknamin">
            facebook.com/teknamin
          </a>
        </li>
      </ul>
    </main>
  );
}
