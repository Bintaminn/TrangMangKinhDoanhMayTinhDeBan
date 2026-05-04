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
  if (!cartDetails().length) { alert('Giỏ hàng đang trống.'); return; }
  clearCart();
  alert('Đặt hàng thành công! Cảm ơn bạn đã mua hàng tại BINTAMIN PC.');
  window.location.href = '../index.html';
}
document.addEventListener('DOMContentLoaded', renderCheckout);
