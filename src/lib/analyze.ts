export type Analysis = {
  riskScore: number;
  riskLevel: "Low" | "Medium" | "High";
  signals: string[];
  summary: string;
  recommendation: string;
};

type SignalRule = {
  terms: string[];
  label: string;
  score: number;
};

const signalRules: SignalRule[] = [
  {
    terms: ["payout", "withdrawal"],
    label: "Payout Activity",
    score: 30,
  },
  {
    terms: ["failed", "failure", "declined", "rejected"],
    label: "Failure Event",
    score: 25,
  },
  {
    terms: ["urgent", "immediately", "asap"],
    label: "Urgency Signal",
    score: 15,
  },
  {
    terms: ["refund", "chargeback", "dispute"],
    label: "Payment Dispute",
    score: 25,
  },
  {
    terms: ["blocked", "locked", "suspended", "banned"],
    label: "Access Restriction",
    score: 25,
  },
  {
    terms: ["fraud", "scam", "stolen"],
    label: "Fraud Language",
    score: 35,
  },
];

export function analyze(text: string): Analysis {
  const content = text.trim().toLowerCase();

  if (!content) {
    return {
      riskScore: 0,
      riskLevel: "Low",
      signals: [],
      summary: "No source material was provided.",
      recommendation: "Enter source material before analyzing.",
    };
  }

  let riskScore = 0;
  const signals: string[] = [];

  signalRules.forEach((rule) => {
    const matched = rule.terms.some((term) => content.includes(term));

    if (matched) {
      riskScore += rule.score;
      signals.push(rule.label);
    }
  });

  riskScore = Math.min(riskScore, 100);

  const riskLevel =
    riskScore >= 70 ? "High" : riskScore >= 35 ? "Medium" : "Low";

  const summary =
    signals.length > 0
      ? `Detected ${signals.length} signal${signals.length === 1 ? "" : "s"} in the submitted material.`
      : "No elevated signals were detected in the submitted material.";

  const recommendation =
    riskScore >= 70
      ? "Escalate for immediate review and verify the underlying evidence."
      : riskScore >= 35
        ? "Review the available evidence and gather additional context."
        : riskScore > 0
          ? "Monitor the situation and document any new developments."
          : "No elevated risk detected from the available text.";

  return {
    riskScore,
    riskLevel,
    signals,
    summary,
    recommendation,
  };
}
