"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { loadSession, SessionData } from "@/lib/session";

export default function PausePage() {
  const router = useRouter();
  const [session, setSession] = useState<SessionData | null>(null);

  useEffect(() => {
    const data = loadSession();
    if (!data) {
      router.replace("/transfer");
      return;
    }
    setSession(data);
  }, [router]);

  if (!session) return null;

  const { transaction, risk } = session;
  const summary = risk.reasons.map((reason) => reason.title).join(" · ");

  return (
    <main className="screen">
      <p className="eyebrow eyebrow-pause">PAUSE</p>
      <h1 className="screen-title">
        잠깐,
        <br />
        송금을 멈췄어요.
      </h1>

      <Card>
        <p className="amount-label">송금 금액</p>
        <p className="amount-value">{transaction.amount.toLocaleString("ko-KR")}원</p>
        <p className="body-text">{transaction.receiver}님에게 송금하려고 합니다.</p>
        <span className={`risk-badge risk-badge-${risk.riskLevel}`}>Risk Level {risk.riskLevel}</span>
        {summary && <p className="body-text-muted">{summary}</p>}
      </Card>

      <div className="button-stack">
        <Button onClick={() => router.push("/explain")}>왜 멈췄는지 확인하기</Button>
        <Button variant="secondary" onClick={() => router.push("/action?decision=cancel")}>
          송금 취소
        </Button>
      </div>
    </main>
  );
}
