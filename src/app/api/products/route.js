import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { createConnection } from "@/app/lib/lib";

export async function GET() {
  try {
    const db = await createConnection();
    const [products] = await db.query("SELECT * FROM products");
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const form = await req.formData();

    const name = (form.get("name") || "").toString().trim();
    const description = (form.get("description") || "").toString();
    const price = form.get("price");
    const category = (form.get("category") || "").toString();
    const stock = form.get("stock");
    const imageFile = form.get("image"); // ONE IMAGE

    let savedImagePath = null;

    if (imageFile && imageFile.name) {
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const ext = path.extname(imageFile.name || "");
      const safeName = `${Date.now()}-${crypto.randomUUID()}${ext}`;
      const filePath = path.join(uploadDir, safeName);

      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await fs.promises.writeFile(filePath, buffer);

      savedImagePath = `/uploads/${safeName}`;
    }

    const priceNum = Number(price);
    const stockNum = Number(stock);
    if (!name || Number.isNaN(priceNum) || Number.isNaN(stockNum)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // SAVE TO DATABASE
    const db = await createConnection();

    const sql = `
      INSERT INTO products (name, description, price, category, stock, image)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      name,
      description ?? null,
      priceNum,
      category ?? null,
      stockNum,
      savedImagePath,
    ]);

    return NextResponse.json(
      { message: "Product added", id: result.insertId, image: savedImagePath },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/products failed", { error: err?.message });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
