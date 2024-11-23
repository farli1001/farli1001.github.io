
<?php
// Fungsi untuk generate CSRF token
function generate_csrf_token()
{
  if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
  }
  return $_SESSION['csrf_token'];
}

if (session_status() === PHP_SESSION_NONE) {
  session_start();
}
?>
<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo isset($pageTitle) ? $pageTitle . ' - HidroLestari' : 'HidroLestari - Edukasi Konservasi Air'; ?>
  </title>
  <meta http-equiv="Cache-Control" content="max-age=31536000, must-revalidate">
  <meta name="description"
    content="HidroLestari menyediakan edukasi tentang konservasi air di Indonesia. Pelajari cara menghemat air, dampak polusi air, dan teknologi pengolahan air terkini.">

  <!-- Fonts and CSS -->
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
<link rel="stylesheet" href="css/artikel.css">
  <!-- Security Headers -->
  <meta http-equiv="Content-Security-Policy"
    content="default-src 'self'; style-src 'self' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net 'unsafe-inline'; script-src 'self' https://cdnjs.cloudflare.com 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:; img-src 'self' data:; connect-src 'self' https://formspree.io;">
</head>

<body>
  <header>
    <nav class="container">
      <a href="index.php" class="logo">HidroLestari</a>
      <button class="mobile-menu-btn">
        <i class="fas fa-bars"></i>
      </button>
      <ul class="nav-links">
        <li><a href="index.php#home">Beranda</a></li>
        <li><a href="index.php#about">Tentang</a></li>
        <li><a href="index.php#facts">Fakta</a></li>
        <li><a href="index.php#articles">Artikel</a></li>
        <li><a href="index.php#contact">Kontak</a></li>
      </ul>
    </nav>
  </header>