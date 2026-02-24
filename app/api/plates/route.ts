import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Sample data for testing
const SAMPLE_DATA = [
  {
    id: 1,
    vrm: "TEST01",
    price: 125000,
    noBitsFlat: false,
    sessionNo: 202602001,
  },
  {
    id: 2,
    vrm: "TEST01",
    price: 98500,
    noBitsFlat: true,
    sessionNo: 202601015,
  },
  {
    id: 3,
    vrm: "TEST01",
    price: 142000,
    noBitsFlat: false,
    sessionNo: 202512008,
  },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const plate = searchParams.get("plate")?.toUpperCase().trim();

    if (!plate) {
      return NextResponse.json({ error: "plate query parameter is required" }, { status: 400 });
    }

    // Handle test case: TEST01 returns sample data without database query
    if (plate === "TEST01") {
      return NextResponse.json({ plate, data: SAMPLE_DATA });
    }

    const data = await prisma.onlineAuctionVrmData.findMany({
      where: { vrm: plate },
      orderBy: { sessionNo: "desc" },
    });

    const log = await prisma.onlineAuctionVrmSearchingLog.create({
      data: {
        vrm: plate,
      },
    });

    return NextResponse.json({ plate, data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Database query failed" }, { status: 500 });
  }
}
