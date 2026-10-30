import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "registrations.json");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields server-side
    const required = ["fullName", "school", "grade", "phone", "email", "facebook", "primaryTeam", "commitment"];
    for (const field of required) {
      if (!body[field] || String(body[field]).trim() === "") {
        return NextResponse.json({ error: `Thiếu trường bắt buộc: ${field}` }, { status: 400 });
      }
    }
    if (!/^[0-9]{10}$/.test(body.phone)) {
      return NextResponse.json({ error: "Số điện thoại phải đúng 10 chữ số." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Email không hợp lệ." }, { status: 400 });
    }

    // Read existing data
    let registrations: unknown[] = [];
    try {
      const raw = await fs.readFile(DATA_FILE, "utf-8");
      registrations = JSON.parse(raw);
    } catch {
      registrations = [];
    }

    // Append new registration
    const entry = {
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      ...body,
    };
    registrations.push(entry);

    // Write back
    await fs.writeFile(DATA_FILE, JSON.stringify(registrations, null, 2), "utf-8");

    return NextResponse.json({ success: true, id: entry.id }, { status: 201 });
  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ, vui lòng thử lại." }, { status: 500 });
  }
}

export async function GET() {
  // Simple viewer for admin (no auth — internal use only)
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const registrations = JSON.parse(raw);
    return NextResponse.json({ count: registrations.length, data: registrations });
  } catch {
    return NextResponse.json({ count: 0, data: [] });
  }
}
