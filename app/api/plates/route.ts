import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const plate = searchParams.get("plate")?.toUpperCase();

    if (!plate) {
      return NextResponse.json({ error: "plate query parameter is required" }, { status: 400 });
    }

    const data = await prisma.onlineAuctionVrmData.findMany({
      where: { vrm: plate },
      orderBy: { sessionNo: "desc" },
    });

    return NextResponse.json({ plate, data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Database query failed" }, { status: 500 });
  }
}
