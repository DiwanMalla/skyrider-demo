import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), "public", "images", "home");
    const exists = fs.existsSync(publicDir);
    if (!exists) return NextResponse.json([], { status: 200 });

    const files = await fs.promises.readdir(publicDir);
    // filter common image extensions
    const imgs = files.filter((f) => /\.(jpe?g|png|webp|avif|gif)$/i.test(f));
    imgs.sort();
    return NextResponse.json(imgs, { status: 200 });
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
