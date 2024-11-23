<?php
// Mulai session
session_start();

// Error reporting (hapus pada production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Fungsi keamanan
function generate_csrf_token()
{
  if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
  }
  return $_SESSION['csrf_token'];
}

function generate_nonce()
{
  return base64_encode(random_bytes(32));
}

// Generate tokens
$csrf_token = generate_csrf_token();
$nonce = generate_nonce();

// Data artikel (bisa dipindahkan ke database nanti)


// Handle form submission
$form_submitted = false;
$form_error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (!isset($_POST['_csrf']) || $_POST['_csrf'] !== $_SESSION['csrf_token']) {
    $form_error = 'Invalid CSRF token';
  } else {
    // Process form (you can add your form processing logic here)
    $form_submitted = true;
  }
}
?>
<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HidroLestari - Edukasi Konservasi Air</title>
  <meta http-equiv="Cache-Control" content="max-age=31536000, must-revalidate">
  <meta name="description"
    content="HidroLestari menyediakan edukasi tentang konservasi air di Indonesia. Pelajari cara menghemat air, dampak polusi air, dan teknologi pengolahan air terkini.">
  <meta name="keywords"
    content="konservasi air, edukasi air, hemat air, polusi air, teknologi air, sumber daya air Indonesia">
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
    crossorigin="anonymous" referrerpolicy="no-referrer">
  <link rel="stylesheet" href="css/styles.css">

  <!-- Content Security Policy -->
  <meta http-equiv="Content-Security-Policy"
    content="default-src 'self'; style-src 'self' https://fonts.googleapis.com https://cdnjs.cloudflare.com 'unsafe-inline'; script-src 'self' https://cdnjs.cloudflare.com 'nonce-<?php echo $nonce; ?>'; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:; img-src 'self' data:; connect-src 'self' https://formspree.io;">
</head>

<body>
  <header>
    <nav class="container">
      <a href="#" class="logo">HidroLestari</a>
      <button class="mobile-menu-btn" aria-label="Toggle menu">
        <i class="fas fa-bars"></i>
      </button>
      <ul class="nav-links">
        <li><a href="#home">Beranda</a></li>
        <li><a href="#about">Tentang</a></li>
        <li><a href="#facts">Fakta</a></li>
        <li><a href="#articles">Artikel</a></li>
        <li><a href="#contact">Kontak</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="home" class="hero">
      <div class="hero-content">
        <h1>Edukasi Konservasi Air</h1>
        <p>Mari belajar tentang pentingnya menjaga sumber daya air kita untuk masa depan yang berkelanjutan.</p>
        <a href="#about" class="cta-button">Pelajari Lebih Lanjut</a>
      </div>
      <div class="water-animation"></div>
      <div class="water-animation"></div>
    </section>

    <section id="about" class="about">
      <div class="container">
        <h2>Tentang Konservasi Air</h2>
        <div class="about-content">
          <div class="about-text">
            <p>HidroLestari adalah inisiatif untuk meningkatkan kesadaran akan pentingnya melindungi dan
              mengelola sumber daya air kita dengan bijak. Melalui edukasi dan dorongan untuk aksi nyata, kami
              bertujuan untuk menjamin ketersediaan air bersih di masa depan.</p>
            <p>Mengapa konservasi air sangat penting saat ini:</p>
            <ul>
              <li>Mencegah krisis air: Dengan populasi yang terus bertambah dan perubahan iklim, konservasi
                air adalah kunci untuk menghindari kelangkaan air di masa depan.</li>
              <li>Melindungi ekosistem: Air bersih adalah hal vital bagi kelangsungan hidup berbagai spesies
                dan menjaga keseimbangan ekosistem.</li>
              <li>Mengurangi polusi air: Dengan menggunakan air secara efisien, kita dapat mengurangi jumlah
                air limbah yang mencemari sungai dan laut.</li>
              <li>Menghemat energi: Pengolahan dan distribusi air membutuhkan energi yang besar. Konservasi
                air berarti juga menghemat energi dan mengurangi emisi karbon.</li>
              <li>Menjaga ketahanan pangan: Air bersih sangat penting untuk pertanian. Konservasi air membantu
                menjamin ketersediaan pangan di masa depan.</li>
              <li>Menghemat biaya: Efisiensi penggunaan air dapat mengurangi biaya pengolahan, distribusi, dan
                tagihan air rumah tangga.</li>
            </ul>
          </div>
          <div class="about-image">
            <img src="img/A.jpeg" alt="Ilustrasi Konservasi Air">
            <div class="water-drop"></div>
          </div>
        </div>
      </div>
    </section>

    <section id="facts" class="facts">
      <div class="container">
        <h2>Fakta Menarik tentang Air</h2>
        <div class="facts-grid">
          <div class="fact-card">
            <i class="fas fa-globe fact-icon"></i>
            <div class="fact-number">71%</div>
            <p>Permukaan bumi tertutup air</p>
          </div>
          <div class="fact-card">
            <i class="fas fa-tint fact-icon"></i>
            <div class="fact-number">2.5%</div>
            <p>Air tawar dari total air di bumi</p>
          </div>
          <div class="fact-card">
            <i class="fas fa-users fact-icon"></i>
            <div class="fact-number">2Miliar</div>
            <p>Orang kekurangan akses air bersih</p>
          </div>
          <div class="fact-card">
            <i class="fas fa-faucet fact-icon"></i>
            <div class="fact-number">4000L</div>
            <p>Air terbuang per bulan dari keran bocor</p>
          </div>
        </div>
      </div>
    </section>

    <section id="articles" class="articles">
      <div class="container">
        <h2>Artikel Konservasi Air</h2>
        <div id="article-grid" class="article-grid">
        
        </div>
        <div id="loading" style="display: none;">Memuat artikel...</div>
      </div>
    </section>

    <section id="river-animation" class="river-animation">
      <div class="river">
        <div class="water"></div>
        <div class="water"></div>
        <div class="water"></div>
      </div>
      <div class="boat">
        <div class="sail"></div>
      </div>
      <div class="sun"></div>
      <div class="cloud cloud1"></div>
      <div class="cloud cloud2"></div>
      <div class="tree tree1"></div>
      <div class="tree tree2"></div>
    </section>

    <section id="contact" class="contact">
      <div class="container">
        <h2>Hubungi Kami</h2>
        <?php if ($form_error): ?>
          <div class="error-message"><?php echo htmlspecialchars($form_error); ?></div>
        <?php endif; ?>
        <?php if ($form_submitted): ?>
          <div class="success-message">Terima kasih! Pesan Anda telah terkirim.</div>
        <?php else: ?>
          <form id="contact-form" class="contact-form" action="https://formspree.io/f/mvgoopzo" method="POST">
            <input type="hidden" name="_csrf" value="<?php echo $csrf_token; ?>">
            <div class="form-group">
              <label for="name">Nama</label>
              <input type="text" id="name" name="name" required placeholder="Masukkan nama Anda" maxlength="100">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required placeholder="Masukkan email Anda" maxlength="100">
            </div>
            <div class="form-group">
              <label for="message">Pesan</label>
              <textarea id="message" name="message" rows="5" required placeholder="Tulis pesan atau pertanyaan Anda"
                maxlength="1000"></textarea>
            </div>
            <button type="submit" class="submit-btn">Kirim Pesan</button>
          </form>
        <?php endif; ?>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">HidroLestari</div>
        <ul class="footer-links">
          <li><a href="#home">Beranda</a></li>
          <li><a href="#about">Tentang</a></li>
          <li><a href="#facts">Fakta</a></li>
          <li><a href="#articles">Artikel</a></li>
          <li><a href="#contact">Kontak</a></li>
        </ul>
        <div class="social-icons">
          <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
          <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
      <p>&copy; <?php echo date('Y'); ?> maulanarafli07. Hak Cipta Dilindungi.</p>
    </div>
  </footer>

  <!-- Scripts with nonce -->
  <script nonce="<?php echo $nonce; ?>" src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"
    integrity="sha512-f8mwTB+Bs8a5c46DEm7HQLcJuHMBaH/UFlcgyetMqqkvTcYg4g5VXsYR71b3qC82lZytjNYvBj2pf0VekA9/FQ=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script nonce="<?php echo $nonce; ?>" src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js"
    integrity="sha512-A64Nik4Ql7/W/PJk2RNOmVyC/Chobn5TY08CiKEX50Sdw+33WTOpPJ/63bfWPl0hxiRv1trPs5prKO8CpA7VNQ=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script nonce="<?php echo $nonce; ?>" src="js/main.js"></script>

  <?php if ($form_submitted): ?>
    <script nonce="<?php echo $nonce; ?>">
      document.getElementById('success-message').style.display = 'block';
      setTimeout(() => {
        document.getElementById('success-message').style.display = 'none';
      }, 5000);
    </script>
  <?php endif; ?>
</body>

</html>