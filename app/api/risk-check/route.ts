import { NextRequest, NextResponse } from "next/server";
import { mockRiskResults } from "@/lib/mockData";
import { RiskLevel } from "@/lib/types";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const scenario: RiskLevel =
    body?.scenario === "LOW" || body?.scenario === "MEDIUM" || body?.scenario === "HIGH"
      ? body.scenario
      : "LOW";

  // Mock AI risk-detection latency
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return NextResponse.json(mockRiskResults[scenario]);
}
