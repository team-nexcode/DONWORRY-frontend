"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function ConnectPage() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);

  return (
    <main className="screen">
      <h1 className="screen-title">
        혼자 결정하기 어렵다면
        <br />
        도움을 받을 수 있어요.
      </h1>

      <div className="button-stack">
        <Button onClick={() => setMessage("가족에게 확인 요청을 보냈어요.")}>가족에게 확인하기</Button>
        <Button variant="secondary" onClick={() => setMessage("상담사와 연결하고 있어요.")}>
          상담 연결하기
        </Button>
        <Button variant="danger" onClick={() => router.push("/action?decision=cancel")}>
          송금 취소하기
        </Button>
      </div>

      {message && (
        <Card>
          <p className="body-text">{message}</p>
        </Card>
      )}
    </main>
  );
}
