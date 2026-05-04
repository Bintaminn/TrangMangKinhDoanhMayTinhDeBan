function productCard(product, linkPrefix) {
  linkPrefix = linkPrefix || '';
  return '<div class="col-lg-3 col-md-6">' +
    '<div class="product-card">' +
    (product.badge ? '<span class="badge bg-danger position-absolute top-0 start-0 m-3">' + product.badge + '</span>' : '') +
    '<a class="product-link" href="' + linkPrefix + 'product-detail.html?slug=' + product.slug + '">' +
    '<img src="../assets/images/' + product.image + '" class="img-fluid p-3" alt="' + product.name + '">' +
    '<h6 class="fw-bold text-white mt-2">' + product.name + '</h6>' +
    '<h5 class="price mb-0">' + formatPrice(product.price) + (product.oldPrice ? ' <small class="text-muted text-decoration-line-through fs-6">' + formatPrice(product.oldPrice) + '</small>' : '') + '</h5>' +
    '<div class="specs mt-3 text-muted small"><div class="row g-2">' + product.specs.map(function (s) { return '<div class="col-6">• ' + s + '</div>'; }).join('') + '</div></div>' +
    '</a>' +
    '<div class="d-flex gap-2 mt-3"><button class="btn btn-outline-cyan w-50 btn-sm" onclick="addToCart(' + product.id + ')">Thêm giỏ</button><a class="btn btn-cyan w-50 btn-sm text-dark fw-bold" href="checkout.html" onclick="addToCart(' + product.id + ')">Mua ngay</a></div>' +
    '</div></div>';
}

function renderProducts() {
  var grid = document.getElementById('productGrid');
  if (!grid) return;
  var keywordInput = document.getElementById('searchProduct');
  var categorySelect = document.getElementById('filterCategory');
  function apply() {
    var keyword = (keywordInput ? keywordInput.value : '').toLowerCase();
    var category = categorySelect ? categorySelect.value : '';
    var filtered = PRODUCTS.filter(function (product) {
      return (!keyword || product.name.toLowerCase().includes(keyword) || product.specs.join(' ').toLowerCase().includes(keyword)) && (!category || product.category.includes(category));
    });
    grid.innerHTML = filtered.map(function (p) { return productCard(p, ''); }).join('') || '<div class="col-12"><div class="content-card text-center text-muted">Không tìm thấy sản phẩm phù hợp.</div></div>';
  }
  if (keywordInput) keywordInput.addEventListener('input', apply);
  if (categorySelect) categorySelect.addEventListener('change', apply);
  apply();
}

function renderProductDetail() {
  var box = document.getElementById('productDetail');
  if (!box) return;
  var slug = new URLSearchParams(window.location.search).get('slug');
  var product = getProductBySlug(slug);
  box.innerHTML = '<div class="row g-5 align-items-center">' +
    '<div class="col-lg-6"><div class="content-card text-center"><img class="img-fluid" src="../assets/images/' + product.image + '" alt="' + product.name + '"></div></div>' +
    '<div class="col-lg-6"><span class="badge badge-soft mb-3">' + product.category + '</span><h1 class="text-white fw-bold">' + product.name + '</h1><p class="text-muted">' + product.description + '</p><h2 class="text-cyan fw-bold mb-3">' + formatPrice(product.price) + '</h2>' +
    '<ul class="text-muted">' + product.specs.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>' +
    '<div class="d-flex gap-3 mt-4"><button class="btn btn-outline-cyan px-4" onclick="addToCart(' + product.id + ')">Thêm vào giỏ</button><a class="btn btn-cyan text-dark fw-bold px-4" href="checkout.html" onclick="addToCart(' + product.id + ')">Mua ngay</a></div></div>' +
    '</div>';
}

document.addEventListener('DOMContentLoaded', function () { renderProducts(); renderProductDetail(); });
