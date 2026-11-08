"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Cpu,
  Navigation,
  BookOpen,
  Radar,
  Binary,
  ShieldCheck,
  BarChart3,
  ExternalLink,
  Layers,
  Radio,
  Zap,
  CheckCircle2,
  Activity,
  Terminal,
  X,
  ChevronRight,
  Atom,
  Eye,
  Plane,
  FileText,
  Clock,
  Compass,
  Check
} from "lucide-react";
import { useLang } from "@/context/LangContext";

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface ResearchBreakthrough {
  id: string;
  category: string;
  categoryEn: string;
  categoryVi: string;
  badgeType: "flagship" | "breakthrough" | "research" | "exploration";
  titleEn: string;
  titleVi: string;
  subtitleEn: string;
  subtitleVi: string;
  abstractEn: string;
  abstractVi: string;
  date: string;
  readTime: string;
  trackEn: string;
  trackVi: string;
  tags: string[];
  metrics: {
    labelEn: string;
    labelVi: string;
    value: string;
  }[];
  hardwareSpecs: {
    componentEn: string;
    componentVi: string;
    spec: string;
  }[];
  highlightsEn: string[];
  highlightsVi: string[];
  status: "Active Incubation" | "Prototyping" | "Design Phase";
}

// ─── RESEARCH BREAKTHROUGHS DATA (DEEPMIND STYLE) ───────────────────────────
const BREAKTHROUGHS: ResearchBreakthrough[] = [
  {
    id: "ai-book-classifier",
    category: "Frontier Vision & OCR",
    categoryEn: "Computer Vision & Automation",
    categoryVi: "Thị giác máy tính AI & Tự động hóa",
    badgeType: "flagship",
    titleEn: "Neural Book Spine Recognition & Automated Dewey Decimal Sorting",
    titleVi: "Hệ thống phân loại sách AI & Tự động hóa định danh Dewey",
    subtitleEn: "Real-time edge computer vision pipeline for automated library cataloging in Da Nang high schools.",
    subtitleVi: "Hệ thống thị giác máy tính biên thời gian thực tự động quét và phân loại sách thư viện trường học.",
    abstractEn:
      "A high-precision edge perception system combining custom YOLOv8 spine detection models with lightweight optical character recognition (OCR) and deep phonetic matching. Maps physical book spines directly to Dewey Decimal Classification (DDC) shelves with sub-45ms latency on embedded neural coprocessors.",
    abstractVi:
      "Hệ thống thị giác máy tính biên kết hợp mô hình học sâu YOLOv8 nhận diện gáy sách với thuật toán OCR và khớp nối ngữ nghĩa. Tự động quy đổi nhan đề sang hệ thống phân loại thập phân Dewey (DDC) với độ trễ xử lý dưới 45ms trên vi xử lý nhúng.",
    date: "November 2026",
    readTime: "5 min read",
    trackEn: "AI & Coding Track",
    trackVi: "Mảng AI & Lập trình",
    tags: ["YOLOv8", "Edge AI", "Dewey DDC", "Tesseract OCR", "Raspberry Pi 5", "Python"],
    metrics: [
      { labelEn: "Peak Spine OCR Accuracy", labelVi: "Độ chính xác OCR gáy sách", value: "99.4%" },
      { labelEn: "Edge Inference Latency", labelVi: "Độ trễ suy luận biên", value: "38 ms" },
      { labelEn: "DDC Class Coverage", labelVi: "Độ bao phủ danh mục Dewey", value: "10 Class Divs" },
      { labelEn: "Search Time Reduction", labelVi: "Tối ưu thời gian tìm sách", value: "85%" }
    ],
    hardwareSpecs: [
      { componentEn: "Edge Neural Compute Unit", componentVi: "Vi xử lý nơ-ron biên", spec: "Raspberry Pi 5 + Hailo-8 NPU (26 TOPS)" },
      { componentEn: "Vision Optical Sensor", componentVi: "Cảm biến quang học AI", spec: "Sony IMX708 12MP Wide-angle HDR" },
      { componentEn: "Spine Lighting Array", componentVi: "Cụm đèn chiếu đồng trục", spec: "95+ CRI Uniform LED Ring Diffuser" },
      { componentEn: "Classification Database", componentVi: "Cơ sở dữ liệu phân loại", spec: "SQLite local sync + STIC Cloud Index" }
    ],
    highlightsEn: [
      "Real-time continuous inference without requiring constant internet connection",
      "Robust to glare, damaged spine text, non-standard fonts, and multi-lingual titles",
      "Direct integration with high school library management systems (VEMIS, Koha)",
      "Designed and trained on local Da Nang educational book datasets by high school students"
    ],
    highlightsVi: [
      "Khả năng suy luận liên tục thời gian thực mà không cần phụ thuộc đường truyền internet",
      "Khắc phục hiện tượng lóa sáng, gáy sách trầy xước, phông chữ cách điệu và đa ngữ",
      "Tương thích trực tiếp với các phần mềm quản lý thư viện trường học hiện hành",
      "Mô hình được huấn luyện trực tiếp trên tập dữ liệu sách giáo khoa và tài liệu THPT Đà Nẵng"
    ],
    status: "Active Incubation"
  },
  {
    id: "ai-delivery-drone",
    category: "Autonomous UAV & Robotics",
    categoryEn: "Aerial Robotics & Autonomous Systems",
    categoryVi: "UAV Tự hành & Điều khiển Robotics",
    badgeType: "flagship",
    titleEn: "Autonomous AI Delivery Quadcopter with LiDAR SLAM Navigation",
    titleVi: "Máy bay không người lái tự hành AI chuyển hàng với cảm biến LiDAR SLAM",
    subtitleEn: "Precision rapid aerial logistics engineered for medical supplies and emergency deliveries.",
    subtitleVi: "Hệ thống bay không người lái tải trọng cao vận chuyển bưu phẩm khẩn cấp và vật tư y tế học đường.",
    abstractEn:
      "A customized high-payload quadcopter engineered with Pixhawk/ArduPilot flight controllers, real-time solid-state LiDAR obstacle avoidance, and dual-band GPS RTK centimeter positioning. Features autonomous waypoint mission planning, dynamic collision avoidance in complex campus airspace, and precision magnetic drop-off mechanisms.",
    abstractVi:
      "Thiết kế khung quadcopter tải trọng cao tích hợp vi điều khiển Pixhawk/ArduPilot, cảm biến LiDAR thể rắn quét vật cản thời gian thực và định vị vi sai GPS RTK chuẩn centimet. Hỗ trợ lập lộ trình bay tự hành qua chướng ngại vật phức tạp và cơ cấu thả hàng chính xác.",
    date: "November 2026",
    readTime: "6 min read",
    trackEn: "Robotics & Engineering Track",
    trackVi: "Mảng Chế tạo Robot & Kỹ thuật",
    tags: ["ArduPilot", "Pixhawk 6C", "LiDAR SLAM", "GPS RTK", "ROS2 Humble", "C++"],
    metrics: [
      { labelEn: "LiDAR Obstacle Detection", labelVi: "Tầm quét vật cản LiDAR", value: "25 m" },
      { labelEn: "GPS RTK Positional Accuracy", labelVi: "Độ chuẩn xác định vị RTK", value: "± 2.5 cm" },
      { labelEn: "Payload Carrying Capacity", labelVi: "Tải trọng bưu phẩm hữu dụng", value: "1.5 kg" },
      { labelEn: "Max Operational Radius", labelVi: "Bán kính hoạt động tự hành", value: "5.0 km" }
    ],
    hardwareSpecs: [
      { componentEn: "Autopilot Flight Controller", componentVi: "Bộ vi điều khiển bay", spec: "Holybro Pixhawk 6C (STM32H753)" },
      { componentEn: "Environmental LiDAR Array", componentVi: "Cảm biến LiDAR quét 360°", spec: "TFmini-S Micro-LiDAR + RPLIDAR S2" },
      { componentEn: "Precision Positioning", componentVi: "Mô-đun định vị vi sai", spec: "u-blox F9P Multiband RTK GNSS" },
      { componentEn: "Companion Edge Computer", componentVi: "Máy tính nhúng đồng hành", spec: "NVIDIA Jetson Orin Nano (40 TOPS)" }
    ],
    highlightsEn: [
      "Full hardware-in-the-loop (HITL) flight simulation in Gazebo & ArduPilot SITL",
      "Dynamic obstacle rerouting in milliseconds using 3D octree spatial mapping",
      "Triple-redundant fail-safe returns: Geofence breach, low battery, and signal loss",
      "Modular payload bay supporting temperature-regulated medical cargo packs"
    ],
    highlightsVi: [
      "Quy trình mô phỏng bay khép kín phần cứng trên Gazebo và ArduPilot SITL",
      "Khả năng tự động đổi lộ trình tránh vật cản tức thì dựa trên bản đồ không gian 3D",
      "Cơ chế an toàn 3 lớp: Giới hạn không phận ảo Geofence, tự hạ cánh khi pin yếu và mất sóng",
      "Khoang chứa hàng mô-đun hóa hỗ trợ giữ nhiệt cho hộp mẫu y tế chuyên dụng"
    ],
    status: "Active Incubation"
  },
  {
    id: "stem-intelligence-agent",
    category: "Agentic AI & Reasoning",
    categoryEn: "Multimodal AI & Education",
    categoryVi: "AI Tương tác Đa phương thức & Học tập",
    badgeType: "breakthrough",
    titleEn: "AlphaStudent: Multimodal AI Copilot for Natural Science Experiments",
    titleVi: "AlphaStudent: Trợ lý AI đa phương thức đồng hành cùng thí nghiệm KHKT",
    subtitleEn: "Step-by-step reasoning and hypothesis verification tailored for high school STEM researchers.",
    subtitleVi: "Mô hình lập luận từng bước và đối chiếu giả thuyết khoa học cho học sinh THPT.",
    abstractEn:
      "A specialized agentic reasoning model built to guide high school students through experimental physics, chemistry formulations, and electronics debugging. Integrates mathematical derivation engines, step-by-step hypothesis checking, and code synthesis for microcontrollers.",
    abstractVi:
      "Mô hình AI lập luận chuyên sâu hỗ trợ học sinh giải mã hiện tượng vật lý, cân bằng hóa học và gỡ lỗi mạch điện tử nhúng. Tích hợp công cụ diễn giải công thức toán học và tự sinh code điều khiển cảm biến.",
    date: "October 2026",
    readTime: "4 min read",
    trackEn: "AI & Applied Science",
    trackVi: "AI & Khoa học ứng dụng",
    tags: ["Gemini 1.5", "LaTeX Math", "Agentic Flow", "Physics Sim", "STEM"],
    metrics: [
      { labelEn: "Experimental Reasoning Score", labelVi: "Độ chính xác lập luận", value: "94.2%" },
      { labelEn: "Code Synthesis Accuracy", labelVi: "Tỉ lệ sinh mã nhúng chuẩn", value: "98.1%" },
      { labelEn: "Stepwise Formula Proofs", labelVi: "Chứng minh công thức toán", value: "Instant" }
    ],
    hardwareSpecs: [
      { componentEn: "Reasoning Engine", componentVi: "Cốt lõi lập luận AI", spec: "Gemini 1.5 Pro / Flash Function Calling" },
      { componentEn: "Math & Science Engine", componentVi: "Mô-đun toán & khoa học", spec: "SymPy + KaTeX LaTeX Renderer" },
      { componentEn: "Telemetry Interface", componentVi: "Giao diện cảm biến thời gian thực", spec: "WebUSB Serial Protocol" }
    ],
    highlightsEn: [
      "Guided scientific method approach: Hypothesis -> Experiment -> Analysis -> Conclusion",
      "Direct code export for Arduino, ESP32, and Raspberry Pi sensor boards",
      "Ethical tutoring guardrail prevents unverified academic cheating"
    ],
    highlightsVi: [
      "Định hướng phương pháp nghiên cứu chuẩn: Giả thuyết -> Thí nghiệm -> Dữ liệu -> Kết luận",
      "Hỗ trợ xuất mã nguồn điều khiển trực tiếp cho mạch Arduino, ESP32 và Raspberry Pi",
      "Cơ chế an toàn học thuật khuyến khích tư duy phản biện thay vì sao chép lời giải"
    ],
    status: "Prototyping"
  },
  {
    id: "ecosens-iot-mesh",
    category: "Applied Science & IoT",
    categoryEn: "Environmental Sensor Mesh",
    categoryVi: "Mạng cảm biến môi trường IoT & Năng lượng xanh",
    badgeType: "research",
    titleEn: "EcoSens: Distributed Microclimate & Air Quality Mesh Network",
    titleVi: "EcoSens: Mạng cảm biến vi khí hậu & đo lường chất lượng không khí học đường",
    subtitleEn: "Autonomous solar-powered IoT nodes for environmental science research across campuses.",
    subtitleVi: "Các trạm cảm biến năng lượng mặt trời tự hành nghiên cứu môi trường trường học.",
    abstractEn:
      "A resilient low-power wireless mesh network monitoring PM2.5, carbon dioxide concentrations, ambient humidity, and soil hydration. Powered by custom MPPT solar harvesters, the nodes stream empirical environmental telemetry to a unified student dashboard for environmental research.",
    abstractVi:
      "Mạng lưới cảm biến vô tuyến công suất thấp liên tục theo dõi nồng độ bụi mịn PM2.5, CO2, độ ẩm và thông số đất trồng. Sử dụng năng lượng mặt trời MPPT, truyền dữ liệu vi khí hậu thời gian thực về bảng điều khiển trực quan.",
    date: "October 2026",
    readTime: "3 min read",
    trackEn: "Environment & IoT Track",
    trackVi: "Môi trường & Công nghệ Xanh",
    tags: ["ESP32-S3", "LoRaWAN", "Sensirion SPS30", "MPPT Solar", "Open Source"],
    metrics: [
      { labelEn: "Node Uptime via Solar", labelVi: "Thời gian hoạt động độc lập", value: "365 Days" },
      { labelEn: "Wireless Mesh Range", labelVi: "Phạm vi truyền vô tuyến LoRa", value: "2.4 km" },
      { labelEn: "PM2.5 Measurement Error", labelVi: "Sai số đo bụi mịn PM2.5", value: "< 5%" }
    ],
    hardwareSpecs: [
      { componentEn: "Core Processor", componentVi: "Vi điều khiển xử lý", spec: "ESP32-S3 Dual Core Xtensa 240MHz" },
      { componentEn: "Optical Particle Sensor", componentVi: "Cảm biến quang học bụi mịn", spec: "Sensirion SPS30 Laser PM Sensor" },
      { componentEn: "Radio Protocol", componentVi: "Giao thức truyền sóng", spec: "Semtech SX1262 LoRa 915MHz" },
      { componentEn: "Energy Harvesting", componentVi: "Bộ nạp năng lượng mặt trời", spec: "Bq24650 MPPT Solar Charger + LiFePO4" }
    ],
    highlightsEn: [
      "Zero-carbon operational profile powered entirely by ambient daylight",
      "Real-time heat-island and microclimate mapping for student STEM competitions",
      "Resilient peer-to-peer mesh hops without cellular subscription costs"
    ],
    highlightsVi: [
      "Vận hành hoàn toàn không phát thải nhờ hệ pin quang điện hiệu suất cao",
      "Bản đồ nhiệt và vi khí hậu phục vụ trực tiếp các đề tài KHKT học sinh cấp Thành phố",
      "Mạng lưới mesh phân tán tự định tuyến không tốn chi phí viễn thông hàng tháng"
    ],
    status: "Design Phase"
  }
];

// ─── DEEPMIND BENCHMARK EVALUATION MATRIX ─────────────────────────────────────
const BENCHMARK_METRICS = [
  {
    capability: "Real-Time Edge Neural Perception",
    capabilityVi: "Khả năng xử lý trí tuệ nhân tạo tại biên (Edge AI)",
    traditional: "Cloud API dependent (> 600ms latency, requires constant Wi-Fi)",
    traditionalVi: "Phụ thuộc API máy chủ ngoài (> 600ms, cần Wi-Fi liên tục)",
    sticGen1: "Ultra-low latency on-device NPU (< 40ms, zero cloud dependency)",
    sticGen1Vi: "Xử lý trực tiếp trên chip NPU (< 40ms, không phụ thuộc internet)",
    status: "Superior"
  },
  {
    capability: "Autonomous Navigation & SLAM",
    capabilityVi: "Điều hướng tự hành & Lập bản đồ không gian SLAM",
    traditional: "Basic ultrasonic sonar ping (single line, blind spots)",
    traditionalVi: "Cảm biến siêu âm đơn hướng (dễ nhiễu sóng, nhiều điểm mù)",
    sticGen1: "360° Solid-state LiDAR + GPS RTK centimeter positioning",
    sticGen1Vi: "LiDAR thể rắn quét 360° kết hợp định vị vệ tinh vi sai GPS RTK",
    status: "Superior"
  },
  {
    capability: "Interdisciplinary Research Squads",
    capabilityVi: "Mô hình phối hợp liên chuyên môn",
    traditional: "Isolated individuals with fragmented skills",
    traditionalVi: "Làm việc đơn lẻ, thiếu phối hợp giữa phần cứng và phần mềm",
    sticGen1: "Integrated squads: AI + Hardware + Firmware + Creative Media",
    sticGen1Vi: "Nhóm tích hợp: Kỹ sư AI + Chế tạo cơ khí + Lập trình vi mạch + Media",
    status: "Superior"
  },
  {
    capability: "Open Hardware & Scientific Reproducibility",
    capabilityVi: "Tính mở và khả năng tái lập khoa học",
    traditional: "Closed schematics, undocumented code, non-reproducible",
    traditionalVi: "Mã nguồn đóng, không có tài liệu kỹ thuật, khó nhân rộng",
    sticGen1: "Full GitHub repos, documented BOMs, hardware-in-the-loop tests",
    sticGen1Vi: "Kho mã nguồn mở GitHub, sơ đồ mạch chi tiết, báo cáo nghiệm thu rõ ràng",
    status: "Superior"
  }
];

export default function DeepMindPreviewPage() {
  const { lang } = useLang();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedBreakthrough, setSelectedBreakthrough] = useState<ResearchBreakthrough | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // DeepMind interactive mouse spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const FILTER_TABS = useMemo(() => [
    { id: "all", labelEn: "All Breakthroughs", labelVi: "Tất cả đề tài" },
    { id: "vision", labelEn: "Frontier Vision & AI", labelVi: "Thị giác máy tính & AI" },
    { id: "robotics", labelEn: "Autonomous Robotics", labelVi: "UAV & Robotics tự hành" },
    { id: "applied", labelEn: "Applied Science & IoT", labelVi: "STEM ứng dụng & Cảm biến" },
  ], []);

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return BREAKTHROUGHS;
    if (activeFilter === "vision") return BREAKTHROUGHS.filter(b => b.id === "ai-book-classifier" || b.id === "stem-intelligence-agent");
    if (activeFilter === "robotics") return BREAKTHROUGHS.filter(b => b.id === "ai-delivery-drone");
    if (activeFilter === "applied") return BREAKTHROUGHS.filter(b => b.id === "ecosens-iot-mesh" || b.id === "stem-intelligence-agent");
    return BREAKTHROUGHS;
  }, [activeFilter]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#03060c] text-slate-100 selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden pt-28 pb-32"
    >
      {/* ─── DEEPMIND IRIDESCENT AURORA GLOW EFFECT ──────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft aurora mesh */}
        <div className="absolute -top-40 left-1/4 w-[750px] h-[750px] rounded-full bg-gradient-to-tr from-blue-700/15 via-indigo-600/10 to-transparent blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-cyan-600/15 via-sky-600/10 to-transparent blur-[140px]" />
        <div className="absolute bottom-10 left-1/3 w-[800px] h-[800px] rounded-full bg-gradient-to-t from-violet-700/10 via-purple-900/10 to-transparent blur-[160px]" />

        {/* Ambient subtle technical grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)]" />

        {/* Interactive radial spotlight following mouse */}
        <div
          className="absolute -inset-px opacity-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.08), transparent 80%)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── DEEPMIND EDITORIAL BREADCRUMB / STATUS HEADER ───────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-10 border-b border-white/10 mb-14 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
            </span>
            <span className="text-cyan-400 font-bold tracking-widest uppercase">
              STIC FRONTIER LAB // GEN 1.0 INCUBATOR
            </span>
            <span className="text-white/20">|</span>
            <span className="text-slate-400 hidden sm:inline">
              {lang === "vi" ? "Nghiên cứu KHKT & Trí tuệ nhân tạo THPT Đà Nẵng" : "High School Science & AI Research Collective"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-300">
              Inspired by <strong className="text-white">deepmind.google</strong>
            </span>
            <Link
              href="/"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1 font-sans"
            >
              <span>{lang === "vi" ? "Trang chủ STIC" : "STIC Home"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ─── HERO SECTION: DEEPMIND BOLD EDITORIAL IMPACT ───────────────── */}
        <div className="max-w-4xl mx-auto text-center mb-20 sm:mb-28">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-indigo-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold tracking-wider uppercase mb-8 shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === "vi" ? "Khám phá khoa học ở ranh giới tri thức" : "Science at the Frontier of Discovery"}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-8">
            {lang === "vi" ? (
              <>
                Phát triển trí tuệ nhân tạo và kỹ thuật để{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                  định hình tương lai
                </span>
                .
              </>
            ) : (
              <>
                Advancing intelligence and engineering to{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                  shape young minds
                </span>
                .
              </>
            )}
          </h1>

          <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal mb-10">
            {lang === "vi"
              ? "CLB Khoa học Kỹ thuật STIC là không gian nghiên cứu công nghệ thực chiến cho học sinh THPT Đà Nẵng — nơi các bạn trẻ trực tiếp kiến tạo các hệ thống thị giác máy tính, UAV tự hành và giải pháp khoa học phục vụ cộng đồng."
              : "STIC Club is an interdisciplinary high school research collective in Da Nang, empowering young creators to design, build, and deploy real-world AI computer vision, autonomous UAVs, and empirical STEM solutions."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#breakthroughs"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-slate-950 font-bold text-sm hover:bg-slate-200 transition-all duration-300 shadow-xl shadow-cyan-500/10 hover:scale-[1.03]"
            >
              <span>{lang === "vi" ? "Khám phá các đột phá nghiên cứu" : "Explore Research Breakthroughs"}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/15 hover:border-white/30 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03]"
            >
              <span>{lang === "vi" ? "Đăng ký tham gia GEN 1.0" : "Join Incubation (GEN 1.0)"}</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* ─── LIVE RESEARCH STATS & TELEMETRY STRIP ───────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-24">
          {[
            {
              metric: "99.4%",
              labelEn: "Peak Spine OCR Accuracy",
              labelVi: "Độ chính xác OCR gáy sách",
              sub: "YOLOv8 Edge Perception",
              icon: Eye,
              color: "text-cyan-400",
            },
            {
              metric: "< 40ms",
              labelEn: "Real-time Edge Inference",
              labelVi: "Độ trễ suy luận biên",
              sub: "Hailo-8 / Raspberry Pi 5",
              icon: Zap,
              color: "text-blue-400",
            },
            {
              metric: "25m",
              labelEn: "LiDAR Obstacle Radar",
              labelVi: "Tầm quét vật cản LiDAR",
              sub: "Autonomous Quadcopter",
              icon: Radar,
              color: "text-indigo-400",
            },
            {
              metric: "GEN 1.0",
              labelEn: "Inaugural Research Cohort",
              labelVi: "Thế hệ ươm mầm tiên phong",
              sub: "Da Nang High Schools",
              icon: Atom,
              color: "text-emerald-400",
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl p-5 sm:p-6 bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300 group overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`w-5 h-5 ${stat.color} opacity-80 group-hover:scale-110 transition-transform`} />
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    TELEMETRY
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
                  {stat.metric}
                </div>
                <div className="text-xs font-semibold text-slate-300 mb-1 leading-snug">
                  {lang === "vi" ? stat.labelVi : stat.labelEn}
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── DEEPMIND CATEGORY FILTER TABS ───────────────────────────────── */}
        <div id="breakthroughs" className="pt-8 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                <span>{lang === "vi" ? "Danh mục đề tài nghiên cứu" : "Research Initiatives & Focus Areas"}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {lang === "vi" ? "Đột Phá KHKT Đang Triển Khai" : "Featured Research Breakthroughs"}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              {lang === "vi"
                ? "Các dự án trọng điểm được ươm mầm trực tiếp tại CLB STIC, kết hợp phần cứng thực nghiệm và các mô hình AI hiện đại."
                : "Flagship initiatives engineered inside STIC Club, bridging cutting-edge AI models with physical hardware prototypes."}
            </p>
          </div>

          {/* Interactive Pill Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-white/[0.04] border border-white/10 max-w-fit">
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer select-none ${
                    isActive ? "text-slate-950 font-bold" : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="deepmind-active-pill"
                      className="absolute inset-0 bg-white rounded-full shadow-lg"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">
                    {lang === "vi" ? tab.labelVi : tab.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── DEEPMIND SIGNATURE BENTO RESEARCH GRID ───────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-24">
          
          {/* 1. HERO BENTO CARD: AI BOOK CLASSIFICATION SYSTEM (7 Columns) */}
          {filteredItems.some(i => i.id === "ai-book-classifier") && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelectedBreakthrough(BREAKTHROUGHS.find(b => b.id === "ai-book-classifier")!)}
              className="lg:col-span-7 group relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0c1322] via-[#080d17] to-[#04070e] border border-white/10 hover:border-cyan-400/50 shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              {/* Radial backdrop highlight */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                      FLAGSHIP // AI VISION
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Nov 2026 · 5 min
                    </span>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-cyan-500 group-hover:text-black transition-all flex items-center justify-center text-slate-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Interactive Spine Scanner Mockup Visor */}
                <div className="relative w-full h-56 sm:h-64 rounded-2xl bg-[#03060d] border border-white/10 p-5 mb-6 overflow-hidden flex flex-col justify-between">
                  {/* Subtle Grid Canvas */}
                  <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />

                  {/* Top HUD Telemetry */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-emerald-400 font-bold">LIVE OCR SCANNER</span>
                    </div>
                    <span>CAM-01 // SONY IMX708 HDR</span>
                  </div>

                  {/* Simulated Detected Book Spines with Bounding Boxes */}
                  <div className="relative z-10 grid grid-cols-3 gap-3 my-auto">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-cyan-500/50 relative overflow-hidden group-hover:border-cyan-400 transition-colors">
                      <div className="text-[10px] font-mono text-cyan-400 font-bold mb-1">BOUNDING BOX #1</div>
                      <div className="text-xs font-bold text-white truncate">Giải Tích Toán 12</div>
                      <div className="mt-2 text-[10px] font-mono text-emerald-400 flex items-center justify-between">
                        <span>CONFIDENCE</span>
                        <span className="font-bold">99.8%</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">DDC: 515 (Mathemetics)</div>
                      <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-cyan-400" />
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-blue-500/40 relative overflow-hidden">
                      <div className="text-[10px] font-mono text-blue-400 font-bold mb-1">BOUNDING BOX #2</div>
                      <div className="text-xs font-bold text-white truncate">Vật Lý Đại Cương</div>
                      <div className="mt-2 text-[10px] font-mono text-emerald-400 flex items-center justify-between">
                        <span>CONFIDENCE</span>
                        <span className="font-bold">98.6%</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">DDC: 530 (Physics)</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-indigo-500/30 relative overflow-hidden">
                      <div className="text-[10px] font-mono text-indigo-400 font-bold mb-1">BOUNDING BOX #3</div>
                      <div className="text-xs font-bold text-white truncate">Computer Systems</div>
                      <div className="mt-2 text-[10px] font-mono text-emerald-400 flex items-center justify-between">
                        <span>CONFIDENCE</span>
                        <span className="font-bold">99.2%</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">DDC: 004 (Computing)</div>
                    </div>
                  </div>

                  {/* Scanning Laser Animation Line */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#38bdf8] animate-pulse pointer-events-none" />

                  {/* Bottom Pipeline Status */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/10">
                    <span>INFERENCE: 38ms (NPU)</span>
                    <span className="text-cyan-400">EDGE PIPELINE OK</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 group-hover:text-cyan-300 transition-colors">
                  {lang === "vi" ? BREAKTHROUGHS[0].titleVi : BREAKTHROUGHS[0].titleEn}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-cyan-400 mb-3">
                  {lang === "vi" ? BREAKTHROUGHS[0].subtitleVi : BREAKTHROUGHS[0].subtitleEn}
                </p>
                <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed line-clamp-3 mb-6">
                  {lang === "vi" ? BREAKTHROUGHS[0].abstractVi : BREAKTHROUGHS[0].abstractEn}
                </p>
              </div>

              {/* Tags & Explore Callout */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  {BREAKTHROUGHS[0].tags.map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
                      #{t}
                    </span>
                  ))}
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>{lang === "vi" ? "Xem tài liệu kỹ thuật" : "View Technical Brief"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. HERO BENTO CARD: AUTONOMOUS DELIVERY DRONE (5 Columns) */}
          {filteredItems.some(i => i.id === "ai-delivery-drone") && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={() => setSelectedBreakthrough(BREAKTHROUGHS.find(b => b.id === "ai-delivery-drone")!)}
              className="lg:col-span-5 group relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0e111a] via-[#090d16] to-[#04060c] border border-white/10 hover:border-indigo-400/50 shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-700" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-indigo-950/80 text-indigo-300 border border-indigo-500/40">
                      UAV // AUTONOMOUS
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Nov 2026 · 6 min
                    </span>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-indigo-500 group-hover:text-black transition-all flex items-center justify-center text-slate-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Radar HUD Visualizer */}
                <div className="relative w-full h-56 sm:h-64 rounded-2xl bg-[#03060c] border border-white/10 p-5 mb-6 overflow-hidden flex flex-col items-center justify-center">
                  <div className="relative w-44 h-44 rounded-full border border-indigo-500/30 flex items-center justify-center">
                    {/* Concentric radar rings */}
                    <div className="absolute w-32 h-32 rounded-full border border-indigo-500/20" />
                    <div className="absolute w-20 h-20 rounded-full border border-indigo-500/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-px bg-indigo-500/20" />
                      <div className="absolute h-full w-px bg-indigo-500/20" />
                    </div>

                    {/* Rotating Radar Sweep */}
                    <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(99,102,241,0.25)_60deg,transparent_65deg)] animate-spin" style={{ animationDuration: "4s" }} />

                    {/* Center Drone Icon */}
                    <div className="relative z-10 w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/40">
                      <Plane className="w-4 h-4" />
                    </div>

                    {/* Detected Obstacle Blips */}
                    <span className="absolute top-6 right-8 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="absolute bottom-10 left-8 w-2 h-2 rounded-full bg-cyan-400" />
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>GPS: RTK FIXED (±2.5cm)</span>
                    <span className="text-indigo-400">LiDAR 25M SLAM</span>
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2 group-hover:text-indigo-300 transition-colors">
                  {lang === "vi" ? BREAKTHROUGHS[1].titleVi : BREAKTHROUGHS[1].titleEn}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-indigo-400 mb-3">
                  {lang === "vi" ? BREAKTHROUGHS[1].subtitleVi : BREAKTHROUGHS[1].subtitleEn}
                </p>
                <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed line-clamp-3 mb-6">
                  {lang === "vi" ? BREAKTHROUGHS[1].abstractVi : BREAKTHROUGHS[1].abstractEn}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  {BREAKTHROUGHS[1].tags.slice(0, 4).map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
                      #{t}
                    </span>
                  ))}
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <span>{lang === "vi" ? "Chi tiết hệ thống bay" : "View Drone Specs"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. SECONDARY BENTO CARD: ALPHASTUDENT AGENT (6 Columns) */}
          {filteredItems.some(i => i.id === "stem-intelligence-agent") && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => setSelectedBreakthrough(BREAKTHROUGHS.find(b => b.id === "stem-intelligence-agent")!)}
              className="lg:col-span-6 group relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0d101c] via-[#080c16] to-[#04060e] border border-white/10 hover:border-purple-400/50 shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-purple-950/80 text-purple-300 border border-purple-500/40">
                    MULTIMODAL AI // AGENTIC
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-purple-500 group-hover:text-black transition-all flex items-center justify-center text-slate-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 mb-6 font-mono text-xs space-y-2 text-slate-300">
                  <div className="flex items-center gap-2 text-purple-400 text-[11px]">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>ALPHASTUDENT COGNITIVE TRACE</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 text-emerald-300">
                    &gt; Hypothesizing: Photovoltaic IV curve shift under 45°C ambient.
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 text-slate-400">
                    &gt; Derived equation: P_max(T) = P_stc * [1 + gamma * (T - 25)]
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-purple-300 transition-colors">
                  {lang === "vi" ? BREAKTHROUGHS[2].titleVi : BREAKTHROUGHS[2].titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mb-4">
                  {lang === "vi" ? BREAKTHROUGHS[2].abstractVi : BREAKTHROUGHS[2].abstractEn}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400 font-bold">94.2% Reasoning Score</span>
                <span className="text-xs font-bold text-purple-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>{lang === "vi" ? "Xem chi tiết" : "Read Brief"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          )}

          {/* 4. SECONDARY BENTO CARD: ECOSENS IOT MESH (6 Columns) */}
          {filteredItems.some(i => i.id === "ecosens-iot-mesh") && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              onClick={() => setSelectedBreakthrough(BREAKTHROUGHS.find(b => b.id === "ecosens-iot-mesh")!)}
              className="lg:col-span-6 group relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0c141d] via-[#070e17] to-[#03060c] border border-white/10 hover:border-emerald-400/50 shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                    GREEN TECH // LORAWAN MESH
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-emerald-500 group-hover:text-black transition-all flex items-center justify-center text-slate-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 mb-6 flex items-center justify-around text-center">
                  <div>
                    <div className="text-lg font-mono font-black text-emerald-400">22 µg/m³</div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">PM2.5 Index</div>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div>
                    <div className="text-lg font-mono font-black text-cyan-400">418 ppm</div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">CO2 Ambient</div>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div>
                    <div className="text-lg font-mono font-black text-amber-400">100%</div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">Solar MPPT</div>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-emerald-300 transition-colors">
                  {lang === "vi" ? BREAKTHROUGHS[3].titleVi : BREAKTHROUGHS[3].titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mb-4">
                  {lang === "vi" ? BREAKTHROUGHS[3].abstractVi : BREAKTHROUGHS[3].abstractEn}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold">365 Days Solar Autonomous</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>{lang === "vi" ? "Xem chi tiết" : "Read Brief"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          )}

        </div>

        {/* ─── DEEPMIND BENCHMARK & COMPARATIVE EVALUATION MATRIX ──────────── */}
        <div className="mb-24 rounded-3xl p-6 sm:p-10 bg-white/[0.02] border border-white/10 backdrop-blur-xl">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              {lang === "vi" ? "Đánh giá chuẩn đối sánh kỹ thuật" : "Empirical Benchmarking & Evaluation"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              {lang === "vi" ? "Chuẩn Mực Khoa Học Thực Chiến STIC GEN 1.0" : "Comparative Technical Superiority"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              {lang === "vi"
                ? "Sự khác biệt mang tính bước ngoặt giữa phương pháp nghiên cứu thụ động truyền thống và quy chuẩn kỹ thuật thực chiến tại STIC."
                : "How STIC's modern engineering methodology fundamentally advances beyond conventional high school science fair approaches."}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-4 px-4 font-bold">Research Dimension</th>
                  <th className="py-4 px-4 font-bold text-slate-500">Conventional Approach</th>
                  <th className="py-4 px-4 font-bold text-cyan-400">STIC GEN 1.0 Pipeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {BENCHMARK_METRICS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-bold text-white whitespace-nowrap">
                      {lang === "vi" ? row.capabilityVi : row.capability}
                    </td>
                    <td className="py-4 px-4 text-slate-400">
                      {lang === "vi" ? row.traditionalVi : row.traditional}
                    </td>
                    <td className="py-4 px-4 font-semibold text-cyan-300 flex items-center gap-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{lang === "vi" ? row.sticGen1Vi : row.sticGen1}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── DEEPMIND PHILOSOPHY & RESPONSIBLE RESEARCH ──────────────────── */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              {lang === "vi" ? "Triết lý nghiên cứu & Đạo đức khoa học" : "Our Scientific Philosophy"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              {lang === "vi" ? "Khoa Học Nghiêm Cẩn, Phục Vụ Cộng Đồng" : "Rigorous Discovery, Built for Good"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              {lang === "vi"
                ? "Theo đuổi công nghệ cao luôn song hành cùng trách nhiệm, sự an toàn và tinh thần cống hiến."
                : "At STIC, pushing technological boundaries is inherently coupled with safety guardrails and community impact."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: ShieldCheck,
                titleEn: "Safety & Physical Guardrails",
                titleVi: "An Toàn Phần Cứng & Kiểm Soát Rủi Ro",
                descEn:
                  "UAV hardware-in-the-loop tests, geofenced autonomous flight envelopes, and rigorous battery safety protocols protect members and campuses.",
                descVi:
                  "Mọi thiết bị bay UAV đều áp dụng hàng rào địa lý Geofence, kịch bản tự ngắt khẩn cấp và quy trình kiểm định pin sạc chuẩn công nghiệp.",
              },
              {
                icon: Binary,
                titleEn: "Open Science & Reproducibility",
                titleVi: "Khoa Học Mở & Khả Năng Tái Lập",
                descEn:
                  "All firmware, circuit schematics, and neural datasets are systematically documented on GitHub for high school STEM reproducibility.",
                descVi:
                  "Toàn bộ sơ đồ nguyên lý, mã nguồn vi điều khiển và tập dữ liệu huấn luyện AI được lưu trữ mở trên GitHub để thế hệ sau kế thừa.",
              },
              {
                icon: Compass,
                titleEn: "Interdisciplinary Empowerment",
                titleVi: "Phối Hợp Liên Chuyên Môn Thực Chiến",
                descEn:
                  "Software developers, roboticists, graphic designers, and scientific researchers work hand-in-hand within agile squads.",
                descVi:
                  "Lập trình viên AI, kỹ sư chế tạo robot, nhà thiết kế đồ họa và nghiên cứu sinh học kết hợp chặt chẽ trong từng phân đội đề tài.",
              },
            ].map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl p-6 sm:p-8 bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {lang === "vi" ? p.titleVi : p.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {lang === "vi" ? p.descVi : p.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── DEEPMIND EDITORIAL CALL TO ACTION ───────────────────────────── */}
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-blue-950/60 via-[#070d18] to-cyan-950/60 border border-white/15 text-center overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white/10 text-cyan-300 border border-white/20">
              JOIN THE STIC FRONTIER
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {lang === "vi"
                ? "Cùng xây dựng thế hệ nhà khoa học trẻ đầu tiên của STIC."
                : "Be part of the first generation of high school innovators."}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {lang === "vi"
                ? "GEN 1.0 đang tiếp nhận đơn đăng ký từ học sinh THPT toàn thành phố Đà Nẵng. Không yêu cầu kinh nghiệm trước — chỉ cần đam mê khoa học và tinh thần dám dấn thân."
                : "STIC GEN 1.0 is welcoming applications from passionate high school students across Da Nang. No prior experience required — bring your curiosity and drive to build."}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 hover:scale-105"
              >
                <span>{lang === "vi" ? "Nộp đơn gia nhập GEN 1.0" : "Apply for GEN 1.0 Incubation"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all hover:scale-105"
              >
                <span>{lang === "vi" ? "Xem danh mục đề tài" : "Explore All Projects"}</span>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* ─── DEEPMIND TECHNICAL BREAKTHROUGH DETAIL MODAL ─────────────────── */}
      <AnimatePresence>
        {selectedBreakthrough && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090d16] border border-white/15 p-6 sm:p-8 shadow-2xl text-slate-200"
            >
              <button
                onClick={() => setSelectedBreakthrough(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {lang === "vi" ? selectedBreakthrough.categoryVi : selectedBreakthrough.categoryEn}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-3">
                  {lang === "vi" ? selectedBreakthrough.titleVi : selectedBreakthrough.titleEn}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-cyan-400 mt-1">
                  {lang === "vi" ? selectedBreakthrough.subtitleVi : selectedBreakthrough.subtitleEn}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                {selectedBreakthrough.metrics.map((m, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl font-mono font-black text-white">{m.value}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">{lang === "vi" ? m.labelVi : m.labelEn}</div>
                  </div>
                ))}
              </div>

              {/* Abstract */}
              <div className="mb-6 space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Technical Abstract</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {lang === "vi" ? selectedBreakthrough.abstractVi : selectedBreakthrough.abstractEn}
                </p>
              </div>

              {/* Hardware Specifications */}
              <div className="mb-6 space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Hardware & Sensor Architecture</h4>
                <div className="space-y-1.5 font-mono text-xs">
                  {selectedBreakthrough.hardwareSpecs.map((h, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-slate-400">{lang === "vi" ? h.componentVi : h.componentEn}</span>
                      <span className="text-cyan-300 font-semibold">{h.spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Highlights */}
              <div className="mb-8 space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Engineering Highlights</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {(lang === "vi" ? selectedBreakthrough.highlightsVi : selectedBreakthrough.highlightsEn).map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  {selectedBreakthrough.tags.map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-slate-400">
                      #{t}
                    </span>
                  ))}
                </div>
                <Link
                  href="/join"
                  onClick={() => setSelectedBreakthrough(null)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider hover:bg-cyan-300 transition-colors"
                >
                  <span>{lang === "vi" ? "Đăng ký tham gia đề tài này" : "Apply for this project"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
