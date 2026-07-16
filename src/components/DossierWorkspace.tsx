"use client";

import { useState } from "react";
import DossierResult from "@/components/DossierResult";
import type { IntelligenceDossier } from "@/lib/ai/dossierTypes";

export default function DossierWorkspace() {
  const [input, setInput] = useState("");
  const [dossier, setDossier] =
    useState<IntelligenceDossier | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    const sourceMaterial = input.trim();

    if (!sourceMaterial) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/intelligence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: sourceMaterial,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "The intelligence request failed.",
        );
      }

      setDossier(data);
    } catch (requestError) {
      setDossier(null);
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unknown intelligence request error.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setInput("");
    setDossier(null);
    setError("");
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#11161e] to-[#090c11] p-6 shadow-2xl sm:p-8">
      <div className="max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-lime-300">
          Intelligence Dossier Engine
        </p>

        <h3 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
          Understand the situation, not just the record.
        </h3>

        <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-400">
          Paste source material. Sapiens Connect separates facts from
          inference, extracts actors and claims, identifies evidence gaps,
          compares decision options, and recommends the next move.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="min-h-64 w-full resize-y bg-transparent text-base leading-7 text-white outline-none placeholder:text-zinc-600"
          placeholder="Paste a conversation, dispute, email chain, contract excerpt, decision, or situation..."
        />

        <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-500">
            Source material is processed through the private server route.
          </p>

          <div className="flex gap-2">
            {(input || dossier || error) && (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-zinc-400 transition hover:bg-white/5 hover:text-white"
              >
                Clear
              </button>
            )}

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!input.trim() || loading}
              className="rounded-xl bg-lime-300 px-5 py-3 text-sm font-bold text-black transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading
                ? "Building dossier..."
                : "Generate intelligence dossier"}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/[0.06] p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {dossier && <DossierResult dossier={dossier} />}
    </section>
  );
}
