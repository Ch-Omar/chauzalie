import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file received" }, { status: 400 });
    }

    // Enforce server-side validation
    const MAX_BYTES = 5 * 1024 * 1024; // 5MB
    if (!(file.type && file.type.startsWith("image/"))) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 415 });
    }
    const bytes = await file.arrayBuffer();
    if (bytes.byteLength > MAX_BYTES) {
      return NextResponse.json({ error: "File too large" }, { status: 413 });
    }
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${crypto.randomUUID()}${path.extname(file.name || "")}`;
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);

    await writeFile(filePath, buffer);

    const url = `/uploads/${fileName}`;

    return NextResponse.json({ url }); // ensure file ends with newline and consistent formatting
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
