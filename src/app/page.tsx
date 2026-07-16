import DossierWorkspace from "@/components/DossierWorkspace";

const navItems = [
  "Dossier",
  "Entities",
  "Evidence",
  "Decisions",
  "Memory",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070a] text-white">
      <div className="mx-auto flex min-h-screen max-w-[1700px]">
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
                type="button"
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
              Live dossier engine connected
            </p>

            <p className="mt-2 text-xs text-zinc-500">
              OpenAI Responses API
            </p>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="border-b border-white/10 px-5 py-5 sm:px-8 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300">
              Decision Intelligence
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Sapiens Connect Dossier Engine
            </h2>
          </header>

          <div className="p-5 sm:p-8 lg:p-10">
            <DossierWorkspace />
          </div>
        </section>
      </div>
    </main>
  );
}
