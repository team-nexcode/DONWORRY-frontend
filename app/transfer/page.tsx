"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { mockTransaction } from "@/lib/mockData";
import { saveSession } from "@/lib/session";
import { RiskLevel, RiskResult } from "@/lib/types";

const SCENARIOS: { value: RiskLevel; label: string }[] = [
  { value: "LOW", label: "LOW" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HIGH", label: "HIGH" },
];

export default function TransferPage() {
  const router = useRouter();
  const [scenario, setScenario] = useState<RiskLevel>("HIGH");
  const [isChecking, setIsChecking] = useState(false);

  async function handleTransfer() {
    setIsChecking(true);
    try {
      const res = await fetch("/api/risk-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario }),
      });
      const risk: RiskResult = await res.json();
      saveSession({ transaction: mockTransaction, risk });

      if (risk.riskLevel === "LOW") {
        router.push("/complete");
      } else {
        router.push("/pause");
      }
    } finally {
      setIsChecking(false);
    }
  }

  if (isChecking) {
    return (
      <main className="screen screen-center">
        <p className="loading-text">송금 내용을 확인하고 있어요.</p>
      </main>
    );
  }

  return (
    <main className="screen">
      <h1 className="screen-title">송금하기</h1>

      <Card>
        <dl className="info-list">
          <div className="info-row">
            <dt>받는 사람</dt>
            <dd>{mockTransaction.receiver}</dd>
          </div>
          <div className="info-row">
            <dt>은행</dt>
            <dd>{mockTransaction.bank}</dd>
          </div>
          <div className="info-row">
            <dt>계좌번호</dt>
            <dd>{mockTransaction.receiverAccount}</dd>
          </div>
          <div className="info-row">
            <dt>송금 메모</dt>
            <dd>{mockTransaction.memo ?? "-"}</dd>
          </div>
        </dl>
        <p className="amount-label">송금 금액</p>
        <p className="amount-value">{mockTransaction.amount.toLocaleString("ko-KR")}원</p>
      </Card>

      <div className="scenario-picker">
        <p className="scenario-picker-title">테스트용 Risk 시나리오 선택</p>
        <div className="scenario-options">
          {SCENARIOS.map((s) => (
            <label key={s.value} className={`scenario-option ${scenario === s.value ? "selected" : ""}`}>
              <input
                type="radio"
                name="scenario"
                value={s.value}
                checked={scenario === s.value}
                onChange={() => setScenario(s.value)}
              />
              {s.label}
            </label>
          ))}
        </div>
      </div>

      <div className="button-stack">
        <Button onClick={handleTransfer}>송금하기</Button>
      </div>
    </main>
  );
}
