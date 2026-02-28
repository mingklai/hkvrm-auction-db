"use client";

import { useState } from "react";
import Image from "next/image";


const BTC_ADDRESS = "bc1p292vrzrl596j4mgxnku8grg706cwk4w6v48dy3jruvh6023yhd3sepf8hm";
const ETH_ADDRESS = "0xc1969DCdEfD7ddB8675fb982cce920742Ca0Daa2";
const SOL_ADDRESS = "C7L2xxJV7GcqvMbsgx1UDiMPU5n99mcRG9g7nLCv7fTh";

function CryptoItem({
  label,
  imgSrc,
  alt,
  address,
}: {
  label: string;
  imgSrc: string;
  alt: string;
  address: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-md bg-white/70 p-2 dark:bg-zinc-900/70">
      <div className="shrink-0 bg-white p-2 rounded-md shadow-sm dark:bg-zinc-900">
        <Image src={imgSrc} alt={alt} width={90} height={90} className="h-auto w-auto" />
      </div>
      <div className="flex flex-col text-left">
        <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
          {label}
        </p>
        {address && (
          <>
            <div className="mt-1 w-full rounded-md border border-zinc-300 bg-zinc-50 px-2 py-1 text-[10px] text-zinc-700 break-all dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              {address}
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="mt-1 self-start rounded-full border border-zinc-300 px-2 py-0.5 text-[10px] text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              {copied ? "已複製" : "複製地址"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black px-4">
      <div className="w-full max-w-xl rounded-lg bg-white/80 p-8 shadow-md backdrop-blur-sm dark:bg-black/60">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50 text-center">
          支持與聯絡
        </h1>
        <p className="mt-4 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
          多謝你考慮支持
          <span className="font-semibold"> 香港車牌拍賣資料庫 </span>
          的開發和維護。
        </p>
        <p className="mt-4 text-sm text-zinc-700 dark:text-zinc-300">
          如有任何查詢、建議或合作意向，歡迎電郵至：
        </p>
        <p className="mt-2 text-sm">
          <a
            href="mailto:hkvrmad@gmail.com"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            hkvrmad@gmail.com
          </a>
        </p>

        <div className="mt-8 border-t border-zinc-200 pt-6 dark:border-zinc-700">
          <h2 className="text-lg font-semibold text-black dark:text-zinc-50 text-center">
            Crypto 支持
          </h2>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 text-center">
            可使用錢包掃描下列 QR Code 或複製地址進行自願支持。
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4">
            <CryptoItem
              label="Bitcoin (BTC)"
              imgSrc="/crypto/BTC_QRCODE.png"
              alt="Bitcoin QR code"
              address={BTC_ADDRESS}
            />
            <CryptoItem
              label="Ethereum (ETH)"
              imgSrc="/crypto/ETH_QRCODE.png"
              alt="Ethereum QR code"
              address={ETH_ADDRESS}
            />
            <CryptoItem
              label="Solana (SOL)"
              imgSrc="/crypto/SOL_QRCODE.png"
              alt="Solana QR code"
              address={SOL_ADDRESS}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="/"
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            返回首頁
          </a>
        </div>
      </div>
    </div>
  );
}
