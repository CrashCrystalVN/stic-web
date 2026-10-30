export type Lang = "vi" | "en";

export const translations = {
  // ── NAVBAR ──────────────────────────────────────────────────────────────────
  nav: {
    home:       { vi: "Trang chủ",         en: "Home" },
    about:      { vi: "Về CLB",            en: "About" },
    teams:      { vi: "Mảng hoạt động",    en: "Departments" },
    projects:   { vi: "Dự án GEN 1.0",    en: "GEN 1.0 Projects" },
    join:       { vi: "Đăng ký thành viên", en: "Join Us" },
    apply:      { vi: "Nộp đơn",           en: "Apply" },
    toc:        { vi: "Mục Lục",           en: "Contents" },
    clubName:   { vi: "CLB KHKT",          en: "S&T Club" },
  },

  // ── HERO ────────────────────────────────────────────────────────────────────
  hero: {
    badge:      { vi: "Đang mở đơn · GEN 1.0",                   en: "Now Open · GEN 1.0" },
    heading1:   { vi: "CLB Khoa học",                              en: "Science &" },
    heading2:   { vi: "Kỹ thuật",                                 en: "Technology" },
    tagline:    { vi: "Science · Technology · Innovation Club",    en: "Science · Technology · Innovation Club" },
    desc:       { vi: "Không gian sáng tạo dành riêng cho",       en: "A creative space built for" },
    descBold:   { vi: "học sinh THPT Đà Nẵng",                    en: "high school students in Da Nang" },
    descEnd:    { vi: ". Đặt những viên gạch đầu tiên cùng GEN 1.0.", en: ". Lay the first foundations with GEN 1.0." },
    cta1:       { vi: "Nộp đơn ứng tuyển",                        en: "Apply Now" },
    cta2:       { vi: "Tìm hiểu thêm",                            en: "Learn More" },
    stat1v:     { vi: "GEN 1.0",    en: "GEN 1.0" },
    stat1l:     { vi: "Thế hệ đầu tiên", en: "First Generation" },
    stat2v:     { vi: "7",          en: "7" },
    stat2l:     { vi: "Mảng chuyên môn", en: "Departments" },
    stat3v:     { vi: "Đà Nẵng",   en: "Da Nang" },
    stat3l:     { vi: "Dành cho học sinh THPT", en: "For High School Students" },
    bannerAlt:  { vi: "Logo CLB STIC · Thêm ảnh sau", en: "STIC Club Logo · Add image later" },
    scrollHint: { vi: "", en: "" },
  },

  // ── ABOUT ───────────────────────────────────────────────────────────────────
  about: {
    label:      { vi: "Về CLB STIC",      en: "About STIC" },
    h2a:        { vi: "Sân chơi STEM",    en: "A Real STEM" },
    h2b:        { vi: "thực chiến",       en: "Playground" },
    h2c:        { vi: "cho",              en: "for" },
    h2d:        { vi: "học sinh Đà Nẵng", en: "Da Nang Students" },
    desc:       { vi: "được thành lập để tạo ra không gian học tập và sáng tạo thực tế — nơi bạn tự tay làm thí nghiệm, lắp ráp robot, viết code và thiết kế sản phẩm.", en: "was founded to create a hands-on learning and innovation space — where you build experiments, assemble robots, write code and design real products." },
    item1t:     { vi: "Học qua trải nghiệm thực tế",  en: "Learn by Doing" },
    item1d:     { vi: "Không lý thuyết suông — chú trọng chế tạo, thử nghiệm và project thực.", en: "No empty theory — focused on making, experimenting and real projects." },
    item2t:     { vi: "Môi trường kết nối cởi mở",   en: "Open & Connected" },
    item2d:     { vi: "Gặp gỡ những người bạn cùng đam mê từ các trường THPT toàn Đà Nẵng.", en: "Meet fellow passionate students from high schools across Da Nang." },
    item3t:     { vi: "Đồng hành từ bước đầu",       en: "Guided from Day One" },
    item3d:     { vi: "Ban chủ nhiệm luôn sẵn sàng hướng dẫn — dù bạn chưa có kinh nghiệm.", en: "Our leadership team is always ready to guide you — even if you have zero experience." },
    infoTitle:  { vi: "Thông tin tổ chức",   en: "Organization Info" },
    infoSub:    { vi: "Đợt tuyển thành viên đầu tiên · GEN 1.0", en: "First recruitment · GEN 1.0" },
    r1l: { vi: "Đối tượng",       en: "Target" },        r1v: { vi: "Học sinh THPT TP. Đà Nẵng", en: "High school students in Da Nang" },
    r2l: { vi: "Chủ nhiệm",       en: "President" },     r2v: { vi: "Lương Phú Hưng", en: "Luong Phu Hung" },
    r3l: { vi: "Phó chủ nhiệm",   en: "Vice President"}, r3v: { vi: "Lê Hoài An",    en: "Le Hoai An" },
    r4l: { vi: "Điều phối viên",  en: "Coordinator" },   r4v: { vi: "Trương Văn Đăng Huy", en: "Truong Van Dang Huy" },
    r5l: { vi: "Email",           en: "Email" },
    r6l: { vi: "Địa bàn",         en: "Location" },      r6v: { vi: "TP. Đà Nẵng", en: "Da Nang City" },
  },

  // ── STATS ───────────────────────────────────────────────────────────────────
  stats: {
    s1v: { vi: "GEN 1.0",  en: "GEN 1.0" },  s1l: { vi: "Thế hệ khởi đầu",    en: "First Generation" }, s1n: { vi: "Đặt nền móng văn hóa CLB", en: "Building club culture" },
    s2v: { vi: "7",        en: "7" },         s2l: { vi: "Mảng chuyên môn",    en: "Departments" },      s2n: { vi: "AI · Robotics · Design · STEM…", en: "AI · Robotics · Design · STEM…" },
    s3v: { vi: "Đà Nẵng",  en: "Da Nang" },  s3l: { vi: "Địa bàn hoạt động",  en: "Location" },         s3n: { vi: "THPT toàn thành phố", en: "All city high schools" },
    s4v: { vi: "100%",     en: "100%" },      s4l: { vi: "Thực chiến",          en: "Hands-on" },         s4n: { vi: "Học bằng hành, làm thật", en: "Learn by doing, for real" },
  },

  // ── TEAMS ───────────────────────────────────────────────────────────────────
  teams: {
    label:  { vi: "Mảng Chuyên Môn",     en: "Departments" },
    h2:     { vi: "7 Mảng Hoạt Động",    en: "7 Departments" },
    desc:   { vi: "Dù bạn yêu phần cứng, đam mê code, thích thí nghiệm hay thiết kế — STIC đều có chỗ cho bạn.", en: "Whether you love hardware, coding, experiments or design — STIC has a place for you." },
    cta:    { vi: "Đăng ký vào mảng yêu thích", en: "Apply for your department" },
  },

  // ── PROJECTS ────────────────────────────────────────────────────────────────
  projects: {
    label:  { vi: "Dự Án & Sản Phẩm",     en: "Projects & Products" },
    h2a:    { vi: "Dự án GEN 1.0",         en: "GEN 1.0 Projects" },
    h2b:    { vi: "do chính bạn",          en: "built by" },
    h2c:    { vi: "tạo ra",                en: "you" },
    desc:   { vi: "STIC là câu lạc bộ thế hệ đầu tiên. Các dự án khoa học kỹ thuật sẽ do chính thành viên GEN 1.0 cùng nhau lên ý tưởng và hiện thực hóa.", en: "STIC is a first-generation club. Science & tech projects will be ideated and realized by GEN 1.0 members themselves." },
    cta:    { vi: "Tham gia đặt nền móng GEN 1.0", en: "Help found GEN 1.0" },
    badge:  { vi: "Giai đoạn khởi tạo · Đang mở đơn", en: "Founding phase · Applications open" },
    f1l:    { vi: "Ý tưởng của bạn",       en: "Your Ideas" },       f1d: { vi: "Đề xuất dự án bạn hằng ấp ủ — CLB cùng đồng hành.", en: "Propose the project you've been dreaming of — the club walks with you." },
    f2l:    { vi: "Hỗ trợ kỹ thuật",       en: "Technical Support" }, f2d: { vi: "Được tư vấn định hướng và nguồn tài nguyên từ ban chủ nhiệm.", en: "Get direction and resources from the leadership team." },
    f3l:    { vi: "Thi đấu KHKT",           en: "STEM Competitions" }, f3d: { vi: "Cơ hội mang sản phẩm tham gia các kỳ thi sáng tạo cấp thành phố.", en: "Chance to bring your product to city-level innovation contests." },
  },

  // ── EVENTS ──────────────────────────────────────────────────────────────────
  events: {
    label:  { vi: "Sự Kiện",              en: "Events" },
    badge:  { vi: "Đang diễn ra · GEN 1.0", en: "Live · GEN 1.0" },
    h3a:    { vi: "Mở Đơn Tuyển Thành Viên", en: "Member Recruitment" },
    h3b:    { vi: "Thế Hệ Đầu Tiên",     en: "First Generation" },
    desc:   { vi: "STIC chính thức mở cổng đăng ký tuyển thành viên GEN 1.0 với 7 mảng chuyên môn đa dạng. Không cần kinh nghiệm trước — chỉ cần đam mê!", en: "STIC officially opens GEN 1.0 membership registration across 7 departments. No experience needed — just passion!" },
    m1:     { vi: "Đang mở đơn",          en: "Applications open" },
    m2:     { vi: "Online · Đà Nẵng",     en: "Online · Da Nang" },
    m3:     { vi: "Phỏng vấn sau khi đóng form", en: "Interview after form closes" },
    cta:    { vi: "Nộp đơn ngay trên website", en: "Apply on website" },
    hint:   { vi: "Điền chỉ mất 2–3 phút", en: "Takes only 2–3 minutes" },
    note:   { vi: "📌 Các sự kiện tiếp theo (gặp mặt tân thành viên, workshop) sẽ thông báo tới bạn sau khi trúng tuyển.", en: "📌 Upcoming events (welcome meeting, workshops) will be announced after you are accepted." },
  },

  // ── JOIN FORM ───────────────────────────────────────────────────────────────
  join: {
    badge:    { vi: "Tuyển Thành Viên GEN 1.0",   en: "GEN 1.0 Recruitment" },
    h2:       { vi: "Đăng Ký Gia Nhập STIC",       en: "Join STIC" },
    sub:      { vi: "Học sinh THPT Đà Nẵng · Không yêu cầu kinh nghiệm trước", en: "Da Nang high school students · No prior experience required" },
    // sections
    sec1:     { vi: "Thông tin cá nhân",    en: "Personal Info" },
    sec2:     { vi: "Liên lạc",             en: "Contact" },
    sec3:     { vi: "Nguyện vọng mảng",     en: "Department Choice" },
    sec4:     { vi: "Kinh nghiệm & Ý tưởng", en: "Experience & Ideas" },
    // fields
    fname:    { vi: "Họ và tên",            en: "Full Name" },
    fnamePh:  { vi: "Nguyễn Văn A",         en: "e.g. Nguyen Van A" },
    bdate:    { vi: "Ngày sinh",            en: "Date of Birth" },
    school:   { vi: "Trường THPT",          en: "High School" },
    schoolPh: { vi: "THPT Phan Châu Trinh...", en: "e.g. Phan Chau Trinh High School..." },
    grade:    { vi: "Khối lớp",             en: "Grade" },
    g10:      { vi: "Lớp 10",              en: "Grade 10" },
    g11:      { vi: "Lớp 11",              en: "Grade 11" },
    g12:      { vi: "Lớp 12",              en: "Grade 12" },
    phone:    { vi: "SĐT / Zalo",           en: "Phone / Zalo" },
    phonePh:  { vi: "09xxxxxxxx",           en: "09xxxxxxxx" },
    email:    { vi: "Email",               en: "Email" },
    emailPh:  { vi: "email@gmail.com",     en: "email@gmail.com" },
    fb:       { vi: "Link Facebook",        en: "Facebook Link" },
    fbPh:     { vi: "fb.com/username",     en: "fb.com/username" },
    primary:  { vi: "Mảng chính",           en: "Primary Department" },
    secondary:{ vi: "Mảng phụ",             en: "Secondary (optional)" },
    noSec:    { vi: "-- Không chọn --",     en: "-- None --" },
    expQ:     { vi: "Từng tham gia CLB / STEM nào chưa?", en: "Have you joined any club or STEM project?" },
    expNo:    { vi: "Chưa từng (hỗ trợ từ đầu)", en: "Never (we'll guide you)" },
    expYes:   { vi: "Đã từng tham gia",    en: "Yes, I have" },
    idea:     { vi: "Ý tưởng / lý do muốn tham gia", en: "Your idea / reason to join" },
    ideaPh:   { vi: "Chia sẻ ngắn gọn ý tưởng hoặc mong muốn học hỏi...", en: "Share briefly your idea or what you want to learn..." },
    commit:   { vi: "Cam kết thời gian",    en: "Time Commitment" },
    c1:       { vi: "Tham gia thường xuyên (ưu tiên)", en: "Join regularly (preferred)" },
    c2:       { vi: "Cần sắp xếp lịch học",en: "Need to arrange schedule" },
    c3:       { vi: "Muốn sinh hoạt linh hoạt", en: "Prefer flexible attendance" },
    submit:   { vi: "Gửi Đơn Ứng Tuyển STIC GEN 1.0", en: "Submit Application to STIC GEN 1.0" },
    orGform:  { vi: "Hoặc điền qua Google Form", en: "Or fill via Google Form" },
    // success
    successH: { vi: "Nộp Đơn Thành Công!",  en: "Application Submitted!" },
    successP: { vi: "Cảm ơn",               en: "Thank you" },
    successP2:{ vi: "! Ban chủ nhiệm sẽ liên hệ qua email sớm nhất.", en: "! Our team will contact you by email soon." },
    again:    { vi: "Gửi đơn khác",          en: "Submit another" },
    // validation
    vPhone:   { vi: "Số điện thoại phải đúng 10 chữ số.", en: "Phone number must be exactly 10 digits." },
    vPhoneNum:{ vi: "Chỉ được nhập số.",     en: "Numbers only." },
    vEmail:   { vi: "Vui lòng nhập đúng định dạng email (ví dụ: ten@gmail.com).", en: "Please enter a valid email (e.g. name@gmail.com)." },
    vRequired:{ vi: "Trường này là bắt buộc.", en: "This field is required." },
    vFb:      { vi: "Vui lòng nhập link Facebook của bạn.", en: "Please enter your Facebook profile link." },
  },

  // ── FOOTER ──────────────────────────────────────────────────────────────────
  footer: {
    sub:      { vi: "Science, Technology & Innovation Club · GEN 1.0\nHọc sinh THPT TP. Đà Nẵng", en: "Science, Technology & Innovation Club · GEN 1.0\nHigh school students, Da Nang City" },
    nav:      { vi: "Điều hướng",    en: "Navigation" },
    bcn:      { vi: "Ban Chủ Nhiệm", en: "Leadership" },
    r1:       { vi: "Chủ nhiệm",     en: "President" },
    r2:       { vi: "Phó chủ nhiệm", en: "Vice President" },
    r3:       { vi: "Điều phối viên",en: "Coordinator" },
    copy:     { vi: "Mọi quyền được bảo lưu", en: "All rights reserved" },
    made:     { vi: "for STEM Đà Nẵng", en: "for STEM Da Nang" },
  },

  // ── TOC DRAWER ──────────────────────────────────────────────────────────────
  toc: {
    title:    { vi: "Mục Lục",       en: "Contents" },
    sub:      { vi: "CLB KHKT STIC", en: "STIC S&T Club" },
    email:    { vi: "clbstic@gmail.com", en: "clbstic@gmail.com" },
    applyCta: { vi: "Nộp đơn ứng tuyển", en: "Apply Now" },
    items: [
      { id: "hero",     vi: "Trang chủ",         en: "Home",         dvi: "Khởi đầu & Đăng ký GEN 1.0",   den: "Start & GEN 1.0 Registration" },
      { id: "about",    vi: "Về CLB STIC",        en: "About STIC",   dvi: "Sứ mệnh & Ban chủ nhiệm",       den: "Mission & Leadership" },
      { id: "teams",    vi: "Mảng hoạt động",     en: "Departments",  dvi: "AI, Robotics, Design, STEM...", den: "AI, Robotics, Design, STEM..." },
      { id: "projects", vi: "Dự án GEN 1.0",      en: "GEN 1.0 Projects", dvi: "Ươm mầm ý tưởng thực tế", den: "Incubating real ideas" },
      { id: "events",   vi: "Sự kiện",            en: "Events",       dvi: "Lịch tuyển quân & Hoạt động",  den: "Recruitment & Activities" },
      { id: "join",     vi: "Đăng ký thành viên", en: "Join Us",      dvi: "Nộp đơn trực tiếp trên website", den: "Apply directly on the website" },
    ],
  },
} as const;

export type Translations = typeof translations;
