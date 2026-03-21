"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getMatch, getTeams, updateMatch } from "@/lib/data";
import { Match, Team } from "@/lib/types";
import { Button, Input, Select, Card } from "@/components/ui";
import { formatDateTimeForInput } from "@/lib/utils";

export default function EditMatchPage() {
  const router = useRouter();
  const params = useParams();
  const competitionId = params.id as string;
  const matchId = params.matchId as string;

  const [match, setMatch] = useState<Match | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [homeScore, setHomeScore] = useState<string>("");
  const [awayScore, setAwayScore] = useState<string>("");
  const [status, setStatus] = useState<"scheduled" | "finished">("scheduled");
  const [startAt, setStartAt] = useState("");
  const [venue, setVenue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const matchData = getMatch(matchId);
    const teamsData = getTeams();

    if (matchData) {
      setMatch(matchData);
      setHomeScore(matchData.homeScore?.toString() || "");
      setAwayScore(matchData.awayScore?.toString() || "");
      setStatus(matchData.status);
      setStartAt(formatDateTimeForInput(matchData.startAt));
      setVenue(matchData.venue || "");
    }

    setTeams(teamsData);
    setLoading(false);
  }, [matchId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const homeScoreNum = homeScore === "" ? null : parseInt(homeScore, 10);
    const awayScoreNum = awayScore === "" ? null : parseInt(awayScore, 10);

    updateMatch(matchId, {
      homeScore: homeScoreNum,
      awayScore: awayScoreNum,
      status,
      startAt: new Date(startAt).toISOString(),
      venue: venue || undefined,
    });

    router.push(`/competitions/${competitionId}`);
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (!match) {
    return <div>試合が見つかりません</div>;
  }

  const getTeamName = (teamId: string) => {
    const team = teams.find((t) => t.id === teamId);
    return team?.name || "不明";
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">試合の編集</h1>

      <Card>
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <div className="text-center">
            <span className="font-bold">{getTeamName(match.homeTeamId)}</span>
            <span className="mx-4">vs</span>
            <span className="font-bold">{getTeamName(match.awayTeamId)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={`${getTeamName(match.homeTeamId)} の得点`}
              name="homeScore"
              type="number"
              value={homeScore}
              onChange={(e) => setHomeScore(e.target.value)}
              placeholder="0"
            />

            <Input
              label={`${getTeamName(match.awayTeamId)} の得点`}
              name="awayScore"
              type="number"
              value={awayScore}
              onChange={(e) => setAwayScore(e.target.value)}
              placeholder="0"
            />
          </div>

          <Select
            label="試合状態"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            options={[
              { value: "scheduled", label: "予定" },
              { value: "finished", label: "終了" },
            ]}
          />

          <Input
            label="試合日時"
            name="startAt"
            type="datetime-local"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
          />

          <Input
            label="会場"
            name="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
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
