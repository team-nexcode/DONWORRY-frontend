export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface RiskReason {
  type: string;
  title: string;
  description: string;
}

export interface RiskResult {
  riskScore: number;
  riskLevel: RiskLevel;
  reasons: RiskReason[];
}

export interface Transaction {
  receiver: string;
  receiverAccount: string;
  bank: string;
  amount: number;
  memo?: string;
}
