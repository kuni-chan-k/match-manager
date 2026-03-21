import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white">
      <div className="px-4 py-3">
        <Link href="/" className="text-xl font-bold">
          大会管理サービス
        </Link>
      </div>
    </header>
  );
}
