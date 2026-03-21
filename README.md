# match-manager（フロントエンド完結版）

「Reactで作る！フロントエンド完結アプリ開発」のサンプルコードです。

## 機能

- 大会の作成・編集・削除
- チームの管理
- 試合の登録・スコア入力
- 順位表の自動計算（勝点・得失点差・総得点でソート）

## 技術スタック

- Next.js 15 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- localStorage（データ永続化）

## セットアップ

```bash
npm install
npm run dev
```

http://localhost:3000 でアプリが起動します。

## ディレクトリ構成

```
match-manager/
├── app/                    # ページ
│   ├── competitions/       # 大会関連ページ
│   ├── teams/              # チーム関連ページ
│   ├── layout.tsx          # 全体レイアウト
│   └── page.tsx            # ダッシュボード
├── components/             # 共通コンポーネント
│   ├── ui/                 # 汎用UIコンポーネント
│   ├── layout/             # レイアウト関連
│   └── StandingsTable.tsx  # 順位表コンポーネント
└── lib/                    # ユーティリティ・ロジック
    ├── types.ts            # 型定義
    ├── data.ts             # データ管理（localStorage）
    ├── standings.ts        # 順位計算
    └── utils.ts            # ユーティリティ関数
```

## 対応する書籍

https://zenn.dev/and_and_and/books/react-frontend-development
