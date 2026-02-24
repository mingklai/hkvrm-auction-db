"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface AuctionData {
  id: number;
  vrm: string;
  price: number;
  noBitsFlat: boolean;
  sessionNo: number;
}

export default function ResultsClient({ initialPlate }: { initialPlate: string }) {
  const [plate, setPlate] = useState(initialPlate);
  const [auctions, setAuctions] = useState<AuctionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // prevent running the same effect twice in React StrictMode during
  // development. the ref persists across mounts/unmounts of the component.
  const fetchedOnce = useRef(false);

  useEffect(() => {
    if (!plate) {
      setLoading(false);
      return;
    }
    if (fetchedOnce.current) return; // already fetched for this plate
    fetchedOnce.current = true;

    const fetchAuctions = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/plates?plate=${encodeURIComponent(plate)}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const result = await res.json();
        setAuctions(result.data || []);
      } catch (err) {
        setError("無法獲取資料");
        setAuctions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, [plate]);

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
          <h1 className="mb-4 text-center text-2xl font-semibold text-black dark:text-zinc-50">查詢結果</h1>

          {!plate ? (
            <p className="text-sm text-zinc-700 dark:text-zinc-200">沒有車牌編號。</p>
          ) : loading ? (
            <p className="text-sm text-zinc-700 dark:text-zinc-200">讀取中...</p>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : auctions.length === 0 ? (
            <p className="text-sm text-zinc-700 dark:text-zinc-200">找不到該車牌的拍賣紀錄。</p>
          ) : (
            <>
              <p className="mb-4 text-lg">車牌：<span className="font-medium">{plate}</span></p>
              <div className="space-y-3">
                {auctions.map((a) => (
                  <div key={a.id} className="rounded-md border border-zinc-200 p-3 dark:border-zinc-700">
                    <p className="text-sm text-zinc-700 dark:text-zinc-200">場次：{a.sessionNo}</p>
                    <p className="text-sm text-zinc-700 dark:text-zinc-200">成交價：HK${a.price.toLocaleString()}</p>
                    <p className="text-sm text-zinc-700 dark:text-zinc-200">無位數：{a.noBitsFlat ? "是" : "否"}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="mt-6 flex gap-3">
            <Link href="/" className="rounded-md border border-zinc-200 px-4 py-3 hover:bg-zinc-50 dark:border-zinc-700">回到查詢</Link>
          </div>

          {/* 車牌範例 */}
          <div className="mt-10 border-t border-zinc-200 dark:border-zinc-700 pt-6">
            <p className="mb-4 text-center text-sm font-medium text-zinc-700 dark:text-zinc-300">車牌範例</p>
            <div className="flex flex-col gap-4">
              {/* 白底車牌 */}
              <div className="flex items-center justify-center">
                <div className="relative w-60 h-16 bg-white border-4 border-black rounded-md shadow-md flex items-center justify-center px-2">
                  {/* 車牌號碼 */}
                  <div className="font-mono text-4xl font-bold text-black tracking-widest">{plate}</div>
                </div>
              </div>

              {/* 黃底車牌 */}
              <div className="flex items-center justify-center">
                <div className="relative w-60 h-16 bg-yellow-300 border-4 border-black rounded-md shadow-md flex items-center justify-center px-2">
                  {/* 車牌號碼 */}
                  <div className="font-mono text-4xl font-bold text-black tracking-widest">{plate}</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}