"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [plate, setPlate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = plate.trim().toUpperCase();
    if (!trimmed) {
      setError("請輸入車牌號碼");
      return;
    }
    setError(null);
    router.push(`/results?plate=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans dark:bg-black">
      <header className="w-full py-4">
        <div className="mx-auto max-w-xl text-center">
            <p className="text-4xl font-semibold text-black dark:text-zinc-50">香港車牌拍賣資料庫</p>
            <p className="mt-2 text-2xl text-zinc-600 dark:text-zinc-400">Hong Kong Vehicle Registration Mark Auction Database</p>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center">
        <main className="w-full max-w-xl rounded-lg bg-white/80 p-10 shadow-md backdrop-blur-sm dark:bg-black/60">
          <h1 className="mb-6 text-center text-2xl font-semibold text-black dark:text-zinc-50">
            車牌查詢
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="sr-only" htmlFor="plate">
            車牌
          </label>
          <input
            id="plate"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            placeholder="輸入車牌（例如：AB1234）"
            className="w-full rounded-md border border-zinc-200 px-4 py-3 text-lg outline-none focus:border-black/60 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-50"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 rounded-md px-4 py-3 text-white hover:opacity-95"
              style={{ backgroundColor: "rgb(1, 128, 152)" }}
            >
              查詢
            </button>
            <button
              type="button"
              onClick={() => {
                setPlate("");
                setError(null);
              }}
              className="rounded-md border border-zinc-200 px-4 py-3 hover:bg-zinc-50 dark:border-zinc-700"
            >
              清除
            </button>
          </div>
        </form>

        <div className="mt-6 min-h-[3rem]">
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        </main>
      </div>
    </div>
  );
}
