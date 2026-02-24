import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "香港車牌拍賣資料庫",
  description: "香港車牌拍賣資料庫是一個專注於提供香港車牌拍賣歷史數據的網站，旨在幫助用戶查詢特定車牌的拍賣價格和相關信息。數據來源主要來自《拍牌易》的網上拍賣記錄，未來將持續更新更多資料。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
