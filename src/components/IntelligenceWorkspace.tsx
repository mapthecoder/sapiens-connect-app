"use client";

import { useEffect, useMemo, useState } from "react";
import AnalysisResult from "@/components/AnalysisResult";
import { analyze, type Analysis } from "@/lib/analyze";

type AnalysisRecord = {
  id: string;
  sourceText: string;
  analysis: Analysis;
  createdAt: string;
};

const STORAGE_KEY = "sapiens-connect-analysis-history";

export default function IntelligenceWorkspace() {
  const [text, setText] = useState("");
  const [history, setHistory] = useState<AnalysisRecord[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(STORAGE_KEY);

      if (storedHistory) {
        // Browser history is loaded once after the client mounts.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Unable to load analysis history:", error);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history, ready]);

  const totalSignals = useMemo(
    () =>
      history.reduce(
        (total, record) => total + record.analysis.signals.length,
        0,
      ),
    [history],
  );

  const averageRisk = useMemo(() => {
    if (history.length === 0) return 0;

    const totalRisk = history.reduce(
      (total, record) => total + record.analysis.riskScore,
      0,
    );

    return Math.round(totalRisk / history.length);
  }, [history]);

  const patternStrength = useMemo(() => {
    if (history.length < 3) return "Insufficient data";

    const signalCounts = new Map<string, number>();

    history.forEach((record) => {
      record.analysis.signals.forEach((signal) => {
        signalCounts.set(signal, (signalCounts.get(signal) ?? 0) + 1);
      });
    });

    const strongestCount = Math.max(0, ...signalCounts.values());
    const ratio = strongestCount / history.length;

    if (history.length >= 5 && ratio >= 0.6) return "High";
    if (ratio >= 0.4) return "Medium";
    return "Low";
  }, [history]);

  function handleAnalyze() {
    const sourceText = text.trim();

    if (!sourceText) return;

    const record: AnalysisRecord = {
      id: crypto.randomUUID(),
      sourceText,
      analysis: analyze(sourceText),
      createdAt: new Date().toISOString(),
    };

    setHistory((currentHistory) => [record, ...currentHistory]);
    setText("");
  }

  function deleteRecord(recordId: string) {
    setHistory((currentHistory) =>
      currentHistory.filter((record) => record.id !== recordId),
    );
  }

  function clearHistory() {
    const confirmed = window.confirm(
      "Delete all locally saved intelligence history?",
    );

    if (confirmed) {
      setHistory([]);
    }
  }

  const latestRecord = history[0] ?? null;

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#11161e] to-[#090c11] p-6 shadow-2xl sm:p-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-lime-300">
            Intelligence Product
          </p>

          <h3 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            Turn messy human information into structured intelligence.
          </h3>

          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
            Paste a conversation, email, decision, complaint, contract excerpt,
            or situation. Sapiens Connect will identify risks, signals, and
            recommended actions.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="min-h-48 w-full resize-y bg-transparent text-base leading-7 text-white outline-none placeholder:text-zinc-600"
            placeholder="Describe what happened or paste source material here..."
          />

          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-zinc-500">
              Analyses and history remain stored locally in this browser.
            </p>

            <div className="flex gap-2">
              {text && (
                <button
                  type="button"
                  onClick={() => setText("")}
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

        {latestRecord && (
          <AnalysisResult analysis={latestRecord.analysis} />
        )}
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Analyses"
          value={String(history.length)}
          detail="Locally saved records"
        />

        <MetricCard
          label="Risk Signals"
          value={String(totalSignals)}
          detail="Signals across all analyses"
        />

        <MetricCard
          label="Average Risk"
          value={history.length ? `${averageRisk}/100` : "—"}
          detail="Average historical score"
        />

        <MetricCard
          label="Pattern Strength"
          value={patternStrength}
          detail="Repeated signal concentration"
        />
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#0e1218] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-300">
              Intelligence History
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              {history.length
                ? `${history.length} saved analysis${history.length === 1 ? "" : "es"}`
                : "No saved analyses yet"}
            </h3>
          </div>

          {history.length > 0 && (
            <button
              type="button"
              onClick={clearHistory}
              className="rounded-xl border border-red-400/20 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-400/10"
            >
              Clear history
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-white/10 px-6 py-14 text-center">
            <p className="text-sm text-zinc-400">
              Your analyzed decisions and conversations will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {history.map((record) => (
              <article
                key={record.id}
                className="rounded-2xl border border-white/[0.08] bg-black/20 p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">
                        {record.analysis.riskLevel} risk
                      </span>

                      <span className="text-xs text-zinc-600">
                        {new Date(record.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-300">
                      {record.sourceText}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {record.analysis.signals.map((signal) => (
                        <span
                          key={signal}
                          className="rounded-full bg-lime-300/10 px-3 py-1 text-xs font-semibold text-lime-300"
                        >
                          {signal}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-2xl font-semibold">
                      {record.analysis.riskScore}
                    </span>

                    <button
                      type="button"
                      onClick={() => deleteRecord(record.id)}
                      className="rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-500 transition hover:border-red-400/20 hover:bg-red-400/10 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
};

function MetricCard({ label, value, detail }: MetricCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#0e1218] p-5">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-4 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-3 text-sm text-zinc-500">{detail}</p>
    </article>
  );
}
