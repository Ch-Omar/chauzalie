import { NextResponse } from "next/server";
import { createConnection } from "@/app/lib/lib";

export async function GET() {
  try {
    const db = await createConnection();

    // Fetch feedback data
    const [feedback] = await db.query(
      "SELECT * FROM feedback ORDER BY id DESC"
    );

    // Convert RowDataPacket[] → plain JSON
    const feedbackList = JSON.parse(JSON.stringify(feedback));

    return NextResponse.json(feedbackList, { status: 200 });
  } catch (error) {
    console.error("GET /api/feedback failed", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
