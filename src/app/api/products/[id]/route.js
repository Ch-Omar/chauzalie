import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { createConnection } from "@/app/lib/lib";

export async function DELETE(req, { params }) {
  try {
    const unwrappedParams = await params; // <-- unwrap the promise
    const { id } = unwrappedParams;

    if (!id) {
      return NextResponse.json({ message: "ID not provided" }, { status: 400 });
    }

    const db = await createConnection();

    const [result] = await db.query("DELETE FROM products WHERE id = ?", [
      Number(id),
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const unwrappedParams = await params;
    const { id } = unwrappedParams;

    if (!id) {
      return NextResponse.json({ message: "ID not provided" }, { status: 400 });
    }

    const form = await req.formData();
    const name = (form.get("name") || "").toString().trim();
    const description = (form.get("description") || "").toString();
    const price = form.get("price");
    const category = (form.get("category") || "").toString();
    const stock = form.get("stock");
    const imageFile = form.get("image");

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

    const fields = [];
    const values = [];

    if (name) { fields.push("name = ?"); values.push(name); }
    if (description !== undefined) { fields.push("description = ?"); values.push(description || null); }
    if (!Number.isNaN(priceNum)) { fields.push("price = ?"); values.push(priceNum); }
    if (category !== undefined) { fields.push("category = ?"); values.push(category || null); }
    if (!Number.isNaN(stockNum)) { fields.push("stock = ?"); values.push(stockNum); }
    if (savedImagePath) { fields.push("image = ?"); values.push(savedImagePath); }

    if (fields.length === 0) {
      return NextResponse.json({ message: "Nothing to update" }, { status: 400 });
    }

    const db = await createConnection();
    const sql = `UPDATE products SET ${fields.join(", ")} WHERE id = ?`;
    values.push(Number(id));

    const [result] = await db.query(sql, values);
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product updated" });
  } catch (error) {
    console.error("PUT /api/products/[id] failed", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
