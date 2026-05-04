const ORDERS_KEY = 'bintamin_orders';

function getOrders() { 
  return readJSON(ORDERS_KEY, []); 
}

function saveOrders(orders) { 
  writeJSON(ORDERS_KEY, orders); 
}

function renderCheckout() {
  var box = document.getElementById('checkoutItems');
  var total = document.getElementById('checkoutTotal');
  if (!box) return;
  var lines = cartDetails();
  if (!lines.length) {
    box.innerHTML = '<p class="text-muted mb-0">Chưa có sản phẩm trong giỏ hàng.</p>';
    if (total) total.textContent = formatPrice(0);
    return;
  }
  box.innerHTML = lines.map(function (line) {
    return '<div class="d-flex justify-content-between border-bottom border-secondary py-2"><span class="text-white">' + line.product.name + ' x ' + line.quantity + '</span><span class="text-cyan">' + formatPrice(line.total) + '</span></div>';
  }).join('');
  if (total) total.textContent = formatPrice(cartTotal());
}

function placeOrder() {
  var required = ['customerName', 'customerPhone', 'customerAddress'];
  var ok = required.every(function (id) { var el = document.getElementById(id); return el && el.value.trim(); });
  if (!ok) { alert('Vui lòng nhập đầy đủ thông tin nhận hàng.'); return; }
  
  var cartItems = cartDetails();
  if (!cartItems.length) { alert('Giỏ hàng đang trống.'); return; }
  
  // Lấy thông tin từ form
  var customerInfo = {
    name: document.getElementById('customerName').value.trim(),
    phone: document.getElementById('customerPhone').value.trim(),
    address: document.getElementById('customerAddress').value.trim(),
    notes: (document.querySelector('textarea') || {}).value || ''
  };
  
  // Tạo đơn hàng mới
  var order = {
    id: 'ORD-' + Date.now(),
    timestamp: new Date().toLocaleString('vi-VN'),
    customer: customerInfo,
    items: cartItems,
    total: cartTotal(),
    status: 'Đang xử lý'
  };
  
  // Lưu đơn hàng vào localStorage
  var orders = getOrders();
  orders.push(order);
  saveOrders(orders);
  
  // Xóa giỏ hàng
  clearCart();
  
  alert('Đặt hàng thành công!\nMã đơn hàng: ' + order.id + '\nCảm ơn bạn đã mua hàng tại BINTAMIN PC.');
  window.location.href = '../index.html';
}

document.addEventListener('DOMContentLoaded', renderCheckout);
