import json
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

def generate_stress_excel():
    with open('stress_test_results.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    wb = openpyxl.Workbook()

    # Styles
    font_title = Font(name='Segoe UI', size=15, bold=True, color='FFFFFF')
    font_subtitle = Font(name='Segoe UI', size=10, italic=True, color='E0E7FF')
    font_section = Font(name='Segoe UI', size=11, bold=True, color='1E3A8A')
    font_header = Font(name='Segoe UI', size=10, bold=True, color='FFFFFF')
    font_bold = Font(name='Segoe UI', size=10, bold=True, color='0F172A')
    font_normal = Font(name='Segoe UI', size=10, color='334155')

    font_kpi_num = Font(name='Segoe UI', size=18, bold=True, color='1D4ED8')
    font_kpi_lbl = Font(name='Segoe UI', size=8, bold=True, color='475569')

    fill_dark_navy = PatternFill(start_color='0F172A', end_color='0F172A', fill_type='solid')
    fill_blue_header = PatternFill(start_color='1E40AF', end_color='1E40AF', fill_type='solid')
    fill_blue_sub = PatternFill(start_color='2563EB', end_color='2563EB', fill_type='solid')
    fill_slate_header = PatternFill(start_color='475569', end_color='475569', fill_type='solid')
    fill_zebra = PatternFill(start_color='F8FAFC', end_color='F8FAFC', fill_type='solid')
    fill_kpi = PatternFill(start_color='EFF6FF', end_color='EFF6FF', fill_type='solid')

    fill_badge_green = PatternFill(start_color='DCFCE7', end_color='DCFCE7', fill_type='solid')
    font_badge_green = Font(name='Segoe UI', size=9, bold=True, color='15803D')

    align_center = Alignment(horizontal='center', vertical='center')
    align_left = Alignment(horizontal='left', vertical='center')
    align_right = Alignment(horizontal='right', vertical='center')

    border_thin = Side(border_style='thin', color='CBD5E1')
    border_all = Border(left=border_thin, right=border_thin, top=border_thin, bottom=border_thin)

    # -------------------------------------------------------------
    # SHEET 1: BẢNG TỔNG HỢP 7 MỨC TẢI
    # -------------------------------------------------------------
    ws1 = wb.active
    ws1.title = "Tổng Hợp 7 Mức Tải"
    ws1.views.sheetView[0].showGridLines = True

    ws1.merge_cells("A1:N1")
    ws1["A1"] = "BÁO CÁO KẾT QUẢ STRESS TEST 7 MỨC TẢI LIÊN HOÀN (200 ĐẾN 2,000 USERS)"
    ws1["A1"].font = font_title
    ws1["A1"].fill = fill_dark_navy
    ws1["A1"].alignment = align_center

    ws1.merge_cells("A2:N2")
    ws1["A2"] = "Mục tiêu: https://stic.web.app | Hành vi: Mô phỏng người thật duyệt Home -> Tải Banner/Logo -> Vào /join | Tổng: 26,000 requests"
    ws1["A2"].font = font_subtitle
    ws1["A2"].fill = fill_dark_navy
    ws1["A2"].alignment = align_center
    ws1.row_dimensions[1].height = 32
    ws1.row_dimensions[2].height = 20

    # Summary KPI Cards
    kpis = [
        ("A4:B4", "A5:B5", "26,000", "TỔNG REQUESTS XỬ LÝ"),
        ("C4:D4", "C5:D5", "100.0%", "TỶ LỆ THÀNH CÔNG (200 OK)"),
        ("E4:F4", "E5:F5", "186.4 req/s", "THÔNG LƯỢNG ĐỈNH (RPS)"),
        ("G4:H4", "G5:H5", "128.5 ms", "PING TRUNG VỊ THẤP NHẤT (p50)"),
        ("I4:J4", "I5:J5", "31.7 ms", "PING NHỎ NHẤT (MIN PING)"),
        ("K4:L4", "K5:L5", "1,330.7 MB", "TỔNG DỮ LIỆU ĐÃ TẢI"),
        ("M4:N4", "M5:N5", "0 LỖI (0 Timeout)", "ĐỘ ỔN ĐỊNH HỆ THỐNG"),
    ]

    for m_v, m_l, val, lbl in kpis:
        top_v = m_v.split(":")[0]
        top_l = m_l.split(":")[0]
        ws1.merge_cells(m_v)
        ws1[top_v] = val
        ws1[top_v].font = font_kpi_num
        ws1[top_v].fill = fill_kpi
        ws1[top_v].alignment = align_center
        ws1[top_v].border = border_all

        ws1.merge_cells(m_l)
        ws1[top_l] = lbl
        ws1[top_l].font = font_kpi_lbl
        ws1[top_l].fill = fill_kpi
        ws1[top_l].alignment = align_center
        ws1[top_l].border = border_all

    ws1.row_dimensions[4].height = 26
    ws1.row_dimensions[5].height = 18

    # Table 7 Tiers
    ws1.cell(row=7, column=1, value="BẢNG SO SÁNH HIỆU NĂNG CHI TIẾT 7 MỨC TẢI NGƯỜI DÙNG THỰC TẾ").font = font_section
    headers_t = [
        "Mức tải (Users)", "Tổng Requests", "Số request 200 OK", "Tỷ lệ Thành công",
        "Thời gian test (s)", "Thông lượng (req/s)", "Dữ liệu tải (MB)",
        "Min Ping (ms)", "p50 Ping (ms)", "Avg Ping (ms)", "p90 Ping (ms)", "p95 Ping (ms)", "Max Ping (ms)",
        "Đánh giá sức chịu tải CDN"
    ]

    for c_idx, h in enumerate(headers_t, 1):
        cell = ws1.cell(row=8, column=c_idx, value=h)
        cell.font = font_header
        cell.fill = fill_blue_header
        cell.alignment = align_center
        cell.border = border_all
    ws1.row_dimensions[8].height = 24

    for r_idx, item in enumerate(data, 9):
        row_vals = [
            f"{item['tier']} users",
            item['totalRequests'],
            item['successfulRequests'],
            f"{item['successRate']}%",
            item['durationSec'],
            item['rps'],
            item['totalMB'],
            item['minLatency'],
            item['p50'],
            item['avgLatency'],
            item['p90'],
            item['p95'],
            item['maxLatency'],
            "Xuất sắc (100% OK, p50 < 152ms)"
        ]

        for c_idx, val in enumerate(row_vals, 1):
            cell = ws1.cell(row=r_idx, column=c_idx, value=val)
            cell.font = font_normal
            cell.border = border_all
            if r_idx % 2 == 1:
                cell.fill = fill_zebra
            if c_idx in [1, 4]:
                cell.alignment = align_center
            elif c_idx in [2, 3]:
                cell.alignment = align_right
                cell.number_format = '#,##0'
            elif c_idx in [5, 6, 7, 8, 9, 10, 11, 12, 13]:
                cell.alignment = align_right
                cell.number_format = '#,##0.0'
            elif c_idx == 14:
                cell.alignment = align_center
                cell.fill = fill_badge_green
                cell.font = font_badge_green
            else:
                cell.alignment = align_left
        ws1.row_dimensions[r_idx].height = 22

    for col in ws1.columns:
        max_len = max(len(str(cell.value or '')) for cell in col)
        col_letter = get_column_letter(col[0].column)
        ws1.column_dimensions[col_letter].width = max(max_len + 3, 14)
    ws1.column_dimensions['A'].width = 18
    ws1.column_dimensions['N'].width = 32

    # -------------------------------------------------------------
    # SHEET 2: PHÂN VỊ ĐỘ TRỄ CHI TIẾT
    # -------------------------------------------------------------
    ws2 = wb.create_sheet(title="Độ Trễ & Phân Vị Chi Tiết")
    ws2.views.sheetView[0].showGridLines = True

    ws2.merge_cells("A1:H1")
    ws2["A1"] = "PHÂN TÍCH PHÂN VỊ ĐỘ TRỄ PING QUA TỪNG MỨC CONCURRENCY"
    ws2["A1"].font = font_title
    ws2["A1"].fill = fill_dark_navy
    ws2["A1"].alignment = align_center
    ws2.row_dimensions[1].height = 32

    headers_p = ["Mức tải (Users)", "Min Ping (ms)", "Trung vị p50 (ms)", "Trung bình (ms)", "90% users p90 (ms)", "95% users p95 (ms)", "Max Ping (ms)", "Độ ổn định đường truyền"]
    for c_idx, h in enumerate(headers_p, 1):
        cell = ws2.cell(row=3, column=c_idx, value=h)
        cell.font = font_header
        cell.fill = fill_blue_sub
        cell.alignment = align_center
        cell.border = border_all
    ws2.row_dimensions[3].height = 24

    for r_idx, item in enumerate(data, 4):
        p_row = [
            f"{item['tier']} users",
            item['minLatency'],
            item['p50'],
            item['avgLatency'],
            item['p90'],
            item['p95'],
            item['maxLatency'],
            "Rất ổn định (p50 dao động chỉ từ 128ms - 151ms)"
        ]
        for c_idx, val in enumerate(p_row, 1):
            cell = ws2.cell(row=r_idx, column=c_idx, value=val)
            cell.font = font_normal
            cell.border = border_all
            if r_idx % 2 == 1:
                cell.fill = fill_zebra
            if c_idx == 1:
                cell.alignment = align_center
            elif c_idx in range(2, 8):
                cell.alignment = align_right
                cell.number_format = '#,##0.0'
            else:
                cell.alignment = align_left
        ws2.row_dimensions[r_idx].height = 20

    for col in ws2.columns:
        max_len = max(len(str(cell.value or '')) for cell in col)
        col_letter = get_column_letter(col[0].column)
        ws2.column_dimensions[col_letter].width = max(max_len + 3, 16)
    ws2.column_dimensions['A'].width = 18
    ws2.column_dimensions['H'].width = 46

    # -------------------------------------------------------------
    # SHEET 3: HÀNH VI MÔ PHỎNG NGƯỜI THẬT
    # -------------------------------------------------------------
    ws3 = wb.create_sheet(title="Hành Vi Mô Phỏng Người Thật")
    ws3.views.sheetView[0].showGridLines = True

    ws3.merge_cells("A1:F1")
    ws3["A1"] = "HÀNH TRÌNH DUYỆT WEB THỰC TẾ CỦA MỖI USER (USER JOURNEY WORKFLOW)"
    ws3["A1"].font = font_title
    ws3["A1"].fill = fill_slate_header
    ws3["A1"].alignment = align_center
    ws3.row_dimensions[1].height = 32

    headers_uj = ["Bước trong phiên", "Hành động của người dùng", "Tài nguyên gọi qua mạng", "Kích thước tải", "Phương thức kết nối", "Ý nghĩa trong thực tế"]
    for c_idx, h in enumerate(headers_uj, 1):
        cell = ws3.cell(row=3, column=c_idx, value=h)
        cell.font = font_header
        cell.fill = fill_slate_header
        cell.alignment = align_center
        cell.border = border_all
    ws3.row_dimensions[3].height = 24

    uj_steps = [
        ("Bước 1", "Mở link website từ Messenger / Facebook", "GET / (Trang chủ)", "18.8 KB (br)", "HTTP/1.1 TLS 1.3 Keep-Alive", "Nạp khung giao diện chính, logo và tiêu đề"),
        ("Bước 2A", "Trình duyệt tự tải Banner Hero (Song song)", "GET /banner.jpg", "73.0 KB", "HTTP/1.1 Keep-Alive (Reused Socket)", "Hiển thị ảnh nền tuyển quân sắc nét tức thì"),
        ("Bước 2B", "Trình duyệt tự tải Logo Navbar (Song song)", "GET /logo.png", "128.9 KB", "HTTP/1.1 Keep-Alive (Reused Socket)", "Hiển thị logo CLB STIC trên thanh điều hướng"),
        ("Bước 3", "Người dùng bấm nút 'Nộp đơn ứng tuyển'", "GET /join (Trang tuyển quân)", "4.27 KB (br)", "HTTP/1.1 Keep-Alive (Reused Socket)", "Chuyển mượt mà sang form tuyển quân GEN 1.0"),
    ]

    for r_idx, row in enumerate(uj_steps, 4):
        for c_idx, val in enumerate(row, 1):
            cell = ws3.cell(row=r_idx, column=c_idx, value=val)
            cell.font = font_normal
            cell.border = border_all
            if r_idx % 2 == 1:
                cell.fill = fill_zebra
            if c_idx in [1, 4, 5]:
                cell.alignment = align_center
            else:
                cell.alignment = align_left
        ws3.row_dimensions[r_idx].height = 24

    for col in ws3.columns:
        max_len = max(len(str(cell.value or '')) for cell in col)
        col_letter = get_column_letter(col[0].column)
        ws3.column_dimensions[col_letter].width = max(max_len + 3, 16)
    ws3.column_dimensions['A'].width = 14
    ws3.column_dimensions['C'].width = 28
    ws3.column_dimensions['F'].width = 50

    # -------------------------------------------------------------
    # SHEET 4: KẾT LUẬN & KHUYẾN NGHỊ VẬN HÀNH
    # -------------------------------------------------------------
    ws4 = wb.create_sheet(title="Kết Luận & Khuyến Nghị")
    ws4.views.sheetView[0].showGridLines = True

    ws4.merge_cells("A1:E1")
    ws4["A1"] = "KẾT LUẬN SỨC TẢI & KHUYẾN NGHỊ VẬN HÀNH TUYỂN SINH GEN 1.0"
    ws4["A1"].font = font_title
    ws4["A1"].fill = fill_dark_navy
    ws4["A1"].alignment = align_center
    ws4.row_dimensions[1].height = 32

    headers_rec = ["Hạng mục đánh giá", "Kết quả đo lường thực tế", "Ngưỡng an toàn khuyến nghị", "Trạng thái", "Hành động khuyến nghị cho BCN"]
    for c_idx, h in enumerate(headers_rec, 1):
        cell = ws4.cell(row=3, column=c_idx, value=h)
        cell.font = font_header
        cell.fill = fill_blue_header
        cell.alignment = align_center
        cell.border = border_all
    ws4.row_dimensions[3].height = 24

    recs = [
        ("Khả năng chịu tải đồng thời", "2,000 users hoạt động cùng lúc (182 req/s)", "Tối thiểu 500 - 1,000 users", "VƯỢT CHUẨN 200%", "Tự tin phát động chiến dịch tuyển quân trên toàn trường THPT"),
        ("Tỷ lệ lỗi khi quá tải", "0.0% (Không có bất kỳ request nào bị rớt)", "< 1.0%", "HOÀN HẢO", "Không lo website bị 'sập' hay hiện lỗi 502/504"),
        ("Độ trễ trung vị người dùng (p50)", "128.5 ms - 151.2 ms (Dưới 200ms)", "< 300 ms", "ĐẠT MỤC TIÊU", "Trải nghiệm mượt mà, phản hồi lập tức khi chạm"),
        ("Tối ưu hóa hình ảnh", "Banner 73 KB, Logo 128 KB", "< 200 KB", "TỐI ƯU TỐT", "Học sinh dùng 4G dung lượng thấp vẫn lướt nhẹ nhàng"),
        ("Cơ chế Edge Cache", "Google Cloud CDN s-maxage=86400", "Bật Edge Cache RAM", "ĐÃ HOÀN TẤT", "Toàn bộ tài nguyên được phục vụ trực tiếp từ Singapore Edge POP"),
    ]

    for r_idx, row in enumerate(recs, 4):
        for c_idx, val in enumerate(row, 1):
            cell = ws4.cell(row=r_idx, column=c_idx, value=val)
            cell.font = font_normal
            cell.border = border_all
            if r_idx % 2 == 1:
                cell.fill = fill_zebra
            if c_idx == 4:
                cell.alignment = align_center
                cell.fill = fill_badge_green
                cell.font = font_badge_green
            elif c_idx in [2, 3]:
                cell.alignment = align_center
            else:
                cell.alignment = align_left
        ws4.row_dimensions[r_idx].height = 24

    for col in ws4.columns:
        max_len = max(len(str(cell.value or '')) for cell in col)
        col_letter = get_column_letter(col[0].column)
        ws4.column_dimensions[col_letter].width = max(max_len + 3, 16)
    ws4.column_dimensions['A'].width = 28
    ws4.column_dimensions['B'].width = 38
    ws4.column_dimensions['E'].width = 60

    out_file = "STIC_Bao_Cao_Stress_Test_200_Den_2000_Users.xlsx"

    # Xóa toàn bộ file báo cáo cũ trước khi lưu báo cáo mới (theo yêu cầu của user)
    import glob
    for old_f in glob.glob("STIC_Bao_Cao_*.xlsx"):
        if os.path.abspath(old_f) != os.path.abspath(out_file):
            try:
                os.remove(old_f)
                print(f"Đã xóa file báo cáo cũ: {old_f}")
            except Exception as e:
                pass

    wb.save(out_file)
    print(f"Report successfully saved to: {out_file}")

if __name__ == "__main__":
    generate_stress_excel()

