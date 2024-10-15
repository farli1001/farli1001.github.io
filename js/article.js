// Fungsi untuk mendapatkan parameter dari URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Fungsi untuk mengisi konten artikel
function fillArticleContent(article) {
  if (article) {
    document.getElementById("article-title").textContent = article.title;
    document.getElementById(
      "article-image",
    ).innerHTML = `<img src="${article.image}" alt="${article.title}">`;

    const articleBody = document.getElementById("article-body");
    articleBody.innerHTML = ""; // Clear existing content

    // Parse the HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(article.content, "text/html");
    const elements = doc.body.children;

    let adInserted = false;
    let elementCount = 0;

    // Iterate through the elements and insert the ad after a certain number of elements
    Array.from(elements).forEach((element) => {
      articleBody.appendChild(element.cloneNode(true));
      elementCount++;

      // Insert ad after the 3rd element (adjust as needed)
      if (elementCount === 10 && !adInserted) {
        articleBody.appendChild(createAdElement());
        adInserted = true;
      }
    });

    document.title = `${article.title} - HidroLestari`;
  } else {
    document.getElementById("article-title").textContent =
      "Artikel Tidak Ditemukan";
    document.getElementById("article-image").innerHTML = "";
    document.getElementById("article-body").innerHTML =
      "<p>Maaf, artikel yang Anda cari tidak ditemukan.</p>";
    document.title = "Artikel Tidak Ditemukan - HidroLestari";
  }
}

// Mendapatkan ID artikel dari URL
const articleId = getUrlParameter('id');

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
  "2": {
    "title": "Dampak Polusi Air terhadap Ekosistem Akuatik: Ancaman Serius bagi Kehidupan Air",
    "image": "img/2.webp",
    "content": `
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
    `
  },
  "3": {
    "title": "Teknologi Pengolahan Air Terkini: Solusi untuk Masa Depan",
    "image": "img/3.webp",
    "content": `
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
    `
  },
  "4": {
    "title": "Dampak Perubahan Iklim terhadap Sumber Daya Air: Krisis Global",
    "image": "img/4.webp",
    "content": `
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
    `
  }
};

// Mengisi konten artikel berdasarkan ID
if (articleId && articles[articleId]) {
  fillArticleContent(articles[articleId]);
} else {
  fillArticleContent(null); // Menampilkan pesan artikel tidak ditemukan
}

function createAdElement() {
  const adElement = document.createElement("div");
  adElement.className = "ad-space";
  adElement.innerHTML = `
        <div class="ad-content">
            <h3>Hemat Air, Hemat Masa Depan!</h3>
            <p>Dapatkan alat penghemat air terbaru</p>
            <a href="#" class="ad-button">Beli Sekarang</a>
        </div>
        <div class="water-drop"></div>
    `;
  return adElement;
}
// Fungsi untuk toggle menu mobile
document
  .querySelector(".mobile-menu-btn")
  .addEventListener("click", function () {
    document.querySelector(".nav-links").classList.toggle("show");
  });

// Menutup menu mobile saat link diklik
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.remove("show");
  });
});