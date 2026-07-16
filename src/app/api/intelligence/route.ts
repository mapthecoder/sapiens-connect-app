import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const dossierSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: {
      type: "string",
    },
    executiveSummary: {
      type: "string",
    },
    actors: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          name: {
            type: "string",
          },
          role: {
            type: "string",
          },
          claims: {
            type: "array",
            items: {
              type: "string",
            },
          },
          incentives: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        required: ["name", "role", "claims", "incentives"],
      },
    },
    verifiedFacts: {
      type: "array",
      items: {
        type: "string",
      },
    },
    inferences: {
      type: "array",
      items: {
        type: "string",
      },
    },
    contradictions: {
      type: "array",
      items: {
        type: "string",
      },
    },
    missingEvidence: {
      type: "array",
      items: {
        type: "string",
      },
    },
    risks: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          risk: {
            type: "string",
          },
          severity: {
            type: "string",
            enum: ["low", "medium", "high", "critical"],
          },
          basis: {
            type: "string",
          },
        },
        required: ["risk", "severity", "basis"],
      },
    },
    opportunities: {
      type: "array",
      items: {
        type: "string",
      },
    },
    decisionOptions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          option: {
            type: "string",
          },
          upside: {
            type: "string",
          },
          downside: {
            type: "string",
          },
        },
        required: ["option", "upside", "downside"],
      },
    },
    recommendedNextAction: {
      type: "string",
    },
    followUpQuestions: {
      type: "array",
      items: {
        type: "string",
      },
    },
    confidence: {
      type: "number",
      minimum: 0,
      maximum: 100,
    },
  },
  required: [
    "title",
    "executiveSummary",
    "actors",
    "verifiedFacts",
    "inferences",
    "contradictions",
    "missingEvidence",
    "risks",
    "opportunities",
    "decisionOptions",
    "recommendedNextAction",
    "followUpQuestions",
    "confidence",
  ],
};

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: "OPENAI_API_KEY is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    const body = await request.json();
    const input =
      typeof body.input === "string" ? body.input.trim() : "";

    if (!input) {
      return NextResponse.json(
        {
          error: "Source material is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (input.length > 50000) {
      return NextResponse.json(
        {
          error: "Source material is too long for this prototype.",
        },
        {
          status: 400,
        },
      );
    }

    const response = await openai.responses.create({
      model: "gpt-5.5",
      instructions: `
You are the Sapiens Connect intelligence engine.

Transform unstructured human information into a decision-intelligence dossier.

Rules:
- Separate verified facts from inference.
- Never represent an allegation as proven fact.
- Identify actors, claims, incentives, contradictions, missing evidence, risks, opportunities, and decision options.
- Explain the basis of every risk.
- Do not invent evidence.
- When information is missing, say exactly what must be verified.
- Give one clear recommended next action.
- Keep conclusions grounded in the submitted source material.
`,
      input,
      text: {
        format: {
          type: "json_schema",
          name: "sapiens_connect_dossier",
          strict: true,
          schema: dossierSchema,
        },
      },
    });

    const outputText = response.output_text;

    if (!outputText) {
      throw new Error("The model returned no dossier.");
    }

    const dossier = JSON.parse(outputText);

    return NextResponse.json(dossier);
  } catch (error) {
    console.error("Sapiens Connect intelligence error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unknown intelligence-engine error.";

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 500,
      },
    );
  }
}
