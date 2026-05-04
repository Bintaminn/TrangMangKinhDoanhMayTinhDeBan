# CHƯƠNG 3: CHI TIẾT SẢN PHẨM, GIỎ HÀNG, THANH TOÁN

## I. CHI TIẾT SẢN PHẨM (Page: product-detail.html)

### 1. Chức Năng
Trang chi tiết sản phẩm cho phép người dùng:
- Xem thông tin đầy đủ về một sản phẩm PC cụ thể
- Xem hình ảnh sản phẩm
- Xem cấu hình kỹ thuật chi tiết
- Xem giá cả
- Thêm sản phẩm vào giỏ hàng
- Mua ngay (thêm vào giỏ + chuyển sang thanh toán)

### 2. Cách Truy Cập
**Từ trang chủ (index.html)**:
- Click nút "Mua ngay" của bất kỳ sản phẩm nào → `addToCart(id)` + redirect `pages/checkout.html`
- Click nút "Thêm giỏ" → `addToCart(id)` + alert thành công

**Từ trang sản phẩm (pages/products.html)**:
- Click vào card sản phẩm → `product-detail.html?slug=[SLUG]`
- Slug lấy từ data.js, ví dụ: `?slug=bintamin-gaming-one-12`

### 3. Cấu Trúc HTML

```html
<!-- Phần hiển thị chi tiết -->
<div id="productDetail">
  <!-- Được render bởi JavaScript -->
  <div class="row g-5 align-items-center">
    <div class="col-lg-6">
      <!-- Hình ảnh sản phẩm -->
      <img class="img-fluid" src="assets/images/[IMAGE]">
    </div>
    <div class="col-lg-6">
      <!-- Thông tin sản phẩm -->
      <h1>Tên sản phẩm</h1>
      <p>Mô tả</p>
      <h2>Giá tiền</h2>
      <ul>
        <li>Cấu hình 1</li>
        <li>Cấu hình 2</li>
      </ul>
      <!-- Nút hành động -->
      <button onclick="addToCart(id)">Thêm vào giỏ</button>
      <a href="checkout.html" onclick="addToCart(id)">Mua ngay</a>
    </div>
  </div>
</div>
```

### 4. Hàm JavaScript (products.js)

```javascript
// Render chi tiết sản phẩm
function renderProductDetail() {
  var box = document.getElementById('productDetail');
  if (!box) return;
  
  // Lấy slug từ URL: ?slug=bintamin-gaming-one-12
  var slug = new URLSearchParams(window.location.search).get('slug');
  var product = getProductBySlug(slug);  // Từ data.js
  
  // Sinh HTML từ dữ liệu
  box.innerHTML = '<div class="row g-5 align-items-center">' +
    '<div class="col-lg-6">...' +  // Hình ảnh
    '<div class="col-lg-6">...' +  // Thông tin
    '</div>';
}

// Chạy khi trang load
document.addEventListener('DOMContentLoaded', renderProductDetail);
```

### 5. Dữ Liệu Sản Phẩm (data.js)

```javascript
const PRODUCTS = [
  {
    id: 1,
    slug: 'bintamin-gaming-one-12',
    name: 'BINTAMIN GAMING ONE 12',
    category: 'PC Gaming',
    price: 25500000,
    oldPrice: 30000000,
    image: 'image6.jpg',
    badge: '-15%',
    specs: [
      'Core i5-13400F',
      'RTX 4060 Ti 8GB',
      '16GB DDR5',
      '500GB NVMe'
    ],
    description: 'Cấu hình gaming tối ưu cho e-sport, học tập...'
  },
  // ... các sản phẩm khác
];
```

### 6. Flow Tương Tác

```
URL: product-detail.html?slug=bintamin-gaming-one-12
     ↓
JavaScript event: DOMContentLoaded
     ↓
Function: renderProductDetail()
     ↓
getProductBySlug('bintamin-gaming-one-12')  [Từ data.js]
     ↓
PRODUCTS.find(item => item.slug === slug)  [GET product object]
     ↓
Generate HTML + Render DOM
     ↓
User interaction: Click "Thêm vào giỏ"
     ↓
addToCart(1)  [From cart.js]
     ↓
localStorage: bintamin_cart = [{id: 1, quantity: 1}]
     ↓
Alert: "Đã thêm sản phẩm vào giỏ hàng"
```

---

## II. GIỎ HÀNG (Page: cart.html)

### 1. Chức Năng
Trang giỏ hàng cho phép người dùng:
- Xem danh sách sản phẩm trong giỏ
- Chỉnh sửa số lượng từng sản phẩm
- Xóa sản phẩm khỏi giỏ
- Xem tổng tiền hàng
- Tiến hành thanh toán
- Tiếp tục mua sắm

### 2. Cách Truy Cập
- Click icon 🛒 giỏ hàng (top-right navbar) → `cart.html`
- Click nút "Thanh toán" từ trang chủ (nếu có giỏ hàng)
- Click nút "Xem giỏ hàng" sau khi thêm sản phẩm

### 3. Cấu Trúc HTML

```html
<div class="row g-4">
  <!-- Cột trái: Danh sách sản phẩm (70%) -->
  <div class="col-lg-8">
    <div id="cartList">
      <!-- Được render bởi JavaScript -->
      <div class="cart-line mb-3">
        <div class="row align-items-center g-3">
          <div class="col-md-2">
            <img class="img-fluid rounded" src="...">
          </div>
          <div class="col-md-4">
            <h6 class="text-white fw-bold">Tên sản phẩm</h6>
            <small class="text-muted">Danh mục</small>
          </div>
          <div class="col-md-2 text-cyan fw-bold">Giá: 25.5M đ</div>
          <div class="col-md-2">
            <input type="number" min="1" value="1" 
              onchange="updateQuantity(id, this.value)">
          </div>
          <div class="col-md-1 text-white fw-bold">Tổng: 51M đ</div>
          <div class="col-md-1">
            <button onclick="removeFromCart(id)">Xóa</button>
          </div>
        </div>
      </div>
      <!-- ... Các sản phẩm khác -->
    </div>
  </div>

  <!-- Cột phải: Tóm tắt đơn hàng (30%) -->
  <div class="col-lg-4">
    <div class="checkout-box sticky-top">
      <h5 class="text-white fw-bold">Tổng đơn hàng</h5>
      <div class="d-flex justify-content-between py-3 border-bottom border-secondary">
        <span class="text-muted">Tạm tính</span>
        <strong id="cartTotal" class="text-cyan">51.000.000đ</strong>
      </div>
      <a href="checkout.html" class="btn btn-cyan text-dark fw-bold w-100 mt-3">
        Thanh toán
      </a>
      <a href="products.html" class="btn btn-outline-cyan w-100 mt-2">
        Tiếp tục mua
      </a>
    </div>
  </div>
</div>
```

### 4. Các Hàm JavaScript (cart.js)

#### a) Thêm vào giỏ hàng
```javascript
function addToCart(productId, quantity) {
  // Lấy sản phẩm từ PRODUCTS
  var product = PRODUCTS.find(item => item.id === Number(productId));
  if (!product) return;
  
  // Lấy giỏ hàng hiện tại
  var cart = getCart();
  
  // Kiểm tra sản phẩm đã có trong giỏ chưa
  var found = cart.find(item => item.id === product.id);
  
  if (found) {
    // Nếu có: tăng số lượng
    found.quantity += Number(quantity || 1);
  } else {
    // Nếu chưa: thêm mới
    cart.push({ id: product.id, quantity: Number(quantity || 1) });
  }
  
  // Lưu giỏ hàng vào localStorage
  saveCart(cart);
  
  // Hiển thị thông báo
  alert('Đã thêm "' + product.name + '" vào giỏ hàng.');
}
```

#### b) Xóa khỏi giỏ hàng
```javascript
function removeFromCart(productId) {
  // Lọc bỏ sản phẩm khỏi giỏ
  saveCart(getCart().filter(item => item.id !== Number(productId)));
  
  // Render lại giỏ hàng
  renderCart();
}
```

#### c) Cập nhật số lượng
```javascript
function updateQuantity(productId, quantity) {
  var cart = getCart();
  var item = cart.find(entry => entry.id === Number(productId));
  
  if (item) {
    // Đảm bảo số lượng >= 1
    item.quantity = Math.max(1, Number(quantity || 1));
  }
  
  // Lưu giỏ và render
  saveCart(cart);
  renderCart();
}
```

#### d) Lấy chi tiết giỏ hàng
```javascript
function cartDetails() {
  return getCart().map(function (item) {
    // Tìm thông tin sản phẩm
    var product = PRODUCTS.find(p => p.id === item.id);
    
    // Trả về object chứa product, qty, và tổng tiền
    return product ? { 
      product: product, 
      quantity: item.quantity, 
      total: product.price * item.quantity 
    } : null;
  }).filter(Boolean);
}
```

#### e) Tính tổng tiền giỏ
```javascript
function cartTotal() {
  return cartDetails().reduce(function (sum, line) { 
    return sum + line.total; 
  }, 0);
}
```

#### f) Render HTML giỏ hàng
```javascript
function renderCart() {
  var box = document.getElementById('cartList');
  var totalBox = document.getElementById('cartTotal');
  
  if (!box) return;
  
  var lines = cartDetails();
  
  // Nếu giỏ trống
  if (!lines.length) {
    box.innerHTML = '<div class="content-card text-center">' +
      '<h5 class="text-white">Giỏ hàng đang trống</h5>' +
      '<p class="text-muted">Hãy chọn một cấu hình PC phù hợp</p>' +
      '<a class="btn btn-cyan" href="products.html">Xem sản phẩm</a>' +
      '</div>';
    if (totalBox) totalBox.textContent = formatPrice(0);
    return;
  }
  
  // Sinh HTML từng dòng sản phẩm
  box.innerHTML = lines.map(function (line) {
    return '<div class="cart-line mb-3">' +
      // ... (HTML chi tiết như trên)
      '</div>';
  }).join('');
  
  // Cập nhật tổng tiền
  if (totalBox) totalBox.textContent = formatPrice(cartTotal());
}

// Render khi trang load
document.addEventListener('DOMContentLoaded', renderCart);
```

### 5. localStorage - Giỏ Hàng

```javascript
// Key: bintamin_cart
// Value: [
//   { id: 1, quantity: 2 },
//   { id: 3, quantity: 1 }
// ]

function getCart() { 
  return readJSON('bintamin_cart', []); 
}

function saveCart(cart) { 
  writeJSON('bintamin_cart', cart); 
  updateCartCount();  // Cập nhật số lượng badge
}

function clearCart() { 
  saveCart([]); 
}
```

### 6. Flow Tương Tác

```
User opens cart.html
     ↓
DOMContentLoaded event triggered
     ↓
renderCart() function called
     ↓
Get cart from localStorage: getCart()
     ↓
For each item in cart:
  - Find product in PRODUCTS
  - Calculate total (price × quantity)
  - Generate HTML row
     ↓
Render HTML to #cartList
     ↓
Update total: cartTotal() → formatPrice() → display
     ↓
User interaction:
  ├─ Change quantity: updateQuantity()
  ├─ Remove item: removeFromCart()
  ├─ Click Checkout: redirect checkout.html
  └─ Click Continue: redirect products.html
```

---

## III. THANH TOÁN (Page: checkout.html)

### 1. Chức Năng
Trang thanh toán cho phép người dùng:
- Nhập thông tin giao hàng (tên, SĐT, địa chỉ)
- Xem tóm tắt đơn hàng
- Xác nhận đặt hàng
- Lưu đơn hàng vào lịch sử

### 2. Cách Truy Cập
- Từ trang chủ: Click "Mua ngay" trên sản phẩm → `checkout.html`
- Từ giỏ hàng: Click "Thanh toán" → `checkout.html`
- Direct URL: `pages/checkout.html`

### 3. Cấu Trúc HTML

```html
<div class="row g-4">
  <!-- Cột trái: Form thông tin (60%) -->
  <div class="col-lg-7">
    <div class="content-card form-dark">
      <h4 class="text-white fw-bold mb-3">Thông tin nhận hàng</h4>
      
      <!-- Họ tên -->
      <input id="customerName" class="form-control mb-3" 
        placeholder="Họ tên">
      
      <!-- Số điện thoại -->
      <input id="customerPhone" class="form-control mb-3" 
        placeholder="Số điện thoại">
      
      <!-- Địa chỉ -->
      <input id="customerAddress" class="form-control mb-3" 
        placeholder="Địa chỉ nhận hàng">
      
      <!-- Ghi chú -->
      <textarea class="form-control mb-3" rows="4" 
        placeholder="Ghi chú đơn hàng"></textarea>
      
      <!-- Nút xác nhận -->
      <button class="btn btn-cyan text-dark fw-bold" 
        onclick="placeOrder()">Xác nhận đặt hàng</button>
    </div>
  </div>

  <!-- Cột phải: Tóm tắt (40%) -->
  <div class="col-lg-5">
    <div class="checkout-box">
      <h4 class="text-white fw-bold">Đơn hàng</h4>
      
      <div id="checkoutItems" class="my-3">
        <!-- Được render bởi JavaScript -->
        <div class="d-flex justify-content-between border-bottom border-secondary py-2">
          <span class="text-white">Tên sản phẩm x Số lượng</span>
          <span class="text-cyan">Tổng tiền</span>
        </div>
        <!-- ... Các dòng sản phẩm khác -->
      </div>
      
      <div class="d-flex justify-content-between pt-3 border-top border-secondary">
        <span class="text-white fw-bold">Tổng cộng</span>
        <strong id="checkoutTotal" class="text-cyan fs-5">51.000.000đ</strong>
      </div>
    </div>
  </div>
</div>
```

### 4. Các Hàm JavaScript (checkout.js)

#### a) Lấy/Lưu đơn hàng
```javascript
const ORDERS_KEY = 'bintamin_orders';

function getOrders() { 
  return readJSON(ORDERS_KEY, []); 
}

function saveOrders(orders) { 
  writeJSON(ORDERS_KEY, orders); 
}
```

#### b) Render tóm tắt đơn hàng
```javascript
function renderCheckout() {
  var box = document.getElementById('checkoutItems');
  var total = document.getElementById('checkoutTotal');
  
  if (!box) return;
  
  var lines = cartDetails();  // Từ cart.js
  
  // Nếu giỏ trống
  if (!lines.length) {
    box.innerHTML = '<p class="text-muted mb-0">Chưa có sản phẩm trong giỏ hàng.</p>';
    if (total) total.textContent = formatPrice(0);
    return;
  }
  
  // Sinh HTML từng dòng
  box.innerHTML = lines.map(function (line) {
    return '<div class="d-flex justify-content-between border-bottom border-secondary py-2">' +
      '<span class="text-white">' + line.product.name + ' x ' + line.quantity + '</span>' +
      '<span class="text-cyan">' + formatPrice(line.total) + '</span>' +
      '</div>';
  }).join('');
  
  // Cập nhật tổng
  if (total) total.textContent = formatPrice(cartTotal());
}

document.addEventListener('DOMContentLoaded', renderCheckout);
```

#### c) Xác nhận đặt hàng
```javascript
function placeOrder() {
  // 1. Kiểm tra thông tin bắt buộc
  var required = ['customerName', 'customerPhone', 'customerAddress'];
  var ok = required.every(function (id) { 
    var el = document.getElementById(id); 
    return el && el.value.trim(); 
  });
  
  if (!ok) { 
    alert('Vui lòng nhập đầy đủ thông tin nhận hàng.'); 
    return; 
  }
  
  // 2. Kiểm tra giỏ hàng có sản phẩm không
  var cartItems = cartDetails();
  if (!cartItems.length) { 
    alert('Giỏ hàng đang trống.'); 
    return; 
  }
  
  // 3. Thu thập thông tin khách hàng
  var customerInfo = {
    name: document.getElementById('customerName').value.trim(),
    phone: document.getElementById('customerPhone').value.trim(),
    address: document.getElementById('customerAddress').value.trim(),
    notes: (document.querySelector('textarea') || {}).value || ''
  };
  
  // 4. Tạo đối tượng đơn hàng
  var order = {
    id: 'ORD-' + Date.now(),                    // Mã đơn hàng unique
    timestamp: new Date().toLocaleString('vi-VN'),  // Thời gian
    customer: customerInfo,                      // Thông tin KH
    items: cartItems,                            // Danh sách sản phẩm
    total: cartTotal(),                          // Tổng tiền
    status: 'Đang xử lý'                        // Trạng thái
  };
  
  // 5. Lưu đơn hàng vào localStorage
  var orders = getOrders();
  orders.push(order);
  saveOrders(orders);
  
  // 6. Xóa giỏ hàng
  clearCart();
  
  // 7. Hiển thị thông báo + mã đơn hàng
  alert('Đặt hàng thành công!\n' +
    'Mã đơn hàng: ' + order.id + '\n' +
    'Cảm ơn bạn đã mua hàng tại BINTAMIN PC.');
  
  // 8. Quay về trang chủ
  window.location.href = '../index.html';
}
```

### 5. localStorage - Đơn Hàng

```javascript
// Key: bintamin_orders
// Value: [
//   {
//     id: "ORD-1652836400000",
//     timestamp: "5/5/2026, 10:00:00 AM",
//     customer: {
//       name: "Nguyễn Văn A",
//       phone: "0901234567",
//       address: "123 Đương ABC, TP.HCM",
//       notes: "Giao vào giờ hành chính"
//     },
//     items: [
//       {
//         product: {...},
//         quantity: 2,
//         total: 51000000
//       }
//     ],
//     total: 51000000,
//     status: "Đang xử lý"
//   }
// ]
```

### 6. Flow Tương Tác

```
User opens checkout.html
     ↓
DOMContentLoaded event triggered
     ↓
renderCheckout() called
     ↓
Get cart items: cartDetails()
     ↓
Render order summary to #checkoutItems
     ↓
Display total: cartTotal()
     ↓
User fills in form:
  - customerName
  - customerPhone
  - customerAddress
  - notes (optional)
     ↓
User clicks "Xác nhận đặt hàng"
     ↓
placeOrder() function called
     ↓
Validate:
  ├─ All required fields filled? ✓
  └─ Cart has items? ✓
     ↓
Create order object with:
  - Unique ID: ORD-[timestamp]
  - Current time
  - Customer info
  - Cart items
  - Total price
     ↓
Save to localStorage:
  getOrders() → push(order) → saveOrders()
     ↓
Clear cart:
  clearCart()
     ↓
Show success alert with order ID
     ↓
Redirect to index.html
```

---

## IV. KIỂM TRA CHẤT LƯỢNG (QA Testing)

### Test Case 1: Thêm sản phẩm từ trang chủ
```
1. Mở index.html
2. Click "Thêm giỏ" trên card sản phẩm
3. ✓ Alert "Đã thêm sản phẩm vào giỏ hàng"
4. ✓ Badge giỏ hàng tăng từ 0 → 1
5. Mở DevTools → Application → localStorage
6. ✓ bintamin_cart = [{id: 1, quantity: 1}]
```

### Test Case 2: Xem giỏ hàng
```
1. Từ trang chủ thêm 2 sản phẩm khác nhau
2. Click icon 🛒
3. ✓ cart.html render đúng:
   - Hình ảnh sản phẩm
   - Tên, danh mục, giá
   - Ô nhập số lượng
   - Button Xóa
4. ✓ Tổng tiền = giá1 × qty1 + giá2 × qty2
```

### Test Case 3: Cập nhật giỏ hàng
```
1. Ở cart.html, thay đổi số lượng sản phẩm từ 1 → 3
2. ✓ Tổng tiền dòng cập nhật
3. ✓ Tổng đơn hàng cập nhật
4. ✓ localStorage cập nhật: quantity = 3
```

### Test Case 4: Xóa khỏi giỏ
```
1. Ở cart.html, click "Xóa" trên sản phẩm thứ nhất
2. ✓ Dòng sản phẩm bị xóa khỏi HTML
3. ✓ Tổng đơn hàng cập nhật
4. ✓ localStorage cập nhật: item bị loại bỏ
5. ✓ Badge giỏ hàng giảm
```

### Test Case 5: Giỏ hàng trống
```
1. Xóa tất cả sản phẩm khỏi giỏ
2. ✓ Hiển thị "Giỏ hàng đang trống"
3. ✓ Button "Xem sản phẩm" link tới products.html
4. ✓ Bộ tính tóm tắt hiệu khề nhất 0đ
```

### Test Case 6: Thanh toán thành công
```
1. Thêm sản phẩm vào giỏ
2. Click "Thanh toán"
3. Nhập thông tin:
   - Họ tên: "Nguyễn Văn A"
   - SĐT: "0901234567"
   - Địa chỉ: "123 Đường A, TP.HCM"
   - Ghi chú: "Giao buổi sáng"
4. ✓ Tóm tắt đơn hàng hiển thị đúng
5. Click "Xác nhận đặt hàng"
6. ✓ Alert "Đặt hàng thành công! Mã đơn hàng: ORD-..."
7. ✓ Redirect về index.html
8. ✓ Giỏ hàng trống
9. ✓ localStorage:
   - bintamin_cart = []
   - bintamin_orders = [{...đơn hàng mới...}]
```

### Test Case 7: Thanh toán - Thiếu thông tin
```
1. Đến trang checkout
2. Chỉ nhập "Họ tên"
3. Click "Xác nhận đặt hàng"
4. ✓ Alert "Vui lòng nhập đầy đủ thông tin nhận hàng"
5. ✓ Form không submit
```

### Test Case 8: Thanh toán - Giỏ trống
```
1. Xóa toàn bộ giỏ hàng
2. Mở checkout.html
3. ✓ Hiển thị "Chưa có sản phẩm trong giỏ hàng"
4. ✓ Tổng cộng = 0đ
5. Nhập thông tin + Click "Xác nhận"
6. ✓ Alert "Giỏ hàng đang trống"
```

---

## V. CÔNG NGHỆ VÀ KIẾN TRÚC

### Stack Công Nghệ
- **Frontend**: HTML5, CSS3 (Bootstrap 5), JavaScript (Vanilla)
- **Storage**: HTML5 localStorage
- **Architecture**: Client-side MVC (Model-View-Controller)

### Luồng Dữ Liệu
```
Data Layer (data.js)
  ├─ PRODUCTS
  ├─ CATEGORIES
  └─ NEWS
       ↓
Storage Layer (storage.js)
  ├─ getCart() / saveCart()
  ├─ getOrders() / saveOrders()
  └─ getCurrentUser() / setCurrentUser()
       ↓
Business Logic (cart.js, checkout.js)
  ├─ addToCart()
  ├─ updateQuantity()
  ├─ removeFromCart()
  └─ placeOrder()
       ↓
Presentation Layer (HTML/CSS)
  ├─ product-detail.html
  ├─ cart.html
  └─ checkout.html
```

---

**Cập nhật:** 5 Tháng 5 Năm 2026  
**Phiên bản:** 1.0  
**Trạng thái:** ✓ Hoàn thành

