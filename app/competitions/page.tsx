"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Competition } from "@/lib/types";
import { getCompetitions, deleteCompetition } from "@/lib/data";
import { Button, Card, Table } from "@/components/ui";
import { formatDate } from "@/lib/utils";

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);

  useEffect(() => {
    setCompetitions(getCompetitions());
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm("この大会を削除しますか？")) return;

    deleteCompetition(id);
    setCompetitions(getCompetitions());
  };

  const columns = [
    { key: "name", header: "大会名" },
    {
      key: "sportType",
      header: "競技",
      render: (item: Competition) => {
        const types: Record<string, string> = {
          football: "フットサル",
          tabletennis: "卓球",
          other: "その他",
        };
        return types[item.sportType];
      },
    },
    { key: "season", header: "シーズン" },
    {
      key: "createdAt",
      header: "作成日",
      render: (item: Competition) => formatDate(item.createdAt),
    },
    {
      key: "actions",
      header: "操作",
      render: (item: Competition) => (
        <div className="flex gap-2">
          <Link href={`/competitions/${item.id}`}>
            <Button variant="secondary">詳細</Button>
          </Link>
          <Link href={`/competitions/${item.id}/edit`}>
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
        <h1 className="text-2xl font-bold">大会一覧</h1>
        <Link href="/competitions/new">
          <Button>新規作成</Button>
        </Link>
      </div>

      <Card>
        <Table
          columns={columns}
          data={competitions}
          emptyMessage="大会がありません。「新規作成」から追加してください。"
        />
      </Card>
    </div>
  );
}
