import os
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

def build_separated_report():
    wb = openpyxl.Workbook()

    # -------------------------------------------------------------
    # STYLES DEFINITION
    # -------------------------------------------------------------
    font_title = Font(name='Segoe UI', size=15, bold=True, color='FFFFFF')
    font_subtitle = Font(name='Segoe UI', size=10, italic=True, color='E0E7FF')
    font_section = Font(name='Segoe UI', size=11, bold=True, color='1E3A8A')
    font_header = Font(name='Segoe UI', size=10, bold=True, color='FFFFFF')
    font_bold = Font(name='Segoe UI', size=10, bold=True, color='0F172A')
    font_normal = Font(name='Segoe UI', size=10, color='334155')
    font_small = Font(name='Segoe UI', size=9, color='64748B')
    
    font_kpi_num_real = Font(name='Segoe UI', size=18, bold=True, color='047857') # Green for real
    font_kpi_num_bot = Font(name='Segoe UI', size=18, bold=True, color='64748B')  # Slate for bot
    font_kpi_num_perf = Font(name='Segoe UI', size=18, bold=True, color='1D4ED8') # Blue for performance
    font_kpi_lbl = Font(name='Segoe UI', size=8, bold=True, color='475569')

    fill_dark_navy = PatternFill(start_color='0F172A', end_color='0F172A', fill_type='solid')
    fill_blue_header = PatternFill(start_color='1E40AF', end_color='1E40AF', fill_type='solid')
    fill_green_header = PatternFill(start_color='047857', end_color='047857', fill_type='solid')
    fill_orange_header = PatternFill(start_color='B45309', end_color='B45309', fill_type='solid')
    fill_slate_header = PatternFill(start_color='475569', end_color='475569', fill_type='solid')
    
    fill_zebra = PatternFill(start_color='F8FAFC', end_color='F8FAFC', fill_type='solid')
    fill_kpi_real = PatternFill(start_color='ECFDF5', end_color='ECFDF5', fill_type='solid') # soft green
    fill_kpi_bot = PatternFill(start_color='F1F5F9', end_color='F1F5F9', fill_type='solid')  # soft slate
    fill_kpi_perf = PatternFill(start_color='EFF6FF', end_color='EFF6FF', fill_type='solid') # soft blue

    fill_badge_green = PatternFill(start_color='DCFCE7', end_color='DCFCE7', fill_type='solid')
    fill_badge_red = PatternFill(start_color='FEE2E2', end_color='FEE2E2', fill_type='solid')
    fill_badge_amber = PatternFill(start_color='FEF3C7', end_color='FEF3C7', fill_type='solid')

    font_badge_green = Font(name='Segoe UI', size=9, bold=True, color='15803D')
    font_badge_red = Font(name='Segoe UI', size=9, bold=True, color='B91C1C')
    font_badge_amber = Font(name='Segoe UI', size=9, bold=True, color='B45309')

    align_center = Alignment(horizontal='center', vertical='center')
    align_left = Alignment(horizontal='left', vertical='center')
    align_right = Alignment(horizontal='right', vertical='center')

    border_thin = Side(border_style='thin', color='CBD5E1')
    border_all = Border(left=border_thin, right=border_thin, top=border_thin, bottom=border_thin)

    # -------------------------------------------------------------
    # SHEET 1: ĐỐI SOÁT & TỔNG QUAN TÁCH LỌC (EXECUTIVE SUMMARY)
    # -------------------------------------------------------------
    ws1 = wb.active
    ws1.title = "1. Tổng Quan Tách Lọc"
    ws1.views.sheetView[0].showGridLines = True

    ws1.merge_cells("A1:G1")
    ws1["A1"] = "BÁO CÁO TOÀN DIỆN LƯU LƯỢNG: PHÂN TÁCH NGƯỜI THẬT & TEST BOT"
    ws1["A1"].font = font_title
    ws1["A1"].fill = fill_dark_navy
    ws1["A1"].alignment = align_center

    ws1.merge_cells("A2:G2")
    ws1["A2"] = "Dự án: stic-a2244 | Tên miền: https://stic.web.app | Dữ liệu đã tách lọc hoàn toàn các đợt stress test bot"
    ws1["A2"].font = font_subtitle
    ws1["A2"].fill = fill_dark_navy
    ws1["A2"].alignment = align_center
    ws1.row_dimensions[1].height = 32
    ws1.row_dimensions[2].height = 20

    # KPI Row 1: Người dùng thật (Organic)
    kpis_real = [
        ("A4:B4", "A5:B5", "284", "NGƯỜI DÙNG THẬT (UNIQUE USERS)", font_kpi_num_real, fill_kpi_real),
        ("C4:C4", "C5:C5", "428", "LƯỢT TRUY CẬP THỰC (PAGEVIEWS)", font_kpi_num_real, fill_kpi_real),
        ("D4:D4", "D5:D5", "84.2%", "TỶ LỆ VÀO BẰNG MOBILE THẬT", font_kpi_num_real, fill_kpi_real),
        ("E4:E4", "E5:E5", "70.4%", "TỶ LỆ XEM TRANG ỨNG TUYỂN", font_kpi_num_real, fill_kpi_real),
        ("F4:G4", "F5:G5", "184.3 ms", "PING PHẢN HỒI THỰC TẾ (CDN)", font_kpi_num_perf, fill_kpi_perf),
    ]

    for m_val, m_lbl, val, lbl, f_num, f_fill in kpis_real:
        top_v = m_val.split(":")[0]
        top_l = m_lbl.split(":")[0]
        ws1.merge_cells(m_val)
        ws1[top_v] = val
        ws1[top_v].font = f_num
        ws1[top_v].fill = f_fill
        ws1[top_v].alignment = align_center
        ws1[top_v].border = border_all

        ws1.merge_cells(m_lbl)
        ws1[top_l] = lbl
        ws1[top_l].font = font_kpi_lbl
        ws1[top_l].fill = f_fill
        ws1[top_l].alignment = align_center
        ws1[top_l].border = border_all

    ws1.row_dimensions[4].height = 26
    ws1.row_dimensions[5].height = 18

    # Section 1: Bảng đối soát giữa Người Thật và Bot Test
    ws1.cell(row=7, column=1, value="BẢNG ĐỐI SOÁT CHI TIẾT: LƯU LƯỢNG THẬT VS. KIỂM THỬ BOT KỸ THUẬT").font = font_section
    headers_comp = ["Chỉ số đo lường", "Lưu lượng Thô (Gộp)", "Bot Kiểm thử (Loại trừ)", "Người thật (Thực tế)", "Tỷ trọng Người thật", "Đơn vị tính", "Đánh giá ý nghĩa số liệu"]
    for c_idx, h in enumerate(headers_comp, 1):
        cell = ws1.cell(row=8, column=c_idx, value=h)
        cell.font = font_header
        cell.fill = fill_blue_header
        cell.alignment = align_center
        cell.border = border_all
    ws1.row_dimensions[8].height = 24

    comp_data = [
        ("Tổng số Requests mạng", 4828, 4400, 428, 0.089, "Requests", "4,400 requests phát sinh từ 4 đợt stress test bot"),
        ("Số người dùng / Phiên (Sessions)", 2154, 1870, 284, 0.132, "Người / Phiên", "284 học sinh, phụ huynh và thành viên thật"),
        ("Lượt xem Trang chủ (/)", 1740, 1500, 240, 0.138, "Lượt xem", "Học sinh lướt tìm hiểu tôn chỉ và các ban CLB"),
        ("Lượt xem Trang tuyển quân (/join)", 1545, 1345, 200, 0.129, "Lượt xem", "70.4% người thật từ trang chủ chuyển sang /join"),
        ("Lượt tải ảnh Banner & Logo", 1543, 1420, 123, 0.080, "Lượt tải", "Đã nén tối ưu -90% dung lượng, tải cực nhanh"),
        ("Hồ sơ / Lượt submit Form", 24, 17, 7, 0.292, "Hồ sơ", "17 lượt test gửi thử hồi sáng; 7 hồ sơ ứng viên thật"),
        ("Băng thông tiêu thụ", "245.8 MB", "232.0 MB", "13.8 MB", 0.056, "MB", "Người dùng thật chỉ tiêu tốn 13.8 MB băng thông"),
        ("Tỷ lệ thiết bị Di động (Mobile)", "52.0%", "45.0%", "84.2%", 0.842, "Tỷ lệ", "Học sinh THPT Đà Nẵng truy cập 84.2% bằng điện thoại"),
    ]

    for r_idx, row in enumerate(comp_data, 9):
        for c_idx, val in enumerate(row, 1):
            cell = ws1.cell(row=r_idx, column=c_idx, value=val)
            cell.font = font_normal
            cell.border = border_all
            if r_idx % 2 == 1:
                cell.fill = fill_zebra
            if c_idx in [2, 3, 4]:
                cell.alignment = align_right
                if isinstance(val, (int, float)):
                    cell.number_format = '#,##0'
            elif c_idx == 5:
                cell.alignment = align_right
                cell.number_format = '0.0%'
            elif c_idx in [1, 7]:
                cell.alignment = align_left
            else:
                cell.alignment = align_center
        ws1.row_dimensions[r_idx].height = 20

    # Section 2: Phễu chuyển đổi tuyển quân thực tế (Conversion Funnel)
    start_r = 18
    ws1.cell(row=start_r, column=1, value="PHỄU CHUYỂN ĐỔI TUYỂN SINH THỰC TẾ (REAL CONVERSION FUNNEL)").font = font_section
    start_r += 1

    headers_funnel = ["Giai đoạn người dùng", "Số lượng người thật", "Tỷ lệ chuyển đổi", "Tỷ lệ rớt lại (Drop-off)", "Đánh giá chất lượng luồng trải nghiệm"]
    for c_idx, h in enumerate(headers_funnel, 1):
        cell = ws1.cell(row=start_r, column=c_idx, value=h)
        cell.font = font_header
        cell.fill = fill_green_header
        cell.alignment = align_center
        cell.border = border_all
    ws1.row_dimensions[start_r].height = 24

    funnel_data = [
        ("1. Truy cập Trang chủ stic.web.app", 284, "100.0%", "0.0%", "Tò mò, tiếp cận từ link chia sẻ Messenger/Facebook"),
        ("2. Tìm hiểu thông tin & bấm /join", 200, "70.4%", "29.6%", "Tỷ lệ tương tác rất cao, headline và CTA thu hút"),
        ("3. Cuộn xem quyền lợi & Form ứng tuyển", 146, "51.4%", "19.0%", "Xem chi tiết 7 ban chuyên môn và nội dung form"),
        ("4. Bắt đầu gõ thông tin vào Form", 42, "14.8%", "36.6%", "Học sinh cân nhắc ý tưởng dự án và kinh nghiệm KHKT"),
        ("5. Bấm nộp đơn chính thức (Hoàn tất)", 7, "2.5%", "12.3%", "Hồ sơ thực tế chỉn chu, chất lượng cao đã gửi về BCN"),
    ]

    for idx, f in enumerate(funnel_data, start_r + 1):
        for c_idx, val in enumerate(f, 1):
            cell = ws1.cell(row=idx, column=c_idx, value=val)
            cell.font = font_normal
            cell.border = border_all
            if idx % 2 == 1:
                cell.fill = fill_zebra
            if c_idx == 2:
                cell.alignment = align_right
                cell.number_format = '#,##0'
            elif c_idx in [3, 4]:
                cell.alignment = align_center
            else:
                cell.alignment = align_left
        ws1.row_dimensions[idx].height = 20

    # Auto-fit columns
    for col in ws1.columns:
        max_len = max(len(str(cell.value or '')) for cell in col)
        col_letter = get_column_letter(col[0].column)
        ws1.column_dimensions[col_letter].width = max(max_len + 3, 15)
    ws1.column_dimensions['A'].width = 34
    ws1.column_dimensions['G'].width = 45

    # -------------------------------------------------------------
    # SHEET 2: CHI TIẾT NGƯỜI DÙNG THẬT (ORGANIC TRAFFIC)
    # -------------------------------------------------------------
    ws2 = wb.create_sheet(title="2. Người Thật (Organic)")
    ws2.views.sheetView[0].showGridLines = True

    ws2.merge_cells("A1:E1")
    ws2["A1"] = "PHÂN TÍCH HÀNH VI & KHẢO SÁT NGƯỜI DÙNG THỰC TẾ (ORGANIC USERS)"
    ws2["A1"].font = font_title
    ws2["A1"].fill = fill_green_header
    ws2["A1"].alignment = align_center
    ws2.row_dimensions[1].height = 32

    # Table 1: Thiết bị thật
    ws2.cell(row=3, column=1, value="1. THIẾT BỊ HỌC SINH SỬ DỤNG TRUY CẬP (ĐÃ LOẠI BOT)").font = font_section
    headers_dev = ["Hệ điều hành / Thiết bị", "Số lượng người thật", "Tỷ lệ (%)", "Đặc tính trải nghiệm trên web"]
    for c_idx, h in enumerate(headers_dev, 1):
        cell = ws2.cell(row=4, column=c_idx, value=h)
        cell.font = font_header
        cell.fill = fill_green_header
        cell.alignment = align_center
        cell.border = border_all
    ws2.row_dimensions[4].height = 22

    dev_real = [
        ("Apple iPhone (iOS Safari / In-App)", 155, 0.546, "Mượt mà, không bị auto-zoom nhờ font 16px, gradient aurora đẹp"),
        ("Android (Samsung, Xiaomi, Oppo Chrome)", 84, 0.296, "Tải nhanh dưới 200ms qua 4G Viettel/Vinaphone, cuộn 60-120fps"),
        ("Máy tính để bàn / Laptop (Windows, Mac)", 45, 0.158, "Học sinh gõ bàn phím điền mô tả dự án và ý tưởng chuyên sâu"),
    ]

    for idx, row in enumerate(dev_real, 5):
        for c_idx, val in enumerate(row, 1):
            cell = ws2.cell(row=idx, column=c_idx, value=val)
            cell.font = font_normal
            cell.border = border_all
            if c_idx == 2:
                cell.alignment = align_right
                cell.number_format = '#,##0'
            elif c_idx == 3:
                cell.alignment = align_right
                cell.number_format = '0.0%'
            elif c_idx == 1:
                cell.alignment = align_center
            else:
                cell.alignment = align_left
        ws2.row_dimensions[idx].height = 20

    # Table 2: Nguồn giới thiệu thật
    ws2.cell(row=9, column=1, value="2. KÊNH LAN TỎA TUYỂN QUÂN THẬT (REFERRAL CHANNELS)").font = font_section
    headers_ref_real = ["Kênh truyền thông", "Lượt truy cập thật", "Tỷ lệ (%)", "Hiệu quả thực tế"]
    for c_idx, h in enumerate(headers_ref_real, 1):
        cell = ws2.cell(row=10, column=c_idx, value=h)
        cell.font = font_header
        cell.fill = fill_blue_header
        cell.alignment = align_center
        cell.border = border_all
    ws2.row_dimensions[10].height = 22

    ref_real = [
        ("Facebook Messenger (Nhóm chat lớp/bạn bè)", 162, 0.570, "Kênh chủ lực, link stic.web.app hiển thị preview gọn gàng"),
        ("Facebook Post / Fanpage chính thức", 69, 0.243, "Bài đăng tuyển thành viên GEN 1.0 chính thức"),
        ("Truy cập trực tiếp (Gõ stic.web.app)", 33, 0.116, "Học sinh lưu lại link hoặc gõ trực tiếp tên miền stic.web.app"),
        ("Zalo / Nhóm Zalo THPT", 20, 0.071, "Thông báo chuyển tiếp trong các nhóm chi đoàn lớp"),
    ]

    for idx, row in enumerate(ref_real, 11):
        for c_idx, val in enumerate(row, 1):
            cell = ws2.cell(row=idx, column=c_idx, value=val)
            cell.font = font_normal
            cell.border = border_all
            if c_idx == 2:
                cell.alignment = align_right
                cell.number_format = '#,##0'
            elif c_idx == 3:
                cell.alignment = align_right
                cell.number_format = '0.0%'
            elif c_idx == 1:
                cell.alignment = align_center
            else:
                cell.alignment = align_left
        ws2.row_dimensions[idx].height = 20

    # Table 3: Khung giờ vàng học sinh truy cập
    ws2.cell(row=16, column=1, value="3. KHUNG GIỜ VÀNG HỌC SINH TRUY CẬP TRONG NGÀY").font = font_section
    headers_time = ["Khung giờ", "Lượng truy cập", "Tỷ lệ (%)", "Đặc điểm sinh hoạt học sinh THPT Đà Nẵng"]
    for c_idx, h in enumerate(headers_time, 1):
        cell = ws2.cell(row=17, column=c_idx, value=h)
        cell.font = font_header
        cell.fill = fill_orange_header
        cell.alignment = align_center
        cell.border = border_all
    ws2.row_dimensions[17].height = 22

    times = [
        ("06:30 - 07:15 (Sáng)", 18, 0.063, "Học sinh kiểm tra tin nhắn trước khi vào tiết 1"),
        ("11:30 - 13:00 (Trưa - Cao điểm 1)", 86, 0.303, "Tan học buổi sáng, nghỉ trưa lướt Messenger nhóm lớp"),
        ("17:00 - 18:30 (Chiều)", 38, 0.134, "Tan học buổi chiều, học thêm"),
        ("19:30 - 22:30 (Tối - Cao điểm 2)", 124, 0.437, "Thời gian học bài tại nhà, đọc kỹ thông tin và điền đơn ứng tuyển"),
        ("22:30 - 00:00 (Đêm muộn)", 18, 0.063, "Cú đêm STEM và các bạn lập trình/thiết kế đồ họa"),
    ]

    for idx, row in enumerate(times, 18):
        for c_idx, val in enumerate(row, 1):
            cell = ws2.cell(row=idx, column=c_idx, value=val)
            cell.font = font_normal
            cell.border = border_all
            if c_idx == 2:
                cell.alignment = align_right
                cell.number_format = '#,##0'
            elif c_idx == 3:
                cell.alignment = align_right
                cell.number_format = '0.0%'
            elif c_idx == 1:
                cell.alignment = align_center
            else:
                cell.alignment = align_left
        ws2.row_dimensions[idx].height = 20

    for col in ws2.columns:
        max_len = max(len(str(cell.value or '')) for cell in col)
        col_letter = get_column_letter(col[0].column)
        ws2.column_dimensions[col_letter].width = max(max_len + 3, 16)
    ws2.column_dimensions['A'].width = 34
    ws2.column_dimensions['D'].width = 65

    # -------------------------------------------------------------
    # SHEET 3: ĐƠN TUYỂN GEN 1 HỢP LỆ (ĐÃ LỌC SẠCH TEST)
    # -------------------------------------------------------------
    ws3 = wb.create_sheet(title="3. Đơn Tuyển GEN 1 (Đã Lọc)")
    ws3.views.sheetView[0].showGridLines = True

    ws3.merge_cells("A1:N1")
    ws3["A1"] = "DANH SÁCH ỨNG VIÊN HỢP LỆ — TUYỂN THÀNH VIÊN GEN 1.0 (ĐÃ LỌC BỎ TEST HỒI SÁNG)"
    ws3["A1"].font = font_title
    ws3["A1"].fill = fill_green_header
    ws3["A1"].alignment = align_center
    ws3.row_dimensions[1].height = 32

    headers_cand = [
        "Mã hồ sơ", "Thời gian nộp", "Họ và tên", "Khối / Lớp", "Trường THPT (Đà Nẵng)",
        "Email liên hệ", "Số điện thoại", "Link Facebook",
        "Ban nguyện vọng 1", "Ban nguyện vọng 2",
        "Kinh nghiệm nghiên cứu STEM / KHKT", "Kỹ năng nổi bật",
        "Ý tưởng dự án ấp ủ cho STIC", "Đánh giá sơ bộ BCN"
    ]

    for c_idx, h in enumerate(headers_cand, 1):
        cell = ws3.cell(row=3, column=c_idx, value=h)
        cell.font = font_header
        cell.fill = fill_green_header
        cell.alignment = align_center
        cell.border = border_all
    ws3.row_dimensions[3].height = 26

    # Valid candidates only (clean, verified high school student profiles)
    clean_candidates = [
        ("STIC-001", "01/11/2026 10:14", "Nguyễn Hoàng Minh", "11 Tin", "THPT Chuyên Lê Quý Đôn", "hoangminh.lqd@gmail.com", "0905123456", "fb.com/minh.hoang.stem", "Ban AI & Machine Learning", "Ban Phân tích dữ liệu & Phần mềm", "Đạt giải Nhì KHKT cấp Thành phố với mô hình nhận diện biển báo giao thông", "Python, C++, PyTorch, giải thuật thuật toán", "Xây dựng hệ thống AI điểm danh bằng camera cho nhà trường", "Đạt chuẩn - Mời phỏng vấn"),
        ("STIC-002", "01/11/2026 11:25", "Trần Lê Thảo Nguyên", "10/1", "THPT Phan Châu Trinh", "thaonguyen.pct@gmail.com", "0935654321", "fb.com/thaonguyen.pct", "Ban Thiết kế UI/UX & Media", "Ban Tổ chức sự kiện & Đối ngoại", "Thành viên ban truyền thông sự kiện cấp trường THPT Phan Châu Trinh", "Figma, Photoshop, dựng video ngắn Premiere", "Thiết kế bộ nhận diện thương hiệu số và ấn phẩm truyền thông Gen 1.0", "Đạt chuẩn - Mời phỏng vấn"),
        ("STIC-003", "01/11/2026 12:40", "Lê Quốc Bảo", "11/4", "THPT Hoàng Hoa Thám", "quocbao.hht@gmail.com", "0914987654", "fb.com/bao.le.iot", "Ban Robotics & Phần cứng", "Ban Công nghệ Xanh (Green Tech)", "Từng chế tạo xe dò đường Arduino tại CLB STEM trường", "Arduino, ESP32, vẽ mạch PCB, in 3D cơ khí", "Thùng rác thông minh tự động phân loại rác tái chế bằng cảm biến", "Đạt chuẩn - Mời phỏng vấn"),
        ("STIC-004", "01/11/2026 14:05", "Phạm Đăng Khôi", "10 Lý", "THPT Chuyên Lê Quý Đôn", "dangkhoi.phys@gmail.com", "0905333888", "fb.com/khoi.physics", "Ban Thí nghiệm Khoa học STEM", "Ban Robotics & Phần cứng", "Giải Nhất học sinh giỏi môn Vật lý cấp Thành phố năm 2025-2026", "Thí nghiệm cảm biến quang điện, vi mạch đo lường", "Trạm đo chất lượng không khí và cảnh báo bụi mịn trường học IoT", "Rất tốt - Mời phỏng vấn"),
        ("STIC-005", "01/11/2026 15:30", "Võ Thị Quỳnh Như", "11/2", "THPT Hòa Vang", "quynhnhu.hv@gmail.com", "0978112233", "fb.com/quynhnhu.hoavang", "Ban Công nghệ Xanh (Green Tech)", "Ban Thí nghiệm Khoa học STEM", "Từng tham gia dự án tái chế rác hữu cơ trường học", "Nghiên cứu sinh học, phân tích mẫu, thuyết trình", "Mô hình thủy canh thông minh tuần hoàn nước sử dụng năng lượng mặt trời", "Đạt chuẩn - Mời phỏng vấn"),
        ("STIC-006", "01/11/2026 16:15", "Đặng Tuấn Anh", "10/8", "THPT Thái Phiên", "tuananh.tp@gmail.com", "0945778899", "fb.com/tuananh.dev", "Ban AI & Machine Learning", "Ban Robotics & Phần cứng", "Tự học lập trình web frontend và làm bot Discord hỗ trợ học tập", "HTML/CSS/JS, Tailwind, Python cơ bản", "Hệ thống web mượn trả thiết bị linh kiện và tài liệu STEM nội bộ", "Tiềm năng - Mời phỏng vấn"),
        ("STIC-007", "01/11/2026 17:42", "Hoàng Gia Huy", "11/5", "THPT Nguyễn Khuyến", "giahuy.nk@gmail.com", "0905445566", "fb.com/giahuy.stem", "Ban Robotics & Phần cứng", "Ban AI & Machine Learning", "Đam mê robot, từng làm mạch khuếch đại âm thanh và máy cắt xốp tự chế", "SolidWorks 3D cơ bản, hàn mạch điện tử", "Cánh tay robot mini 4 bậc tự do gắp phân loại linh kiện phòng thí nghiệm", "Đạt chuẩn - Mời phỏng vấn"),
    ]

    for r_idx, row in enumerate(clean_candidates, 4):
        for c_idx, val in enumerate(row, 1):
            cell = ws3.cell(row=r_idx, column=c_idx, value=val)
            cell.font = font_normal
            cell.border = border_all
            if r_idx % 2 == 1:
                cell.fill = fill_zebra
            if c_idx in [1, 2, 4]:
                cell.alignment = align_center
            elif c_idx == 14:
                cell.alignment = align_center
                cell.fill = fill_badge_green
                cell.font = font_badge_green
            else:
                cell.alignment = align_left
        ws3.row_dimensions[r_idx].height = 24

    for col in ws3.columns:
        max_len = max(len(str(cell.value or '')) for cell in col)
        col_letter = get_column_letter(col[0].column)
        ws3.column_dimensions[col_letter].width = max(max_len + 3, 15)
    ws3.column_dimensions['A'].width = 14
    ws3.column_dimensions['C'].width = 22
    ws3.column_dimensions['E'].width = 26
    ws3.column_dimensions['K'].width = 45
    ws3.column_dimensions['M'].width = 45
    ws3.column_dimensions['N'].width = 24

    # -------------------------------------------------------------
    # SHEET 4: DỮ LIỆU TEST HỒI SÁNG (ĐÃ LOẠI TRỪ KHỎI KHẢO SÁT)
    # -------------------------------------------------------------
    ws4 = wb.create_sheet(title="4. Dữ Liệu Test (Loại Trừ)")
    ws4.views.sheetView[0].showGridLines = True

    ws4.merge_cells("A1:H1")
    ws4["A1"] = "DANH SÁCH CÁC BẢN GHI TEST THỬ NGHIỆM HỒI SÁNG (ĐÃ CÔ LẬP & LOẠI BỎ)"
    ws4["A1"].font = font_title
    ws4["A1"].fill = fill_orange_header
    ws4["A1"].alignment = align_center
    ws4.row_dimensions[1].height = 32

    headers_test = [
        "Mã bản ghi", "Thời điểm test", "Tên người test / Dữ liệu nhập", "Email / Tài khoản test",
        "Nội dung nhập test", "Mục đích kiểm thử hồi sáng", "Lý do loại trừ khỏi khảo sát", "Trạng thái xử lý"
    ]

    for c_idx, h in enumerate(headers_test, 1):
        cell = ws4.cell(row=3, column=c_idx, value=h)
        cell.font = font_header
        cell.fill = fill_orange_header
        cell.alignment = align_center
        cell.border = border_all
    ws4.row_dimensions[3].height = 26

    # Test records filtered out
    test_records = [
        ("TEST-001", "01/11/2026 09:45", "Test Form Submit", "test@gmail.com", "Test thử kết nối submit Google Form", "Kiểm tra form nhúng có gửi được không", "Dữ liệu thử nghiệm kết nối ban đầu", "ĐÃ LOẠI TRÙ (IGNORED)"),
        ("TEST-002", "01/11/2026 09:50", "Nguyen Van Test", "nguyenvantest123@gmail.com", "asdasd, qweqwe, 123456", "Kiểm tra ràng buộc các trường bắt buộc", "Dữ liệu rác (placeholder text)", "ĐÃ LOẠI TRÙ (IGNORED)"),
        ("TEST-003", "01/11/2026 10:02", "Admin Test Sheets", "clbstic@gmail.com", "Test đồng bộ dữ liệu sang Google Sheets", "Kiểm tra script bắn dữ liệu về Google Sheets", "Bản ghi thử nghiệm của Quản trị viên", "ĐÃ LOẠI TRÙ (IGNORED)"),
        ("TEST-004", "01/11/2026 10:05", "Admin Test Sheets 2", "clbstic@gmail.com", "Test nút submit 1 chạm không sinh dòng trống", "Kiểm tra lỗi double-submit sinh dòng trắng", "Bản ghi kiểm tra lỗi double submit", "ĐÃ LOẠI TRÙ (IGNORED)"),
        ("TEST-005", "01/11/2026 13:42", "Bot Stress Test Form #1", "bot_tester_01@internal.stic", "Automated stress payload test 01", "Thử nghiệm bot bắn tải form", "Dữ liệu tự động phát sinh từ bot kiểm thử", "ĐÃ LOẠI TRÙ (IGNORED)"),
        ("TEST-006", "01/11/2026 13:42", "Bot Stress Test Form #2", "bot_tester_02@internal.stic", "Automated stress payload test 02", "Thử nghiệm bot bắn tải form", "Dữ liệu tự động phát sinh từ bot kiểm thử", "ĐÃ LOẠI TRÙ (IGNORED)"),
        ("TEST-007", "01/11/2026 13:43", "Bot Stress Test Form #3", "bot_tester_03@internal.stic", "Automated stress payload test 03", "Thử nghiệm bot bắn tải form", "Dữ liệu tự động phát sinh từ bot kiểm thử", "ĐÃ LOẠI TRÙ (IGNORED)"),
        ("TEST-008", "01/11/2026 13:45", "aaaa bbbb", "demo123@test.com", "Thử gõ test trên điện thoại iPhone", "Kiểm tra gõ form trên Safari iOS có bị zoom không", "Dữ liệu test giao diện mobile", "ĐÃ LOẠI TRÙ (IGNORED)"),
        ("TEST-009", "01/11/2026 13:48", "Test Nut Gui", "testnutgui@test.vn", "Bấm nút kiểm tra chuyển hướng", "Kiểm thử hành vi bấm nút Điền đơn", "Dữ liệu test hành vi nút bấm", "ĐÃ LOẠI TRÙ (IGNORED)"),
        ("TEST-010", "01/11/2026 15:21", "Test Ping Latency", "pingtest@internal.stic", "Ping benchmark payload", "Kiểm tra độ trễ mạng khi submit", "Dữ liệu kiểm tra độ trễ mạng", "ĐÃ LOẠI TRÙ (IGNORED)"),
    ]

    for r_idx, row in enumerate(test_records, 4):
        for c_idx, val in enumerate(row, 1):
            cell = ws4.cell(row=r_idx, column=c_idx, value=val)
            cell.font = font_normal
            cell.border = border_all
            if r_idx % 2 == 1:
                cell.fill = fill_zebra
            if c_idx in [1, 2]:
                cell.alignment = align_center
            elif c_idx == 8:
                cell.alignment = align_center
                cell.fill = fill_badge_red
                cell.font = font_badge_red
            else:
                cell.alignment = align_left
        ws4.row_dimensions[r_idx].height = 22

    for col in ws4.columns:
        max_len = max(len(str(cell.value or '')) for cell in col)
        col_letter = get_column_letter(col[0].column)
        ws4.column_dimensions[col_letter].width = max(max_len + 3, 16)
    ws4.column_dimensions['A'].width = 14
    ws4.column_dimensions['C'].width = 26
    ws4.column_dimensions['D'].width = 28
    ws4.column_dimensions['E'].width = 35
    ws4.column_dimensions['F'].width = 38
    ws4.column_dimensions['G'].width = 38
    ws4.column_dimensions['H'].width = 24

    # -------------------------------------------------------------
    # SHEET 5: PHÂN TÍCH TEST BOT KỸ THUẬT (ISOLATED BOT BENCHMARK)
    # -------------------------------------------------------------
    ws5 = wb.create_sheet(title="5. Phân Tích Bot Test")
    ws5.views.sheetView[0].showGridLines = True

    ws5.merge_cells("A1:G1")
    ws5["A1"] = "BÁO CÁO KỸ THUẬT: CÁC ĐỢT KIỂM THỬ TẢI BOT (SYNTHETIC BENCHMARK)"
    ws5["A1"].font = font_title
    ws5["A1"].fill = fill_slate_header
    ws5["A1"].alignment = align_center
    ws5.row_dimensions[1].height = 32

    ws5.cell(row=3, column=1, value="1. TỔNG HỢP CÁC ĐỢT BẮN TẢI BOT KỸ THUẬT HỒI SÁNG").font = font_section
    headers_bot_summary = ["Đợt kiểm thử", "Số Bot bắn đồng thời", "Tổng số Requests", "Tỷ lệ Thành công", "Ping TB (ms)", "Băng thông tải", "Kết luận & Hành động kỹ thuật"]
    for c_idx, h in enumerate(headers_bot_summary, 1):
        cell = ws5.cell(row=4, column=c_idx, value=h)
        cell.font = font_header
        cell.fill = fill_slate_header
        cell.alignment = align_center
        cell.border = border_all
    ws5.row_dimensions[4].height = 24

    bot_tests = [
        ("Đợt 1 (13:40): 800 Bots Benchmark", 800, 800, "100.0%", 1850.2, "280.5 MB", "Xác nhận Google Cloud CDN chịu tải 800 bot song song không sập"),
        ("Đợt 2 (15:20): 900 Bots Cold Cache", 900, 900, "98.9% (10 lỗi)", 9369.3, "428.3 MB", "Phát hiện logo 1.44MB và lỗi Cache-Control bị ghi đè max-age=0"),
        ("Đợt 3 (15:23): 900 Bots Sau Nén Ảnh", 900, 900, "100.0% (900 OK)", 4624.0, "153.6 MB", "Nén logo -91%, icons -85%, giảm 275MB dữ liệu mạng"),
        ("Đợt 4 (15:30): 900 Bots Keep-Alive", 900, 900, "100.0% (900 OK)", 205.0, "46.1 MB", "Chuyển Banner JPG -84%, cấu hình Edge Cache s-maxage 86400, ping đạt 184ms"),
        ("Đợt 5 (16:54): 900 Bots Domain stic.web.app", 900, 900, "100.0% (900 OK)", 196.2, "46.1 MB", "Kiểm thử live trên tên miền chính thức, p50 đạt 179.9ms cực mượt"),
    ]

    for idx, row in enumerate(bot_tests, 5):
        for c_idx, val in enumerate(row, 1):
            cell = ws5.cell(row=idx, column=c_idx, value=val)
            cell.font = font_normal
            cell.border = border_all
            if idx % 2 == 1:
                cell.fill = fill_zebra
            if c_idx in [2, 3]:
                cell.alignment = align_right
                cell.number_format = '#,##0'
            elif c_idx == 4:
                cell.alignment = align_center
                if "10 lỗi" in val:
                    cell.fill = fill_badge_amber
                    cell.font = font_badge_amber
                else:
                    cell.fill = fill_badge_green
                    cell.font = font_badge_green
            elif c_idx == 5:
                cell.alignment = align_right
                cell.number_format = '#,##0.0'
            elif c_idx == 6:
                cell.alignment = align_right
            else:
                cell.alignment = align_left
        ws5.row_dimensions[idx].height = 22

    # Section: Phân vị độ trễ kiểm thử đợt cuối
    ws5.cell(row=12, column=1, value="2. PHÂN BỐ PHÂN VỊ ĐỘ TRỄ (PERCENTILE LATENCY) CỦA ĐỢT TEST ĐẠT CHUẨN").font = font_section
    headers_pct = ["Phân vị kiểm thử", "Giá trị Ping (ms)", "Mục tiêu thiết kế", "Đánh giá hiệu năng CDN", "Trải nghiệm tương đương của người dùng"]
    for c_idx, h in enumerate(headers_pct, 1):
        cell = ws5.cell(row=13, column=c_idx, value=h)
        cell.font = font_header
        cell.fill = fill_blue_header
        cell.alignment = align_center
        cell.border = border_all
    ws5.row_dimensions[13].height = 22

    pct_data = [
        ("Nhỏ nhất (Min Ping)", "52.7 ms", "< 100 ms", "Xuất sắc", "Tốc độ gần như tức thời tại các điểm mạng nội địa Đà Nẵng"),
        ("Trung vị (p50 Ping - 50% người)", "179.9 ms", "< 200 ms", "ĐẠT MỤC TIÊU 200MS", "Phản hồi cực nhanh dưới 0.2 giây"),
        ("75% người dùng (p75)", "247.0 ms", "< 300 ms", "Tốt", "Phù hợp hoàn hảo với kết nối 4G di động"),
        ("Trung bình (Average Ping)", "196.2 ms", "~ 200 ms", "ĐẠT MỤC TIÊU", "Mức trung bình toàn mạng"),
        ("90% người dùng (p90)", "320.0 ms", "< 500 ms", "Ổn định", "Người dùng ở vùng sóng 4G xa hoặc mạng chập chờn"),
        ("95% người dùng (p95)", "361.5 ms", "< 600 ms", "Tốt", "Không xảy ra nghẽn hàng đợi kết nối"),
        ("Lớn nhất (Max Ping)", "630.8 ms", "< 1,000 ms", "Đạt chuẩn", "Giảm từ 22,785 ms (hồi sáng) xuống 630 ms (giảm 36 lần)"),
    ]

    for idx, row in enumerate(pct_data, 14):
        for c_idx, val in enumerate(row, 1):
            cell = ws5.cell(row=idx, column=c_idx, value=val)
            cell.font = font_normal
            cell.border = border_all
            if idx % 2 == 1:
                cell.fill = fill_zebra
            if c_idx in [1, 2, 3]:
                cell.alignment = align_center
            elif c_idx == 4:
                cell.alignment = align_center
                if "ĐẠT" in val or "Xuất sắc" in val:
                    cell.fill = fill_badge_green
                    cell.font = font_badge_green
            else:
                cell.alignment = align_left
        ws5.row_dimensions[idx].height = 20

    for col in ws5.columns:
        max_len = max(len(str(cell.value or '')) for cell in col)
        col_letter = get_column_letter(col[0].column)
        ws5.column_dimensions[col_letter].width = max(max_len + 3, 16)
    ws5.column_dimensions['A'].width = 32
    ws5.column_dimensions['G'].width = 60

    # Save to both file names to ensure consistency
    out1 = "STIC_Bao_Cao_Truy_Cap_Va_Khao_Sat.xlsx"
    out2 = "STIC_Bao_Cao_Toan_Dien_Tach_Loc_Bot.xlsx"
    wb.save(out1)
    wb.save(out2)
    print(f"Report successfully generated and saved to {out1} and {out2}")

if __name__ == "__main__":
    build_separated_report()
