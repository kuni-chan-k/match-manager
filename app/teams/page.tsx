"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Team } from "@/lib/types";
import { getTeams, deleteTeam } from "@/lib/data";
import { Button, Card, Table } from "@/components/ui";
import { formatDate } from "@/lib/utils";

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    setTeams(getTeams());
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm("このチームを削除しますか？")) return;

    deleteTeam(id);
    setTeams(getTeams());
  };

  const columns = [
    { key: "name", header: "チーム名" },
    { key: "shortName", header: "略称" },
    {
      key: "createdAt",
      header: "登録日",
      render: (item: Team) => formatDate(item.createdAt),
    },
    {
      key: "actions",
      header: "操作",
      render: (item: Team) => (
        <div className="flex gap-2">
          <Link href={`/teams/${item.id}/edit`}>
            <Button variant="secondary">編集</Button>
          </Link>
          <Button variant="danger" onClick={() => handleDelete(item.id)}>
            削除
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">チーム一覧</h1>
        <Link href="/teams/new">
          <Button>新規作成</Button>
        </Link>
      </div>

      <Card>
        <Table
          columns={columns}
          data={teams}
          emptyMessage="チームがありません。「新規作成」から追加してください。"
        />
      </Card>
    </div>
  );
}
