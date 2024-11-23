// ini article2.js
// Fungsi untuk mendapatkan parameter dari URL
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Fungsi untuk membuat breadcrumb
function createBreadcrumb(article) {
  const breadcrumbContainer = document.createElement("nav");
  breadcrumbContainer.className = "text-sm mb-6";
  breadcrumbContainer.innerHTML = `
        <ol class="flex space-x-2">
            <li><a href="index.php" class="text-blue-600 hover:text-blue-800">Beranda</a></li>
            <span class="mx-2">/</span>
            <li><a href="#articles" class="text-blue-600 hover:text-blue-800">Artikel</a></li>
            <span class="mx-2">/</span>
            <li class="text-gray-600">${article.title}</li>
        </ol>
    `;
  return breadcrumbContainer;
}

// Fungsi untuk membuat social share buttons
function createSocialShare() {
  const shareContainer = document.createElement("div");
  shareContainer.className = "flex items-center space-x-4 mb-8";
  shareContainer.innerHTML = `
        <button class="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
            <i class="fas fa-share-alt"></i>
            <span>Bagikan</span>
        </button>
        <div class="flex space-x-3">
            <a href="#" class="text-blue-600 hover:text-blue-800"><i class="fab fa-facebook"></i></a>
            <a href="#" class="text-blue-500 hover:text-blue-700"><i class="fab fa-twitter"></i></a>
            <a href="#" class="text-green-600 hover:text-green-800"><i class="fab fa-whatsapp"></i></a>
        </div>
    `;
  return shareContainer;
}

// Fungsi untuk mengisi konten artikel
function fillArticleContent(article) {
  if (article) {
    // Update title
    document.getElementById("article-title").textContent = article.title;
    document.title = `${article.title} - HidroLestari`;

    // Update image
    document.getElementById("article-image").innerHTML = `
            <img src="${article.image}" alt="${article.title}" class="w-full h-[400px] object-cover rounded-xl">
        `;

    // Update breadcrumb title
    const breadcrumbTitle = document.querySelector(
      "#breadcrumb li.text-gray-600",
    );
    if (breadcrumbTitle) {
      breadcrumbTitle.textContent = article.title;
    }
    // Clear existing content
    const articleBody = document.getElementById("article-body");
    articleBody.innerHTML = "";

    // Add social share buttons
    articleBody.appendChild(createSocialShare());

    // Parse and add the main content
    const parser = new DOMParser();
    const doc = parser.parseFromString(article.content, "text/html");
    const elements = doc.body.children;

    let elementCount = 0;
    let adInserted = false;

    // Add content with ad insertion
    Array.from(elements).forEach((element) => {
      const clonedElement = element.cloneNode(true);

      // Add responsive classes to images
      if (clonedElement.tagName === "IMG") {
        clonedElement.classList.add("w-full", "h-auto", "rounded-lg", "my-6");
      }

      // Add styling to headings
      if (clonedElement.tagName === "H2") {
        clonedElement.classList.add(
          "text-2xl",
          "font-serif",
          "font-bold",
          "text-gray-900",
          "mt-8",
          "mb-4",
        );
      }

      // Add styling to paragraphs
      if (clonedElement.tagName === "P") {
        clonedElement.classList.add("text-gray-600", "mb-6", "leading-relaxed");
      }

      // Add styling to lists
      if (clonedElement.tagName === "UL" || clonedElement.tagName === "OL") {
        clonedElement.classList.add(
          "list-disc",
          "pl-6",
          "mb-6",
          "text-gray-600",
        );
        Array.from(clonedElement.children).forEach((li) => {
          li.classList.add("mb-2");
        });
      }

      articleBody.appendChild(clonedElement);
      elementCount++;

      // Insert ad after 10th element
      if (elementCount === 10 && !adInserted) {
        articleBody.appendChild(createAdElement());
        adInserted = true;
      }
    });

    // Add "Back to top" button
    const backToTop = document.createElement("button");
    backToTop.className =
      "fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition hidden";
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.appendChild(backToTop);

    // Show/hide "Back to top" button based on scroll position
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("hidden", window.scrollY < 300);
    });
  } else {
    document.getElementById("article-title").textContent =
      "Artikel Tidak Ditemukan";
    document.getElementById("article-image").innerHTML = "";
    document.getElementById("article-body").innerHTML =
      "<p class='text-gray-600'>Maaf, artikel yang Anda cari tidak ditemukan.</p>";
    document.title = "Artikel Tidak Ditemukan - HidroLestari";
  }
}

// Fungsi untuk membuat elemen iklan
function createAdElement() {
  const adElement = document.createElement("div");
  adElement.className =
    "ad-space bg-gradient-to-r from-blue-500 to-blue-600 p-8 rounded-xl my-8 text-white relative overflow-hidden";
  adElement.innerHTML = `
        <div class="ad-content relative z-10">
            <h3 class="text-2xl font-bold mb-4">Hemat Air, Hemat Masa Depan!</h3>
            <p class="mb-6">Dapatkan alat penghemat air terbaru</p>
            <a href="#" class="inline-block bg-yellow-400 text-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition">Beli Sekarang</a>
        </div>
        <div class="water-drop"></div>
    `;
  return adElement;
}

// Data artikel
const articles = {
  1: {
    title: "10 Cara Efektif Menghemat Air di Rumah",
    image: "img/1.webp",
    content: `
            <p>Air adalah sumber kehidupan yang sangat penting bagi manusia dan makhluk hidup lainnya. Sayangnya, dengan
            peningkatan populasi dan perubahan iklim, ketersediaan air bersih semakin berkurang. Oleh karena itu, penting bagi
            kita untuk mengambil langkah-langkah guna menghemat air di rumah. Artikel ini menyajikan cara-cara praktis yang
            dapat Anda terapkan untuk mengurangi konsumsi air secara signifikan.</p>

            <h2>1. Perbaiki Kebocoran</h2>
            <p>Kebocoran pada keran, pipa, atau toilet sering kali tidak disadari, namun dampaknya besar terhadap konsumsi air.
            Sebuah keran yang bocor dapat menyebabkan hilangnya hingga 11.000 liter air per tahun. Untuk mencegah hal ini,
            lakukan pemeriksaan berkala pada seluruh sistem perpipaan di rumah Anda. Menurut <a
                href="https://www.epa.gov/">U.S. Environmental Protection Agency (EPA)</a>, memperbaiki kebocoran kecil saja
            sudah dapat memberikan dampak besar terhadap penghematan air dan biaya.</p>

            <h2>2. Gunakan Alat Hemat Air</h2>
            <p>Alat hemat air seperti kepala shower atau keran berteknologi rendah aliran (low-flow) sangat efektif dalam
            mengurangi penggunaan air tanpa mengurangi kenyamanan. Kepala shower hemat air, misalnya, bisa menghemat hingga 9
            liter per menit, menjadikannya pilihan cerdas bagi setiap rumah. Berdasarkan <a
                href="https://www.epa.gov/">EPA</a>, penggunaan alat-alat ini tidak hanya ramah lingkungan, tetapi juga membantu
            mengurangi tagihan air Anda.</p>

            <h2>3. Optimalkan Penggunaan Kamar Mandi</h2>
            <p>Mengurangi durasi mandi adalah salah satu langkah mudah yang bisa Anda terapkan. Mandi yang terlalu lama bisa
            menggunakan banyak air. Menurut <a href="https://www.allianceforwaterefficiency.org/">Alliance for Water
                Efficiency</a>, memotong durasi mandi hanya 2 menit saja bisa menghemat hingga 40 liter air setiap kali mandi.
            Pertimbangkan juga untuk menggunakan toilet dengan sistem dual-flush yang dapat mengatur jumlah air yang digunakan
            setiap kali flush.</p>

            <h2>4. Kelola Penggunaan Air di Dapur</h2>
            <p>Alih-alih mencuci piring di bawah air mengalir, gunakan baskom atau isi wastafel untuk mencuci dan membilas.
            Menurut <a href="https://www.waterwise.org.uk/">Waterwise UK</a>, mencuci piring dengan cara ini dapat menghemat
            hingga 50 liter air setiap kali cuci. Jika Anda menggunakan dishwasher, pastikan untuk hanya menjalankannya saat
            penuh agar lebih efisien dalam penggunaan air.</p>

            <h2>5. Manfaatkan Mesin Cuci dengan Bijak</h2>
            <p>Mesin cuci merupakan salah satu alat yang dapat menggunakan banyak air, terutama jika tidak digunakan dengan
            bijak. Jalankan mesin cuci hanya ketika benar-benar penuh. Menurut <a href="https://www.energystar.gov/">Energy
                Star</a>, mencuci dengan mesin cuci yang penuh dapat menghemat antara 11 hingga 41 liter air dibandingkan
            mencuci dengan beban setengah.</p>

            <h2>6. Kelola Taman dengan Cerdas</h2>
            <p>Penyiraman yang efisien dapat menghemat banyak air. Siramlah tanaman di pagi hari atau malam hari untuk
            meminimalkan penguapan. Penelitian dari <a href="https://ucanr.edu/">University of California</a> menemukan bahwa
            penyiraman pada waktu-waktu ini bisa menghemat hingga 30% air. Pertimbangkan juga untuk menanam tanaman yang tahan
            terhadap kekeringan.</p>

            <h2>7. Tampung Air Hujan</h2>
            <p>Memanfaatkan air hujan untuk keperluan menyiram tanaman atau mencuci mobil adalah langkah yang efektif. Dengan
            sistem penampungan sederhana, rumah dengan ukuran atap sedang dapat mengumpulkan hingga 600 liter air per 25mm
            curah hujan, menurut <a href="https://www.csiro.au/">CSIRO</a>, lembaga penelitian ilmiah Australia.</p>

            <h2>8. Gunakan Kembali Air Abu-abu</h2>
            <p>Air abu-abu, atau air yang berasal dari aktivitas mencuci sayuran atau buah-buahan, dapat digunakan untuk
            menyiram tanaman. Pastikan untuk tidak menggunakan air yang mengandung sabun atau bahan kimia berbahaya.
            Berdasarkan penelitian dari <a href="https://greywateraction.org/">Greywater Action</a>, penggunaan air abu-abu
            bisa mengurangi konsumsi air rumah tangga hingga 30%.</p>

            <h2>9. Matikan Keran</h2>
            <p>Sering kali, kita lupa mematikan keran saat menyikat gigi atau mencukur. Tindakan kecil ini bisa berdampak besar.
            Menurut <a href="https://www.epa.gov/">EPA</a>, mematikan keran selama menyikat gigi saja bisa menghemat hingga 30
            liter air setiap harinya.</p>

            <h2>10. Edukasi Anggota Keluarga</h2>
            <p>Mengajarkan kebiasaan hemat air kepada anggota keluarga adalah kunci utama dalam menjaga keberlanjutan praktik
            ini. Menurut <a href="https://www.waterrf.org/">Water Research Foundation</a>, perubahan perilaku yang
            berkelanjutan dapat mengurangi konsumsi air rumah tangga hingga 20%. Buatlah diskusi mengenai penghematan air
            menjadi bagian dari rutinitas keluarga, dan dorong setiap anggota keluarga untuk melakukan bagiannya.</p>

            <p>Menghemat air bukan hanya tentang mengurangi tagihan, tetapi juga tentang memastikan ketersediaan air untuk
            generasi mendatang. Dengan mengikuti langkah-langkah ini, kita dapat membantu menjaga kelestarian lingkungan
            sambil mengurangi penggunaan air dalam kehidupan sehari-hari.</p>

            <p class="source">Sumber: U.S. Environmental Protection Agency (EPA), Alliance for Water Efficiency, Waterwise UK,
            Energy Star, University of California, CSIRO, Greywater Action, Water Research Foundation.</p>
        `,
  },
  2: {
    title:
      "Dampak Polusi Air terhadap Ekosistem Akuatik: Ancaman Serius bagi Kehidupan Air",
    image: "img/2.webp",
    content: `
      <p>Polusi air adalah salah satu masalah besar yang mengancam kehidupan di dalam air. Berdasarkan laporan dari <a href="https://www.unwater.org/publications/un-world-water-development-report-2023" target="_blank">UNEP tahun 2023</a>, lebih dari 80% air limbah dibuang ke lingkungan tanpa pengolahan yang benar. Hal ini merusak sungai, danau, dan lautan. Artikel ini membahas bagaimana polusi air merusak kehidupan di air dan keseimbangan ekosistem.</p>

      <h2>1. Eutrofikasi: Masalah Nutrisi Berlebih</h2>
      <p>Eutrofikasi terjadi ketika terlalu banyak nutrisi seperti nitrogen dan fosfor masuk ke air. Menurut <a href="https://www.epa.gov/nutrientpollution/problem" target="_blank">EPA Amerika Serikat</a>, 40% dari danau dan sungai di Amerika mengalami eutrofikasi. Dampak eutrofikasi termasuk:</p>
      <ul>
        <li>Pertumbuhan alga berlebih yang menghalangi sinar matahari masuk ke dalam air.</li>
        <li>Kadar oksigen dalam air menurun, membuat ikan dan hewan lain kekurangan oksigen.</li>
        <li>Kematian massal ikan dan hewan air lainnya.</li>
        <li>Spesies yang lebih kuat terhadap polusi mendominasi, mengganggu keseimbangan ekosistem.</li>
      </ul>

      <h2>2. Bioakumulasi Toksin: Penumpukan Zat Berbahaya</h2>
      <p>Polutan seperti merkuri dan pestisida terakumulasi dalam tubuh hewan air melalui proses yang disebut bioakumulasi. Menurut penelitian di <a href="https://www.epa.gov/mercury/health-effects-exposures-mercury" target="_blank">Environmental Science & Technology</a>, kadar merkuri pada ikan di beberapa wilayah telah mencapai tingkat yang berbahaya. Bioakumulasi dapat menyebabkan:</p>
      <ul>
        <li>Gangguan reproduksi ikan.</li>
        <li>Perubahan perilaku ikan, mempengaruhi makan dan migrasi.</li>
        <li>Bahaya kesehatan bagi manusia yang mengonsumsi ikan tercemar.</li>
        <li>Kerusakan genetik yang bisa diwariskan ke generasi berikutnya.</li>
      </ul>

      <h2>3. Hilangnya Keanekaragaman Hayati</h2>
      <p>Polusi air menyebabkan hilangnya banyak spesies air. Menurut <a href="https://livingplanet.panda.org/en-US/" target="_blank">WWF Living Planet Report 2024</a>, populasi spesies air tawar menurun hingga 83% sejak 1970. Dampaknya termasuk:</p>
      <ul>
        <li>Kepunahan spesies yang sensitif terhadap polusi.</li>
        <li>Ketidakseimbangan rantai makanan di ekosistem air.</li>
        <li>Kerusakan habitat penting seperti terumbu karang.</li>
      </ul>

      <h2>4. Asidifikasi Air: Air Laut Menjadi Lebih Asam</h2>
      <p>Peningkatan CO2 menyebabkan air laut menjadi lebih asam. Berdasarkan penelitian dari <a href="https://www.noaa.gov/education/resource-collections/ocean-coasts/ocean-acidification" target="_blank">NOAA</a>, pH air laut telah turun sebesar 0,1 unit, yang berarti keasaman air meningkat 30%. Ini berdampak pada:</p>
      <ul>
        <li>Kerusakan cangkang organisme seperti kerang dan karang.</li>
        <li>Gangguan kemampuan ikan mendeteksi predator.</li>
        <li>Perubahan siklus nutrisi di laut yang mempengaruhi produktivitas ekosistem.</li>
      </ul>

      <h2>5. Sedimentasi: Lumpur di Perairan</h2>
      <p>Erosi tanah yang disebabkan oleh pertanian dan pembangunan membuat air menjadi keruh. Menurut <a href="https://wedocs.unep.org/handle/20.500.11822/27539" target="_blank">UNEP tahun 2022</a>, sedimentasi telah mengurangi kapasitas waduk global hingga 25%. Dampaknya termasuk:</p>
      <ul>
        <li>Kekeruhan air yang menghalangi sinar matahari masuk.</li>
        <li>Habitat ikan rusak.</li>
        <li>Insang ikan tersumbat, mengganggu pernapasan mereka.</li>
      </ul>

      <h2>6. Polusi Plastik: Masalah Serius</h2>
      <p>Polusi plastik adalah ancaman besar. Menurut <a href="https://www.ellenmacarthurfoundation.org/the-new-plastics-economy-rethinking-the-future-of-plastics" target="_blank">Ellen MacArthur Foundation</a>, pada tahun 2050 lautan kita bisa lebih banyak plastik daripada ikan jika tidak ada tindakan. Dampaknya termasuk:</p>
      <ul>
        <li>Hewan laut terjerat plastik, menyebabkan cedera atau kematian.</li>
        <li>Organisme air memakan mikroplastik yang berbahaya bagi kesehatan mereka.</li>
      </ul>

      <h2>Kesimpulan</h2>
      <p>Dampak polusi air sangat luas dan kompleks. Untuk mengatasinya, kita perlu meningkatkan pengelolaan limbah dan menggunakan teknologi baru untuk mengurangi polusi.</p>

      <p class="source">Sumber: UNEP, EPA, Environmental Science & Technology, WWF, NOAA, Ellen MacArthur Foundation.</p>
    `,
  },
  3: {
    title: "Teknologi Pengolahan Air Terkini: Solusi untuk Masa Depan",
    image: "img/3.webp",
    content: `
      <p>Dengan semakin menipisnya sumber daya air, inovasi teknologi pengolahan air menjadi sangat penting. Artikel ini akan membahas teknologi terbaru seperti desalinasi (mengubah air laut menjadi air minum), filtrasi membran, dan daur ulang air.</p>

      <h2>1. Desalinasi: Mengubah Air Laut Menjadi Air Minum</h2>
      <p>Desalinasi adalah proses untuk menghilangkan garam dari air laut agar bisa diminum. Teknologi terbaru termasuk:</p>
      <ul>
        <li><strong>Osmosis Balik Lanjutan:</strong> Menurut penelitian yang diterbitkan di <a href="https://www.nature.com/articles/s41545-019-0039-9" target="_blank">Nature</a>, osmosis balik generasi baru bisa mengurangi penggunaan energi hingga 20%.</li>
        <li><strong>Desalinasi Berbasis Grafena:</strong> Teknologi grafena membuat proses penyaringan lebih efisien.</li>
        <li><strong>Desalinasi Tenaga Surya:</strong> Proyek dari <a href="https://news.mit.edu/2020/passive-solar-powered-water-desalination-0207" target="_blank">MIT</a> menunjukkan bahwa desalinasi bisa dilakukan dengan tenaga matahari, mengurangi penggunaan bahan bakar fosil.</li>
      </ul>

      <h2>2. Filtrasi Membran Canggih</h2>
      <p>Filtrasi membran adalah teknologi untuk menyaring air dari kontaminan. Teknologi terbaru termasuk:</p>
      <ul>
        <li><strong>Nanofiltrasi:</strong> Mampu menyaring kontaminan berukuran sangat kecil, termasuk virus.</li>
        <li><strong>Membran Self-Cleaning:</strong> Dikembangkan oleh <a href="https://news.yale.edu/2020/03/18/membrane-technology-cleans-water-cleans-itself" target="_blank">Yale University</a>, membran ini bisa membersihkan dirinya sendiri, mengurangi perawatan.</li>
        <li><strong>Membran Biomimetik:</strong> Terinspirasi oleh alam, membran ini sangat efisien.</li>
      </ul>

      <h2>3. Sistem Daur Ulang Air</h2>
      <p>Daur ulang air semakin penting. Beberapa teknologi daur ulang air meliputi:</p>
      <ul>
        <li><strong>Sistem Terdistribusi:</strong> Teknologi ini memungkinkan air limbah diolah di tempat.</li>
        <li><strong>Bioreaktor Membran (MBR):</strong> Menggabungkan proses biologis dan filtrasi membran untuk mengolah air limbah secara efektif.</li>
        <li><strong>Teknologi NEWater:</strong> Dikembangkan di Singapura, NEWater menggunakan teknologi membran dan UV untuk menghasilkan air daur ulang berkualitas tinggi.</li>
      </ul>

      <h2>4. Pengolahan Air Berbasis AI dan IoT</h2>
      <p>Kecerdasan Buatan (AI) dan Internet of Things (IoT) membantu mengelola air lebih efisien:</p>
      <ul>
        <li><strong>Sistem Pemantauan Real-Time:</strong> Sensor IoT memungkinkan pemantauan kualitas air secara konstan.</li>
        <li><strong>Optimasi Proses dengan AI:</strong> AI membantu meningkatkan efisiensi pengolahan air dan mengurangi penggunaan bahan kimia.</li>
        <li><strong>Prediksi Kebutuhan Air:</strong> AI dapat memprediksi kebutuhan air di masa depan untuk manajemen yang lebih baik.</li>
      </ul>

      <h2>5. Teknologi Penyerapan Inovatif</h2>
      <p>Material baru dikembangkan untuk menyerap kontaminan lebih baik, seperti:</p>
      <ul>
        <li><strong>Nanopartikel Magnetik:</strong> Menyerap zat beracun seperti arsenik dan logam berat.</li>
        <li><strong>Karbon Aktif:</strong> Dengan pori yang lebih efisien untuk menyerap kontaminan organik.</li>
        <li><strong>Zeolit Sintetis:</strong> Menyerap kontaminan spesifik dengan sangat efektif.</li>
      </ul>

      <h2>Kesimpulan</h2>
      <p>Inovasi teknologi pengolahan air terus berkembang, menyediakan solusi untuk krisis air. Namun, kita juga perlu menggabungkan teknologi ini dengan kebijakan yang baik dan perubahan perilaku untuk mencapai pengelolaan air yang berkelanjutan.</p>

      <p class="source">Sumber: Nature, MIT, Yale University, PubMed Central, Water Research.</p>
    `,
  },
  4: {
    title: "Dampak Perubahan Iklim terhadap Sumber Daya Air: Krisis Global",
    image: "img/4.webp",
    content: `
      <p>Perubahan iklim telah menjadi salah satu ancaman terbesar bagi ketersediaan dan kualitas air di seluruh dunia. Artikel ini menjelaskan bagaimana perubahan iklim mempengaruhi siklus air dan dampaknya pada ekosistem serta masyarakat.</p>

      <h2>1. Perubahan Pola Curah Hujan</h2>
      <p>Menurut <a href="https://www.ipcc.ch/report/ar6/wg1/" target="_blank">IPCC tahun 2024</a>, perubahan iklim mengubah pola curah hujan global. Wilayah kering menjadi lebih kering, seperti di Mediterania, Afrika Selatan, dan Australia Barat, sementara daerah basah seperti Eropa Utara dan Asia Tenggara mengalami curah hujan berlebih yang menyebabkan banjir.</p>

      <h2>2. Dampak pada Ketersediaan Air Tawar</h2>
      <p>Perubahan pola curah hujan dan suhu menyebabkan masalah pada ketersediaan air tawar. Menurut <a href="https://grace.jpl.nasa.gov/" target="_blank">NASA GRACE-FO</a>, banyak akuifer air tanah di seluruh dunia menipis, yang mengancam pasokan air bagi miliaran orang. Gletser yang mencair juga memperburuk masalah air tawar.</p>

      <h2>3. Dampak pada Kualitas Air</h2>
      <p>Perubahan iklim juga memperburuk kualitas air. Suhu air yang meningkat menyebabkan pertumbuhan alga yang tidak terkendali dan menurunkan kadar oksigen di dalam air. Selain itu, naiknya permukaan laut menyebabkan intrusi air asin ke akuifer pesisir, merusak pasokan air tawar di wilayah pesisir.</p>

      <h2>4. Dampak pada Ekosistem Air</h2>
      <p>Perubahan iklim memaksa banyak spesies air untuk bermigrasi ke wilayah yang lebih dingin, dan menyebabkan hilangnya habitat penting seperti terumbu karang. Menurut <a href="https://www.worldwildlife.org/publications/living-planet-report-2020" target="_blank">WWF</a>, populasi spesies air tawar telah menurun hingga 84% sejak 1970 karena perubahan iklim dan polusi.</p>

      <h2>5. Implikasi Sosial dan Ekonomi</h2>
      <p>Perubahan iklim mempengaruhi ketahanan pangan dan meningkatkan risiko konflik terkait air. FAO memperkirakan bahwa perubahan iklim bisa mengurangi hasil panen hingga 30% di beberapa wilayah, dan kelangkaan air dapat memicu konflik antarwilayah.</p>

      <h2>Kesimpulan</h2>
      <p>Dampak perubahan iklim pada air adalah masalah serius yang perlu segera ditangani. Mengurangi emisi gas rumah kaca, memperbaiki infrastruktur air, dan mengimplementasikan praktik hemat air adalah langkah-langkah yang dapat diambil untuk mengatasi krisis ini.</p>

      <p class="source">Sumber: IPCC, NASA, Nature, EPA, Water Resources Research, WWF, FAO, UN Chronicle, World Bank.</p>
    `,
  },
  5: {
    title:
      "Konservasi Air di Perkotaan: Langkah-Langkah Strategis Mengatasi Krisis Air",
    image: "img/5.webp",
    content: `
    <p>Dengan meningkatnya jumlah penduduk di perkotaan, konservasi air menjadi prioritas utama. Berdasarkan laporan <a href="https://www.worldwatercouncil.org/en" target="_blank">Dewan Air Dunia</a> tahun 2024, sekitar 30% kota besar dunia menghadapi krisis air yang signifikan. Artikel ini mengupas langkah-langkah penting yang dapat diterapkan di perkotaan untuk menjaga ketersediaan air bersih.</p>

    <h2>1. Penggunaan Teknologi Deteksi Kebocoran</h2>
    <p>Instalasi teknologi deteksi kebocoran dapat mengurangi limbah air hingga 20%, menurut <a href="https://www.who.int/water_sanitation_health/resourcesquality/wsh9202/en/" target="_blank">WHO</a>. Teknologi ini membantu menemukan dan memperbaiki kebocoran secara cepat dan efisien.</p>

    <h2>2. Pengelolaan Air Hujan</h2>
    <p>Pengelolaan air hujan dengan membangun kolam retensi atau sistem drainase dapat mengurangi beban sistem penyediaan air. Menurut <a href="https://www.epa.gov/green-infrastructure" target="_blank">EPA</a>, kota yang menerapkan pengelolaan air hujan secara efektif dapat mengurangi limpasan air hingga 30%.</p>

    <h2>3. Edukasi Masyarakat</h2>
    <p>Menyadarkan masyarakat untuk menghemat air dapat membawa perubahan besar. Berdasarkan laporan <a href="https://water.org/our-impact/where-we-work/india/" target="_blank">Water.org</a>, edukasi tentang konservasi air dapat mengurangi konsumsi air per kapita di perkotaan hingga 15%.</p>

    <h2>4. Pemanfaatan Air Daur Ulang</h2>
    <p>Memanfaatkan air daur ulang untuk keperluan non-konsumsi seperti penyiraman taman atau pencucian kendaraan dapat menghemat penggunaan air bersih hingga 25%, menurut <a href="https://www.globalwaterintel.com/" target="_blank">Global Water Intelligence</a>.</p>

    <h2>Kesimpulan</h2>
    <p>Konservasi air di kota besar memerlukan kolaborasi antara pemerintah, masyarakat, dan teknologi. Dengan upaya bersama, ketersediaan air bersih di perkotaan dapat terjaga untuk masa depan.</p>

    <p class="source">Sumber: Dewan Air Dunia, WHO, EPA, Water.org, Global Water Intelligence.</p>
  `,
  },
  6: {
    title: "Kasus Krisis Air di Cape Town: Pelajaran dari Hari Nol",
    image: "img/6.webp",
    content: `
    <p>Pada tahun 2018, Cape Town di Afrika Selatan menghadapi salah satu krisis air terbesar dalam sejarah modern, dikenal sebagai "Hari Nol." Pada saat itu, level waduk utama yang memasok air ke kota hampir habis, dan pemerintah memperingatkan bahwa jika tidak ada langkah drastis, kota akan kehabisan air. Artikel ini mengupas bagaimana Cape Town hampir mencapai "Hari Nol" dan langkah-langkah yang diambil untuk menghindari bencana tersebut.</p>

    <h2>1. Penyebab Krisis: Kekeringan Berkepanjangan dan Permintaan yang Tinggi</h2>
    <p>Krisis di Cape Town disebabkan oleh kombinasi kekeringan yang parah dan meningkatnya permintaan air seiring bertambahnya populasi. Menurut laporan <a href="https://www.climatechangepost.com/news/2020/7/27/cape-towns-day-zero-when-cities-dry-out/" target="_blank">Climate Change Post</a>, Afrika Selatan mengalami tiga tahun berturut-turut kekeringan, yang mengurangi ketersediaan air di waduk utama hingga kurang dari 13%. Di sisi lain, pertumbuhan populasi meningkatkan permintaan air domestik, yang memperburuk situasi.</p>

    <h2>2. Tindakan Pemerintah: Pembatasan dan Edukasi Masyarakat</h2>
    <p>Untuk mengatasi situasi kritis ini, pemerintah memberlakukan pembatasan air ketat yang dikenal sebagai “Water Level Restrictions.” Masyarakat dibatasi untuk menggunakan hanya 50 liter air per hari. Kampanye edukasi gencar dilakukan, mengingatkan warga akan pentingnya setiap tetes air. Berdasarkan <a href="https://www.cityofcapetown.gov.za" target="_blank">data dari Kota Cape Town</a>, konsumsi air berkurang drastis hingga 57% setelah langkah ini dijalankan.</p>

    <h2>3. Inovasi Teknologi: Peningkatan Infrastruktur dan Desalinasi</h2>
    <p>Selain pembatasan, pemerintah juga mengimplementasikan proyek infrastruktur besar-besaran. Desalinasi menjadi salah satu solusi, dengan didirikannya fasilitas desalinasi untuk mengubah air laut menjadi air minum. Teknologi lain yang digunakan adalah sensor untuk mendeteksi kebocoran dalam sistem distribusi air, mengurangi limbah air lebih lanjut.</p>

    <h2>4. Peran Masyarakat dalam Menghemat Air</h2>
    <p>Masyarakat Cape Town memainkan peran kunci dalam menghindari “Hari Nol.” Banyak warga yang mulai menampung air hujan, menggunakan air daur ulang untuk kebutuhan non-konsumsi, dan mengurangi penggunaan air secara keseluruhan. Menurut <a href="https://theconversation.com/cape-towns-water-crisis-what-it-means-for-the-world-93035" target="_blank">The Conversation</a>, upaya masyarakat bersama dengan pemerintah adalah alasan utama mengapa “Hari Nol” berhasil dihindari.</p>

    <h2>5. Dampak Jangka Panjang dan Pelajaran yang Diperoleh</h2>
    <p>Walaupun krisis berhasil diatasi, dampaknya masih terasa hingga sekarang. Cape Town tetap memberlakukan kebijakan konservasi air jangka panjang, termasuk memperkuat infrastruktur dan mempromosikan teknologi pengolahan air. Pengalaman Cape Town mengajarkan bahwa konservasi air memerlukan kombinasi manajemen krisis, perencanaan jangka panjang, dan partisipasi aktif masyarakat.</p>

    <h2>Kesimpulan</h2>
    <p>Kasus "Hari Nol" di Cape Town menunjukkan bahwa krisis air bukan hanya ancaman teoretis. Dengan perubahan iklim yang terus berlanjut, kota-kota lain juga berpotensi menghadapi situasi serupa. Kesuksesan Cape Town dalam mencegah "Hari Nol" menjadi contoh bagaimana kombinasi kebijakan yang tepat, teknologi, dan partisipasi publik bisa menyelamatkan kota dari krisis air.</p>

    <p class="source">Sumber: Climate Change Post, City of Cape Town, The Conversation.</p>
  `,
  },
  7: {
    title:
      "Revolusi Air Bersih: Teknologi Masa Depan yang Mengubah Cara Kita Mengakses Air",
    image: "img/7.webp",
    content: `
    <p>Krisis air global telah menjadi perhatian dunia. Data dari <a href="https://www.unwater.org/" target="_blank">United Nations Water (UN-Water)</a> menunjukkan bahwa sekitar 2 miliar orang tidak memiliki akses ke air bersih yang aman, sementara kebutuhan air terus meningkat akibat pertumbuhan populasi dan urbanisasi. Namun, perkembangan teknologi memberikan harapan baru. Berbagai inovasi kini muncul untuk menjawab tantangan ini, mulai dari teknologi desalinasi hingga penangkapan air atmosfer.</p>

    <h2>1. Desalinasi Generasi Baru: Air Laut Menjadi Minuman</h2>
    <p>Proses desalinasi atau pemisahan garam dari air laut telah ada sejak puluhan tahun lalu, tetapi inovasi terkini menjadikan teknologi ini lebih efisien. Misalnya, penelitian dari <a href="https://news.mit.edu/2020/passive-solar-powered-water-desalination-0207" target="_blank">Massachusetts Institute of Technology (MIT)</a> mengembangkan metode desalinasi berbasis grafena yang memerlukan energi lebih rendah dibandingkan osmosis balik konvensional.</p>
    <p>Teknologi ini dapat menghasilkan hingga 1.500 liter air bersih per hari dengan menggunakan panel surya, membuatnya cocok untuk daerah terpencil yang tidak memiliki akses ke jaringan listrik.</p>
    <p><strong>Tantangan:</strong> Meski efisien, biaya awal instalasi dan pengelolaan desalinasi masih tinggi. Namun, investasi di sektor ini terus meningkat, terutama di negara-negara Timur Tengah seperti Uni Emirat Arab dan Arab Saudi.</p>

    <h2>2. Penangkapan Air dari Atmosfer: Sumber Baru di Tengah Kekeringan</h2>
    <p>Air atmosfer, meski tidak terlihat, mengandung uap air yang bisa dimanfaatkan. Teknologi penangkapan air atmosfer atau <strong>Atmospheric Water Generators (AWG)</strong> mulai populer di berbagai negara. Perangkat ini menangkap uap air dari udara, mengembunkannya, dan memurnikannya menjadi air minum.</p>
    <p>Sebuah startup berbasis di California, <a href="https://www.source.co/" target="_blank">Source Global</a>, telah menciptakan panel surya yang dapat menghasilkan hingga 5 liter air bersih per hari dari udara, bahkan di daerah gersang seperti Gurun Arizona.</p>
    <p><strong>Potensi:</strong> Teknologi ini dapat menjadi solusi bagi wilayah yang sulit mengakses sumber air tradisional, seperti pulau kecil atau daerah pedalaman.</p>

    <h2>3. Teknologi IoT untuk Manajemen Air</h2>
    <p>Internet of Things (IoT) telah merevolusi cara kita memantau dan mengelola sumber daya air. Sensor berbasis IoT memungkinkan pemantauan real-time kualitas air, tingkat kebocoran, dan penggunaan air di rumah tangga atau industri. Data dari <a href="https://iwa-network.org/" target="_blank">International Water Association (IWA)</a> menunjukkan bahwa implementasi IoT dapat mengurangi kebocoran air hingga 25% di kota-kota besar.</p>
    <p>Kota seperti Singapura telah mengadopsi sistem pintar ini melalui inisiatif <strong>"Smart Water Grid"</strong>, yang tidak hanya mengurangi limbah air, tetapi juga memberikan informasi akurat tentang konsumsi air warga.</p>

    <h2>4. Inovasi dalam Daur Ulang Air Limbah</h2>
    <p>Daur ulang air limbah kini tidak hanya menjadi alternatif, tetapi kebutuhan. Singapura memimpin dengan teknologi <strong>NEWater</strong>, yang mampu mengolah air limbah menjadi air minum berkualitas tinggi melalui proses filtrasi canggih dan sterilisasi ultraviolet.</p>
    <p>Menurut <a href="https://www.adb.org/" target="_blank">Asian Development Bank (ADB)</a>, daur ulang air limbah dapat menghemat hingga 50% penggunaan air bersih dalam sektor industri. Hal ini juga membantu mengurangi polusi air yang biasanya disebabkan oleh limbah domestik dan industri.</p>

    <h2>5. Hambatan dan Masa Depan</h2>
    <p>Meski teknologi air bersih semakin canggih, tantangan besar tetap ada. Biaya pengembangan dan implementasi masih menjadi hambatan utama, terutama bagi negara berkembang. Selain itu, edukasi masyarakat tentang pentingnya inovasi ini juga perlu ditingkatkan.</p>
    <p>Namun, dengan adanya investasi global dan kerja sama internasional, solusi ini dapat diakses oleh lebih banyak orang. <a href="https://www.weforum.org/" target="_blank">World Economic Forum (WEF)</a> memproyeksikan bahwa pasar teknologi air bersih akan tumbuh hingga 15% per tahun hingga 2030, menunjukkan peluang besar di masa depan.</p>

    <h2>Kesimpulan</h2>
    <p>Revolusi teknologi telah membawa harapan baru dalam menghadapi krisis air bersih. Dari desalinasi hingga manajemen berbasis IoT, inovasi-inovasi ini membuktikan bahwa tantangan air bersih dapat diatasi dengan kombinasi teknologi, investasi, dan kesadaran global. Namun, keberlanjutan hanya bisa dicapai jika pemerintah, industri, dan masyarakat bekerja sama untuk memanfaatkan teknologi ini secara bertanggung jawab.</p>

    <p class="source">Sumber: UN-Water, MIT, Source Global, IWA, ADB, WEF</p>
  `,
  },
  8: {
    title:
      "Menguak Potensi Ekonomi dari Daur Ulang Air Limbah: Peluang dan Tantangan",
    image: "img/8.webp",
    content: `
    <p>Daur ulang air limbah bukan lagi sekadar solusi lingkungan, melainkan peluang ekonomi yang menjanjikan. Berdasarkan laporan dari <a href="https://www.worldbank.org/" target="_blank">Bank Dunia</a>, pasar global untuk daur ulang air diperkirakan mencapai nilai $23 miliar pada tahun 2030, berkat meningkatnya permintaan dari sektor agrikultur, industri, dan domestik.</p>

    <h2>1. Potensi Ekonomi di Sektor Industri</h2>
    <p>Industri merupakan salah satu konsumen air terbesar, dengan 22% dari penggunaan air global dialokasikan untuk sektor ini. Teknologi seperti <strong>Membrane Bioreactor (MBR)</strong> memungkinkan pengolahan air limbah yang efektif, menghasilkan air yang dapat digunakan kembali untuk pendinginan mesin atau proses produksi. Di India, perusahaan besar seperti <a href="https://www.tata.com/" target="_blank">Tata Steel</a> telah menghemat biaya operasional hingga 30% dengan mendaur ulang air limbahnya.</p>

    <h2>2. Peluang untuk Pertanian</h2>
    <p>Pertanian menggunakan lebih dari 70% pasokan air global, menjadikannya sektor yang paling bergantung pada inovasi daur ulang. Di Israel, air limbah yang diolah menyumbang hampir 90% dari kebutuhan irigasi. Model ini tidak hanya mengurangi tekanan pada sumber daya air tawar, tetapi juga meningkatkan hasil panen dengan menyediakan nutrisi tambahan dari limbah organik.</p>

    <h2>3. Teknologi Baru untuk Air Limbah Domestik</h2>
    <p>Teknologi seperti <strong>Greywater Systems</strong> memungkinkan rumah tangga mengolah air bekas mencuci atau mandi untuk digunakan kembali dalam penyiraman taman atau toilet. Menurut <a href="https://www.unep.org/" target="_blank">UNEP</a>, sistem ini dapat mengurangi konsumsi air bersih hingga 50% di lingkungan perkotaan, sekaligus menekan tagihan air rumah tangga.</p>

    <h2>4. Tantangan yang Harus Diatasi</h2>
    <p>Meski menjanjikan, daur ulang air limbah menghadapi tantangan besar, seperti:</p>
    <ul>
      <li><strong>Biaya Awal:</strong> Investasi untuk instalasi dan teknologi pengolahan sering kali tinggi, membuatnya sulit diakses oleh negara berkembang.</li>
      <li><strong>Stigma Masyarakat:</strong> Banyak orang masih enggan menggunakan air hasil daur ulang karena persepsi kebersihan.</li>
      <li><strong>Kerangka Regulasi:</strong> Tidak semua negara memiliki regulasi yang jelas untuk memanfaatkan air limbah secara aman.</li>
    </ul>

    <h2>5. Langkah-Langkah Menuju Keberlanjutan</h2>
    <p>Untuk memaksimalkan potensi ekonomi, pemerintah dan sektor swasta harus bekerja sama. Subsidi untuk teknologi daur ulang, kampanye edukasi publik, dan regulasi yang mendukung adalah kunci untuk mengubah air limbah dari limbah menjadi aset ekonomi.</p>

    <h2>Kesimpulan</h2>
    <p>Daur ulang air limbah tidak hanya membantu mengatasi krisis air, tetapi juga membuka peluang ekonomi baru. Dengan investasi yang tepat dan perubahan pola pikir masyarakat, teknologi ini dapat menjadi solusi berkelanjutan untuk tantangan air global di masa depan.</p>

    <p class="source">Sumber: Bank Dunia, UNEP, Tata Steel</p>
  `,
  },
}; 

// Mendapatkan ID artikel dari URL
const articleId = getUrlParameter("id");

// Mengisi konten artikel berdasarkan ID
if (articleId && articles[articleId]) {
  fillArticleContent(articles[articleId]);
} else {
  fillArticleContent(null);
}

// Toggle menu mobile
document.querySelector(".mobile-menu-btn").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("show");
});

// Menutup menu mobile saat link diklik
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.remove("show");
  });
});
