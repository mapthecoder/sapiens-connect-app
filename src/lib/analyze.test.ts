import { describe, expect, it } from "vitest";
import { analyze } from "./analyze";

describe("Sapiens Connect intelligence engine", () => {
  it("returns low risk for neutral text", () => {
    const result = analyze(
      "The customer reviewed the information and completed the meeting.",
    );

    expect(result.riskScore).toBe(0);
    expect(result.riskLevel).toBe("Low");
    expect(result.signals).toEqual([]);
  });

  it("detects payout and failure signals", () => {
    const result = analyze(
      "The payout failed after the withdrawal request.",
    );

    expect(result.riskScore).toBe(55);
    expect(result.riskLevel).toBe("Medium");
    expect(result.signals).toContain("Payout Activity");
    expect(result.signals).toContain("Failure Event");
  });

  it("caps risk scores at 100", () => {
    const result = analyze(
      "The urgent payout failed. The account was suspended and the customer requested a refund because of fraud.",
    );

    expect(result.riskScore).toBe(100);
    expect(result.riskLevel).toBe("High");
  });

  it("detects access restrictions", () => {
    const result = analyze(
      "The account was blocked and suspended.",
    );

    expect(result.signals).toContain("Access Restriction");
  });

  it("detects payment disputes", () => {
    const result = analyze(
      "The customer filed a refund and chargeback dispute.",
    );

    expect(result.signals).toContain("Payment Dispute");
  });

  it("returns instructions for empty input", () => {
    const result = analyze("   ");

    expect(result.riskScore).toBe(0);
    expect(result.signals).toEqual([]);
    expect(result.recommendation).toContain("Enter source material");
  });
});
