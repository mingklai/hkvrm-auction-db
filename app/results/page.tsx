// this component runs on the server; it only pulls the query string value and
// forwards it to a client‑side child. removing "use client" prevents the build
// from trying to execute browser-only hooks during prerender.

// client code is placed in a separate file `ResultsClient.tsx`
import ResultsClient from "./ResultsClient";

export default async function Results({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  // searchParams is a promise in the new runtime; unwrap it before using.
  const params = await searchParams;
  const raw = params.plate ?? "";
  const plate = (Array.isArray(raw) ? raw[0] : raw).toString().toUpperCase();
  return <ResultsClient initialPlate={plate} />;
}
