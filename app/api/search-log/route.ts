import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { vrm } = await request.json();

    if (!vrm || typeof vrm !== "string") {
      return NextResponse.json(
        { error: "VRM is required and must be a string" },
        { status: 400 }
      );
    }

    // 記錄搜尋
    const log = await prisma.onlineAuctionVrmSearchingLog.create({
      data: {
        vrm: vrm.trim().toUpperCase(),XMLDocument
      },
    });

    return NextResponse.json(log, { status: 201 });
  } catch (error) {
    console.error("Error logging search:", error);
    return NextResponse.json(
      { error: "Failed to log search" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const logs = await prisma.onlineAuctionVrmSearchingLog.findMany({
      orderBy: {
        datetime: "desc",
      },
      take: 100, // 取最新 100 筆
    });

    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    console.error("Error fetching search logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch search logs" },
      { status: 500 }
    );
  }
}
