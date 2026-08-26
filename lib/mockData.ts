import { RiskLevel, RiskResult, Transaction } from "./types";

export const mockTransaction: Transaction = {
  receiver: "김민수",
  receiverAccount: "110-234-567890",
  bank: "신한은행",
  amount: 3000000,
  memo: "생활비",
};

export const mockRiskResults: Record<RiskLevel, RiskResult> = {
  LOW: {
    riskScore: 12,
    riskLevel: "LOW",
    reasons: [],
  },
  MEDIUM: {
    riskScore: 55,
    riskLevel: "MEDIUM",
    reasons: [
      {
        type: "HIGH_AMOUNT",
        title: "평소보다 큰 금액이에요",
        description: "최근 송금 금액보다 큰 금액입니다.",
      },
    ],
  },
  HIGH: {
    riskScore: 87,
    riskLevel: "HIGH",
    reasons: [
      {
        type: "NEW_ACCOUNT",
        title: "처음 송금하는 계좌예요",
        description: "이 계좌로 이전에 송금한 기록이 없습니다.",
      },
      {
        type: "HIGH_AMOUNT",
        title: "평소보다 큰 금액이에요",
        description: "최근 송금 금액보다 큰 금액입니다.",
      },
      {
        type: "ANOMALY",
        title: "평소와 다른 송금이에요",
        description: "최근 거래 패턴과 차이가 있습니다.",
      },
    ],
  },
};
