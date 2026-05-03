# Quy định đóng góp cho dự án

Dự án: Website giới thiệu, bán máy PC trực tuyến

Tài liệu này quy định cách làm việc nhóm, đặt tên branch, commit code và tạo Pull Request trong dự án.

---

## 1. Nguyên tắc chung

- Không code trực tiếp trên nhánh `main`.
- Mỗi thành viên làm việc trên branch riêng.
- Mỗi chức năng hoặc nhóm chức năng nên có một Pull Request riêng.
- Trước khi merge vào `main`, cần kiểm tra giao diện, chức năng, link và responsive.
- Code phải đúng phần việc đã được phân công.
- Tên file, class, id và biến JavaScript cần đặt rõ ràng, dễ hiểu.

---

## 2. Quy ước branch

| Branch | Người phụ trách | Nội dung |
|---|---|---|
| `feature/layout-sitemap-luc` | Quang Lực | Layout chung, sitemap, tích hợp source |
| `feature/homepage-cuong` | Cường | Trang chủ, CSS dùng chung, banner/logo |
| `feature/auth-dung` | T. Dũng | Đăng ký, đăng nhập, LocalStorage người dùng |
| `feature/products-thanh` | H. Thành | Dữ liệu PC, danh sách sản phẩm, tìm kiếm, lọc |
| `feature/cart-checkout-tai-anh` | H. Tài, T. Anh | Chi tiết sản phẩm, giỏ hàng, thanh toán |
| `feature/news-about-hanh` | H. Anh | Giới thiệu, tin tức, chi tiết tin tức |
| `fix/final-testing` | Cả nhóm | Kiểm thử, sửa lỗi, responsive |
| `docs/report` | Cả nhóm | Báo cáo, hình ảnh minh họa, tài liệu |

---

## 3. Quy ước commit

Cấu trúc commit:

```text
type: nội dung thay đổi
feat: create homepage layout
feat: add login page
fix: repair cart total price
docs: update project report
style: update responsive homepage

## Quy tắc Pull Request

Khi hoàn thành một phần việc, thành viên không được merge trực tiếp vào `main`.  
Mỗi thành viên cần tạo Pull Request từ branch cá nhân vào branch `main`.

### Yêu cầu trước khi tạo Pull Request

- Code đúng phần việc được phân công.
- Không làm hỏng giao diện hoặc chức năng của người khác.
- Đã tự kiểm tra trang mình làm.
- Không có lỗi JavaScript trong Console.
- Link điều hướng hoạt động đúng.
- Giao diện hiển thị tốt trên desktop và mobile.
- Nếu có chỉnh file dùng chung như `style.css`, `data.js`, `ui.js` thì phải báo nhóm.

### Nội dung Pull Request cần có

Mỗi Pull Request cần ghi rõ:

- Đã làm chức năng gì.
- Đã sửa những file nào.
- Cách kiểm tra.
- Còn lỗi hoặc phần chưa hoàn thiện không.
- Ảnh chụp màn hình nếu có giao diện.

### Quy tắc merge

- Không tự merge Pull Request của mình nếu chưa được kiểm tra.
- Ít nhất một thành viên khác hoặc nhóm trưởng phải xem lại.
- Nếu có góp ý thì phải sửa trước khi merge.
- Sau khi merge xong, cập nhật trạng thái task trong Project Board.
