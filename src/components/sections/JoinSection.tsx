"use client";

import React, { useState } from "react";
import {
  CheckCircle2, Send, Sparkles, User, Phone, Lightbulb,
  ExternalLink, RotateCcw, Check, AlertCircle, X, ShieldAlert,
  GraduationCap, Info, HelpCircle, Mail, MapPin, Compass
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { CountdownTimer } from "@/components/common/CountdownTimer";

export interface STICApplicationData {
  fullName: string;
  grade: string;
  email: string;
  facebook: string;
  phone: string;
  reason: string;
  interests: string[];
  pastClubExperience: string; // "Đã từng" | "Chưa từng"
  pastStemExperience: string; // "Đã từng" | "Chưa từng"
  projectDescription: string;
  ideaExecution: string;
  commitment: string; // "Có thể tham gia thường xuyên" | "Có thể tham gia nhưng cần sắp xếp lịch" | "Chưa chắc về thời gian"
}

const INITIAL_FORM: STICApplicationData = {
  fullName: "",
  grade: "",
  email: "",
  facebook: "",
  phone: "",
  reason: "",
  interests: ["💡 Innovation & Creative Projects"],
  pastClubExperience: "Chưa từng",
  pastStemExperience: "Chưa từng",
  projectDescription: "",
  ideaExecution: "",
  commitment: "Có thể tham gia thường xuyên",
};

const INTEREST_OPTIONS = [
  { id: "🔬 Scientific Research", labelVi: "🔬 Nghiên cứu Khoa học (Scientific Research)", labelEn: "🔬 Scientific Research" },
  { id: "💻 Technology / Programming", labelVi: "💻 Công nghệ / Lập trình (Tech / Programming)", labelEn: "💻 Technology / Programming" },
  { id: "⚙️ Engineering / Robotics", labelVi: "⚙️ Kỹ thuật / Chế tạo Robot (Engineering / Robotics)", labelEn: "⚙️ Engineering / Robotics" },
  { id: "💡 Innovation & Creative Projects", labelVi: "💡 Dự án Đổi mới Sáng tạo (Creative Projects)", labelEn: "💡 Innovation & Creative Projects" },
  { id: "🌱 Environment & Sustainability", labelVi: "🌱 Môi trường & Bền vững (Sustainability)", labelEn: "🌱 Environment & Sustainability" },
  { id: "🎨 Design / Media", labelVi: "🎨 Thiết kế & Truyền thông (Design / Media)", labelEn: "🎨 Design / Media" },
  { id: "📊 Data / Analysis", labelVi: "📊 Dữ liệu & Phân tích (Data / Analysis)", labelEn: "📊 Data / Analysis" },
  { id: "🧪 Experiments / STEM", labelVi: "🧪 Thí nghiệm & STEM thực hành (Experiments / STEM)", labelEn: "🧪 Experiments / STEM" },
];

const COMMITMENT_OPTIONS = [
  { value: "Có thể tham gia thường xuyên", labelVi: "Có thể tham gia thường xuyên (Ưu tiên)", labelEn: "Can participate regularly (Preferred)" },
  { value: "Có thể tham gia nhưng cần sắp xếp lịch", labelVi: "Có thể tham gia nhưng cần sắp xếp lịch", labelEn: "Can participate but need to balance schedule" },
  { value: "Chưa chắc về thời gian", labelVi: "Chưa chắc về thời gian", labelEn: "Not sure about time availability yet" },
];

type FieldErrors = Partial<Record<keyof STICApplicationData, string>>;

const inputBase =
  "w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900/60 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all";
const inputOk = "border-slate-200 dark:border-slate-700/80 focus:border-blue-400 dark:focus:border-blue-600";
const inputErr = "border-rose-400 dark:border-rose-600 focus:ring-rose-400/30";

function cls(err?: string) {
  return `${inputBase} ${err ? inputErr : inputOk}`;
}

// ── Confirmation Modal ────────────────────────────────────────────────────────
function ConfirmModal({
  form,
  lang,
  onConfirm,
  onCancel,
  isSubmitting,
}: {
  form: STICApplicationData;
  lang: string;
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Send className="w-5 h-5" />
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          {lang === "vi" ? "Xác nhận nộp đơn tuyển GEN 1.0?" : "Confirm GEN 1.0 Application?"}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
          {lang === "vi"
            ? "Đơn của bạn sẽ được lưu trữ an toàn và đồng bộ trực tiếp vào hệ thống Google Form của Ban chủ nhiệm CLB STIC."
            : "Your application will be stored securely and synchronized directly with the STIC Club Board's Google Form."}
        </p>

        {/* Summary Table */}
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 p-3.5 space-y-2 mb-5 text-xs">
          <Row label={lang === "vi" ? "Họ tên" : "Full Name"} value={form.fullName} />
          <Row label={lang === "vi" ? "Lớp" : "Class / Grade"} value={form.grade} />
          <Row label={lang === "vi" ? "SĐT" : "Phone"} value={form.phone} />
          <Row label="Email" value={form.email} />
          <Row label="Facebook" value={form.facebook} />
          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
              {lang === "vi" ? "Sở thích & Mảng đăng ký" : "Selected Interests"}
            </p>
            <p className="text-slate-700 dark:text-slate-200 font-medium text-[11px]">
              {form.interests.length > 0 ? form.interests.join(", ") : "—"}
            </p>
          </div>
          <Row label={lang === "vi" ? "Cam kết" : "Commitment"} value={form.commitment} />
        </div>

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer disabled:opacity-50"
          >
            {lang === "vi" ? "Kiểm tra lại" : "Back to edit"}
          </button>
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            {lang === "vi" ? "Xác nhận nộp đơn" : "Confirm & Submit"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-slate-400 dark:text-slate-500 shrink-0">{label}</span>
      <span className="text-slate-800 dark:text-slate-200 font-medium text-right truncate max-w-[65%]">
        {value || "—"}
      </span>
    </div>
  );
}

// ── Main JoinSection ──────────────────────────────────────────────────────────
export function JoinSection() {
  const { lang } = useLang();
  const [form, setForm] = useState<STICApplicationData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const [googleSynced, setGoogleSynced] = useState<boolean | null>(null);

  // Toggle Interest Checkbox
  const toggleInterest = (interestId: string) => {
    setForm((prev) => {
      const exists = prev.interests.includes(interestId);
      const newInterests = exists
        ? prev.interests.filter((item) => item !== interestId)
        : [...prev.interests, interestId];
      return { ...prev, interests: newInterests };
    });
  };

  // Validation
  const validate = (): boolean => {
    const errs: FieldErrors = {};
    const req = lang === "vi" ? "Trường này là bắt buộc." : "This field is required.";

    if (!form.fullName.trim()) errs.fullName = req;
    if (!form.grade.trim()) errs.grade = req;
    if (!form.phone.trim()) {
      errs.phone = req;
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      errs.phone = lang === "vi" ? "Số điện thoại phải đúng 10 chữ số." : "Phone must be exactly 10 digits.";
    }
    if (!form.email.trim()) {
      errs.email = req;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = lang === "vi" ? "Vui lòng nhập email hợp lệ (ví dụ: ten@gmail.com)." : "Please enter a valid email address.";
    }
    if (!form.facebook.trim()) errs.facebook = req;
    if (!form.reason.trim()) errs.reason = req;
    if (!form.ideaExecution.trim()) errs.ideaExecution = req;

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    if (validate()) {
      setShowConfirm(true);
    }
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Lỗi không xác định.");

      setGoogleSynced(data.googleSynced ?? true);
      setShowConfirm(false);
      setIsSuccess(true);
    } catch (err: unknown) {
      setShowConfirm(false);
      setServerError(err instanceof Error ? err.message : "Lỗi máy chủ, vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof STICApplicationData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((prev) => ({ ...prev, phone: digits }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const inputClass = (field: keyof STICApplicationData) => cls(errors[field]);

  return (
    <>
      <section
        id="join"
        className="relative min-h-[calc(100vh-72px)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 bg-slate-50/70 dark:bg-[#0a0f1d] border-t border-slate-100 dark:border-slate-900 transition-colors"
      >
        <div className="max-w-4xl w-full mx-auto space-y-10">
          {/* Header Banner */}
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/25 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {lang === "vi"
                  ? "ĐƠN TUYỂN THÀNH VIÊN GEN 1.0"
                  : "GEN 1.0 RECRUITMENT APPLICATION"}
              </span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              CLB KHOA HỌC KĨ THUẬT STIC
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              Science, Technology & Innovation Club — THPT Nguyễn Thượng Hiền (Đà Nẵng)
            </p>
          </div>

          {/* Countdown Timer */}
          <div>
            <CountdownTimer />
          </div>

          {/* 1. OFFICIAL CLUB OVERVIEW & REQUIREMENTS ACCORDION / CARD */}
          <div className="rounded-3xl bg-white dark:bg-[#101726] border border-slate-200/90 dark:border-white/10 p-6 sm:p-8 shadow-sm space-y-6">
            {/* Overview */}
            <div>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Info className="w-4 h-4" />
                <span>{lang === "vi" ? "📍 TỔNG QUAN CLB STIC" : "📍 CLUB OVERVIEW"}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {lang === "vi" ? (
                  <>
                    Được chính thức thành lập vào năm 2026 dưới mái trường <strong>THPT Nguyễn Thượng Hiền (Đà Nẵng)</strong>,{" "}
                    <strong>STIC (Science, Technology & Innovation Club)</strong> ra đời với sứ mệnh trở thành “bệ phóng” cho những tâm hồn đam mê khám phá và sáng tạo. Tại STIC, khoa học không còn nằm lại trên những trang sách lý thuyết khô khan, mà được biến hóa thành những trải nghiệm thực tế sống động qua các mô hình công nghệ, dự án STEM, lập trình và chế tạo robot.
                  </>
                ) : (
                  <>
                    Officially established in 2026 under the roof of <strong>Nguyen Thuong Hien High School (Da Nang)</strong>,{" "}
                    <strong>STIC (Science, Technology & Innovation Club)</strong> was born with the mission of becoming a launchpad for inquisitive minds. At STIC, science moves beyond textbooks into real-world technological innovations, STEM projects, programming, and robotics.
                  </>
                )}
              </p>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {lang === "vi" ? (
                  <>
                    Không chỉ là một sân chơi học thuật lành mạnh, STIC còn là mái nhà chung – nơi gắn kết những bạn trẻ chung chí hướng, cùng nhau rèn luyện tư duy phản biện, kỹ năng làm việc nhóm và hiện thực hóa các ý tưởng nghiên cứu khoa học kỹ thuật dành cho học sinh trung học. Nếu bạn mang trong mình tinh thần tò mò, khao khát ứng dụng công nghệ để giải quyết các vấn đề thực tiễn, STIC luôn sẵn sàng chào đón bạn bước vào hành trình bứt phá giới hạn của chính mình!
                  </>
                ) : (
                  <>
                    More than an academic club, STIC is a home that connects like-minded youths to practice critical thinking, teamwork, and turn science & engineering research into reality. If you have curiosity and hunger to apply technology to solve practical challenges, STIC welcomes you!
                  </>
                )}
              </p>
            </div>

            {/* Target & Scope */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
                <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {lang === "vi" ? "Đối tượng tuyển quân" : "Target Audience"}
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                    {lang === "vi"
                      ? "Học sinh cấp 3 trên địa bàn thành phố Đà Nẵng."
                      : "High school students across Da Nang City."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
                <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {lang === "vi" ? "Địa điểm sinh hoạt" : "Headquarters"}
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                    {lang === "vi"
                      ? "THPT Nguyễn Thượng Hiền (Đà Nẵng) & Online"
                      : "Nguyen Thuong Hien High School & Online"}
                  </p>
                </div>
              </div>
            </div>

            {/* 6 General Requirements */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>{lang === "vi" ? "📍 YÊU CẦU CHUNG (6 TIÊU CHÍ)" : "📍 GENERAL REQUIREMENTS"}</span>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>
                    {lang === "vi"
                      ? "Có tinh thần trách nhiệm cao, nghiêm túc và chủ động hoàn thành các nhiệm vụ được giao."
                      : "High sense of responsibility, serious and proactive in tasks."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>
                    {lang === "vi"
                      ? "Tôn trọng tập thể, có tinh thần làm việc nhóm và giữ thái độ văn minh, tích cực khi giao tiếp."
                      : "Respect the team, strong teamwork, and civil, positive communication."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>
                    {lang === "vi"
                      ? "Đảm bảo sắp xếp thời gian hợp lý, không để việc tham gia CLB gây ảnh hưởng tiêu cực đến kết quả học tập chính khóa trên lớp."
                      : "Balance time wisely without negatively affecting academic studies in class."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>
                    {lang === "vi"
                      ? "Có tư duy cởi mở, không ngại tiếp thu kiến thức mới, sẵn sàng đưa ra ý kiến và cùng đồng đội tìm giải pháp cho các vấn đề thực tiễn."
                      : "Open mindset, eager to learn, active problem solver."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>
                    {lang === "vi"
                      ? "Tuân thủ các quy chế, nội quy của CLB và nhà trường trong suốt quá trình sinh hoạt."
                      : "Comply strictly with school and club rules and regulations."}
                  </span>
                </li>
                <li className="flex items-start gap-2 text-blue-700 dark:text-blue-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>
                    {lang === "vi" ? (
                      <>
                        Tuân thủ các quy định các nguyên tắc <strong>liêm chính khoa học</strong> (Căn cứ Điều 4, Điều 5 Nghị định 262/2025/NĐ-CP).
                      </>
                    ) : (
                      <>
                        Comply with <strong>scientific integrity principles</strong> (Decree 262/2025/ND-CP).
                      </>
                    )}
                  </span>
                </li>
              </ul>
            </div>

            {/* Leadership Contacts */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  {lang === "vi" ? "Ban Chủ Nhiệm STIC:" : "STIC Leadership Board:"}
                </p>
                <p className="text-[11px] mt-0.5">
                  Chủ nhiệm: <strong>Lương Phú Hưng</strong> · Phó chủ nhiệm: <strong>Lê Hoài An</strong> · Điều phối viên: <strong>Trương Văn Đăng Huy</strong>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-500" />
                <a href="mailto:clbstic@gmail.com" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  clbstic@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Server Error Alert */}
          <AnimatePresence>
            {serverError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-400"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{serverError}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2. THE APPLICATION FORM (SYNCHRONIZED WITH GOOGLE FORM) */}
          <div className="bg-white dark:bg-[#101726] border border-slate-200/90 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-900/5">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {lang === "vi" ? "Nộp Đơn Tuyển Thành Công!" : "Application Submitted Successfully!"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    {lang === "vi" ? (
                      <>
                        Cảm ơn bạn <span className="font-bold text-blue-600 dark:text-blue-400">{form.fullName}</span>! Đơn của bạn đã được lưu vào hệ thống CLB STIC và đồng bộ tự động với Google Form. Ban chủ nhiệm sẽ liên hệ với bạn qua email sớm nhất.
                      </>
                    ) : (
                      <>
                        Thank you <span className="font-bold text-blue-600 dark:text-blue-400">{form.fullName}</span>! Your application has been recorded and synchronized with the STIC Google Form. We will reach out to you via email soon.
                      </>
                    )}
                  </p>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-xs text-blue-600 dark:text-blue-400 font-medium">
                    <span>✓</span>
                    <span>
                      {googleSynced
                        ? lang === "vi" ? "Đã đồng bộ Google Form thành công" : "Synced with Google Form"
                        : lang === "vi" ? "Đã lưu vào danh sách chờ duyệt" : "Saved to queue"}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-3">
                    <button
                      onClick={() => {
                        setForm(INITIAL_FORM);
                        setIsSuccess(false);
                        setErrors({});
                      }}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{lang === "vi" ? "Gửi đơn khác" : "Submit another response"}</span>
                    </button>
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSfEfAvIevbb0BFHFixLPn7TAy64tkk0lYzLv8ohGfm2EmizBw/viewform"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100 transition-all"
                    >
                      <span>{lang === "vi" ? "Xem Google Form gốc" : "Open Google Form"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmitClick}
                  className="space-y-8"
                >
                  {/* PHẦN 1: THÔNG TIN CƠ BẢN */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      <User className="w-4 h-4" />
                      <span>{lang === "vi" ? "1. Thông tin cơ bản" : "1. Basic Information"}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Họ và tên */}
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          {lang === "vi" ? "Họ và tên" : "Full Name"} <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          placeholder={lang === "vi" ? "Nguyễn Văn A" : "e.g. John Doe"}
                          className={inputClass("fullName")}
                        />
                        {errors.fullName && <ErrMsg msg={errors.fullName} />}
                      </div>

                      {/* Lớp */}
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          {lang === "vi" ? "Lớp (Khối & Trường)" : "Class / Grade & School"} <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="grade"
                          value={form.grade}
                          onChange={handleChange}
                          placeholder={lang === "vi" ? "Ví dụ: 10/1, 11A2, 10/4 THPT Nguyễn Thượng Hiền..." : "e.g. 10/1, 11A..."}
                          className={inputClass("grade")}
                        />
                        {errors.grade && <ErrMsg msg={errors.grade} />}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="example@gmail.com"
                          className={inputClass("email")}
                        />
                        {errors.email && <ErrMsg msg={errors.email} />}
                      </div>

                      {/* Số điện thoại */}
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          {lang === "vi" ? "Số điện thoại / Zalo" : "Phone / Zalo"} <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handlePhoneChange}
                          placeholder="09xxxxxxxx"
                          maxLength={10}
                          inputMode="numeric"
                          className={inputClass("phone")}
                        />
                        {errors.phone ? (
                          <ErrMsg msg={errors.phone} />
                        ) : (
                          form.phone.length > 0 && form.phone.length < 10 && (
                            <p className="text-[10px] text-amber-500 mt-1">
                              {lang === "vi" ? `Còn thiếu ${10 - form.phone.length} chữ số` : `${10 - form.phone.length} more digit(s)`}
                            </p>
                          )
                        )}
                      </div>

                      {/* Link Facebook */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Link Facebook <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="facebook"
                          value={form.facebook}
                          onChange={handleChange}
                          placeholder="https://facebook.com/your.profile"
                          className={inputClass("facebook")}
                        />
                        {errors.facebook && <ErrMsg msg={errors.facebook} />}
                      </div>
                    </div>
                  </div>

                  {/* PHẦN 2: BẠN MUỐN THAM GIA VÌ GÌ? */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      <HelpCircle className="w-4 h-4" />
                      <span>{lang === "vi" ? "2. Bạn muốn tham gia vì gì?" : "2. Why do you want to join?"}</span>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        {lang === "vi"
                          ? "Chia sẻ lý do, động lực hoặc điều bạn kỳ vọng nhận được từ STIC"
                          : "Share your motivation, goals, or what you hope to experience at STIC"}{" "}
                        <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        name="reason"
                        rows={3}
                        value={form.reason}
                        onChange={handleChange}
                        placeholder={
                          lang === "vi"
                            ? "Chia sẻ ngắn gọn điều thôi thúc bạn nộp đơn vào STIC..."
                            : "Briefly share why you wish to join STIC..."
                        }
                        className={`${inputClass("reason")} resize-none leading-relaxed`}
                      />
                      {errors.reason && <ErrMsg msg={errors.reason} />}
                    </div>
                  </div>

                  {/* PHẦN 3: SỞ THÍCH & KỸ NĂNG */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      <Compass className="w-4 h-4" />
                      <span>{lang === "vi" ? "3. Sở thích & Kỹ năng" : "3. Interests & Skills"}</span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {lang === "vi"
                        ? "Chọn một hoặc nhiều mảng bạn đam mê và mong muốn thử sức (Đồng bộ chuẩn Google Form):"
                        : "Select one or more areas you are passionate about:"}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {INTEREST_OPTIONS.map((opt) => {
                        const isSelected = form.interests.includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => toggleInterest(opt.id)}
                            className={`p-3 rounded-2xl text-xs font-medium text-left border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                              isSelected
                                ? "bg-blue-50 dark:bg-blue-950/50 border-blue-500 text-blue-700 dark:text-blue-300 shadow-sm"
                                : "bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                            }`}
                          >
                            <span>{lang === "vi" ? opt.labelVi : opt.labelEn}</span>
                            <div
                              className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? "bg-blue-600 border-blue-600 text-white"
                                  : "border-slate-300 dark:border-slate-700"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* PHẦN 4: KINH NGHIỆM */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      <Lightbulb className="w-4 h-4" />
                      <span>{lang === "vi" ? "4. Kinh nghiệm" : "4. Experience"}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Từng tham gia CLB/dự án/cuộc thi nào chưa */}
                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
                        <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {lang === "vi"
                            ? "Bạn đã từng tham gia CLB / dự án / cuộc thi nào chưa?"
                            : "Have you ever joined any club / project / competition?"}
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {["Đã từng", "Chưa từng"].map((val) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setForm((p) => ({ ...p, pastClubExperience: val }))}
                              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                                form.pastClubExperience === val
                                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300"
                              }`}
                            >
                              {val}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Từng làm project STEM/KHKT chưa */}
                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
                        <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {lang === "vi"
                            ? "Bạn đã từng làm project STEM / KHKT chưa?"
                            : "Have you ever built a STEM / science project?"}
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {["Đã từng", "Chưa từng"].map((val) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setForm((p) => ({ ...p, pastStemExperience: val }))}
                              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                                form.pastStemExperience === val
                                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300"
                              }`}
                            >
                              {val}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Mô tả ngắn dự án (nếu có) */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        {lang === "vi"
                          ? "Nếu có, hãy mô tả ngắn về dự án đó (Không có cũng không sao nè):"
                          : "If yes, briefly describe that project (Optional):"}
                      </label>
                      <textarea
                        name="projectDescription"
                        rows={2}
                        value={form.projectDescription}
                        onChange={handleChange}
                        placeholder={
                          lang === "vi"
                            ? "Tên đề tài, vai trò của bạn, kết quả đạt được..."
                            : "Project name, your role, achievements..."
                        }
                        className={`${inputClass("projectDescription")} resize-none`}
                      />
                    </div>
                  </div>

                  {/* PHẦN 5: CÂU HỎI TUYỂN CHỌN & CAM KẾT */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      <Sparkles className="w-4 h-4" />
                      <span>{lang === "vi" ? "5. Câu hỏi tuyển thành viên & Cam kết" : "5. Challenge & Commitment"}</span>
                    </div>

                    {/* Câu hỏi tình huống */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 leading-relaxed">
                        {lang === "vi" ? (
                          <>
                            Nếu bạn có một ý tưởng khoa học / công nghệ nhưng chưa biết cách thực hiện, bạn sẽ làm gì để biến nó thành một dự án? <span className="text-rose-500">*</span>
                          </>
                        ) : (
                          <>
                            If you have a science / tech idea but do not know how to build it yet, what steps would you take to turn it into a project? <span className="text-rose-500">*</span>
                          </>
                        )}
                      </label>
                      <textarea
                        name="ideaExecution"
                        rows={3}
                        value={form.ideaExecution}
                        onChange={handleChange}
                        placeholder={
                          lang === "vi"
                            ? "Chia sẻ các bước bạn sẽ tìm hiểu, hỏi ai, thử nghiệm như thế nào..."
                            : "Describe how you'd research, ask for mentorship, prototype..."
                        }
                        className={`${inputClass("ideaExecution")} resize-none leading-relaxed`}
                      />
                      {errors.ideaExecution && <ErrMsg msg={errors.ideaExecution} />}
                    </div>

                    {/* Cam kết thời gian */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                        {lang === "vi"
                          ? "Bạn có thể cam kết tham gia hoạt động của STIC ở mức nào?"
                          : "What is your level of time commitment for STIC?"}{" "}
                        <span className="text-rose-500">*</span>
                      </label>

                      <div className="space-y-2">
                        {COMMITMENT_OPTIONS.map((opt) => {
                          const isSelected = form.commitment === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setForm((p) => ({ ...p, commitment: opt.value }))}
                              className={`w-full p-3 rounded-2xl text-xs font-semibold text-left border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                                isSelected
                                  ? "bg-blue-50 dark:bg-blue-950/50 border-blue-500 text-blue-700 dark:text-blue-300 shadow-sm"
                                  : "bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                              }`}
                            >
                              <span>{lang === "vi" ? opt.labelVi : opt.labelEn}</span>
                              <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                  isSelected ? "border-blue-600" : "border-slate-300 dark:border-slate-700"
                                }`}
                              >
                                {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* SUBMIT ROW */}
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSfEfAvIevbb0BFHFixLPn7TAy64tkk0lYzLv8ohGfm2EmizBw/viewform"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{lang === "vi" ? "Hoặc điền trực tiếp trên Google Form" : "Or fill directly via Google Form"}</span>
                    </a>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{lang === "vi" ? "Nộp Đơn Ứng Tuyển GEN 1.0" : "Submit GEN 1.0 Application"}</span>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Privacy Note */}
          <p className="text-center text-[11px] text-slate-400 dark:text-slate-500">
            {lang === "vi"
              ? "🔒 Thông tin của bạn được bảo mật tuyệt đối và đồng bộ trực tiếp tới Ban chủ nhiệm CLB KHKT STIC."
              : "🔒 Your information is confidential and synchronized directly to the STIC Leadership Board."}
          </p>
        </div>
      </section>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <ConfirmModal
            form={form}
            lang={lang}
            onConfirm={handleConfirm}
            onCancel={() => setShowConfirm(false)}
            isSubmitting={isSubmitting}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function ErrMsg({ msg }: { msg: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-1 text-[11px] text-rose-500 mt-1 font-medium"
    >
      <AlertCircle className="w-3 h-3 shrink-0" />
      <span>{msg}</span>
    </motion.p>
  );
}
