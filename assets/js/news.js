function renderNews() {
  var grid = document.getElementById('newsGrid');
  if (!grid) return;
  grid.innerHTML = NEWS.map(function (item) {
    return '<div class="col-lg-4 col-md-6"><div class="news-card content-card">' +
      '<img src="../assets/images/' + item.image + '" class="img-fluid rounded-3 mb-3 w-100" alt="' + item.title + '">' +
      '<small class="text-cyan">' + item.date + '</small><h6 class="fw-bold text-white mt-2">' + item.title + '</h6><p class="text-muted small">' + item.summary + '</p>' +
      '<a href="news-detail.html?slug=' + item.slug + '" class="text-cyan text-decoration-none small fw-bold">XEM CHI TIẾT →</a></div></div>';
  }).join('');
}
function renderNewsDetail() {
  var box = document.getElementById('newsDetail');
  if (!box) return;
  var slug = new URLSearchParams(window.location.search).get('slug');
  var item = getNewsBySlug(slug);
  box.innerHTML = '<article class="content-card">' +
    '<img class="img-fluid rounded-3 mb-4 w-100" src="../assets/images/' + item.image + '" alt="' + item.title + '">' +
    '<small class="text-cyan">' + item.date + '</small><h1 class="text-white fw-bold mt-2">' + item.title + '</h1>' +
    '<p class="lead text-muted">' + item.summary + '</p><p class="text-muted">' + item.content + '</p>' +
    '<p class="text-muted">BINTAMIN PC luôn khuyến nghị khách hàng cân đối ngân sách, nhu cầu sử dụng thực tế và khả năng nâng cấp trước khi chọn cấu hình.</p>' +
    '</article>';
}
document.addEventListener('DOMContentLoaded', function () { renderNews(); renderNewsDetail(); });
