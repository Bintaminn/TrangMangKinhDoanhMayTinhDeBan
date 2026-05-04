function addToCart(productId, quantity) {
  var product = PRODUCTS.find(function (item) { return item.id === Number(productId); });
  if (!product) return;
  var cart = getCart();
  var found = cart.find(function (item) { return item.id === product.id; });
  if (found) found.quantity += Number(quantity || 1);
  else cart.push({ id: product.id, quantity: Number(quantity || 1) });
  saveCart(cart);
  alert('Đã thêm "' + product.name + '" vào giỏ hàng.');
}

function removeFromCart(productId) {
  saveCart(getCart().filter(function (item) { return item.id !== Number(productId); }));
  renderCart();
}

function updateQuantity(productId, quantity) {
  var cart = getCart();
  var item = cart.find(function (entry) { return entry.id === Number(productId); });
  if (item) item.quantity = Math.max(1, Number(quantity || 1));
  saveCart(cart);
  renderCart();
}

function cartDetails() {
  return getCart().map(function (item) {
    var product = PRODUCTS.find(function (p) { return p.id === item.id; });
    return product ? { product: product, quantity: item.quantity, total: product.price * item.quantity } : null;
  }).filter(Boolean);
}

function cartTotal() {
  return cartDetails().reduce(function (sum, line) { return sum + line.total; }, 0);
}

function renderCart() {
  var box = document.getElementById('cartList');
  var totalBox = document.getElementById('cartTotal');
  if (!box) return;
  var lines = cartDetails();
  if (!lines.length) {
    box.innerHTML = '<div class="content-card text-center"><h5 class="text-white">Giỏ hàng đang trống</h5><p class="text-muted">Hãy chọn một cấu hình PC phù hợp với nhu cầu của bạn.</p><a class="btn btn-cyan" href="products.html">Xem sản phẩm</a></div>';
    if (totalBox) totalBox.textContent = formatPrice(0);
    return;
  }
  box.innerHTML = lines.map(function (line) {
    return '<div class="cart-line mb-3">' +
      '<div class="row align-items-center g-3">' +
      '<div class="col-md-2"><img class="img-fluid rounded" src="../assets/images/' + line.product.image + '" alt="' + line.product.name + '"></div>' +
      '<div class="col-md-4"><h6 class="text-white fw-bold mb-1">' + line.product.name + '</h6><small class="text-muted">' + line.product.category + '</small></div>' +
      '<div class="col-md-2 text-cyan fw-bold">' + formatPrice(line.product.price) + '</div>' +
      '<div class="col-md-2"><input class="form-control bg-dark text-white border-secondary qty-control" type="number" min="1" value="' + line.quantity + '" onchange="updateQuantity(' + line.product.id + ', this.value)"></div>' +
      '<div class="col-md-1 text-white fw-bold">' + formatPrice(line.total) + '</div>' +
      '<div class="col-md-1 text-md-end"><button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(' + line.product.id + ')">Xóa</button></div>' +
      '</div></div>';
  }).join('');
  if (totalBox) totalBox.textContent = formatPrice(cartTotal());
}

document.addEventListener('DOMContentLoaded', renderCart);
