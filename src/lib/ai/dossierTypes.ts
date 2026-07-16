export type DossierActor = {
  name: string;
  role: string;
  claims: string[];
  incentives: string[];
};

export type DossierRisk = {
  risk: string;
  severity: "low" | "medium" | "high" | "critical";
  basis: string;
};

export type DossierDecisionOption = {
  option: string;
  upside: string;
  downside: string;
};

export type IntelligenceDossier = {
  title: string;
  executiveSummary: string;
  actors: DossierActor[];
  verifiedFacts: string[];
  inferences: string[];
  contradictions: string[];
  missingEvidence: string[];
  risks: DossierRisk[];
  opportunities: string[];
  decisionOptions: DossierDecisionOption[];
  recommendedNextAction: string;
  followUpQuestions: string[];
  confidence: number;
};
