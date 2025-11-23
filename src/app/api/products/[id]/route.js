import { NextResponse } from "next/server";
import { createConnection } from "@/app/lib/lib";
import { v2 as cloudinary } from "cloudinary";

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
// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(req, route) {
  try {
    const params = await route.params;
    console.log("params:", params);

    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "ID not provided" }, { status: 400 });
    }

    const form = await req.formData();
    const name = (form.get("name") || "").toString().trim();
    const description = (form.get("description") || "").toString();
    const price = Number(form.get("price"));
    const category = (form.get("category") || "").toString();
    const stock = Number(form.get("stock"));
    const imageFile = form.get("image");

    let imageUrl = null;

    // -------- CLOUDINARY UPLOAD IF PROVIDED --------
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

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
    // ------------------------------------------------

    // Build update list dynamically
    const fields = [];
    const values = [];

    if (name) {
      fields.push("name = ?");
      values.push(name);
    }
    fields.push("description = ?");
    values.push(description || null);

    if (!isNaN(price)) {
      fields.push("price = ?");
      values.push(price);
    }
    fields.push("category = ?");
    values.push(category || null);

    if (!isNaN(stock)) {
      fields.push("stock = ?");
      values.push(stock);
    }

    if (imageUrl) {
      fields.push("image = ?");
      values.push(imageUrl);
    }

    if (fields.length === 0) {
      return NextResponse.json(
        { message: "Nothing to update" },
        { status: 400 }
      );
    }

    const db = await createConnection();

    const sql = `UPDATE products SET ${fields.join(", ")} WHERE id = ?`;
    values.push(Number(id));

    const [result] = await db.query(sql, values);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("PUT /api/products/[id] failed", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
