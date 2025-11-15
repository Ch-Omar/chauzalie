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
