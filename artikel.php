<?php
$pageTitle = "Artikel";
require_once 'header.php';

// Validasi dan sanitasi ID artikel
$articleId = isset($_GET['id']) ? filter_var($_GET['id'], FILTER_VALIDATE_INT) : null;



// XSS Protection
function escape($str)
{
  return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

// Data artikel dengan judul yang disinkronkan dengan article2.js
$articles = [
  1 => [
    'id' => 1,
    'title' => '10 Cara Efektif Menghemat Air di Rumah',
    'image' => 'img/1.webp',
    'excerpt' => 'Tips praktis untuk menghemat penggunaan air dalam kehidupan sehari-hari.'
  ],
  2 => [
    'id' => 2,
    'title' => 'Dampak Polusi Air terhadap Ekosistem Akuatik: Ancaman Serius bagi Kehidupan Air',
    'image' => 'img/2.webp',
    'excerpt' => 'Ancaman Serius bagi Kehidupan Air'
  ],
  3 => [
    'id' => 3,
    'title' => 'Teknologi Pengolahan Air Terkini: Solusi untuk Masa Depan',
    'image' => 'img/3.webp',
    'excerpt' => 'Solusi untuk Masa Depan'
  ],
  4 => [
    'id' => 4,
    'title' => 'Dampak Perubahan Iklim terhadap Sumber Daya Air: Krisis Global',
    'image' => 'img/4.webp',
    'excerpt' => 'Krisis Global'
  ],
  5 => [
    'id' => 5,
    'title' => 'Konservasi Air di Perkotaan: Langkah-Langkah Strategis Mengatasi Krisis Air',
    'image' => 'img/5.webp',
    'excerpt' => 'Langkah-Langkah Strategis Mengatasi Krisis Air'
  ],
  6 => [
    'id' => 6,
    'title' => 'Kasus Krisis Air di Cape Town: Pelajaran dari Hari Nol',
    'image' => 'img/6.webp',
    'excerpt' => 'Pelajaran dari Hari Nol'
  ],
  7 => [
    'id' => 7,
    'title' => 'Revolusi Air Bersih: Teknologi Masa Depan yang Mengubah Cara Kita Mengakses Air',
    'image' => 'img/7.webp',
    'excerpt' => 'Teknologi Masa Depan yang Mengubah Cara Kita Mengakses Air'
  ],
  8 => [
    'id' => 8,
    'title' => 'Menguak Potensi Ekonomi dari Daur Ulang Air Limbah: Peluang dan Tantangan',
    'image' => 'img/8.webp',
    'excerpt' => 'Peluang dan Tantangan'
  ]
];

function getRandomArticle($currentId)
{
  global $articles;

  // Hapus artikel yang sedang dibaca dari array
  if (isset($articles[$currentId])) {
    unset($articles[$currentId]);
  }

  // Pilih artikel random
  $randomKey = array_rand($articles);
  return $articles[$randomKey];
}

// Error handling
$error = '';
if ($articleId === false || $articleId === null) {
  $error = 'ID artikel tidak valid';
} else if (!isset($articles[$articleId])) {
  $error = 'Artikel tidak ditemukan';
}

// Get random article
$randomArticle = getRandomArticle($articleId);
?>
<link rel="stylesheet" href="artikel.css">
<!-- Add spacing after header -->
<div class="h-20" style="background-color: var(--primary-color);"></div>

<main class="min-h-screen bg-gray-50 pt-8 pb-16">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <?php if ($error): ?>
      <div class="max-w-4xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline"><?php echo escape($error); ?></span>
      </div>
    <?php else: ?>
      <article class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Breadcrumb -->
        <nav id="breadcrumb" class="text-sm px-6 py-4 bg-gray-50 border-b" aria-label="Breadcrumb">
          <ol class="flex space-x-2">
            <li><a href="index.php" class="text-blue-600 hover:text-blue-800">Beranda</a></li>
            <span class="mx-2 text-gray-500">/</span>
            <li><a href="index.php#articles" class="text-blue-600 hover:text-blue-800">Artikel</a></li>
            <span class="mx-2 text-gray-500">/</span>
            <li class="text-gray-600" id="breadcrumb-title">
              <?php
              if (empty($error) && isset($articles[$articleId])) {
                echo escape($articles[$articleId]['title']);
              } else {
                echo 'Artikel tidak ditemukan';
              }
              ?>
            </li>
          </ol>
        </nav>

        <!-- Article Content -->
        <div class="px-6 py-8">
          <div id="article-title" class="text-4xl font-serif font-bold text-gray-900 mb-6"></div>
          <div id="article-image" class="mb-8 rounded-lg overflow-hidden">
            <!-- Image will be inserted here -->
          </div>
          <div id="article-body" class="prose max-w-none">
            <!-- Content will be inserted here -->
          </div>
        </div>

        <!-- Related Article -->
        <div class="px-6 py-8 bg-gray-50 border-t border-gray-200">
          <h2 class="text-2xl font-bold mb-6 text-gray-900">Artikel Lainnya</h2>
          <div class="article-card hover:shadow-lg transition-all duration-300">
            <a href="artikel.php?id=<?php echo $randomArticle['id']; ?>" class="block">
              <div class="relative">
                <img src="<?php echo escape($randomArticle['image']); ?>"
                  alt="<?php echo escape($randomArticle['title']); ?>" class="w-full h-48 object-cover">
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 class="text-white text-xl font-bold mb-2"><?php echo escape($randomArticle['title']); ?></h3>
                  <p class="text-gray-200 text-sm"><?php echo escape($randomArticle['excerpt']); ?></p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </article>
    <?php endif; ?>
  </div>

  <!-- Back to top button -->
  <button id="back-to-top"
    class="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hidden z-50">
    <i class="fas fa-arrow-up"></i>
  </button>
</main>

<!-- Loading indicator -->
<div id="loading" class="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center hidden z-50">
  <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
</div>

<!-- Scripts -->
<script>
  // Loading indicator functions
  function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
  }

  function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
  }

  // Back to top functionality
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('hidden', window.scrollY < 300);
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Error handling
  window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\\nURL: ' + url + '\\nLine: ' + lineNo + '\\nColumn: ' + columnNo + '\\nError object: ' + JSON.stringify(error));
    return false;
  };
</script>
<script src="js/article2.js"></script>

<?php require_once 'footer.php'; ?>