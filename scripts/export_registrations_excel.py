import os
import sys
import glob
from datetime import datetime

try:
    import openpyxl
    from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
    from openpyxl.utils import get_column_letter
except ImportError:
    print("Vui lòng cài openpyxl: pip install openpyxl")
    sys.exit(1)

def export_candidates_report(candidates_data=None):
    """
    Tạo báo cáo danh sách ứng viên đăng ký GEN 1.0 xuất thẳng ra file Excel.
    Tự động dọn dẹp các file báo cáo cũ trước khi tạo.
    """
    # 1. Dọn dẹp các file báo cáo cũ
    target_filename = "STIC_Danh_Sach_Ung_Vien_GEN1.xlsx"
    for old_file in glob.glob("STIC_Danh_Sach_Ung_Vien_*.xlsx"):
        try:
            os.remove(old_file)
            print(f"Đã xoá báo cáo cũ: {old_file}")
        except Exception:
            pass

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Danh Sách Đăng Ký GEN 1.0"
    ws.views.sheetView[0].showGridLines = True

    # Styling
    font_title = Font(name="Segoe UI", size=15, bold=True, color="FFFFFF")
    font_subtitle = Font(name="Segoe UI", size=10, italic=True, color="E0E7FF")
    font_header = Font(name="Segoe UI", size=10, bold=True, color="FFFFFF")
    font_normal = Font(name="Segoe UI", size=10, color="1E293B")
    font_bold = Font(name="Segoe UI", size=10, bold=True, color="0F172A")

    fill_dark_navy = PatternFill(start_color="0F172A", end_color="0F172A", fill_type="solid")
    fill_blue_header = PatternFill(start_color="1E40AF", end_color="1E40AF", fill_type="solid")
    fill_zebra = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")
    fill_badge_pending = PatternFill(start_color="FEF3C7", end_color="FEF3C7", fill_type="solid")

    align_center = Alignment(horizontal="center", vertical="center")
    align_left = Alignment(horizontal="left", vertical="center")
    align_right = Alignment(horizontal="right", vertical="center")

    border_thin = Side(border_style="thin", color="CBD5E1")
    border_all = Border(left=border_thin, right=border_thin, top=border_thin, bottom=border_thin)

    # Header Title Block
    ws.merge_cells("A1:K1")
    ws["A1"] = "CLB KHOA HỌC KỸ THUẬT STIC — DANH SÁCH ĐƠN TUYỂN THÀNH VIÊN GEN 1.0"
    ws["A1"].font = font_title
    ws["A1"].fill = fill_dark_navy
    ws["A1"].alignment = align_center
    ws.row_dimensions[1].height = 40

    ws.merge_cells("A2:K2")
    ws["A2"] = f"Dữ liệu thu thập trực tiếp từ cổng stic.web.app/join • Xuất lúc: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}"
    ws["A2"].font = font_subtitle
    ws["A2"].fill = fill_dark_navy
    ws["A2"].alignment = align_center
    ws.row_dimensions[2].height = 22

    # Column Headers
    headers = [
        "STT",
        "Thời Gian Gửi",
        "Họ và Tên",
        "Lớp & Trường",
        "Số Điện Thoại / Zalo",
        "Email",
        "Link Facebook",
        "Mảng Quan Tâm / Đăng Ký",
        "Lý Do Ứng Tuyển",
        "Cam Kết Thời Gian",
        "Trạng Thái"
    ]

    for col_idx, h in enumerate(headers, 1):
        cell = ws.cell(row=4, column=col_idx, value=h)
        cell.font = font_header
        cell.fill = fill_blue_header
        cell.alignment = align_center
        cell.border = border_all
    ws.row_dimensions[4].height = 28

    # Rows Data
    if not candidates_data:
        # Nếu chưa có data thực tế
        ws.merge_cells("A5:K5")
        cell_empty = ws["A5"]
        cell_empty.value = "Hiện tại chưa có đơn đăng ký mới trên hệ thống. Dữ liệu sẽ tự động xuất hiện khi có ứng viên nộp qua web."
        cell_empty.font = font_normal
        cell_empty.alignment = align_center
        cell_empty.border = border_all
        ws.row_dimensions[5].height = 30
    else:
        for r_idx, cand in enumerate(candidates_data, 5):
            row_vals = [
                r_idx - 4,
                cand.get("submittedAt", ""),
                cand.get("fullName", ""),
                cand.get("grade", ""),
                cand.get("phone", ""),
                cand.get("email", ""),
                cand.get("facebook", ""),
                cand.get("interests", ""),
                cand.get("reason", ""),
                cand.get("commitment", ""),
                cand.get("status", "Chờ duyệt")
            ]
            for c_idx, val in enumerate(row_vals, 1):
                cell = ws.cell(row=r_idx, column=c_idx, value=val)
                cell.font = font_normal
                cell.border = border_all
                if r_idx % 2 == 1:
                    cell.fill = fill_zebra
                if c_idx == 1:
                    cell.alignment = align_center
                elif c_idx in [2, 5]:
                    cell.alignment = align_center
                elif c_idx == 11:
                    cell.alignment = align_center
                    cell.fill = fill_badge_pending
                else:
                    cell.alignment = align_left
            ws.row_dimensions[r_idx].height = 24

    # Auto Column Width
    for col in ws.columns:
        col_letter = get_column_letter(col[0].column)
        max_len = max(len(str(cell.value or "")) for cell in col)
        ws.column_dimensions[col_letter].width = max(max_len + 3, 14)
    ws.column_dimensions["A"].width = 8
    ws.column_dimensions["C"].width = 24
    ws.column_dimensions["D"].width = 24
    ws.column_dimensions["H"].width = 32
    ws.column_dimensions["I"].width = 38

    try:
        wb.save(target_filename)
        print(f"Xuất file Excel thành công: {target_filename}")
    except PermissionError:
        alt_name = f"STIC_Danh_Sach_Ung_Vien_GEN1_{int(datetime.now().timestamp())}.xlsx"
        wb.save(alt_name)
        print(f"File chính đang mở. Đã lưu sang: {alt_name}")

if __name__ == "__main__":
    export_candidates_report()

