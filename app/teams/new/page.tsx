"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveTeam } from "@/lib/data";
import { Button, Input, Card } from "@/components/ui";

export default function NewTeamPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    saveTeam({
      name,
      shortName: shortName || undefined,
    });

    router.push("/teams");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">チームの新規作成</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <Input
            label="チーム名"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="例: FC レッドスター"
          />

          <Input
            label="略称"
            name="shortName"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
            placeholder="例: RST"
          />

          <div className="flex gap-2 mt-6">
            <Button type="submit">作成</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
            >
              キャンセル
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
