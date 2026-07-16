import type { IntelligenceResult } from "./types";

export function runIntelligence(
  input: string,
): IntelligenceResult {
  const cleanedInput = input.trim();

  return {
    summary: cleanedInput
      ? `Prototype intelligence engine processed ${cleanedInput.length} characters of source material.`
      : "No source material was provided.",

    risks: [],

    contradictions: [],

    missingInformation: cleanedInput
      ? [
          "The prototype engine cannot yet independently verify claims.",
          "Additional source evidence may be required.",
        ]
      : ["Source material is required."],

    recommendations: cleanedInput
      ? ["Review the source material and verify important claims."]
      : ["Enter source material before running intelligence analysis."],

    confidence: cleanedInput ? 25 : 0,
  };
}
