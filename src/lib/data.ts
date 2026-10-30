export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: string;
}

export interface TeamItem {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  description: string;
  lead: string;
  memberCount: number;
  skills: string[];
  color: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  team: string;
  category: string;
  tags: string[];
  githubLink: string;
  liveLink: string;
  status: "active" | "completed" | "upcoming";
  image: string;
  metrics?: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: "hackathon" | "workshop" | "talk";
  registrationLink: string;
  status: "upcoming" | "ongoing" | "completed";
  seats?: string;
  badgeText: string;
  image: string;
}

export interface SponsorItem {
  id: string;
  name: string;
  tier: "Diamond" | "Gold" | "Silver" | "Partner";
  logoUrl: string;
  website: string;
  industry: string;
}

export interface SocialLinkItem {
  name: string;
  url: string;
  icon: string;
  username: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface CoreValueItem {
  title: string;
  englishTitle: string;
  description: string;
  icon: string;
  color: string;
}

export interface LeaderItem {
  name: string;
  role: string;
  team: string;
  avatar: string;
  bio: string;
  socials: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface BenefitItem {
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

export interface RecruitmentStep {
  step: number;
  title: string;
  date: string;
  description: string;
}

// ─── CLB INFO ────────────────────────────────────────────────────────────────
export const CLUB_INFO = {
  name: "CLB Khoa học kỹ thuật STIC",
  fullName: "CLB KHOA HỌC KĨ THUẬT STIC",
  englishName: "Science, Technology & Innovation Club",
  shortName: "STIC",
  gen: "GEN 1.0",
  email: "clbstic@gmail.com",
  location: "Đà Nẵng, Việt Nam",
  targetAudience: "Học sinh THPT tại TP. Đà Nẵng",
  formLink:
    "https://docs.google.com/forms/d/e/1FAIpQLSfEfAvIevbb0BFHFixLPn7TAy64tkk0lYzLv8ohGfm2EmizBw/viewform",
};

// ─── 1. STATS ─────────────────────────────────────────────────────────────────
export const STATS: StatItem[] = [
  {
    id: "members",
    value: 50,
    suffix: "+",
    label: "Thành viên Gen 1.0",
    description: "Học sinh THPT Đà Nẵng đam mê khoa học & công nghệ",
    icon: "Users",
  },
  {
    id: "projects",
    value: 7,
    suffix: "+",
    label: "Mảng chuyên môn",
    description: "AI, Robotics, Coding, Design, Data, Environment, Innovation",
    icon: "Layers",
  },
  {
    id: "city",
    value: 1,
    suffix: " TP",
    label: "Đà Nẵng",
    description: "Câu lạc bộ KHKT dành riêng cho học sinh cấp 3 Đà Nẵng",
    icon: "MapPin",
  },
  {
    id: "gen",
    value: 1,
    suffix: ".0",
    label: "Thế hệ đầu tiên",
    description: "Đang tuyển thành viên GEN 1.0 — hãy là người đặt nền móng!",
    icon: "Rocket",
  },
];

// ─── 2. TEAMS (7 mảng từ form) ────────────────────────────────────────────────
export const TEAMS: TeamItem[] = [
  {
    id: "ai-coding",
    name: "AI & Coding",
    tagline: "Lập trình & Trí tuệ nhân tạo",
    icon: "Brain",
    description:
      "Khám phá Machine Learning, lập trình Python/C++ và xây dựng các ứng dụng AI thực tế. Từ chatbot đến nhận dạng hình ảnh — giới hạn chỉ là trí tưởng tượng.",
    lead: "TBD",
    memberCount: 0,
    skills: ["Python", "AI/ML", "C++", "Data Analysis", "Algorithms"],
    color: "from-sky-500 to-blue-600",
  },
  {
    id: "robotics-engineering",
    name: "Robotics & Engineering",
    tagline: "Cơ khí, điện tử & robot thông minh",
    icon: "Cpu",
    description:
      "Thiết kế và chế tạo robot, mạch điện tử, Arduino/ESP32. Biến ý tưởng thành phần cứng thực tế — từ xe tự hành đến tay máy điều khiển.",
    lead: "TBD",
    memberCount: 0,
    skills: ["Arduino", "ESP32", "PCB Design", "Mechanics", "Electronics"],
    color: "from-emerald-400 to-green-600",
  },
  {
    id: "innovation-creative",
    name: "Innovation & Creative Projects",
    tagline: "Sáng tạo & Đổi mới không giới hạn",
    icon: "Lightbulb",
    description:
      "Đề xuất và phát triển các ý tưởng đột phá, startup mini, giải pháp sáng tạo cho vấn đề thực tế. Nơi những kẻ mơ mộng biến giấc mơ thành hiện thực.",
    lead: "TBD",
    memberCount: 0,
    skills: ["Design Thinking", "Prototyping", "Pitching", "Business Model"],
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "environment-sustainability",
    name: "Environment & Sustainability",
    tagline: "Công nghệ vì hành tinh xanh",
    icon: "Leaf",
    description:
      "Ứng dụng khoa học kỹ thuật để giải quyết vấn đề môi trường: giám sát ô nhiễm, nông nghiệp thông minh, năng lượng tái tạo và phát triển bền vững.",
    lead: "TBD",
    memberCount: 0,
    skills: ["IoT Sensors", "Data Monitoring", "Green Tech", "Arduino", "GIS"],
    color: "from-teal-400 to-green-500",
  },
  {
    id: "design-media",
    name: "Design & Media",
    tagline: "Kể chuyện bằng hình ảnh & thương hiệu",
    icon: "Palette",
    description:
      "Thiết kế đồ họa, UI/UX, làm video, xây dựng thương hiệu cho CLB và các dự án. Kết hợp thẩm mỹ và kỹ thuật để truyền thông điệp mạnh mẽ.",
    lead: "TBD",
    memberCount: 0,
    skills: ["Figma", "Canva", "Premiere Pro", "Branding", "UI/UX"],
    color: "from-pink-400 to-rose-500",
  },
  {
    id: "data-analysis",
    name: "Data & Analysis",
    tagline: "Đọc hiểu thế giới qua con số",
    icon: "BarChart2",
    description:
      "Thu thập, xử lý và trực quan hóa dữ liệu để rút ra insight có giá trị. Từ thống kê cơ bản đến phân tích xu hướng phức tạp phục vụ nghiên cứu.",
    lead: "TBD",
    memberCount: 0,
    skills: ["Excel", "Python", "Power BI", "Statistics", "SQL"],
    color: "from-violet-400 to-purple-600",
  },
  {
    id: "experiments-stem",
    name: "Experiments & STEM",
    tagline: "Khoa học tự nhiên & thí nghiệm thực hành",
    icon: "FlaskConical",
    description:
      "Thực hiện các thí nghiệm STEM thú vị: vật lý, hóa học, sinh học ứng dụng. Nghiên cứu khoa học tự nhiên và tham gia các cuộc thi KHKT cấp thành phố, quốc gia.",
    lead: "TBD",
    memberCount: 0,
    skills: ["Physics", "Chemistry", "Biology", "Scientific Method", "Lab Work"],
    color: "from-cyan-400 to-blue-500",
  },
];

// ─── 3. PROJECTS ──────────────────────────────────────────────────────────────
export const PROJECTS: ProjectItem[] = [
  {
    id: "stic-bot",
    title: "STIC Assistant Bot",
    tagline: "Trợ lý AI hỗ trợ học tập cho học sinh THPT",
    description:
      "Chatbot AI giúp học sinh tra cứu kiến thức STEM, gợi ý tài liệu ôn tập và giải đáp thắc mắc bài học. Dự án flagship của mảng AI & Coding.",
    team: "AI & Coding",
    category: "AI / ML",
    tags: ["Python", "NLP", "Chatbot", "FastAPI", "React"],
    githubLink: "https://github.com/stic-club",
    liveLink: "#",
    status: "upcoming",
    image: "https://placehold.co/800x500/0b1329/38bdf8.png?text=STIC+AI+Bot",
    metrics: "Dự án GEN 1.0",
  },
  {
    id: "smartair-danang",
    title: "SmartAir Đà Nẵng",
    tagline: "Hệ thống giám sát chất lượng không khí thành phố",
    description:
      "Mạng lưới cảm biến IoT đo chỉ số AQI (PM2.5, CO2, nhiệt độ) tại các điểm trường học Đà Nẵng, hiển thị dashboard realtime và cảnh báo ô nhiễm.",
    team: "Environment & Sustainability",
    category: "IoT & Hardware",
    tags: ["ESP32", "MQTT", "Node.js", "Dashboard", "Air Quality"],
    githubLink: "https://github.com/stic-club",
    liveLink: "#",
    status: "upcoming",
    image: "https://placehold.co/800x500/0b1329/4ade80.png?text=SmartAir+Da+Nang",
    metrics: "Dự án GEN 1.0",
  },
  {
    id: "stic-robot",
    title: "STIC Line Follower",
    tagline: "Robot dò đường thi đấu cấp thành phố",
    description:
      "Xe robot tự hành sử dụng cảm biến hồng ngoại và thuật toán PID, tham gia cuộc thi Robotics THPT Đà Nẵng. Làm từ A-Z bởi các thành viên GEN 1.0.",
    team: "Robotics & Engineering",
    category: "Robotics",
    tags: ["Arduino", "PID Control", "C++", "PCB Design", "Mechanics"],
    githubLink: "https://github.com/stic-club",
    liveLink: "#",
    status: "upcoming",
    image: "https://placehold.co/800x500/0b1329/06b6d4.png?text=STIC+Robot",
    metrics: "Dự án GEN 1.0",
  },
  {
    id: "stic-portal",
    title: "STIC Portal",
    tagline: "Website & cổng thông tin chính thức của CLB",
    description:
      "Nền tảng web quản lý hoạt động CLB: đăng ký thành viên, thông báo sự kiện, showcase dự án và theo dõi tiến độ các nhóm — tức trang web bạn đang xem!",
    team: "AI & Coding",
    category: "Web App",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubLink: "https://github.com/stic-club",
    liveLink: "#",
    status: "active",
    image: "https://placehold.co/800x500/0b1329/38bdf8.png?text=STIC+Portal",
    metrics: "Website chính thức",
  },
  {
    id: "danang-stem-map",
    title: "Đà Nẵng STEM Map",
    tagline: "Bản đồ tài nguyên học STEM tại Đà Nẵng",
    description:
      "Ứng dụng web tổng hợp CLB, trung tâm STEM, cuộc thi, học bổng dành cho học sinh THPT Đà Nẵng. Một cẩm nang số cho cộng đồng học sinh kỹ thuật.",
    team: "Data & Analysis",
    category: "Data & Analytics",
    tags: ["React", "Leaflet.js", "Python", "Google Sheets API", "Open Data"],
    githubLink: "https://github.com/stic-club",
    liveLink: "#",
    status: "upcoming",
    image: "https://placehold.co/800x500/0b1329/4ade80.png?text=Da+Nang+STEM+Map",
    metrics: "Dự án GEN 1.0",
  },
  {
    id: "stic-brand",
    title: "STIC Brand Kit",
    tagline: "Bộ nhận diện thương hiệu CLB KHKT STIC",
    description:
      "Xây dựng toàn bộ visual identity cho CLB: logo, màu sắc, typography, template mạng xã hội và motion graphics. Nền tảng truyền thông chuyên nghiệp.",
    team: "Design & Media",
    category: "Design System",
    tags: ["Figma", "Illustrator", "Branding", "Motion Design", "Canva"],
    githubLink: "https://github.com/stic-club",
    liveLink: "#",
    status: "active",
    image: "https://placehold.co/800x500/0b1329/f472b6.png?text=STIC+Brand+Kit",
    metrics: "Thương hiệu chính thức",
  },
];

// ─── 4. EVENTS ────────────────────────────────────────────────────────────────
export const EVENTS: EventItem[] = [
  {
    id: "tuyen-thanh-vien-gen1",
    title: "🚀 Tuyển Thành Viên GEN 1.0 — Đặt Nền Móng STIC",
    date: "Đang mở đơn",
    time: "Nộp form online",
    location: "TP. Đà Nẵng (học sinh THPT)",
    description:
      "Cơ hội gia nhập thế hệ khai sinh CLB KHKT STIC! Tìm kiếm những bạn học sinh THPT Đà Nẵng đam mê khoa học kỹ thuật, không cần kinh nghiệm — chỉ cần đam mê và tinh thần sẵn sàng học hỏi.",
    type: "hackathon",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSfEfAvIevbb0BFHFixLPn7TAy64tkk0lYzLv8ohGfm2EmizBw/viewform",
    status: "ongoing",
    seats: "Số lượng có hạn",
    badgeText: "🔥 Đang tuyển GEN 1.0",
    image:
      "https://placehold.co/800x450/0b1329/38bdf8.png?text=Tuyen+Thanh+Vien+GEN+1.0",
  },
  {
    id: "stem-workshop-intro",
    title: "Workshop Nhập Môn STEM — Từ Ý Tưởng Đến Dự Án",
    date: "Sắp diễn ra",
    time: "08:30 - 11:30",
    location: "TP. Đà Nẵng (địa điểm sẽ thông báo)",
    description:
      "Buổi workshop đầu tiên dành cho tân thành viên GEN 1.0: giới thiệu 7 mảng chuyên môn, demo dự án mẫu và định hướng lộ trình học tập theo từng mảng.",
    type: "workshop",
    registrationLink: "/join",
    status: "upcoming",
    seats: "GEN 1.0 members only",
    badgeText: "Sắp diễn ra",
    image:
      "https://placehold.co/800x450/0b1329/4ade80.png?text=STEM+Workshop+Intro",
  },
  {
    id: "stic-mini-hackathon",
    title: "STIC Mini Hackathon — Giải Quyết Vấn Đề Trường Học",
    date: "Quý 1/2025",
    time: "12 giờ",
    location: "Đà Nẵng",
    description:
      "Cuộc thi lập trình/sáng tạo dành cho thành viên STIC: các đội nhỏ 3-4 người xây dựng giải pháp cho vấn đề thực tế tại trường học Đà Nẵng trong 12 giờ.",
    type: "hackathon",
    registrationLink: "/join",
    status: "upcoming",
    seats: "Thành viên STIC",
    badgeText: "Quý 1/2025",
    image:
      "https://placehold.co/800x450/0b1329/06b6d4.png?text=STIC+Mini+Hackathon",
  },
  {
    id: "tech-talk-ai",
    title: "Tech Talk: Trí Tuệ Nhân Tạo Đang Thay Đổi Thế Giới",
    date: "Quý 1/2025",
    time: "14:00 - 16:30",
    location: "Đà Nẵng (online + offline)",
    description:
      "Buổi nói chuyện về AI, ChatGPT và tương lai công nghệ dành cho học sinh THPT. Hiểu AI không chỉ để dùng — mà để tạo ra chúng!",
    type: "talk",
    registrationLink: "/join",
    status: "upcoming",
    seats: "Mở cho tất cả học sinh",
    badgeText: "Quý 1/2025",
    image: "https://placehold.co/800x450/0b1329/4ade80.png?text=Tech+Talk+AI",
  },
];

// ─── 5. SPONSORS ──────────────────────────────────────────────────────────────
export const SPONSORS: SponsorItem[] = [
  {
    id: "partner-1",
    name: "Đối tác Giáo dục",
    tier: "Partner",
    logoUrl: "https://placehold.co/240x80/0b1329/38bdf8.png?text=Giao+duc+Da+Nang",
    website: "#",
    industry: "Giáo dục & Đào tạo",
  },
  {
    id: "partner-2",
    name: "Nhà tài trợ công nghệ",
    tier: "Gold",
    logoUrl: "https://placehold.co/240x80/0b1329/4ade80.png?text=Tech+Sponsor",
    website: "#",
    industry: "Công nghệ",
  },
  {
    id: "partner-3",
    name: "Hỗ trợ thiết bị",
    tier: "Silver",
    logoUrl: "https://placehold.co/240x80/0b1329/06b6d4.png?text=Equipment+Partner",
    website: "#",
    industry: "Thiết bị điện tử",
  },
  {
    id: "partner-4",
    name: "Đồng hành truyền thông",
    tier: "Partner",
    logoUrl: "https://placehold.co/240x80/0b1329/f472b6.png?text=Media+Partner",
    website: "#",
    industry: "Truyền thông",
  },
  {
    id: "partner-5",
    name: "Hỗ trợ địa điểm",
    tier: "Partner",
    logoUrl: "https://placehold.co/240x80/0b1329/a78bfa.png?text=Venue+Partner",
    website: "#",
    industry: "Cơ sở vật chất",
  },
];

// ─── 6. SOCIAL LINKS ──────────────────────────────────────────────────────────
export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    name: "Facebook",
    url: "https://facebook.com/stic.danang",
    icon: "Globe",
    username: "fb.com/stic.danang",
  },
  {
    name: "Email",
    url: "mailto:clbstic@gmail.com",
    icon: "Mail",
    username: "clbstic@gmail.com",
  },
  {
    name: "GitHub",
    url: "https://github.com/stic-club",
    icon: "Github",
    username: "@stic-club",
  },
  {
    name: "Discord",
    url: "https://discord.gg/stic",
    icon: "MessageSquare",
    username: "STIC Community",
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@stic-club",
    icon: "Youtube",
    username: "STIC Tech Channel",
  },
];

// ─── 7. TIMELINE ──────────────────────────────────────────────────────────────
export const TIMELINE: TimelineItem[] = [
  {
    year: "2024",
    title: "Ý tưởng hình thành",
    description:
      "Từ trăn trở về việc thiếu sân chơi STEM thực chiến cho học sinh THPT Đà Nẵng, nhóm sáng lập bắt đầu phác thảo mô hình CLB KHKT STIC.",
    highlight: false,
  },
  {
    year: "2024",
    title: "Thành lập CLB KHKT STIC",
    description:
      "CLB chính thức ra đời với đầy đủ cơ cấu tổ chức: Ban chủ nhiệm, 7 mảng chuyên môn và tầm nhìn xây dựng cộng đồng STEM Đà Nẵng.",
    highlight: false,
  },
  {
    year: "2024",
    title: "🚀 Tuyển thành viên GEN 1.0",
    description:
      "Mở đơn tuyển thế hệ thành viên đầu tiên — những người sẽ đặt nền móng, định hình văn hóa và cùng nhau viết nên lịch sử đầu tiên của STIC.",
    highlight: true,
  },
  {
    year: "2025",
    title: "Khởi động các dự án GEN 1.0",
    description:
      "Các nhóm dự án đầu tiên ra mắt: STIC Bot AI, SmartAir IoT, Robot dò đường và bản đồ STEM Đà Nẵng. Mảng Design hoàn thiện bộ nhận diện thương hiệu.",
    highlight: false,
  },
  {
    year: "2025",
    title: "STIC Mini Hackathon đầu tiên",
    description:
      "Tổ chức cuộc thi lập trình/sáng tạo nội bộ đầu tiên, kết nối cộng đồng STEM học sinh THPT toàn Đà Nẵng.",
    highlight: false,
  },
];

// ─── 8. CORE VALUES ───────────────────────────────────────────────────────────
export const CORE_VALUES: CoreValueItem[] = [
  {
    title: "Sáng Tạo Đột Phá",
    englishTitle: "Innovation First",
    description:
      "Khuyến khích mọi ý tưởng — dù nhỏ nhất. Biến tư duy lý thuyết thành sản phẩm thực tế, từ bản phác thảo đến prototype chạy được.",
    icon: "Sparkles",
    color: "from-sky-500 to-blue-500",
  },
  {
    title: "Học Qua Thực Chiến",
    englishTitle: "Learn by Doing",
    description:
      "Không giáo điều, không chỉ đọc sách. STIC tin rằng kỹ năng thật sự đến từ việc tự tay làm — từ hàn mạch, code, đến thiết kế và thuyết trình.",
    icon: "Wrench",
    color: "from-emerald-400 to-green-500",
  },
  {
    title: "Đồng Đội & Cộng Đồng",
    englishTitle: "Together We Build",
    description:
      "STIC là gia đình. Các mảng hỗ trợ nhau, mentor kèm cặp đàn em, cùng chia sẻ kiến thức và tạo ra những sản phẩm lớn hơn khả năng mỗi cá nhân.",
    icon: "Users",
    color: "from-cyan-400 to-teal-500",
  },
  {
    title: "Tác Động Thực Tế",
    englishTitle: "Real-World Impact",
    description:
      "Mọi dự án của STIC hướng đến giải quyết vấn đề thật của học sinh, trường học và cộng đồng Đà Nẵng — không phải chỉ để trưng bày.",
    icon: "HeartHandshake",
    color: "from-blue-400 to-indigo-500",
  },
];

// ─── 9. LEADERSHIP ────────────────────────────────────────────────────────────
export const LEADERS: LeaderItem[] = [
  {
    name: "Lương Phú Hưng",
    role: "Chủ nhiệm CLB",
    team: "Ban Chủ nhiệm",
    avatar: "https://placehold.co/300x300/0b1329/38bdf8.png?text=Luong+Phu+Hung",
    bio: "Người sáng lập và dẫn dắt CLB KHKT STIC. Đam mê xây dựng cộng đồng STEM cho học sinh THPT Đà Nẵng, kết nối kỹ năng kỹ thuật với tư duy đổi mới sáng tạo.",
    socials: {
      email: "clbstic@gmail.com",
    },
  },
  {
    name: "Lê Hoài An",
    role: "Phó Chủ nhiệm",
    team: "Ban Chủ nhiệm",
    avatar: "https://placehold.co/300x300/0b1329/4ade80.png?text=Le+Hoai+An",
    bio: "Phụ trách điều phối hoạt động nội bộ, kết nối các mảng chuyên môn và đảm bảo mọi thành viên có môi trường phát triển tốt nhất.",
    socials: {
      email: "clbstic@gmail.com",
    },
  },
  {
    name: "Trương Văn Đăng Huy",
    role: "Điều phối viên",
    team: "Ban Chủ nhiệm",
    avatar:
      "https://placehold.co/300x300/0b1329/06b6d4.png?text=Truong+Van+Dang+Huy",
    bio: "Điều phối các hoạt động sự kiện, truyền thông và kết nối đối ngoại của CLB. Cầu nối giữa ban chủ nhiệm, thành viên và cộng đồng STEM Đà Nẵng.",
    socials: {
      email: "clbstic@gmail.com",
    },
  },
];

// ─── 10. RECRUITMENT STEPS ────────────────────────────────────────────────────
export const RECRUITMENT_STEPS: RecruitmentStep[] = [
  {
    step: 1,
    title: "Nộp đơn đăng ký online",
    date: "Đang mở",
    description:
      "Điền form tuyển thành viên GEN 1.0 với thông tin cá nhân, mảng yêu thích và trả lời câu hỏi tuyển chọn ngắn. Không cần kinh nghiệm!",
  },
  {
    step: 2,
    title: "Sơ loại hồ sơ",
    date: "Sau khi đóng form",
    description:
      "Ban chủ nhiệm xem xét đơn đăng ký dựa trên đam mê, tư duy và sự phù hợp với văn hóa CLB. Không phân biệt trình độ kỹ thuật ban đầu.",
  },
  {
    step: 3,
    title: "Phỏng vấn thân mật",
    date: "Thông báo sau",
    description:
      "Buổi trò chuyện cởi mở với ban chủ nhiệm để hiểu thêm về nguyện vọng, định hướng mảng chuyên môn và kỳ vọng khi tham gia STIC.",
  },
  {
    step: 4,
    title: "Chào đón Tân thành viên GEN 1.0!",
    date: "Thông báo sau",
    description:
      "Tham gia buổi orientation, gặp gỡ toàn bộ ban chủ nhiệm, chọn mảng chuyên môn và bắt đầu hành trình kiến tạo lịch sử STIC cùng nhau.",
  },
];

// ─── 11. BENEFITS ─────────────────────────────────────────────────────────────
export const BENEFITS: BenefitItem[] = [
  {
    title: "Dự Án Thực Chiến",
    description:
      "Tham gia xây dựng sản phẩm kỹ thuật thật — robot, app, hệ thống IoT — ngay từ những ngày đầu gia nhập. Portfolio thật cho hồ sơ vào đại học.",
    icon: "Rocket",
    gradient: "from-sky-500/20 to-blue-500/10",
  },
  {
    title: "Mentor & Cộng Đồng",
    description:
      "Được hỗ trợ bởi ban chủ nhiệm có kinh nghiệm, kết nối với mạng lưới học sinh STEM toàn Đà Nẵng và tham gia cộng đồng Discord active 24/7.",
    icon: "Users",
    gradient: "from-emerald-500/20 to-green-500/10",
  },
  {
    title: "Cơ Hội Thi Đấu",
    description:
      "Được tham gia các cuộc thi KHKT, Robotics, Hackathon cấp thành phố và quốc gia dưới ngọn cờ STIC với sự hỗ trợ từ CLB.",
    icon: "Trophy",
    gradient: "from-amber-500/20 to-orange-500/10",
  },
  {
    title: "Kỹ Năng Tương Lai",
    description:
      "Học lập trình, thiết kế, phân tích dữ liệu, thuyết trình và làm việc nhóm — bộ kỹ năng mà mọi trường đại học và nhà tuyển dụng đều tìm kiếm.",
    icon: "GraduationCap",
    gradient: "from-violet-500/20 to-purple-500/10",
  },
];

// ─── 12. FAQS ─────────────────────────────────────────────────────────────────
export const FAQS: FaqItem[] = [
  {
    category: "Điều kiện",
    question: "Mình chưa có kinh nghiệm gì thì có ứng tuyển được không?",
    answer:
      "Hoàn toàn được! STIC GEN 1.0 tuyển theo đam mê và tinh thần học hỏi, không phải kinh nghiệm. Bạn chỉ cần là học sinh THPT tại Đà Nẵng và có tình yêu với khoa học kỹ thuật.",
  },
  {
    category: "Điều kiện",
    question: "Đối tượng tuyển là ai? Học sinh lớp mấy?",
    answer:
      "STIC tuyển học sinh THPT (lớp 10, 11, 12) đang học tại các trường trên địa bàn TP. Đà Nẵng. Không giới hạn trường hay khối lớp.",
  },
  {
    category: "Mảng chuyên môn",
    question: "Mình có thể chọn mấy mảng?",
    answer:
      "Trong form đăng ký bạn có thể chọn mảng yêu thích nhất. Sau khi gia nhập và trải nghiệm, bạn có thể trao đổi với ban chủ nhiệm về việc tham gia thêm mảng khác nếu muốn.",
  },
  {
    category: "Thời gian",
    question: "Tham gia CLB có ảnh hưởng đến việc học không?",
    answer:
      "STIC hiểu học sinh có lịch học và bài vở. Hoạt động được thiết kế linh hoạt, ưu tiên cuối tuần và giờ rảnh. Cam kết của bạn có thể là 'thường xuyên', 'cần sắp xếp lịch', hoặc 'chưa chắc về thời gian' — đều được chào đón!",
  },
  {
    category: "Chi phí",
    question: "Tham gia CLB có mất phí không?",
    answer:
      "STIC hoạt động phi lợi nhuận và hướng đến việc miễn phí hoặc chi phí tối thiểu cho thành viên. Chi tiết sẽ được thông báo trong buổi orientation sau tuyển chọn.",
  },
];
