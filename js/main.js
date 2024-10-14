// Mobile menu toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (event) => {
  if (!event.target.closest("nav") && navLinks.classList.contains("show")) {
    navLinks.classList.remove("show");
  }
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero animations
gsap.from(".hero h1", { opacity: 0, y: 50, duration: 1, delay: 0.5 });
gsap.from(".hero p", { opacity: 0, y: 50, duration: 1, delay: 0.7 });
gsap.from(".cta-button", { opacity: 0, y: 50, duration: 1, delay: 0.9 });

// About section animations
gsap.from(".about-text", {
  opacity: 0,
  x: -50,
  duration: 1,
  scrollTrigger: {
    trigger: ".about",
    start: "top 80%",
  },
});

gsap.from(".about-image", {
  opacity: 0,
  x: 50,
  duration: 1,
  scrollTrigger: {
    trigger: ".about",
    start: "top 80%",
  },
});

// Facts animations
gsap.from(".fact-card", {
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".facts",
    start: "top 80%",
  },
});

// Contact form animation
gsap.from(".contact-form", {
  opacity: 0,
  y: 50,
  duration: 1,
  scrollTrigger: {
    trigger: ".contact",
    start: "top 80%",
  },
});

// Floating animation for water drop
gsap.to(".water-drop", {
  y: -20,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
});

// Parallax effect for about image
gsap.to(".about-image img", {
  yPercent: 20,
  ease: "none",
  scrollTrigger: {
    trigger: ".about",
    scrub: true,
  },
});

// Animate fact numbers
const factNumbers = document.querySelectorAll(".fact-number");
factNumbers.forEach((number) => {
  const finalNumber = parseInt(number.innerText);
  gsap.from(number, {
    innerText: 0,
    duration: 2,
    snap: { innerText: 1 },
    scrollTrigger: {
      trigger: number,
      start: "top 80%",
    },
  });
});

// Articles loading
const articles = [
  {
    id: 1,
    title: "10 Cara Efektif Menghemat Air di Rumah",
    excerpt:
      "Pelajari langkah-langkah praktis untuk mengurangi penggunaan air sehari-hari, termasuk perbaikan kebocoran, penggunaan alat hemat air, dan perubahan kebiasaan.",
    image: "https://source.unsplash.com/random/400x300?water,saving",
  },
  {
    id: 2,
    title: "Dampak Polusi Air terhadap Ekosistem Akuatik",
    excerpt:
      "Temukan bagaimana polusi air mempengaruhi kehidupan akuatik, termasuk eutrofikasi, bioakumulasi toksin, dan hilangnya keanekaragaman hayati di sungai dan laut.",
    image: "https://source.unsplash.com/random/400x300?water,pollution",
  },
  {
    id: 3,
    title: "Teknologi Terkini dalam Pengolahan Air",
    excerpt:
      "Jelajahi inovasi terbaru dalam teknologi pengolahan air, termasuk desalinasi, filtrasi membran, dan sistem daur ulang air yang canggih.",
    image: "https://source.unsplash.com/random/400x300?water,technology",
  },
  {
    id: 4,
    title:
      "Dampak Perubahan Iklim terhadap Sumber Daya Air: Krisis Global yang Mendesak",
    excerpt:
      "Seberapa bahaya sih perubahan iklim terhadap masalah perairan ini",
    image: "https://source.unsplash.com/random/400x300?water,technology",
  },
];

function escapeHTML(str) {
  return str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      }[tag] || tag),
  );
}

function createArticleCard(article) {
  const articleElement = document.createElement("div");
  articleElement.className = "article-card";
  articleElement.innerHTML = `
    <div class="article-image" style="background-image: url('${escapeHTML(
      article.image,
    )}')"></div>
    <div class="article-content">
      <h3 class="article-title">${escapeHTML(article.title)}</h3>
      <p class="article-excerpt">${escapeHTML(article.excerpt)}</p>
      <a href="artikel.html?id=${
        article.id
      }" class="read-more">Baca Selengkapnya</a>
    
    </div>
  `;
  return articleElement;
}

function loadArticles() {
  const articleGrid = document.getElementById("article-grid");
  articles.forEach((article) => {
    const articleElement = createArticleCard(article);
    articleGrid.appendChild(articleElement);
  });
}

loadArticles();

// Enhanced form submission with security measures
const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Basic input validation
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  if (
    name.value.length > 100 ||
    email.value.length > 100 ||
    message.value.length > 1000
  ) {
    alert("Input terlalu panjang. Silakan periksa kembali.");
    return;
  }

  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();

  xhr.open(form.method, form.action, true);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      form.reset();
      form.style.display = "none";
      successMessage.style.display = "block";

      // Animasi untuk pesan sukses
      gsap.from(successMessage, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
      });

      // Scroll ke pesan sukses
      successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      alert("Oops! Ada masalah saat mengirim pesan. Silakan coba lagi.");
    }
  };

  xhr.send(formData);
});
