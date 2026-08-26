"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { loadSession, SessionData } from "@/lib/session";

export default function RecheckPage() {
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
    <main className="screen">
      <h1 className="screen-title">
        이 송금,
        <br />
        정말 본인이 요청한 건가요?
      </h1>

      <Card>
        <dl className="info-list">
          <div className="info-row">
            <dt>받는 사람</dt>
            <dd>{transaction.receiver}</dd>
          </div>
          <div className="info-row">
            <dt>계좌번호</dt>
            <dd>{transaction.receiverAccount}</dd>
          </div>
        </dl>
        <p className="amount-label">금액</p>
        <p className="amount-value">{transaction.amount.toLocaleString("ko-KR")}원</p>
      </Card>

      <div className="button-stack">
        <Button onClick={() => router.push("/action?decision=confirm")}>확인했어요</Button>
        <Button variant="secondary" onClick={() => router.push("/action?decision=cancel")}>
          송금을 취소할게요
        </Button>
      </div>
    </main>
  );
}
