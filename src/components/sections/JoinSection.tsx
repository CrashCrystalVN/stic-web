"use client";

import React, { useState } from "react";
import {
  CheckCircle2, Send, Sparkles, User, Phone, Lightbulb,
  ExternalLink, RotateCcw, Check, AlertCircle, X
} from "lucide-react";
import { TEAMS } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { translations as T } from "@/lib/i18n";

interface FormData {
  fullName: string;
  birthDate: string;
  school: string;
  grade: string;
  phone: string;
  email: string;
  facebook: string;
  primaryTeam: string;
  secondaryTeam: string;
  hasExperience: string;
  idea: string;
  commitment: string;
}

const INITIAL_FORM: FormData = {
  fullName: "", birthDate: "", school: "", grade: "10",
  phone: "", email: "", facebook: "",
  primaryTeam: "ai-coding", secondaryTeam: "",
  hasExperience: "no", idea: "",
  commitment: "regular",
};

type FieldErrors = Partial<Record<keyof FormData, string>>;

const inputBase = "w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900/60 text-slate-900 dark:text-white text-xs placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all";
const inputOk  = "border-slate-200 dark:border-slate-700/80 focus:border-blue-400 dark:focus:border-blue-600";
const inputErr = "border-rose-400 dark:border-rose-600 focus:ring-rose-400/30";

function cls(err?: string) { return `${inputBase} ${err ? inputErr : inputOk}`; }

// ── Confirmation Modal ────────────────────────────────────────────────────────
function ConfirmModal({
  form, lang, onConfirm, onCancel, isSubmitting,
}: {
  form: FormData;
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xl p-6 w-full max-w-sm"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Send className="w-5 h-5" />
          </div>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          {lang === "vi" ? "Xác nhận nộp đơn?" : "Confirm submission?"}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
          {lang === "vi"
            ? "Vui lòng kiểm tra lại thông tin trước khi gửi. Bạn có thể liên hệ clbstic@gmail.com nếu cần chỉnh sửa sau."
            : "Please double-check your info before submitting. Contact clbstic@gmail.com to make changes after."}
        </p>

        {/* Summary */}
        <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 p-3 space-y-1.5 mb-5 text-xs">
          <Row label={lang === "vi" ? "Họ tên" : "Name"} value={form.fullName} />
          <Row label={lang === "vi" ? "Trường" : "School"} value={form.school} />
          <Row label={lang === "vi" ? "SĐT" : "Phone"} value={form.phone} />
          <Row label="Email" value={form.email} />
          <Row label={lang === "vi" ? "Mảng chính" : "Primary dept."} value={TEAMS.find(t => t.id === form.primaryTeam)?.name ?? form.primaryTeam} />
        </div>

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer disabled:opacity-50"
          >
            {lang === "vi" ? "Kiểm tra lại" : "Go back"}
          </button>
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-1.5"
          >
            {isSubmitting
              ? <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <Send className="w-3.5 h-3.5" />}
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
      <span className="text-slate-700 dark:text-slate-200 font-medium text-right truncate max-w-[60%]">{value}</span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export function JoinSection() {
  const { t, lang } = useLang();
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  // ── Validate ────────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const errs: FieldErrors = {};
    const req = lang === "vi" ? "Trường này là bắt buộc." : "This field is required.";

    if (!form.fullName.trim())  errs.fullName  = req;
    if (!form.school.trim())    errs.school    = req;
    if (!form.phone.trim())     errs.phone     = req;
    else if (!/^[0-9]{10}$/.test(form.phone))
      errs.phone = lang === "vi" ? "Số điện thoại phải đúng 10 chữ số." : "Phone must be exactly 10 digits.";
    if (!form.email.trim())     errs.email     = req;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = lang === "vi" ? "Vui lòng nhập đúng định dạng email (ví dụ: ten@gmail.com)." : "Please enter a valid email (e.g. name@gmail.com).";
    if (!form.facebook.trim())  errs.facebook  = lang === "vi" ? "Vui lòng nhập link Facebook của bạn." : "Please enter your Facebook profile link.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Handle first submit click → validate → show confirm ─────────────────────
  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    if (validate()) setShowConfirm(true);
  };

  // ── Actual API submit ────────────────────────────────────────────────────────
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
      setShowConfirm(false);
      setIsSuccess(true);
    } catch (err: unknown) {
      setShowConfirm(false);
      setServerError(err instanceof Error ? err.message : "Lỗi máy chủ, vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm(prev => ({ ...prev, phone: digits }));
    if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
  };

  const inputClass = (field: keyof FormData) => cls(errors[field]);

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <>
      <section
        id="join"
        className="relative min-h-[calc(100vh-72px)] flex flex-col items-center justify-center py-8 px-4 sm:px-6 bg-slate-50/60 dark:bg-[#0d1117] border-t border-slate-100 dark:border-slate-900 transition-colors"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-64 bg-blue-500/4 dark:bg-blue-500/6 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-5xl w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3 h-3" />{t(T.join.badge)}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{t(T.join.h2)}</h2>
            <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">{t(T.join.sub)}</p>
          </div>

          {/* Server error banner */}
          <AnimatePresence>
            {serverError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mb-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-400"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {serverError}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Card */}
          <div className="bg-white dark:bg-[#111827] border border-slate-100 dark:border-slate-800 rounded-2xl p-5 sm:p-6 accent-glow">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t(T.join.successH)}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                    {t(T.join.successP)}{" "}
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{form.fullName}</span>
                    {t(T.join.successP2)}
                  </p>
                  {/* Data notice */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 text-[10px] text-blue-600 dark:text-blue-400">
                    {lang === "vi"
                      ? "✓ Đơn đã được lưu vào hệ thống của CLB. Ban chủ nhiệm sẽ xem xét sớm nhất."
                      : "✓ Your application has been saved to the club system. The board will review it soon."}
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => { setForm(INITIAL_FORM); setIsSuccess(false); setErrors({}); }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium hover:border-slate-300 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />{t(T.join.again)}
                    </button>
                    <a href="mailto:clbstic@gmail.com" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">clbstic@gmail.com</a>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onSubmit={handleSubmitClick}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    {/* ── COL LEFT ── */}
                    <div className="space-y-3">
                      {/* Section 1 */}
                      <div className="space-y-2">
                        <h4 className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                          <User className="w-3 h-3" />{t(T.join.sec1)}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1">{t(T.join.fname)} <span className="text-rose-400">*</span></label>
                            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder={t(T.join.fnamePh)} className={inputClass("fullName")} />
                            {errors.fullName && <ErrMsg msg={errors.fullName} />}
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1">{t(T.join.bdate)}</label>
                            <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} className={inputClass("birthDate")} />
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1">{t(T.join.school)} <span className="text-rose-400">*</span></label>
                            <input type="text" name="school" value={form.school} onChange={handleChange} placeholder={t(T.join.schoolPh)} className={inputClass("school")} />
                            {errors.school && <ErrMsg msg={errors.school} />}
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1">{t(T.join.grade)} <span className="text-rose-400">*</span></label>
                            <select name="grade" value={form.grade} onChange={handleChange} className={inputClass("grade")}>
                              <option value="10">{t(T.join.g10)}</option>
                              <option value="11">{t(T.join.g11)}</option>
                              <option value="12">{t(T.join.g12)}</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Section 2 */}
                      <div className="space-y-2">
                        <h4 className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                          <Phone className="w-3 h-3" />{t(T.join.sec2)}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1">{t(T.join.phone)} <span className="text-rose-400">*</span></label>
                            <input
                              type="tel" name="phone" value={form.phone}
                              onChange={handlePhoneChange}
                              placeholder={t(T.join.phonePh)}
                              maxLength={10} inputMode="numeric"
                              className={inputClass("phone")}
                            />
                            {errors.phone
                              ? <ErrMsg msg={errors.phone} />
                              : form.phone.length > 0 && form.phone.length < 10 && (
                                <p className="text-[10px] text-amber-500 mt-0.5">
                                  {lang === "vi" ? `Còn ${10 - form.phone.length} số nữa` : `${10 - form.phone.length} more digit(s)`}
                                </p>
                              )
                            }
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1">{t(T.join.email)} <span className="text-rose-400">*</span></label>
                            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder={t(T.join.emailPh)} className={inputClass("email")} />
                            {errors.email && <ErrMsg msg={errors.email} />}
                          </div>
                          <div className="col-span-2">
                            <label className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1">{t(T.join.fb)} <span className="text-rose-400">*</span></label>
                            <input type="text" name="facebook" value={form.facebook} onChange={handleChange} placeholder={t(T.join.fbPh)} className={inputClass("facebook")} />
                            {errors.facebook && <ErrMsg msg={errors.facebook} />}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── COL RIGHT ── */}
                    <div className="space-y-3">
                      {/* Section 3 */}
                      <div className="space-y-2">
                        <h4 className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                          <Sparkles className="w-3 h-3" />{t(T.join.sec3)}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1">{t(T.join.primary)} <span className="text-rose-400">*</span></label>
                            <select name="primaryTeam" value={form.primaryTeam} onChange={handleChange} className={inputClass("primaryTeam")}>
                              {TEAMS.map((tm) => <option key={tm.id} value={tm.id}>{tm.name}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1">{t(T.join.secondary)}</label>
                            <select name="secondaryTeam" value={form.secondaryTeam} onChange={handleChange} className={inputClass("secondaryTeam")}>
                              <option value="">{t(T.join.noSec)}</option>
                              {TEAMS.map((tm) => <option key={tm.id} value={tm.id}>{tm.name}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Section 4 */}
                      <div className="space-y-2">
                        <h4 className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                          <Lightbulb className="w-3 h-3" />{t(T.join.sec4)}
                        </h4>
                        <div>
                          <label className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1.5">{t(T.join.expQ)}</label>
                          <div className="grid grid-cols-2 gap-2">
                            {(["no", "yes"] as const).map((opt) => (
                              <button
                                key={opt} type="button"
                                onClick={() => setForm(p => ({ ...p, hasExperience: opt }))}
                                className={`py-1.5 px-2 rounded-xl text-[10px] font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                                  form.hasExperience === opt
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300"
                                }`}
                              >
                                {form.hasExperience === opt && <Check className="w-3 h-3 shrink-0" />}
                                <span>{opt === "no" ? t(T.join.expNo) : t(T.join.expYes)}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1">{t(T.join.idea)}</label>
                          <textarea name="idea" rows={2} value={form.idea} onChange={handleChange} placeholder={t(T.join.ideaPh)} className={`${inputClass("idea")} resize-none`} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1">{t(T.join.commit)} <span className="text-rose-400">*</span></label>
                          <select name="commitment" value={form.commitment} onChange={handleChange} className={inputClass("commitment")}>
                            <option value="regular">{t(T.join.c1)}</option>
                            <option value="schedule">{t(T.join.c2)}</option>
                            <option value="flexible">{t(T.join.c3)}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit row */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSfEfAvIevbb0BFHFixLPn7TAy64tkk0lYzLv8ohGfm2EmizBw/viewform"
                      target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />{t(T.join.orGform)}
                    </a>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-blue-600/20"
                    >
                      <Send className="w-3.5 h-3.5" />{t(T.join.submit)}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Data note */}
          <p className="mt-3 text-center text-[10px] text-slate-400 dark:text-slate-600">
            {lang === "vi"
              ? "🔒 Thông tin của bạn được lưu trữ an toàn và chỉ ban chủ nhiệm STIC có thể xem."
              : "🔒 Your information is stored securely and only accessible by the STIC board."}
          </p>
        </div>
      </section>

      {/* Confirmation modal */}
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
      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-1 text-[10px] text-rose-500 mt-0.5"
    >
      <AlertCircle className="w-3 h-3 shrink-0" />{msg}
    </motion.p>
  );
}
