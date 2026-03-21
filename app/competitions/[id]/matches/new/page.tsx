"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCompetition, getTeams, saveMatch } from "@/lib/data";
import { Team, Competition } from "@/lib/types";
import { Button, Input, Select, Card } from "@/components/ui";
import { formatDateTimeForInput, getCurrentTimestamp } from "@/lib/utils";

export default function NewMatchPage() {
  const router = useRouter();
  const params = useParams();
  const competitionId = params.id as string;

  const [competition, setCompetition] = useState<Competition | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [homeTeamId, setHomeTeamId] = useState("");
  const [awayTeamId, setAwayTeamId] = useState("");
  const [startAt, setStartAt] = useState(formatDateTimeForInput(getCurrentTimestamp()));
  const [venue, setVenue] = useState("");

  useEffect(() => {
    setCompetition(getCompetition(competitionId) || null);
    setTeams(getTeams());
  }, [competitionId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (homeTeamId === awayTeamId) {
      alert("ホームとアウェイには異なるチームを選択してください");
      return;
    }

    saveMatch({
      competitionId,
      homeTeamId,
      awayTeamId,
      homeScore: null,
      awayScore: null,
      status: "scheduled",
      startAt: new Date(startAt).toISOString(),
      venue: venue || undefined,
    });

    router.push(`/competitions/${competitionId}`);
  };

  const teamOptions = teams.map((team) => ({
    value: team.id,
    label: team.name,
  }));

  if (!competition) {
    return <div>大会が見つかりません</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">試合の登録</h1>
      <p className="text-gray-600 mb-6">{competition.name}</p>

      <Card>
        <form onSubmit={handleSubmit}>
          <Select
            label="ホームチーム"
            name="homeTeamId"
            value={homeTeamId}
            onChange={(e) => setHomeTeamId(e.target.value)}
            options={teamOptions}
            required
          />

          <Select
            label="アウェイチーム"
            name="awayTeamId"
            value={awayTeamId}
            onChange={(e) => setAwayTeamId(e.target.value)}
            options={teamOptions}
            required
          />

          <Input
            label="試合日時"
            name="startAt"
            type="datetime-local"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
            required
          />

          <Input
            label="会場"
            name="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            placeholder="例: 市民体育館"
          />

          <div className="flex gap-2 mt-6">
            <Button type="submit">登録</Button>
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
