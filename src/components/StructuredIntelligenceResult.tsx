import type { IntelligenceResult } from "@/lib/ai/types";

type StructuredIntelligenceResultProps = {
  result: IntelligenceResult;
};

type IntelligenceListProps = {
  title: string;
  items: string[];
  emptyMessage: string;
};

function IntelligenceList({
  title,
  items,
  emptyMessage,
}: IntelligenceListProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
        {title}
      </p>

      {items.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 text-sm leading-6 text-zinc-300"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-zinc-500">{emptyMessage}</p>
      )}
    </article>
  );
}

export default function StructuredIntelligenceResult({
  result,
}: StructuredIntelligenceResultProps) {
  return (
    <section className="mt-6 space-y-4">
      <article className="rounded-2xl border border-lime-300/20 bg-lime-300/[0.04] p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-300">
              Structured Intelligence
            </p>

            <h4 className="mt-3 text-xl font-semibold">
              Executive summary
            </h4>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-300">
              {result.summary}
            </p>
          </div>

          <div className="shrink-0 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
            <p className="text-xs text-zinc-500">Confidence</p>
            <p className="mt-1 text-2xl font-semibold text-lime-300">
              {result.confidence}%
            </p>
          </div>
        </div>
      </article>

      <div className="grid gap-4 lg:grid-cols-2">
        <IntelligenceList
          title="Risks"
          items={result.risks}
          emptyMessage="No structured risks identified yet."
        />

        <IntelligenceList
          title="Contradictions"
          items={result.contradictions}
          emptyMessage="No contradictions identified yet."
        />

        <IntelligenceList
          title="Missing Information"
          items={result.missingInformation}
          emptyMessage="No missing information identified."
        />

        <IntelligenceList
          title="Recommendations"
          items={result.recommendations}
          emptyMessage="No recommendations generated."
        />
      </div>
    </section>
  );
}
