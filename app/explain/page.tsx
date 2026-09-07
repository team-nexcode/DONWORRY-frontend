"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { loadSession, SessionData } from "@/lib/session";

export default function ExplainPage() {
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

  return (
    <main className="screen">
      <h1 className="screen-title">왜 확인이 필요한가요?</h1>
      <p className="body-text-muted">
        주의가 필요한 송금이에요. 평소와 다른 점이 있어 한 번 더 확인해볼게요.
      </p>

      <div className="reason-list">
        {session.risk.reasons.map((reason) => (
          <Card key={reason.type}>
            <p className="reason-title">{reason.title}</p>
            <p className="reason-description">{reason.description}</p>
          </Card>
        ))}
      </div>

      <div className="button-stack">
        <Button onClick={() => router.push("/recheck")}>확인했어요</Button>
      </div>
    </main>
  );
}
