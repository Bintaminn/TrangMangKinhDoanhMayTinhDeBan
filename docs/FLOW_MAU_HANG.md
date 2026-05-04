# FLOW MUA HÀNG - BINTAMIN PC

## 1. OVERVIEW
Hệ thống mua hàng BINTAMIN PC bao gồm 3 trang chính:
- **product-detail.html**: Xem chi tiết sản phẩm
- **cart.html**: Quản lý giỏ hàng
- **checkout.html**: Thanh toán và xác nhận đơn hàng

Dữ liệu được truyền qua **localStorage** (không có backend server).

---

## 2. CHI TIẾT CÁC TRANG

### 2.1 Trang Chi Tiết Sản Phẩm (product-detail.html)

#### Chức năng:
- Hiển thị thông tin chi tiết sản phẩm: hình ảnh, tên, mô tả, giá, cấu hình kỹ thuật
- Nút "Thêm vào giỏ": Thêm sản phẩm vào giỏ hàng (số lượng = 1)
- Nút "Mua ngay": Thêm vào giỏ và redirect tới thanh toán

#### Link truy cập:
- Từ index.html: Mỗi card sản phẩm có nút "Thêm giỏ" và "Mua ngay"
- Từ pages/products.html: Mỗi card sản phẩm có link `href="product-detail.html?slug=[SLUG]"`

#### Rendering:
```javascript
renderProductDetail() // In products.js
// Lấy slug từ URL param: ?slug=bintamin-gaming-one-12
// Gọi getProductBySlug(slug) lấy dữ liệu từ data.js
// Sinh HTML hiển thị thông tin
```

---

### 2.2 Trang Giỏ Hàng (cart.html)

#### Chức năng:
- **Hiển thị danh sách sản phẩm** trong giỏ:
  - Hình ảnh, tên, danh mục, giá
  - Ô nhập số lượng (có thể chỉnh sửa)
  - Tổng tiền từng dòng
  - Nút Xóa từng sản phẩm

- **Tính toán tổng tiền**:
  - cartTotal() = tổng (giá × số lượng) của tất cả sản phẩm
  
- **Các hành động**:
  - updateQuantity(productId, qty): Cập nhật số lượng từng sản phẩm
  - removeFromCart(productId): Xóa sản phẩm khỏi giỏ
  - Nút "Thanh toán": Redirect tới checkout.html
  - Nút "Tiếp tục mua": Redirect tới products.html

#### Trạng thái giỏ hàng trống:
- Hiển thị thông báo + nút "Xem sản phẩm" (link tới products.html)

#### localStorage:
```
Key: "bintamin_cart"
Value: [
  { id: 1, quantity: 2 },
  { id: 3, quantity: 1 },
  ...
]
```

---

### 2.3 Trang Thanh Toán (checkout.html)

#### Chức năng:
- **Form nhập thông tin người dùng**:
  - Họ tên (bắt buộc)
  - Số điện thoại (bắt buộc)
  - Địa chỉ nhận hàng (bắt buộc)
  - Ghi chú đơn hàng (không bắt buộc)

- **Hiển thị tóm tắt đơn hàng**:
  - Danh sách sản phẩm (tên × số lượng = tổng tiền)
  - Tổng cộng (tính từ cartTotal())

- **Nút "Xác nhận đặt hàng"**:
  1. Kiểm tra thông tin yêu cầu đủ
  2. Kiểm tra giỏ hàng không trống
  3. Tạo đối tượng order lưu vào localStorage
  4. Xóa giỏ hàng
  5. Hiển thị popup với mã đơn hàng
  6. Redirect về trang chủ

#### localStorage:
```
Key: "bintamin_orders"
Value: [
  {
    id: "ORD-1652836400000",
    timestamp: "5/5/2026, 10:00:00 AM",
    customer: {
      name: "Nguyễn Văn A",
      phone: "0901234567",
      address: "123 Đường ABC, TP.HCM",
      notes: "Giao vào giờ hành chính"
    },
    items: [
      { product: {...}, quantity: 2, total: 51000000 },
      ...
    ],
    total: 51000000,
    status: "Đang xử lý"
  },
  ...
]
```

---

## 3. CÁC HÀM CHÍNH

### 3.1 cart.js
```javascript
addToCart(productId, quantity=1)        // Thêm sản phẩm vào giỏ
removeFromCart(productId)               // Xóa sản phẩm khỏi giỏ
updateQuantity(productId, quantity)     // Cập nhật số lượng
cartDetails()                            // Lấy chi tiết giỏ (product + qty + total)
cartTotal()                              // Tính tổng tiền giỏ
renderCart()                             // Render HTML giỏ hàng
```

### 3.2 checkout.js
```javascript
getOrders()                              // Lấy danh sách đơn hàng từ localStorage
saveOrders(orders)                       // Lưu danh sách đơn hàng vào localStorage
renderCheckout()                         // Render HTML tóm tắt đơn hàng
placeOrder()                             // Xử lý đặt hàng và lưu vào localStorage
```

### 3.3 storage.js (hỗ trợ)
```javascript
getCart()                                // Lấy giỏ hàng từ localStorage
saveCart(cart)                           // Lưu giỏ hàng vào localStorage
clearCart()                              // Xóa toàn bộ giỏ hàng
```

### 3.4 data.js (dữ liệu)
```javascript
PRODUCTS                                 // Mảng danh sách sản phẩm
getProductBySlug(slug)                   // Lấy sản phẩm theo slug
formatPrice(value)                       // Format giá tiền VND
```

---

## 4. FLOW MUA HÀNG HOÀN CHỈNH

### Kịch bản 1: Từ Trang Chủ (index.html)
```
1. User xem danh sách sản phẩm nổi bật
2. Click "Thêm giỏ" → addToCart(id) → lưu vào localStorage
3. Click "Mua ngay" → addToCart(id) + redirect checkout.html
4. Nhập thông tin + Click "Xác nhận đặt hàng"
5. Đơn hàng được lưu, giỏ hàng xóa, redirect index.html + hiển thị mã đơn hàng
```

### Kịch bản 2: Từ Trang Sản Phẩm (pages/products.html)
```
1. User tìm kiếm / lọc sản phẩm
2. Click vào card sản phẩm → product-detail.html?slug=...
3. Xem chi tiết sản phẩm
4. Click "Thêm vào giỏ" → addToCart(id) + alert
5. Click "Mua ngay" → addToCart(id) + redirect checkout.html
6. (Tiếp tục như Kịch bản 1)
```

### Kịch bản 3: Quản lý Giỏ Hàng
```
1. User click icon giỏ hàng (top-right) → cart.html
2. Xem danh sách sản phẩm trong giỏ
3. Có thể:
   a) Thay đổi số lượng → updateQuantity() → renderCart()
   b) Xóa sản phẩm → removeFromCart() → renderCart()
   c) Click "Thanh toán" → checkout.html
   d) Click "Tiếp tục mua" → products.html (continue shopping)
```

---

## 5. CƠ CHẾ LƯU TRỮ DỮ LIỆU

### localStorage Keys:
| Key | Mô tả | Cấu trúc |
|-----|-------|---------|
| `bintamin_cart` | Giỏ hàng hiện tại | `[{id, quantity}, ...]` |
| `bintamin_orders` | Lịch sử đơn hàng | `[{id, timestamp, customer, items, total, status}, ...]` |
| `bintamin_users` | Danh sách tài khoản | `[{email, password}, ...]` |
| `bintamin_current_user` | User đang đăng nhập | `{email, password}` hoặc `null` |

### Luồng dữ liệu:
```
User Action → JavaScript Event → Modify Data in Memory
                                   ↓
                            Update localStorage
                                   ↓
                            Re-render HTML (DOM)
                                   ↓
                         Update Visual Display
```

---

## 6. KIỂM TRA VÀ TESTING

### Test Flow Cơ Bản:
1. ✓ Mở index.html → Thêm sản phẩm → Xem giỏ (cart.html)
2. ✓ Thay đổi số lượng → Xóa sản phẩm → Tính tổng tiền
3. ✓ Click "Thanh toán" → Nhập thông tin → Xác nhận
4. ✓ Check localStorage → Có `bintamin_orders` mới
5. ✓ Refresh trang → Giỏ hàng sạch, về trang chủ

### Test Edge Cases:
1. ✓ Giỏ hàng trống → Xem cart.html → Hiển thị thông báo
2. ✓ Thanh toán từ giỏ hàng trống → Alert "Giỏ hàng đang trống"
3. ✓ Form không đầy đủ → Alert "Vui lòng nhập đầy đủ thông tin"
4. ✓ Quantity <= 0 → Update lại = 1
5. ✓ Product không tồn tại → Fallback PRODUCTS[0]

---

## 7. CÁC TẮC VỤ CẢI THIỆN (Optional)

- [ ] Thêm tính năng "Nhập mã giảm giá"
- [ ] Thêm tính năng "Lưu sản phẩm yêu thích"
- [ ] Thêm trang "Đơn hàng của tôi" (order history)
- [ ] Thêm tính năng filter / sort nâng cao
- [ ] Thêm hình thức thanh toán (credit card, e-wallet)
- [ ] Thêm notification / email xác nhận đơn hàng
- [ ] Tích hợp backend API thay vì localStorage

---

**Cập nhật cuối:** 5 Tháng 5 Năm 2026  
**Trạng thái:** ✓ HOÀN THÀNH

