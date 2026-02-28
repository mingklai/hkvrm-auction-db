"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
      <header className="w-full py-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/offical logo white.png"
              alt="HKVRMAD Logo"
              width={400}
              height={150}
              className="h-auto w-auto max-w-sm"
            />
          </div>
            <p className="text-4xl font-semibold text-black dark:text-zinc-50">香港車牌拍賣資料庫</p>
            <p className="mt-2 text-2xl text-zinc-600 dark:text-zinc-400">Hong Kong Vehicle Registration Mark Auction Database</p>
            <p className="mt-4 text-sm text-red-500 dark:text-blue-500">目前只包含所有《拍牌易》的網上拍賣記錄，未來將持續更新更多資料。</p>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 px-4 py-6 justify-center items-stretch md:flex-row md:items-start md:py-8">
        {/* 左側搜尋表單 */}
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
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => router.push("/contact")}
                className="flex-1 rounded-md px-4 py-3 text-black hover:opacity-95" style={{ backgroundColor: "rgb(250, 222, 75)" }}>
                Buy me a coffee
              </button>
            </div>
          </form>

          <div className="mt-6 min-h-[3rem]">
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        </main>

        {/* 右側公告欄 */}
        <aside className="w-full md:w-80 rounded-lg bg-white/80 p-6 shadow-md backdrop-blur-sm dark:bg-black/60">
          <h2 className="mb-4 text-xl font-semibold text-black dark:text-zinc-50">
            最新公告
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm font-medium text-black dark:text-zinc-50">
                數據更新
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                 資料庫已於12/02/2026更新<br></br>包含05/02/2026 - 09/02/2026的車牌拍賣記錄。
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm font-medium text-black dark:text-zinc-50">
                功能提示
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                在左側搜尋方塊輸入車牌號碼，即可查詢相關信息。
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <p className="text-sm font-medium text-black dark:text-zinc-50">
                系統訊息
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                歡迎使用香港車牌拍賣資料庫。如有問題/合作，請聯絡我們。
              <a href="mailto:hkvrmad@gmail.com" className="text-blue-600 hover:underline dark:text-blue-400">
                hkvrmad@gmail.com
              </a>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
