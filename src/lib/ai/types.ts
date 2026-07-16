export interface IntelligenceResult {
  summary: string;
  risks: string[];
  contradictions: string[];
  missingInformation: string[];
  recommendations: string[];
  confidence: number;
}
