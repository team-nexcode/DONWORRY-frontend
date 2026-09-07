"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { clearSession, loadSession, SessionData } from "@/lib/session";

export default function CompletePage() {
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

  const { transaction } = session;

  return (
    <main className="screen screen-center">
      <p className="eyebrow eyebrow-success">완료</p>
      <h1 className="screen-title">송금이 완료됐어요.</h1>

      <Card>
        <p className="amount-label">보낸 금액</p>
        <p className="amount-value">{transaction.amount.toLocaleString("ko-KR")}원</p>
        <p className="body-text">{transaction.receiver}님에게 송금했어요.</p>
      </Card>

      <div className="button-stack">
        <Button
          onClick={() => {
            clearSession();
            router.push("/transfer");
          }}
        >
          처음으로
        </Button>
      </div>
    </main>
  );
}
