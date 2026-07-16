import type { IntelligenceDossier } from "@/lib/ai/dossierTypes";

type DossierResultProps = {
  dossier: IntelligenceDossier;
};

function ListSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
        {title}
      </h4>

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
        <p className="mt-4 text-sm text-zinc-500">None identified.</p>
      )}
    </article>
  );
}

export default function DossierResult({
  dossier,
}: DossierResultProps) {
  return (
    <section className="mt-6 space-y-4">
      <article className="rounded-2xl border border-lime-300/20 bg-lime-300/[0.04] p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-300">
              Intelligence Dossier
            </p>

            <h3 className="mt-3 text-2xl font-semibold">
              {dossier.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-zinc-300">
              {dossier.executiveSummary}
            </p>
          </div>

          <div className="shrink-0 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
            <p className="text-xs text-zinc-500">Confidence</p>
            <p className="mt-1 text-3xl font-semibold text-lime-300">
              {dossier.confidence}%
            </p>
          </div>
        </div>
      </article>

      <section className="grid gap-4 xl:grid-cols-2">
        <ListSection
          title="Verified Facts"
          items={dossier.verifiedFacts}
        />

        <ListSection
          title="Inferences"
          items={dossier.inferences}
        />

        <ListSection
          title="Contradictions"
          items={dossier.contradictions}
        />

        <ListSection
          title="Missing Evidence"
          items={dossier.missingEvidence}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
            Actors
          </h4>

          <div className="mt-4 space-y-4">
            {dossier.actors.map((actor) => (
              <div
                key={`${actor.name}-${actor.role}`}
                className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4"
              >
                <p className="font-semibold text-white">
                  {actor.name}
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  {actor.role}
                </p>

                {actor.claims.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-[0.15em] text-zinc-600">
                      Claims
                    </p>

                    <ul className="mt-2 space-y-2">
                      {actor.claims.map((claim) => (
                        <li
                          key={claim}
                          className="text-sm leading-6 text-zinc-300"
                        >
                          {claim}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {actor.incentives.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-[0.15em] text-zinc-600">
                      Incentives
                    </p>

                    <ul className="mt-2 space-y-2">
                      {actor.incentives.map((incentive) => (
                        <li
                          key={incentive}
                          className="text-sm leading-6 text-zinc-300"
                        >
                          {incentive}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
            Risks
          </h4>

          <div className="mt-4 space-y-4">
            {dossier.risks.map((risk) => (
              <div
                key={`${risk.risk}-${risk.basis}`}
                className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-semibold text-white">
                    {risk.risk}
                  </p>

                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase text-zinc-400">
                    {risk.severity}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {risk.basis}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <ListSection
        title="Opportunities"
        items={dossier.opportunities}
      />

      <article className="rounded-2xl border border-white/10 bg-black/30 p-5">
        <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
          Decision Options
        </h4>

        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          {dossier.decisionOptions.map((option) => (
            <div
              key={option.option}
              className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4"
            >
              <p className="font-semibold text-white">
                {option.option}
              </p>

              <p className="mt-3 text-sm leading-6 text-zinc-300">
                <span className="font-semibold text-lime-300">
                  Upside:
                </span>{" "}
                {option.upside}
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                <span className="font-semibold text-red-300">
                  Downside:
                </span>{" "}
                {option.downside}
              </p>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-2xl border border-lime-300/20 bg-lime-300/[0.04] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-300">
          Recommended Next Action
        </p>

        <p className="mt-3 text-lg font-semibold leading-7 text-white">
          {dossier.recommendedNextAction}
        </p>
      </article>

      <ListSection
        title="Follow-Up Questions"
        items={dossier.followUpQuestions}
      />
    </section>
  );
}
