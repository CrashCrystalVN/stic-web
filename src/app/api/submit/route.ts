import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "registrations.json");
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfEfAvIevbb0BFHFixLPn7TAy64tkk0lYzLv8ohGfm2EmizBw/formResponse";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validate required fields server-side
    const required = ["fullName", "grade", "phone", "email", "facebook", "reason", "ideaExecution", "commitment"];
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

    // 2. Read existing data and save locally
    let registrations: unknown[] = [];
    try {
      const raw = await fs.readFile(DATA_FILE, "utf-8");
      registrations = JSON.parse(raw);
    } catch {
      registrations = [];
    }

    const entry = {
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      ...body,
    };
    registrations.push(entry);

    try {
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.writeFile(DATA_FILE, JSON.stringify(registrations, null, 2), "utf-8");
    } catch (fsErr) {
      console.error("Local file write error:", fsErr);
    }

    // 3. Real-time Live Sync to Google Form:
    // Sends exact Google Form entries mapped to fields:
    // entry.2005620554 -> Họ và tên
    // entry.1065046570 -> Lớp
    // entry.1045781291 -> Email
    // entry.1166974658 -> Link facebook
    // entry.839337160  -> Số điện thoại
    // entry.25400531   -> 2. Bạn muốn tham gia vì gì?
    // entry.352066020  -> 3. Sở thích & kỹ năng
    // entry.655844835  -> Bạn đã từng tham gia CLB/dự án/cuộc thi nào chưa?
    // entry.1094832172 -> Bạn đã từng làm project STEM/KHKT chưa?
    // entry.1786574990 -> Nếu có, hãy mô tả ngắn về dự án đó
    // entry.1623231100 -> Ý tưởng KHKT chưa biết cách thực hiện...
    // entry.1860646974 -> Cam kết thời gian
    let googleSynced = false;
    try {
      const gformData = new URLSearchParams();
      gformData.append("entry.2005620554", body.fullName || "");
      gformData.append("entry.1065046570", body.grade || "");
      gformData.append("entry.1045781291", body.email || "");
      gformData.append("entry.1166974658", body.facebook || "");
      gformData.append("entry.839337160", body.phone || "");
      gformData.append("entry.25400531", body.reason || "");

      if (Array.isArray(body.interests) && body.interests.length > 0) {
        for (const item of body.interests) {
          gformData.append("entry.352066020", item);
        }
      } else if (body.interests) {
        gformData.append("entry.352066020", body.interests);
      } else {
        gformData.append("entry.352066020", "💡 Innovation & Creative Projects");
      }

      gformData.append("entry.655844835", body.pastClubExperience || "Chưa từng");
      gformData.append("entry.1094832172", body.pastStemExperience || "Chưa từng");
      if (body.projectDescription) {
        gformData.append("entry.1786574990", body.projectDescription);
      }
      gformData.append("entry.1623231100", body.ideaExecution || "");
      gformData.append("entry.1860646974", body.commitment || "Có thể tham gia thường xuyên");

      const gRes = await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: gformData.toString(),
      });
      googleSynced = gRes.ok || gRes.status === 200 || gRes.status === 302;
    } catch (gerr) {
      console.warn("Google Form sync warning:", gerr);
    }

    return NextResponse.json(
      {
        success: true,
        id: entry.id,
        googleSynced,
        message: "Đơn tuyển thành viên đã được lưu trữ và đồng bộ với Google Form của CLB STIC.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ, vui lòng thử lại." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const registrations = JSON.parse(raw);
    return NextResponse.json({ count: registrations.length, data: registrations });
  } catch {
    return NextResponse.json({ count: 0, data: [] });
  }
}
