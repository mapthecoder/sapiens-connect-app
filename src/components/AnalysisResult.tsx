import type { Analysis } from "@/lib/analyze";

type AnalysisResultProps = {
  analysis: Analysis;
};

export default function AnalysisResult({
  analysis,
}: AnalysisResultProps) {
  return (
    <section className="mt-6 grid gap-4 lg:grid-cols-[0.36fr_0.64fr]">
      <article className="rounded-2xl border border-white/10 bg-black/30 p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
          Risk Score
        </p>

        <p className="mt-4 text-5xl font-semibold tracking-tight">
          {analysis.riskScore}
          <span className="text-xl text-zinc-600">/100</span>
        </p>

        <p className="mt-3 text-sm text-zinc-400">
          {analysis.riskLevel} risk
        </p>
      </article>

      <article className="rounded-2xl border border-white/10 bg-black/30 p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-300">
          Intelligence Result
        </p>

        <p className="mt-4 text-sm leading-6 text-zinc-300">
          {analysis.summary}
        </p>

        <div className="mt-5">
          <p className="text-sm text-zinc-500">Detected signals</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {analysis.signals.length > 0 ? (
              analysis.signals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-lime-300/20 bg-lime-300/10 px-3 py-1 text-xs font-semibold text-lime-300"
                >
                  {signal}
                </span>
              ))
            ) : (
              <span className="text-sm text-zinc-500">
                No elevated signals detected.
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="text-sm text-zinc-500">Recommended action</p>

          <p className="mt-2 text-lg font-semibold text-white">
            {analysis.recommendation}
          </p>
        </div>
      </article>
    </section>
  );
}
