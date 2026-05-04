function updateCartCount() {
  var count = 0;
  try { count = getCart().reduce(function (sum, item) { return sum + Number(item.quantity || 0); }, 0); } catch (e) { count = 0; }
  document.querySelectorAll('#cartCount').forEach(function (el) { el.textContent = count; });
}
document.addEventListener('DOMContentLoaded', updateCartCount);
