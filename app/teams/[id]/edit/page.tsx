"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getTeam, updateTeam } from "@/lib/data";
import { Button, Input, Card } from "@/components/ui";

export default function EditTeamPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const team = getTeam(id);
    if (team) {
      setName(team.name);
      setShortName(team.shortName || "");
    }
    setLoading(false);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateTeam(id, {
      name,
      shortName: shortName || undefined,
    });

    router.push("/teams");
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">チームの編集</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <Input
            label="チーム名"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="略称"
            name="shortName"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
          />

          <div className="flex gap-2 mt-6">
            <Button type="submit">保存</Button>
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
