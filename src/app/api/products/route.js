import { NextResponse } from "next/server";
import { createConnection } from "@/app/lib/lib";
import { v2 as cloudinary } from "cloudinary";

export async function GET() {
  try {
    const db = await createConnection();

    // Fetch products
    const [products] = await db.query(
      "SELECT * FROM products ORDER BY id DESC"
    );

    // products may be RowDataPacket[], convert to plain JSON
    const productList = JSON.parse(JSON.stringify(products));

    return NextResponse.json(productList, { status: 200 });
  } catch (error) {
    console.error("GET /api/products failed", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// // Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const form = await req.formData();

    const name = (form.get("name") || "").toString().trim();
    const description = (form.get("description") || "").toString();
    const price = form.get("price");
    const category = (form.get("category") || "").toString();
    const stock = form.get("stock");
    const imageFile = form.get("image");

    let imageUrl = null;

    // ---------- CLOUDINARY UPLOAD ----------
    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Cloudinary upload_stream Promise wrapper
      imageUrl = await new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );

        upload.end(buffer);
      });
    }
    // ---------------------------------------

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
      imageUrl, // <─ Save only URL
    ]);

    return NextResponse.json(
      {
        message: "Product added",
        id: result.insertId,
        image: imageUrl,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/products failed", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
