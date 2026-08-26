"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import { clearSession, loadSession, SessionData } from "@/lib/session";

function ActionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const decision = searchParams.get("decision") === "cancel" ? "cancel" : "confirm";
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

  if (decision === "cancel") {
    return (
      <main className="screen screen-center">
        <h1 className="screen-title">송금을 취소했어요.</h1>
        <p className="body-text-muted">안전을 위해 송금이 진행되지 않았어요.</p>
        <div className="button-stack">
          <Button
            onClick={() => {
              clearSession();
              router.push("/transfer");
            }}
          >
            처음으로 돌아가기
          </Button>
          <Button variant="secondary" onClick={() => router.push("/connect")}>
            도움받기
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="screen screen-center">
      <h1 className="screen-title">
        한 번 더 확인했어요.
        <br />
        송금을 진행합니다.
      </h1>
      <div className="button-stack">
        <Button onClick={() => router.push("/complete")}>송금 완료 확인하기</Button>
        <Button variant="secondary" onClick={() => router.push("/connect")}>
          도움받기
        </Button>
      </div>
    </main>
  );
}

export default function ActionPage() {
  return (
    <Suspense fallback={null}>
      <ActionContent />
    </Suspense>
  );
}
