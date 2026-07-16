"use client";

import { useState } from "react";
import AnalysisResult from "@/components/AnalysisResult";
import { analyze, type Analysis } from "@/lib/analyze";

export default function IntelligenceForm() {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  function handleAnalyze() {
    setAnalysis(analyze(text));
  }

  function handleClear() {
    setText("");
    setAnalysis(null);
  }

  return (
    <div>
      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="min-h-48 w-full resize-y bg-transparent text-base leading-7 text-white outline-none placeholder:text-zinc-600"
          placeholder="Describe what happened or paste source material here..."
        />

        <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-500">
            Current analysis runs locally in your browser.
          </p>

          <div className="flex gap-2">
            {(text || analysis) && (
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
              disabled={!text.trim()}
              className="rounded-xl bg-lime-300 px-5 py-3 text-sm font-bold text-black transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Analyze intelligence
            </button>
          </div>
        </div>
      </div>

      {analysis && <AnalysisResult analysis={analysis} />}
    </div>
  );
}
