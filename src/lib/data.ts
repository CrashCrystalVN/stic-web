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
  nameVi?: string;
  nameEn?: string;
  tagline: string;
  taglineVi?: string;
  taglineEn?: string;
  icon: string;
  description: string;
  descriptionVi?: string;
  descriptionEn?: string;
  lead: string;
  memberCount: number;
  skills: string[];
  color: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  titleVi?: string;
  titleEn?: string;
  tagline: string;
  taglineVi?: string;
  taglineEn?: string;
  description: string;
  descriptionVi?: string;
  descriptionEn?: string;
  team: string;
  teamVi?: string;
  teamEn?: string;
  category: string;
  categoryVi?: string;
  categoryEn?: string;
  tags: string[];
  githubLink: string;
  liveLink: string;
  status: "active" | "completed" | "upcoming";
  image: string;
  metrics?: string;
  metricsVi?: string;
  metricsEn?: string;
}

export interface EventItem {
  id: string;
  title: string;
  titleVi?: string;
  titleEn?: string;
  date: string;
  dateVi?: string;
  dateEn?: string;
  time: string;
  location: string;
  locationVi?: string;
  locationEn?: string;
  description: string;
  descriptionVi?: string;
  descriptionEn?: string;
  type: "hackathon" | "workshop" | "talk";
  registrationLink: string;
  status: "upcoming" | "ongoing" | "completed";
  seats?: string;
  badgeText: string;
  badgeTextVi?: string;
  badgeTextEn?: string;
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
  titleVi?: string;
  titleEn?: string;
  description: string;
  descriptionVi?: string;
  descriptionEn?: string;
  highlight?: boolean;
}

export interface CoreValueItem {
  title: string;
  englishTitle: string;
  titleVi?: string;
  titleEn?: string;
  description: string;
  descriptionVi?: string;
  descriptionEn?: string;
  icon: string;
  color: string;
}

export interface LeaderItem {
  name: string;
  nameVi?: string;
  nameEn?: string;
  role: string;
  roleVi?: string;
  roleEn?: string;
  team: string;
  avatar: string;
  bio: string;
  bioVi?: string;
  bioEn?: string;
  socials: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface FaqItem {
  category: string;
  categoryVi?: string;
  categoryEn?: string;
  question: string;
  questionVi?: string;
  questionEn?: string;
  answer: string;
  answerVi?: string;
  answerEn?: string;
}

export interface BenefitItem {
  title: string;
  titleVi?: string;
  titleEn?: string;
  description: string;
  descriptionVi?: string;
  descriptionEn?: string;
  icon: string;
  gradient: string;
}

export interface RecruitmentStep {
  step: number;
  title: string;
  titleVi?: string;
  titleEn?: string;
  date: string;
  dateVi?: string;
  dateEn?: string;
  description: string;
  descriptionVi?: string;
  descriptionEn?: string;
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
    nameVi: "AI & Lập trình",
    nameEn: "AI & Coding",
    tagline: "Lập trình & Trí tuệ nhân tạo",
    taglineVi: "Lập trình & Trí tuệ nhân tạo",
    taglineEn: "Programming & Artificial Intelligence",
    icon: "Brain",
    description:
      "Khám phá Machine Learning, lập trình Python/C++ và xây dựng các ứng dụng AI thực tế. Từ chatbot đến nhận dạng hình ảnh — giới hạn chỉ là trí tưởng tượng.",
    descriptionVi:
      "Khám phá Machine Learning, lập trình Python/C++ và xây dựng các ứng dụng AI thực tế. Từ chatbot đến nhận dạng hình ảnh — giới hạn chỉ là trí tưởng tượng.",
    descriptionEn:
      "Explore Machine Learning, Python/C++ development, and build practical AI applications. From intelligent chatbots to computer vision — your imagination is the only limit.",
    lead: "TBD",
    memberCount: 0,
    skills: ["Python", "AI/ML", "C++", "Data Analysis", "Algorithms"],
    color: "from-sky-500 to-blue-600",
  },
  {
    id: "robotics-engineering",
    name: "Robotics & Engineering",
    nameVi: "Chế tạo Robot & Kỹ thuật",
    nameEn: "Robotics & Engineering",
    tagline: "Cơ khí, điện tử & robot thông minh",
    taglineVi: "Cơ khí, điện tử & robot thông minh",
    taglineEn: "Mechanics, electronics & smart robotics",
    icon: "Cpu",
    description:
      "Thiết kế và chế tạo robot, mạch điện tử, Arduino/ESP32. Biến ý tưởng thành phần cứng thực tế — từ xe tự hành đến tay máy điều khiển.",
    descriptionVi:
      "Thiết kế và chế tạo robot, mạch điện tử, Arduino/ESP32. Biến ý tưởng thành phần cứng thực tế — từ xe tự hành đến tay máy điều khiển.",
    descriptionEn:
      "Design and engineer robots, electronic circuits, Arduino, and ESP32. Turn concepts into tangible hardware — from autonomous rovers to robotic manipulator arms.",
    lead: "TBD",
    memberCount: 0,
    skills: ["Arduino", "ESP32", "PCB Design", "Mechanics", "Electronics"],
    color: "from-emerald-400 to-green-600",
  },
  {
    id: "innovation-creative",
    name: "Innovation & Creative Projects",
    nameVi: "Đổi mới & Sáng tạo",
    nameEn: "Innovation & Creative Projects",
    tagline: "Sáng tạo & Đổi mới không giới hạn",
    taglineVi: "Sáng tạo & Đổi mới không giới hạn",
    taglineEn: "Limitless innovation & problem-solving",
    icon: "Lightbulb",
    description:
      "Đề xuất và phát triển các ý tưởng đột phá, startup mini, giải pháp sáng tạo cho vấn đề thực tế. Nơi những kẻ mơ mộng biến giấc mơ thành hiện thực.",
    descriptionVi:
      "Đề xuất và phát triển các ý tưởng đột phá, startup mini, giải pháp sáng tạo cho vấn đề thực tế. Nơi những kẻ mơ mộng biến giấc mơ thành hiện thực.",
    descriptionEn:
      "Pitch and engineer breakthrough ideas, mini-startups, and creative solutions to real-world challenges. Where visionary students turn dreams into working prototypes.",
    lead: "TBD",
    memberCount: 0,
    skills: ["Design Thinking", "Prototyping", "Pitching", "Business Model"],
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "environment-sustainability",
    name: "Environment & Sustainability",
    nameVi: "Môi trường & Bền vững",
    nameEn: "Environment & Sustainability",
    tagline: "Công nghệ vì hành tinh xanh",
    taglineVi: "Công nghệ vì hành tinh xanh",
    taglineEn: "Technology for a sustainable future",
    icon: "Leaf",
    description:
      "Ứng dụng khoa học kỹ thuật để giải quyết vấn đề môi trường: giám sát ô nhiễm, nông nghiệp thông minh, năng lượng tái tạo và phát triển bền vững.",
    descriptionVi:
      "Ứng dụng khoa học kỹ thuật để giải quyết vấn đề môi trường: giám sát ô nhiễm, nông nghiệp thông minh, năng lượng tái tạo và phát triển bền vững.",
    descriptionEn:
      "Apply STEM innovations to environmental challenges: pollution monitoring, smart agriculture, renewable energy, and sustainable ecological solutions.",
    lead: "TBD",
    memberCount: 0,
    skills: ["IoT Sensors", "Data Monitoring", "Green Tech", "Arduino", "GIS"],
    color: "from-teal-400 to-green-500",
  },
  {
    id: "design-media",
    name: "Design & Media",
    nameVi: "Thiết kế & Truyền thông",
    nameEn: "Design & Media",
    tagline: "Kể chuyện bằng hình ảnh & thương hiệu",
    taglineVi: "Kể chuyện bằng hình ảnh & thương hiệu",
    taglineEn: "Visual storytelling & brand design",
    icon: "Palette",
    description:
      "Thiết kế đồ họa, UI/UX, làm video, xây dựng thương hiệu cho CLB và các dự án. Kết hợp thẩm mỹ và kỹ thuật để truyền thông điệp mạnh mẽ.",
    descriptionVi:
      "Thiết kế đồ họa, UI/UX, làm video, xây dựng thương hiệu cho CLB và các dự án. Kết hợp thẩm mỹ và kỹ thuật để truyền thông điệp mạnh mẽ.",
    descriptionEn:
      "Craft graphic designs, UI/UX interfaces, video production, and build brand identity for STIC projects. Merging aesthetics and technology to communicate powerful ideas.",
    lead: "TBD",
    memberCount: 0,
    skills: ["Figma", "Canva", "Premiere Pro", "Branding", "UI/UX"],
    color: "from-pink-400 to-rose-500",
  },
  {
    id: "data-analysis",
    name: "Data & Analysis",
    nameVi: "Dữ liệu & Phân tích",
    nameEn: "Data & Analysis",
    tagline: "Đọc hiểu thế giới qua con số",
    taglineVi: "Đọc hiểu thế giới qua con số",
    taglineEn: "Deciphering the world through data",
    icon: "BarChart2",
    description:
      "Thu thập, xử lý và trực quan hóa dữ liệu để rút ra insight có giá trị. Từ thống kê cơ bản đến phân tích xu hướng phức tạp phục vụ nghiên cứu.",
    descriptionVi:
      "Thu thập, xử lý và trực quan hóa dữ liệu để rút ra insight có giá trị. Từ thống kê cơ bản đến phân tích xu hướng phức tạp phục vụ nghiên cứu.",
    descriptionEn:
      "Collect, process, and visualize data to unlock meaningful insights. From foundational statistics to predictive modeling for scientific and social research.",
    lead: "TBD",
    memberCount: 0,
    skills: ["Excel", "Python", "Power BI", "Statistics", "SQL"],
    color: "from-violet-400 to-purple-600",
  },
  {
    id: "experiments-stem",
    name: "Experiments & STEM",
    nameVi: "Thí nghiệm & Khoa học Ứng dụng",
    nameEn: "Experiments & STEM",
    tagline: "Khoa học tự nhiên & thí nghiệm thực hành",
    taglineVi: "Khoa học tự nhiên & thí nghiệm thực hành",
    taglineEn: "Applied physical sciences & laboratory research",
    icon: "FlaskConical",
    description:
      "Thực hiện các thí nghiệm STEM thú vị: vật lý, hóa học, sinh học ứng dụng. Nghiên cứu khoa học tự nhiên và tham gia các cuộc thi KHKT cấp thành phố, quốc gia.",
    descriptionVi:
      "Thực hiện các thí nghiệm STEM thú vị: vật lý, hóa học, sinh học ứng dụng. Nghiên cứu khoa học tự nhiên và tham gia các cuộc thi KHKT cấp thành phố, quốc gia.",
    descriptionEn:
      "Conduct engaging STEM experiments across applied physics, chemistry, and biology. Spearhead scientific discovery and participate in city & national science fairs.",
    lead: "TBD",
    memberCount: 0,
    skills: ["Physics", "Chemistry", "Biology", "Scientific Method", "Lab Work"],
    color: "from-cyan-400 to-blue-500",
  },
];

// ─── 3. PROJECTS ──────────────────────────────────────────────────────────────
export const PROJECTS: ProjectItem[] = [
  {
    id: "ai-book-classifier",
    title: "Hệ thống phân loại sách AI",
    titleVi: "Hệ thống phân loại sách AI",
    titleEn: "AI Book Classification & Sorting System",
    tagline: "Nhận diện gáy sách, quét OCR và tự động hóa phân loại kệ thư viện",
    taglineVi: "Nhận diện gáy sách, quét OCR và tự động hóa phân loại kệ thư viện",
    taglineEn: "Automated book spine recognition, OCR scanning, and intelligent library shelf sorting",
    description:
      "Ứng dụng thị giác máy tính (Computer Vision) kết hợp mô hình học sâu và camera nhúng để nhận diện nhan đề, mã ISBN và phân loại vị trí sách trên giá thư viện theo hệ thống phân loại thập phân Dewey (DDC). Tối ưu hóa thời gian sắp xếp và tìm kiếm sách cho thư viện học đường THPT.",
    descriptionVi:
      "Ứng dụng thị giác máy tính (Computer Vision) kết hợp mô hình học sâu và camera nhúng để nhận diện nhan đề, mã ISBN và phân loại vị trí sách trên giá thư viện theo hệ thống phân loại thập phân Dewey (DDC). Tối ưu hóa thời gian sắp xếp và tìm kiếm sách cho thư viện học đường THPT.",
    descriptionEn:
      "Leveraging Computer Vision, Deep Learning, and embedded camera sensors to detect book spines, OCR titles, and automate Dewey Decimal (DDC) classification for school libraries. Streamlines shelf organization and cataloging for Da Nang high schools.",
    team: "AI & Coding",
    teamVi: "AI & Lập trình",
    teamEn: "AI & Coding",
    category: "AI Vision & Automation",
    categoryVi: "Thị giác máy tính AI & Tự động hóa",
    categoryEn: "AI Vision & Automation",
    tags: ["Computer Vision", "YOLOv8", "OCR", "Python", "Raspberry Pi", "Dewey DDC"],
    githubLink: "https://github.com/CrashCrystalVN/stic-web",
    liveLink: "#",
    status: "upcoming",
    image: "https://placehold.co/800x500/0b1329/38bdf8.png?text=AI+Book+Classifier",
    metrics: "Dự án GEN 1.0",
    metricsVi: "Dự án GEN 1.0",
    metricsEn: "GEN 1.0 Project",
  },
  {
    id: "ai-delivery-drone",
    title: "Drone chuyển hàng AI",
    titleVi: "Drone chuyển hàng AI",
    titleEn: "Autonomous AI Delivery Drone",
    tagline: "Máy bay không người lái tự hành vận chuyển bưu phẩm khẩn cấp và thiết bị y tế",
    taglineVi: "Máy bay không người lái tự hành vận chuyển bưu phẩm khẩn cấp và thiết bị y tế",
    taglineEn: "Autonomous quadcopter drone for rapid emergency delivery and smart payload transport",
    description:
      "Thiết kế khung quadcopter tải trọng cao tích hợp vi điều khiển bay Pixhawk/ArduPilot, cảm biến LiDAR và camera AI định vị GPS RTK. Máy bay có khả năng tự động né tránh chướng ngại vật thời gian thực, lập lộ trình bay an toàn và thả hàng chính xác tại điểm tiếp nhận.",
    descriptionVi:
      "Thiết kế khung quadcopter tải trọng cao tích hợp vi điều khiển bay Pixhawk/ArduPilot, cảm biến LiDAR và camera AI định vị GPS RTK. Máy bay có khả năng tự động né tránh chướng ngại vật thời gian thực, lập lộ trình bay an toàn và thả hàng chính xác tại điểm tiếp nhận.",
    descriptionEn:
      "Custom high-payload quadcopter engineered with Pixhawk/ArduPilot flight controllers, LiDAR obstacle sensors, and GPS RTK AI vision navigation. Capable of real-time collision avoidance, automated flight path planning, and precision cargo drop-off.",
    team: "Robotics & Engineering",
    teamVi: "Chế tạo Robot & Kỹ thuật",
    teamEn: "Robotics & Engineering",
    category: "Autonomous UAV & Robotics",
    categoryVi: "UAV Tự hành & Robotics",
    categoryEn: "Autonomous UAV & Robotics",
    tags: ["ArduPilot", "Pixhawk", "LiDAR", "Edge AI", "ROS2", "GPS RTK", "C++"],
    githubLink: "https://github.com/CrashCrystalVN/stic-web",
    liveLink: "#",
    status: "upcoming",
    image: "https://placehold.co/800x500/0b1329/06b6d4.png?text=AI+Delivery+Drone",
    metrics: "Dự án GEN 1.0",
    metricsVi: "Dự án GEN 1.0",
    metricsEn: "GEN 1.0 Project",
  },
  {
    id: "stic-bot",
    title: "STIC Assistant Bot",
    titleVi: "STIC Assistant Bot",
    titleEn: "STIC Assistant Bot",
    tagline: "Trợ lý AI hỗ trợ học tập cho học sinh THPT",
    taglineVi: "Trợ lý AI hỗ trợ học tập cho học sinh THPT",
    taglineEn: "AI study assistant tailored for high school students",
    description:
      "Chatbot AI giúp học sinh tra cứu kiến thức STEM, gợi ý tài liệu ôn tập và giải đáp thắc mắc bài học. Dự án flagship của mảng AI & Coding.",
    descriptionVi:
      "Chatbot AI giúp học sinh tra cứu kiến thức STEM, gợi ý tài liệu ôn tập và giải đáp thắc mắc bài học. Dự án flagship của mảng AI & Coding.",
    descriptionEn:
      "An AI chatbot designed to help students look up STEM concepts, recommend study materials, and answer curriculum questions. Flagship project of the AI & Coding department.",
    team: "AI & Coding",
    teamVi: "AI & Lập trình",
    teamEn: "AI & Coding",
    category: "AI / ML",
    categoryVi: "Trí tuệ nhân tạo",
    categoryEn: "AI & Machine Learning",
    tags: ["Python", "NLP", "Chatbot", "FastAPI", "React"],
    githubLink: "https://github.com/stic-club",
    liveLink: "#",
    status: "upcoming",
    image: "https://placehold.co/800x500/0b1329/38bdf8.png?text=STIC+AI+Bot",
    metrics: "Dự án GEN 1.0",
    metricsVi: "Dự án GEN 1.0",
    metricsEn: "GEN 1.0 Project",
  },
  {
    id: "smartair-danang",
    title: "SmartAir Đà Nẵng",
    titleVi: "SmartAir Đà Nẵng",
    titleEn: "SmartAir Da Nang",
    tagline: "Hệ thống giám sát chất lượng không khí thành phố",
    taglineVi: "Hệ thống giám sát chất lượng không khí thành phố",
    taglineEn: "City-wide real-time air quality monitoring network",
    description:
      "Mạng lưới cảm biến IoT đo chỉ số AQI (PM2.5, CO2, nhiệt độ) tại các điểm trường học Đà Nẵng, hiển thị dashboard realtime và cảnh báo ô nhiễm.",
    descriptionVi:
      "Mạng lưới cảm biến IoT đo chỉ số AQI (PM2.5, CO2, nhiệt độ) tại các điểm trường học Đà Nẵng, hiển thị dashboard realtime và cảnh báo ô nhiễm.",
    descriptionEn:
      "An IoT sensor network measuring AQI metrics (PM2.5, CO2, temperature) across Da Nang schools, displaying live dashboards and environmental alerts.",
    team: "Environment & Sustainability",
    teamVi: "Môi trường & Bền vững",
    teamEn: "Environment & Sustainability",
    category: "IoT & Hardware",
    categoryVi: "IoT & Phần cứng",
    categoryEn: "IoT & Hardware",
    tags: ["ESP32", "MQTT", "Node.js", "Dashboard", "Air Quality"],
    githubLink: "https://github.com/stic-club",
    liveLink: "#",
    status: "upcoming",
    image: "https://placehold.co/800x500/0b1329/4ade80.png?text=SmartAir+Da+Nang",
    metrics: "Dự án GEN 1.0",
    metricsVi: "Dự án GEN 1.0",
    metricsEn: "GEN 1.0 Project",
  },
  {
    id: "stic-robot",
    title: "STIC Line Follower",
    titleVi: "STIC Line Follower",
    titleEn: "STIC Autonomous Rover",
    tagline: "Robot dò đường thi đấu cấp thành phố",
    taglineVi: "Robot dò đường thi đấu cấp thành phố",
    taglineEn: "High-speed line-following robot for city tournaments",
    description:
      "Xe robot tự hành sử dụng cảm biến hồng ngoại và thuật toán PID, tham gia cuộc thi Robotics THPT Đà Nẵng. Làm từ A-Z bởi các thành viên GEN 1.0.",
    descriptionVi:
      "Xe robot tự hành sử dụng cảm biến hồng ngoại và thuật toán PID, tham gia cuộc thi Robotics THPT Đà Nẵng. Làm từ A-Z bởi các thành viên GEN 1.0.",
    descriptionEn:
      "An autonomous robot using infrared sensors and PID algorithms built for the Da Nang High School Robotics Competition. Engineered from scratch by GEN 1.0 members.",
    team: "Robotics & Engineering",
    teamVi: "Chế tạo Robot & Kỹ thuật",
    teamEn: "Robotics & Engineering",
    category: "Robotics",
    categoryVi: "Chế tạo Robot",
    categoryEn: "Robotics & Engineering",
    tags: ["Arduino", "PID Control", "C++", "PCB Design", "Mechanics"],
    githubLink: "https://github.com/stic-club",
    liveLink: "#",
    status: "upcoming",
    image: "https://placehold.co/800x500/0b1329/06b6d4.png?text=STIC+Robot",
    metrics: "Dự án GEN 1.0",
    metricsVi: "Dự án GEN 1.0",
    metricsEn: "GEN 1.0 Project",
  },
  {
    id: "stic-portal",
    title: "STIC Portal",
    titleVi: "STIC Portal",
    titleEn: "STIC Portal",
    tagline: "Website & cổng thông tin chính thức của CLB",
    taglineVi: "Website & cổng thông tin chính thức của CLB",
    taglineEn: "Official club web platform and member portal",
    description:
      "Nền tảng web quản lý hoạt động CLB: đăng ký thành viên, thông báo sự kiện, showcase dự án và theo dõi tiến độ các nhóm — tức trang web bạn đang xem!",
    descriptionVi:
      "Nền tảng web quản lý hoạt động CLB: đăng ký thành viên, thông báo sự kiện, showcase dự án và theo dõi tiến độ các nhóm — tức trang web bạn đang xem!",
    descriptionEn:
      "The official digital platform for STIC: recruitment applications, event coordination, project showcases, and team milestones — the very site you are viewing!",
    team: "AI & Coding",
    teamVi: "AI & Lập trình",
    teamEn: "AI & Coding",
    category: "Web App",
    categoryVi: "Nền tảng Web",
    categoryEn: "Web Platform",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubLink: "https://github.com/stic-club",
    liveLink: "#",
    status: "active",
    image: "https://placehold.co/800x500/0b1329/38bdf8.png?text=STIC+Portal",
    metrics: "Website chính thức",
    metricsVi: "Website chính thức",
    metricsEn: "Official Website",
  },
  {
    id: "danang-stem-map",
    title: "Đà Nẵng STEM Map",
    titleVi: "Bản đồ STEM Đà Nẵng",
    titleEn: "Da Nang STEM Map",
    tagline: "Bản đồ tài nguyên học STEM tại Đà Nẵng",
    taglineVi: "Bản đồ tài nguyên học STEM tại Đà Nẵng",
    taglineEn: "Interactive digital directory for STEM resources in Da Nang",
    description:
      "Ứng dụng web tổng hợp CLB, trung tâm STEM, cuộc thi, học bổng dành cho học sinh THPT Đà Nẵng. Một cẩm nang số cho cộng đồng học sinh kỹ thuật.",
    descriptionVi:
      "Ứng dụng web tổng hợp CLB, trung tâm STEM, cuộc thi, học bổng dành cho học sinh THPT Đà Nẵng. Một cẩm nang số cho cộng đồng học sinh kỹ thuật.",
    descriptionEn:
      "A web directory mapping clubs, STEM makerspaces, competitions, and scholarships for Da Nang high schoolers. A digital handbook for young tech enthusiasts.",
    team: "Data & Analysis",
    teamVi: "Dữ liệu & Phân tích",
    teamEn: "Data & Analysis",
    category: "Data & Analytics",
    categoryVi: "Dữ liệu & Phân tích",
    categoryEn: "Data & Analytics",
    tags: ["React", "Leaflet.js", "Python", "Google Sheets API", "Open Data"],
    githubLink: "https://github.com/stic-club",
    liveLink: "#",
    status: "upcoming",
    image: "https://placehold.co/800x500/0b1329/4ade80.png?text=Da+Nang+STEM+Map",
    metrics: "Dự án GEN 1.0",
    metricsVi: "Dự án GEN 1.0",
    metricsEn: "GEN 1.0 Project",
  },
  {
    id: "stic-brand",
    title: "STIC Brand Kit",
    titleVi: "Bộ nhận diện STIC",
    titleEn: "STIC Brand Identity Kit",
    tagline: "Bộ nhận diện thương hiệu CLB KHKT STIC",
    taglineVi: "Bộ nhận diện thương hiệu CLB KHKT STIC",
    taglineEn: "Complete visual identity and design system for STIC",
    description:
      "Xây dựng toàn bộ visual identity cho CLB: logo, màu sắc, typography, template mạng xã hội và motion graphics. Nền tảng truyền thông chuyên nghiệp.",
    descriptionVi:
      "Xây dựng toàn bộ visual identity cho CLB: logo, màu sắc, typography, template mạng xã hội và motion graphics. Nền tảng truyền thông chuyên nghiệp.",
    descriptionEn:
      "The comprehensive visual identity system for STIC: logo suite, color tokens, typography scales, social templates, and motion design guidelines.",
    team: "Design & Media",
    teamVi: "Thiết kế & Truyền thông",
    teamEn: "Design & Media",
    category: "Design System",
    categoryVi: "Hệ thống Thiết kế",
    categoryEn: "Design System",
    tags: ["Figma", "Illustrator", "Branding", "Motion Design", "Canva"],
    githubLink: "https://github.com/stic-club",
    liveLink: "#",
    status: "active",
    image: "https://placehold.co/800x500/0b1329/f472b6.png?text=STIC+Brand+Kit",
    metrics: "Thương hiệu chính thức",
    metricsVi: "Thương hiệu chính thức",
    metricsEn: "Official Brand",
  },
];

// ─── 4. EVENTS ────────────────────────────────────────────────────────────────
export const EVENTS: EventItem[] = [
  {
    id: "tuyen-thanh-vien-gen1",
    title: "🚀 Tuyển Thành Viên GEN 1.0 — Đặt Nền Móng STIC",
    titleVi: "🚀 Tuyển Thành Viên GEN 1.0 — Đặt Nền Móng STIC",
    titleEn: "🚀 GEN 1.0 Recruitment — Lay the Foundations of STIC",
    date: "Đang mở đơn",
    dateVi: "Đang mở đơn",
    dateEn: "Open Now",
    time: "Nộp form online",
    location: "TP. Đà Nẵng (học sinh THPT)",
    locationVi: "TP. Đà Nẵng (học sinh THPT)",
    locationEn: "Da Nang City (High School Students)",
    description:
      "Cơ hội gia nhập thế hệ khai sinh CLB KHKT STIC! Tìm kiếm những bạn học sinh THPT Đà Nẵng đam mê khoa học kỹ thuật, không cần kinh nghiệm — chỉ cần đam mê và tinh thần sẵn sàng học hỏi.",
    descriptionVi:
      "Cơ hội gia nhập thế hệ khai sinh CLB KHKT STIC! Tìm kiếm những bạn học sinh THPT Đà Nẵng đam mê khoa học kỹ thuật, không cần kinh nghiệm — chỉ cần đam mê và tinh thần sẵn sàng học hỏi.",
    descriptionEn:
      "Your chance to join the founding cohort of STIC! Seeking Da Nang high schoolers passionate about science and tech — zero experience required, just curiosity and passion.",
    type: "hackathon",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSfEfAvIevbb0BFHFixLPn7TAy64tkk0lYzLv8ohGfm2EmizBw/viewform",
    status: "ongoing",
    seats: "Số lượng có hạn",
    badgeText: "🔥 Đang tuyển GEN 1.0",
    badgeTextVi: "🔥 Đang tuyển GEN 1.0",
    badgeTextEn: "🔥 Recruiting GEN 1.0",
    image:
      "https://placehold.co/800x450/0b1329/38bdf8.png?text=Tuyen+Thanh+Vien+GEN+1.0",
  },
  {
    id: "stem-workshop-intro",
    title: "Workshop Nhập Môn STEM — Từ Ý Tưởng Đến Dự Án",
    titleVi: "Workshop Nhập Môn STEM — Từ Ý Tưởng Đến Dự Án",
    titleEn: "Introductory STEM Workshop — From Idea to Prototype",
    date: "Sắp diễn ra",
    dateVi: "Sắp diễn ra",
    dateEn: "Coming Soon",
    time: "08:30 - 11:30",
    location: "TP. Đà Nẵng (địa điểm sẽ thông báo)",
    locationVi: "TP. Đà Nẵng (địa điểm sẽ thông báo)",
    locationEn: "Da Nang City (TBA)",
    description:
      "Buổi workshop đầu tiên dành cho tân thành viên GEN 1.0: giới thiệu 7 mảng chuyên môn, demo dự án mẫu và định hướng lộ trình học tập theo từng mảng.",
    descriptionVi:
      "Buổi workshop đầu tiên dành cho tân thành viên GEN 1.0: giới thiệu 7 mảng chuyên môn, demo dự án mẫu và định hướng lộ trình học tập theo từng mảng.",
    descriptionEn:
      "First workshop for GEN 1.0 members: introduction to 7 tracks, sample prototype demos, and customized learning roadmaps.",
    type: "workshop",
    registrationLink: "/join",
    status: "upcoming",
    seats: "GEN 1.0 members only",
    badgeText: "Sắp diễn ra",
    badgeTextVi: "Sắp diễn ra",
    badgeTextEn: "Upcoming",
    image:
      "https://placehold.co/800x450/0b1329/4ade80.png?text=STEM+Workshop+Intro",
  },
  {
    id: "stic-mini-hackathon",
    title: "STIC Mini Hackathon — Giải Quyết Vấn Đề Trường Học",
    titleVi: "STIC Mini Hackathon — Giải Quyết Vấn Đề Trường Học",
    titleEn: "STIC Mini Hackathon — Campus Problem Solvers",
    date: "Quý 1/2025",
    dateVi: "Quý 1/2025",
    dateEn: "Q1 / 2025",
    time: "12 giờ",
    location: "Đà Nẵng",
    locationVi: "Đà Nẵng",
    locationEn: "Da Nang",
    description:
      "Cuộc thi lập trình/sáng tạo dành cho thành viên STIC: các đội nhỏ 3-4 người xây dựng giải pháp cho vấn đề thực tế tại trường học Đà Nẵng trong 12 giờ.",
    descriptionVi:
      "Cuộc thi lập trình/sáng tạo dành cho thành viên STIC: các đội nhỏ 3-4 người xây dựng giải pháp cho vấn đề thực tế tại trường học Đà Nẵng trong 12 giờ.",
    descriptionEn:
      "Internal hackathon for STIC members: teams of 3-4 build real solutions for Da Nang high schools within 12 hours.",
    type: "hackathon",
    registrationLink: "/join",
    status: "upcoming",
    seats: "Thành viên STIC",
    badgeText: "Quý 1/2025",
    badgeTextVi: "Quý 1/2025",
    badgeTextEn: "Q1 / 2025",
    image:
      "https://placehold.co/800x450/0b1329/06b6d4.png?text=STIC+Mini+Hackathon",
  },
  {
    id: "tech-talk-ai",
    title: "Tech Talk: Trí Tuệ Nhân Tạo Đang Thay Đổi Thế Giới",
    titleVi: "Tech Talk: Trí Tuệ Nhân Tạo Đang Thay Đổi Thế Giới",
    titleEn: "Tech Talk: How AI is Reshaping Our World",
    date: "Quý 1/2025",
    dateVi: "Quý 1/2025",
    dateEn: "Q1 / 2025",
    time: "14:00 - 16:30",
    location: "Đà Nẵng (online + offline)",
    locationVi: "Đà Nẵng (online + offline)",
    locationEn: "Da Nang (Hybrid)",
    description:
      "Buổi nói chuyện về AI, ChatGPT và tương lai công nghệ dành cho học sinh THPT. Hiểu AI không chỉ để dùng — mà để tạo ra chúng!",
    descriptionVi:
      "Buổi nói chuyện về AI, ChatGPT và tương lai công nghệ dành cho học sinh THPT. Hiểu AI không chỉ để dùng — mà để tạo ra chúng!",
    descriptionEn:
      "Special tech talk on AI, LLMs, and future computing for high school students. Learn not just how to use AI — but how to build it!",
    type: "talk",
    registrationLink: "/join",
    status: "upcoming",
    seats: "Mở cho tất cả học sinh",
    badgeText: "Quý 1/2025",
    badgeTextVi: "Quý 1/2025",
    badgeTextEn: "Q1 / 2025",
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
    titleVi: "Sáng Tạo Đột Phá",
    titleEn: "Breakthrough Innovation",
    description:
      "Khuyến khích mọi ý tưởng — dù nhỏ nhất. Biến tư duy lý thuyết thành sản phẩm thực tế, từ bản phác thảo đến prototype chạy được.",
    descriptionVi:
      "Khuyến khích mọi ý tưởng — dù nhỏ nhất. Biến tư duy lý thuyết thành sản phẩm thực tế, từ bản phác thảo đến prototype chạy được.",
    descriptionEn:
      "Encouraging every idea — no matter how small. Transforming theoretical concepts into working prototypes from day one.",
    icon: "Sparkles",
    color: "from-sky-500 to-blue-500",
  },
  {
    title: "Học Qua Thực Chiến",
    englishTitle: "Learn by Doing",
    titleVi: "Học Qua Thực Chiến",
    titleEn: "Learn by Doing",
    description:
      "Không giáo điều, không chỉ đọc sách. STIC tin rằng kỹ năng thật sự đến từ việc tự tay làm — từ hàn mạch, code, đến thiết kế và thuyết trình.",
    descriptionVi:
      "Không giáo điều, không chỉ đọc sách. STIC tin rằng kỹ năng thật sự đến từ việc tự tay làm — từ hàn mạch, code, đến thiết kế và thuyết trình.",
    descriptionEn:
      "No dogma, no passive reading. Real engineering skills come from hands-on work: soldering, coding, designing, and presenting.",
    icon: "Wrench",
    color: "from-emerald-400 to-green-500",
  },
  {
    title: "Đồng Đội & Cộng Đồng",
    englishTitle: "Together We Build",
    titleVi: "Đồng Đội & Cộng Đồng",
    titleEn: "Together We Build",
    description:
      "STIC là gia đình. Các mảng hỗ trợ nhau, mentor kèm cặp đàn em, cùng chia sẻ kiến thức và tạo ra những sản phẩm lớn hơn khả năng mỗi cá nhân.",
    descriptionVi:
      "STIC là gia đình. Các mảng hỗ trợ nhau, mentor kèm cặp đàn em, cùng chia sẻ kiến thức và tạo ra những sản phẩm lớn hơn khả năng mỗi cá nhân.",
    descriptionEn:
      "STIC is a family. Cross-functional teams support each other, senior mentors guide juniors, and we build products greater than any individual.",
    icon: "Users",
    color: "from-cyan-400 to-teal-500",
  },
  {
    title: "Tác Động Thực Tế",
    englishTitle: "Real-World Impact",
    titleVi: "Tác Động Thực Tế",
    titleEn: "Real-World Impact",
    description:
      "Mọi dự án của STIC hướng đến giải quyết vấn đề thật của học sinh, trường học và cộng đồng Đà Nẵng — không phải chỉ để trưng bày.",
    descriptionVi:
      "Mọi dự án của STIC hướng đến giải quyết vấn đề thật của học sinh, trường học và cộng đồng Đà Nẵng — không phải chỉ để trưng bày.",
    descriptionEn:
      "Every project at STIC targets practical challenges for students, schools, and the Da Nang community — never built just for display.",
    icon: "HeartHandshake",
    color: "from-blue-400 to-indigo-500",
  },
];

// ─── 9. LEADERSHIP ────────────────────────────────────────────────────────────
export const LEADERS: LeaderItem[] = [
  {
    name: "Lương Phú Hưng",
    nameVi: "Lương Phú Hưng",
    nameEn: "Luong Phu Hung",
    role: "Chủ nhiệm CLB",
    roleVi: "Chủ nhiệm CLB",
    roleEn: "President",
    team: "Ban Chủ nhiệm",
    avatar: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/leaders/president.svg`,
    bio: "Người sáng lập và dẫn dắt CLB KHKT STIC. Đam mê xây dựng cộng đồng STEM cho học sinh THPT Đà Nẵng, kết nối kỹ năng kỹ thuật với tư duy đổi mới sáng tạo.",
    bioVi: "Người sáng lập và dẫn dắt CLB KHKT STIC. Đam mê xây dựng cộng đồng STEM cho học sinh THPT Đà Nẵng, kết nối kỹ năng kỹ thuật với tư duy đổi mới sáng tạo.",
    bioEn: "Founder and President of STIC Club. Passionate about empowering high school STEM communities in Da Nang and merging engineering with innovative thinking.",
    socials: {
      email: "clbstic@gmail.com",
    },
  },
  {
    name: "Lê Hoài An",
    nameVi: "Lê Hoài An",
    nameEn: "Le Hoai An",
    role: "Phó Chủ nhiệm",
    roleVi: "Phó Chủ nhiệm",
    roleEn: "Vice President",
    team: "Ban Chủ nhiệm",
    avatar: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/leaders/vice-president.svg`,
    bio: "Phụ trách điều phối hoạt động nội bộ, kết nối các mảng chuyên môn và đảm bảo mọi thành viên có môi trường phát triển tốt nhất.",
    bioVi: "Phụ trách điều phối hoạt động nội bộ, kết nối các mảng chuyên môn và đảm bảo mọi thành viên có môi trường phát triển tốt nhất.",
    bioEn: "Manages internal operations, coordinates inter-departmental synergies, and ensures every member thrives in an inspiring learning environment.",
    socials: {
      email: "clbstic@gmail.com",
    },
  },
  {
    name: "Trương Văn Đăng Huy",
    nameVi: "Trương Văn Đăng Huy",
    nameEn: "Truong Van Dang Huy",
    role: "Điều phối viên",
    roleVi: "Điều phối viên",
    roleEn: "Coordinator",
    team: "Ban Chủ nhiệm",
    avatar: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/leaders/coordinator.svg`,
    bio: "Điều phối các hoạt động sự kiện, truyền thông và kết nối đối ngoại của CLB. Cầu nối giữa ban chủ nhiệm, thành viên và cộng đồng STEM Đà Nẵng.",
    bioVi: "Điều phối các hoạt động sự kiện, truyền thông và kết nối đối ngoại của CLB. Cầu nối giữa ban chủ nhiệm, thành viên và cộng đồng STEM Đà Nẵng.",
    bioEn: "Directs club events, media outreach, and external partnerships. Bridging the board, members, and the broader Da Nang STEM ecosystem.",
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
    titleVi: "Nộp đơn đăng ký online",
    titleEn: "Submit Online Application",
    date: "Đang mở",
    dateVi: "Đang mở",
    dateEn: "Open Now",
    description:
      "Điền form tuyển thành viên GEN 1.0 với thông tin cá nhân, mảng yêu thích và trả lời câu hỏi tuyển chọn ngắn. Không cần kinh nghiệm!",
    descriptionVi:
      "Điền form tuyển thành viên GEN 1.0 với thông tin cá nhân, mảng yêu thích và trả lời câu hỏi tuyển chọn ngắn. Không cần kinh nghiệm!",
    descriptionEn:
      "Fill out the GEN 1.0 recruitment form with your contact info, department preference, and short answers. Zero experience required!",
  },
  {
    step: 2,
    title: "Sơ loại hồ sơ",
    titleVi: "Sơ loại hồ sơ",
    titleEn: "Application Review",
    date: "Sau khi đóng form",
    dateVi: "Sau khi đóng form",
    dateEn: "Post-Deadline",
    description:
      "Ban chủ nhiệm xem xét đơn đăng ký dựa trên đam mê, tư duy và sự phù hợp với văn hóa CLB. Không phân biệt trình độ kỹ thuật ban đầu.",
    descriptionVi:
      "Ban chủ nhiệm xem xét đơn đăng ký dựa trên đam mê, tư duy và sự phù hợp với văn hóa CLB. Không phân biệt trình độ kỹ thuật ban đầu.",
    descriptionEn:
      "The leadership team reviews applications focused on passion, mindset, and cultural fit rather than prior technical background.",
  },
  {
    step: 3,
    title: "Phỏng vấn thân mật",
    titleVi: "Phỏng vấn thân mật",
    titleEn: "Casual Interview",
    date: "Thông báo sau",
    dateVi: "Thông báo sau",
    dateEn: "TBA via Email",
    description:
      "Buổi trò chuyện cởi mở với ban chủ nhiệm để hiểu thêm về nguyện vọng, định hướng mảng chuyên môn và kỳ vọng khi tham gia STIC.",
    descriptionVi:
      "Buổi trò chuyện cởi mở với ban chủ nhiệm để hiểu thêm về nguyện vọng, định hướng mảng chuyên môn và kỳ vọng khi tham gia STIC.",
    descriptionEn:
      "An open, friendly conversation to explore your interests, department choices, and personal goals at STIC.",
  },
  {
    step: 4,
    title: "Chào đón Tân thành viên GEN 1.0!",
    titleVi: "Chào đón Tân thành viên GEN 1.0!",
    titleEn: "Welcome GEN 1.0 Members!",
    date: "Thông báo sau",
    dateVi: "Thông báo sau",
    dateEn: "TBA via Email",
    description:
      "Tham gia buổi orientation, gặp gỡ toàn bộ ban chủ nhiệm, chọn mảng chuyên môn và bắt đầu hành trình kiến tạo lịch sử STIC cùng nhau.",
    descriptionVi:
      "Tham gia buổi orientation, gặp gỡ toàn bộ ban chủ nhiệm, chọn mảng chuyên môn và bắt đầu hành trình kiến tạo lịch sử STIC cùng nhau.",
    descriptionEn:
      "Join the official orientation day, meet the entire leadership team, finalize tracks, and begin building the legacy of STIC together.",
  },
];

// ─── 11. BENEFITS ─────────────────────────────────────────────────────────────
export const BENEFITS: BenefitItem[] = [
  {
    title: "Dự Án Thực Chiến",
    titleVi: "Dự Án Thực Chiến",
    titleEn: "Hands-on Projects",
    description:
      "Tham gia xây dựng sản phẩm kỹ thuật thật — robot, app, hệ thống IoT — ngay từ những ngày đầu gia nhập. Portfolio thật cho hồ sơ vào đại học.",
    descriptionVi:
      "Tham gia xây dựng sản phẩm kỹ thuật thật — robot, app, hệ thống IoT — ngay từ những ngày đầu gia nhập. Portfolio thật cho hồ sơ vào đại học.",
    descriptionEn:
      "Engineer tangible tech products — robots, software, and IoT systems — from your first weeks. Build a verified portfolio for university admissions.",
    icon: "Rocket",
    gradient: "from-sky-500/20 to-blue-500/10",
  },
  {
    title: "Mentor & Cộng Đồng",
    titleVi: "Mentor & Cộng Đồng",
    titleEn: "Mentorship & Community",
    description:
      "Được hỗ trợ bởi ban chủ nhiệm có kinh nghiệm, kết nối với mạng lưới học sinh STEM toàn Đà Nẵng và tham gia cộng đồng Discord active 24/7.",
    descriptionVi:
      "Được hỗ trợ bởi ban chủ nhiệm có kinh nghiệm, kết nối với mạng lưới học sinh STEM toàn Đà Nẵng và tham gia cộng đồng Discord active 24/7.",
    descriptionEn:
      "Backed by experienced leaders, connected with a city-wide STEM network, and supported by an active 24/7 Discord collaboration hub.",
    icon: "Users",
    gradient: "from-emerald-500/20 to-green-500/10",
  },
  {
    title: "Cơ Hội Thi Đấu",
    titleVi: "Cơ Hội Thi Đấu",
    titleEn: "Competition Opportunities",
    description:
      "Được tham gia các cuộc thi KHKT, Robotics, Hackathon cấp thành phố và quốc gia dưới ngọn cờ STIC với sự hỗ trợ từ CLB.",
    descriptionVi:
      "Được tham gia các cuộc thi KHKT, Robotics, Hackathon cấp thành phố và quốc gia dưới ngọn cờ STIC với sự hỗ trợ từ CLB.",
    descriptionEn:
      "Compete in city, regional, and national science fairs, robotics challenges, and hackathons under the STIC banner with dedicated sponsorship.",
    icon: "Trophy",
    gradient: "from-amber-500/20 to-orange-500/10",
  },
  {
    title: "Kỹ Năng Tương Lai",
    titleVi: "Kỹ Năng Tương Lai",
    titleEn: "Future-Ready Skills",
    description:
      "Học lập trình, thiết kế, phân tích dữ liệu, thuyết trình và làm việc nhóm — bộ kỹ năng mà mọi trường đại học và nhà tuyển dụng đều tìm kiếm.",
    descriptionVi:
      "Học lập trình, thiết kế, phân tích dữ liệu, thuyết trình và làm việc nhóm — bộ kỹ năng mà mọi trường đại học và nhà tuyển dụng đều tìm kiếm.",
    descriptionEn:
      "Master programming, UI design, data analysis, public pitching, and teamwork — key competencies sought after by top universities and employers.",
    icon: "GraduationCap",
    gradient: "from-violet-500/20 to-purple-500/10",
  },
];

// ─── 12. FAQS ─────────────────────────────────────────────────────────────────
export const FAQS: FaqItem[] = [
  {
    category: "Điều kiện",
    categoryVi: "Điều kiện",
    categoryEn: "Eligibility",
    question: "Mình chưa có kinh nghiệm gì thì có ứng tuyển được không?",
    questionVi: "Mình chưa có kinh nghiệm gì thì có ứng tuyển được không?",
    questionEn: "Can I apply if I have zero prior tech experience?",
    answer:
      "Hoàn toàn được! STIC GEN 1.0 tuyển theo đam mê và tinh thần học hỏi, không phải kinh nghiệm. Bạn chỉ cần là học sinh THPT tại Đà Nẵng và có tình yêu với khoa học kỹ thuật.",
    answerVi:
      "Hoàn toàn được! STIC GEN 1.0 tuyển theo đam mê và tinh thần học hỏi, không phải kinh nghiệm. Bạn chỉ cần là học sinh THPT tại Đà Nẵng và có tình yêu với khoa học kỹ thuật.",
    answerEn:
      "Absolutely! STIC GEN 1.0 recruits based on curiosity and eagerness to learn, not past achievements. You only need to be a Da Nang high schooler with an appetite for STEM.",
  },
  {
    category: "Điều kiện",
    categoryVi: "Điều kiện",
    categoryEn: "Eligibility",
    question: "Đối tượng tuyển là ai? Học sinh lớp mấy?",
    questionVi: "Đối tượng tuyển là ai? Học sinh lớp mấy?",
    questionEn: "Who is eligible to apply? Which grades?",
    answer:
      "STIC tuyển học sinh THPT (lớp 10, 11, 12) đang học tại các trường trên địa bàn TP. Đà Nẵng. Không giới hạn trường hay khối lớp.",
    answerVi:
      "STIC tuyển học sinh THPT (lớp 10, 11, 12) đang học tại các trường trên địa bàn TP. Đà Nẵng. Không giới hạn trường hay khối lớp.",
    answerEn:
      "STIC welcomes all high school students (grades 10, 11, and 12) across Da Nang City, without any school or grade restrictions.",
  },
  {
    category: "Mảng chuyên môn",
    categoryVi: "Mảng chuyên môn",
    categoryEn: "Departments",
    question: "Mình có thể chọn mấy mảng?",
    questionVi: "Mình có thể chọn mấy mảng?",
    questionEn: "How many departments can I choose?",
    answer:
      "Trong form đăng ký bạn có thể chọn mảng yêu thích nhất. Sau khi gia nhập và trải nghiệm, bạn có thể trao đổi với ban chủ nhiệm về việc tham gia thêm mảng khác nếu muốn.",
    answerVi:
      "Trong form đăng ký bạn có thể chọn mảng yêu thích nhất. Sau khi gia nhập và trải nghiệm, bạn có thể trao đổi với ban chủ nhiệm về việc tham gia thêm mảng khác nếu muốn.",
    answerEn:
      "On the application, choose your top areas of interest. Once accepted, you can easily collaborate cross-functionally across multiple tracks.",
  },
  {
    category: "Thời gian",
    categoryVi: "Thời gian",
    categoryEn: "Time Commitment",
    question: "Tham gia CLB có ảnh hưởng đến việc học không?",
    questionVi: "Tham gia CLB có ảnh hưởng đến việc học không?",
    questionEn: "Will joining STIC interfere with school studies?",
    answer:
      "STIC hiểu học sinh có lịch học và bài vở. Hoạt động được thiết kế linh hoạt, ưu tiên cuối tuần và giờ rảnh. Cam kết của bạn có thể là 'thường xuyên', 'cần sắp xếp lịch', hoặc 'chưa chắc về thời gian' — đều được chào đón!",
    answerVi:
      "STIC hiểu học sinh có lịch học và bài vở. Hoạt động được thiết kế linh hoạt, ưu tiên cuối tuần và giờ rảnh. Cam kết của bạn có thể là 'thường xuyên', 'cần sắp xếp lịch', hoặc 'chưa chắc về thời gian' — đều được chào đón!",
    answerEn:
      "STIC understands academic priorities. Club sessions are held during weekends and flexible slots. Whether you commit regularly or need scheduling flexibility, you are welcome!",
  },
  {
    category: "Chi phí",
    categoryVi: "Chi phí",
    categoryEn: "Fee & Cost",
    question: "Tham gia CLB có mất phí không?",
    questionVi: "Tham gia CLB có mất phí không?",
    questionEn: "Are there any membership fees to join?",
    answer:
      "STIC hoạt động phi lợi nhuận và hướng đến việc miễn phí hoặc chi phí tối thiểu cho thành viên. Chi tiết sẽ được thông báo trong buổi orientation sau tuyển chọn.",
    answerVi:
      "STIC hoạt động phi lợi nhuận và hướng đến việc miễn phí hoặc chi phí tối thiểu cho thành viên. Chi tiết sẽ được thông báo trong buổi orientation sau tuyển chọn.",
    answerEn:
      "STIC operates as a non-profit organization aiming for free or minimal costs for all members. Full details will be shared during the Orientation Day.",
  },
];
