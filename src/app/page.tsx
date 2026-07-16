const navItems = ["Dashboard", "Intelligence", "Sources", "History", "Settings"];

const metrics = [
  { label: "Analyses", value: "0", detail: "No data analyzed yet" },
  { label: "Risk Signals", value: "0", detail: "No elevated signals" },
  { label: "Pattern Strength", value: "—", detail: "Waiting for evidence" },
];

const capabilities = [
  "Paste conversations, emails, decisions, or situations",
  "Detect risks, contradictions, and behavioral signals",
  "Explain findings with evidence and confidence",
  "Build pattern history across prior analyses",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070a] text-white">
      <div className="mx-auto flex min-h-screen max-w-[1500px]">
        <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[#090c11] p-6 lg:flex lg:flex-col">
          <div className="mb-12">
            <p className="text-xs font-bold tracking-[0.22em] text-lime-300">
              SAPIENS CONNECT
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              Intelligence OS <span className="text-lime-300">⥀</span>
            </h1>
          </div>

          <nav className="space-y-2">
            {navItems.map((item, index) => (
              <button
                key={item}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  index === 0
                    ? "bg-lime-300 text-black"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Product status
            </p>
            <p className="mt-3 text-sm text-zinc-300">
              Commercial application foundation
            </p>
            <p className="mt-2 text-xs text-zinc-500">Build app shell</p>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="border-b border-white/10 px-5 py-5 sm:px-8 lg:px-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300">
                  Decision Intelligence
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Sapiens Connect Dashboard
                </h2>
              </div>

              <button className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.08]">
                New analysis
              </button>
            </div>
          </header>

          <div className="space-y-6 p-5 sm:p-8 lg:p-10">
            <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#11161e] to-[#090c11] p-6 shadow-2xl sm:p-8">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-lime-300">
                  Intelligence Product
                </p>
                <h3 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Turn messy human information into structured intelligence.
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
                  Paste a conversation, email, decision, complaint, contract
                  excerpt, or situation. Sapiens Connect will identify risks,
                  signals, contradictions, unknowns, and recommended actions.
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
                <textarea
                  className="min-h-48 w-full resize-y bg-transparent text-base leading-7 text-white outline-none placeholder:text-zinc-600"
                  placeholder="Describe what happened or paste source material here..."
                />

                <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-zinc-500">
                    Text stays local until an intelligence service is connected.
                  </p>

                  <button className="rounded-xl bg-lime-300 px-5 py-3 text-sm font-bold text-black transition hover:bg-lime-200">
                    Analyze intelligence
                  </button>
                </div>
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
              {metrics.map((metric) => (
                <article
                  key={metric.label}
                  className="rounded-2xl border border-white/10 bg-[#0e1218] p-5"
                >
                  <p className="text-sm text-zinc-500">{metric.label}</p>
                  <p className="mt-4 text-4xl font-semibold tracking-tight">
                    {metric.value}
                  </p>
                  <p className="mt-3 text-sm text-zinc-500">{metric.detail}</p>
                </article>
              ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <article className="rounded-2xl border border-white/10 bg-[#0e1218] p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-300">
                      Recent Intelligence
                    </p>
                    <h3 className="mt-2 text-xl font-semibold">
                      No analyses yet
                    </h3>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-500">
                    Empty state
                  </span>
                </div>

                <div className="mt-8 rounded-2xl border border-dashed border-white/10 px-6 py-14 text-center">
                  <p className="text-sm text-zinc-400">
                    Your analyzed decisions and conversations will appear here.
                  </p>
                </div>
              </article>

              <article className="rounded-2xl border border-white/10 bg-[#0e1218] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-300">
                  Core Capabilities
                </p>

                <div className="mt-5 space-y-4">
                  {capabilities.map((capability, index) => (
                    <div
                      key={capability}
                      className="flex gap-4 rounded-xl border border-white/[0.07] bg-black/20 p-4"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime-300 text-xs font-bold text-black">
                        {index + 1}
                      </span>
                      <p className="text-sm leading-6 text-zinc-300">
                        {capability}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
