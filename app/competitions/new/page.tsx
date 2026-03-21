"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveCompetition } from "@/lib/data";
import { Button, Input, Select, Card } from "@/components/ui";

export default function NewCompetitionPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [sportType, setSportType] = useState<"football" | "tabletennis" | "other">("football");
  const [season, setSeason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    saveCompetition({
      name,
      sportType,
      season: season || undefined,
    });

    router.push("/competitions");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">大会の新規作成</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <Input
            label="大会名"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="例: 春季フットサルリーグ 2024"
          />

          <Select
            label="競技"
            name="sportType"
            value={sportType}
            onChange={(e) => setSportType(e.target.value as typeof sportType)}
            options={[
              { value: "football", label: "フットサル" },
              { value: "tabletennis", label: "卓球" },
              { value: "other", label: "その他" },
            ]}
            required
          />

          <Input
            label="シーズン"
            name="season"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            placeholder="例: 2024春"
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
