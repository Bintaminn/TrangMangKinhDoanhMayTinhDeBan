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
    specs: ['Core i5-13400F', 'RTX 4060 Ti 8GB', '16GB DDR5', '500GB NVMe'],
    description: 'Cấu hình gaming tối ưu cho e-sport, học tập và làm việc hằng ngày với chi phí hợp lý.'
  },
  {
    id: 2,
    slug: 'bintamin-black-xtreme',
    name: 'BINTAMIN BLACK XTREME',
    category: 'PC Gaming cao cấp',
    price: 65000000,
    oldPrice: null,
    image: 'image7.jpg',
    badge: 'HOT',
    specs: ['Core i9-14900K', 'RTX 4080 16GB', '32GB DDR5', '1TB NVMe Gen4'],
    description: 'Dàn máy cao cấp cho game AAA, livestream và sáng tạo nội dung chuyên nghiệp.'
  },
  {
    id: 3,
    slug: 'creator-pro-silver',
    name: 'CREATOR PRO SILVER',
    category: 'PC Đồ họa',
    price: 42500000,
    oldPrice: null,
    image: 'image8.avif',
    badge: 'NEW',
    specs: ['Ryzen 7 7700X', 'RTX 4070 Super', '32GB RAM', '1TB NVMe'],
    description: 'Cân bằng giữa hiệu năng render, dựng video, thiết kế đồ họa và độ ổn định lâu dài.'
  },
  {
    id: 4,
    slug: 'workstation-pro-max',
    name: 'WORKSTATION PRO MAX',
    category: 'Workstation',
    price: 125000000,
    oldPrice: null,
    image: 'image9.jpg',
    badge: 'PRO',
    specs: ['Threadripper', 'RTX 4090 24GB', '128GB RAM', '4TB NVMe'],
    description: 'Máy trạm chuyên sâu cho render 3D, AI, mô phỏng và khối lượng công việc nặng.'
  }
];

const CATEGORIES = [
  { name: 'PC Gaming', image: 'image2.avif', description: 'Tối ưu FPS, tản nhiệt và độ ổn định cho game thủ.' },
  { name: 'PC Đồ họa & Workstation', image: 'image3.jpg', description: 'Sức mạnh xử lý đa nhiệm cho dựng phim, render 3D và AI.' },
  { name: 'Mini PC', image: 'image5.avif', description: 'Gọn gàng, tiết kiệm không gian, phù hợp văn phòng và học tập.' }
];

const NEWS = [
  {
    id: 1,
    slug: 'top-5-pc-gaming-20-trieu-2026',
    title: 'Top 5 cấu hình PC Gaming tốt nhất trong tầm giá 20 triệu năm 2026',
    image: 'image10.png',
    date: '04/05/2026',
    summary: 'Hướng dẫn chọn linh kiện để tối ưu hiệu năng chơi game e-sport và học tập.',
    content: 'Ở phân khúc khoảng 20 triệu, người dùng nên ưu tiên CPU 6 nhân trở lên, VGA tầm RTX 4060 hoặc tương đương, RAM tối thiểu 16GB và SSD NVMe để có trải nghiệm cân bằng.'
  },
  {
    id: 2,
    slug: 'nvidia-rtx-50-series',
    title: 'NVIDIA RTX 50-Series: Những thông tin rò rỉ mới nhất về siêu GPU',
    image: 'image11.png',
    date: '04/05/2026',
    summary: 'Cập nhật các xu hướng hiệu năng, điện năng và nhu cầu nâng cấp card đồ họa.',
    content: 'Khi chọn GPU thế hệ mới, cần cân nhắc độ phân giải màn hình, nguồn máy, không gian thùng máy và phần mềm sử dụng để tránh lãng phí ngân sách.'
  },
  {
    id: 3,
    slug: 'build-pc-freelancer-3d',
    title: 'Bí quyết build PC tối ưu cho Freelancer chuyên ngành 3D',
    image: 'image12.webp',
    date: '04/05/2026',
    summary: 'Lựa chọn CPU đa nhân, GPU nhiều VRAM và hệ thống lưu trữ phù hợp cho render.',
    content: 'Với công việc 3D, ưu tiên RAM 32GB trở lên, GPU có nhiều VRAM, SSD dung lượng lớn và tản nhiệt tốt để đảm bảo khả năng làm việc liên tục.'
  }
];

function formatPrice(value) {
  return Number(value || 0).toLocaleString('vi-VN') + 'đ';
}

function getProductBySlug(slug) {
  return PRODUCTS.find(function (item) { return item.slug === slug; }) || PRODUCTS[0];
}

function getNewsBySlug(slug) {
  return NEWS.find(function (item) { return item.slug === slug; }) || NEWS[0];
}

function getAssetPath(fileName) {
  var prefix = window.location.pathname.includes('/pages/') ? '../' : '';
  return prefix + 'assets/images/' + fileName;
}
