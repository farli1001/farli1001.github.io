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
    image: "https://source.unsplash.com/random/800x400?water,saving",
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
    image: "https://source.unsplash.com/random/800x400?water,pollution",
    content: `
            <p>Polusi air telah menjadi salah satu ancaman terbesar bagi ekosistem akuatik di seluruh dunia. Menurut laporan
            <a href="https://www.unwater.org/publications/un-world-water-development-report-2023" target="_blank">UNEP tahun
            2023</a>, lebih dari 80% air limbah global dibuang ke lingkungan tanpa pengolahan yang memadai,
            menyebabkan kerusakan serius pada sungai, danau, dan lautan kita. Artikel ini akan mengeksplorasi secara
            mendalam bagaimana polusi air mempengaruhi kehidupan akuatik dan keseimbangan ekosistem air.</p>

            <h2>1. Eutrofikasi: Ancaman Tersembunyi</h2>
            <p>Eutrofikasi adalah salah satu dampak paling signifikan dari polusi air. Fenomena ini terjadi ketika nutrisi
            berlebih, terutama nitrogen dan fosfor, masuk ke badan air. Sebuah studi oleh <a
            href="https://www.epa.gov/nutrientpollution/problem" target="_blank">Environmental Protection
            Agency (EPA) AS</a> menunjukkan bahwa 40% dari danau dan sungai di Amerika Serikat mengalami eutrofikasi.
            Dampak eutrofikasi meliputi:</p>
            <ul>
            <li>Pertumbuhan alga yang tidak terkendali (blooming), yang dapat menutupi permukaan air dan menghambat
            penetrasi cahaya.</li>
            <li>Penurunan drastis kadar oksigen terlarut, menyebabkan kondisi hipoksia atau bahkan anoksia.</li>
            <li>Kematian massal ikan dan organisme air lainnya akibat kekurangan oksigen.</li>
            <li>Perubahan komposisi spesies dalam ekosistem, sering kali mengarah pada dominasi spesies yang lebih toleran
            terhadap polusi.</li>
            </ul>

            <h2>2. Bioakumulasi Toksin: Ancaman Jangka Panjang</h2>
            <p>Polutan persisten seperti merkuri, PCB (Polychlorinated Biphenyls), dan pestisida dapat terakumulasi dalam
            jaringan organisme air melalui proses yang disebut bioakumulasi. Penelitian yang dipublikasikan dalam jurnal <a
            href="https://www.epa.gov/mercury/health-effects-exposures-mercury" target="_blank">"Environmental Science &
            Technology"</a>
            menemukan bahwa konsentrasi merkuri dalam ikan predator di beberapa wilayah telah mencapai tingkat yang
            membahayakan kesehatan manusia. Efek bioakumulasi meliputi:</p>
            <ul>
            <li>Gangguan sistem reproduksi pada ikan, menyebabkan penurunan populasi.</li>
            <li>Perubahan perilaku pada organisme air, mempengaruhi pola makan dan migrasi.</li>
            <li>Risiko kesehatan bagi predator tingkat atas, termasuk manusia yang mengkonsumsi ikan tercemar.</li>
            <li>Kerusakan genetik yang dapat diturunkan ke generasi berikutnya.</li>
            </ul>

            <h2>3. Hilangnya Keanekaragaman Hayati</h2>
            <p>Polusi air adalah salah satu penyebab utama hilangnya keanekaragaman hayati akuatik. Laporan <a
            href="https://livingplanet.panda.org/en-US/" target="_blank">"Living Planet Report" oleh WWF tahun 2024</a>
            menunjukkan penurunan rata-rata 83% populasi spesies air tawar sejak 1970, dengan polusi air sebagai faktor
            utama. Dampak pada keanekaragaman hayati meliputi:</p>
            <ul>
            <li>Kepunahan lokal spesies yang sensitif terhadap polusi.</li>
            <li>Gangguan rantai makanan akuatik, menyebabkan ketidakseimbangan ekosistem.</li>
            <li>Hilangnya habitat penting seperti terumbu karang akibat pengasaman laut.</li>
            <li>Penurunan populasi spesies kunci yang berperan penting dalam menjaga kesehatan ekosistem.</li>
            </ul>

            <h2>4. Asidifikasi Air: Perubahan Kimia yang Mengancam</h2>
            <p>Peningkatan CO2 atmosfer tidak hanya menyebabkan perubahan iklim tetapi juga mengakibatkan asidifikasi air,
            terutama di lautan. Studi oleh <a
            href="https://www.noaa.gov/education/resource-collections/ocean-coasts/ocean-acidification"
            target="_blank">National Oceanic and Atmospheric Administration (NOAA)</a> menunjukkan bahwa pH air laut telah
            menurun sebesar 0,1 unit sejak era pra-industri, yang meskipun terdengar kecil, sebenarnya merepresentasikan
            peningkatan keasaman sebesar 30%. Dampak asidifikasi meliputi:</p>
            <ul>
            <li>Kerusakan pada cangkang dan rangka kapur organisme seperti kerang, siput, dan karang.</li>
            <li>Gangguan proses fisiologis pada ikan, termasuk kemampuan untuk mendeteksi predator.</li>
            <li>Perubahan dalam siklus nutrisi laut, mempengaruhi produktivitas primer.</li>
            <li>Potensi kolapsnya ekosistem terumbu karang, yang merupakan rumah bagi 25% dari seluruh kehidupan laut.</li>
            </ul>

            <h2>5. Sedimentasi: Perubahan Fisik Habitat Akuatik</h2>
            <p>Erosi tanah yang berlebihan akibat praktik pertanian dan pembangunan yang tidak berkelanjutan menyebabkan
            sedimentasi di badan air. Penelitian yang dilakukan oleh <a
            href="https://wedocs.unep.org/handle/20.500.11822/27539;jsessionid=CEDC8A31E5F776FF07BD9C0E53C8104E" target="_blank">United Nations
            Environment Programme (UNEP)</a> pada tahun 2022 mengestimasi bahwa sedimentasi telah mengurangi kapasitas
            waduk global sebesar 25% dan mengancam kelangsungan hidup banyak spesies akuatik. Dampak sedimentasi meliputi:</p>
            <ul>
            <li>Peningkatan kekeruhan air, mengurangi penetrasi cahaya yang penting untuk fotosintesis tanaman air.</li>
            <li>Tertutupnya habitat penting seperti daerah pemijahan ikan dan komunitas bentik.</li>
            <li>Penyumbatan insang ikan, mengganggu proses pernapasan.</li>
            <li>Perubahan aliran sungai dan morfologi dasar perairan.</li>
            </ul>

            <h2>6. Polusi Plastik: Ancaman Modern bagi Kehidupan Akuatik</h2>
            <p>Polusi plastik telah menjadi masalah global yang semakin mengkhawatirkan. Laporan dari <a
            href="https://www.ellenmacarthurfoundation.org/the-new-plastics-economy-rethinking-the-future-of-plastics" target="_blank">Ellen MacArthur
            Foundation</a> tahun 2024 memproyeksikan bahwa pada tahun 2050, lautan kita akan mengandung lebih banyak
            plastik berdasarkan berat daripada ikan jika tren saat ini berlanjut. Dampak polusi plastik pada ekosistem akuatik
            meliputi:</p>
            <ul>
            <li>Terperangkapnya hewan laut dalam sampah plastik, menyebabkan cedera atau kematian.</li>
            <li>Konsumsi mikroplastik oleh organisme air, yang dapat menyebabkan keracunan dan gangguan sistem pencernaan.</li>
            <li>Penyebaran spesies invasif yang menempel pada sampah plastik yang mengapung.</li>
            <li>Degradasi habitat penting seperti terumbu karang dan padang lamun akibat tertutup atau terbelit plastik.</li>
            </ul>

            <h2>Kesimpulan</h2>
            <p>Dampak polusi air terhadap ekosistem akuatik sangat luas dan kompleks, mempengaruhi semua tingkat kehidupan air
            dari mikroorganisme hingga predator puncak. Kerusakan yang ditimbulkan tidak hanya berdampak pada biodiversitas
            tetapi juga pada kesehatan manusia dan ekonomi global yang bergantung pada sumber daya air. Upaya untuk
            mengatasi polusi air membutuhkan pendekatan holistik yang melibatkan perbaikan praktik pengelolaan limbah, regulasi yang
            lebih ketat terhadap pembuangan polutan, inovasi dalam teknologi pengolahan air, dan perubahan perilaku
            konsumen. Hanya dengan tindakan kolektif dan komitmen global, kita dapat berharap untuk memulihkan dan melindungi
            ekosistem akuatik kita yang berharga untuk generasi mendatang.</p>

            <p class="source">Sumber: UNEP, EPA, Environmental Science & Technology, WWF, NOAA, Ellen MacArthur Foundation.</p>
        `,
  },
  3: {
    title:
      "Teknologi Terkini dalam Pengolahan Air: Inovasi untuk Masa Depan yang Berkelanjutan",
    image: "https://source.unsplash.com/random/800x400?water,technology",
    content: `
            <p>Seiring dengan meningkatnya tekanan pada sumber daya air global, inovasi dalam teknologi pengolahan air menjadi
            semakin krusial. Artikel ini akan menjelajahi beberapa terobosan terbaru dalam teknologi pengolahan air, termasuk
            desalinasi, filtrasi membran, dan sistem daur ulang air yang canggih.</p>

            <h2>1. Desalinasi: Mengubah Air Laut Menjadi Air Minum</h2>
            <p>Desalinasi telah menjadi solusi penting bagi negara-negara yang menghadapi kelangkaan air tawar. Teknologi
            terbaru dalam desalinasi meliputi:</p>
            <ul>
            <li>Osmosis Balik Lanjutan: Menurut <a href="https://www.nature.com/articles/s41545-019-0039-9" target="_blank">
            penelitian yang dipublikasikan di Nature</a>, membran osmosis balik generasi baru dapat mengurangi konsumsi
            energi hingga 20%.</li>
            <li>Desalinasi Berbasis Grafena: Material baru ini menjanjikan efisiensi yang lebih tinggi dalam proses
            penyaringan air laut.</li>
            <li>Desalinasi Tenaga Surya: Proyek-proyek seperti yang dikembangkan oleh <a
            href="https://news.mit.edu/2020/passive-solar-powered-water-desalination-0207" target="_blank">MIT</a>
            menunjukkan potensi desalinasi yang digerakkan oleh energi matahari, mengurangi ketergantungan pada bahan
            bakar fosil.</li>
            </ul>

            <h2>2. Filtrasi Membran Canggih</h2>
            <p>Teknologi membran telah berkembang pesat dalam beberapa tahun terakhir:</p>
            <ul>
            <li>Nanofiltrasi: Mampu menyaring kontaminan berukuran nano, termasuk virus dan ion logam berat.</li>
            <li>Membran Self-Cleaning: Dikembangkan oleh peneliti di <a
            href="https://news.yale.edu/2020/03/18/membrane-technology-cleans-water-cleans-itself" target="_blank">Yale
            University</a>, membran ini dapat membersihkan dirinya sendiri, mengurangi kebutuhan perawatan.</li>
            <li>Membran Biomimetik: Terinspirasi oleh proses alami dalam organisme hidup, membran ini menawarkan
            selektivitas dan efisiensi yang lebih tinggi.</li>
            </ul>

            <h2>3. Sistem Daur Ulang Air Canggih</h2>
            <p>Daur ulang air menjadi semakin penting dalam manajemen sumber daya air:</p>
            <ul>
            <li>Sistem Pengolahan Air Limbah Terdistribusi: Teknologi ini memungkinkan pengolahan air limbah di lokasi,
            mengurangi kebutuhan infrastruktur besar.</li>
            <li>Bioreaktor Membran (MBR): Menggabungkan proses biologis dengan filtrasi membran untuk pengolahan air
            limbah yang sangat efektif.</li>
            <li>Teknologi NEWater: Dikembangkan di Singapura, sistem ini menggunakan teknologi membran dan UV lanjutan
            untuk menghasilkan air daur ulang berkualitas tinggi.</li>
            </ul>

            <h2>4. Pengolahan Air Berbasis AI dan IoT</h2>
            <p>Kecerdasan buatan (AI) dan Internet of Things (IoT) sedang merevolusi cara kita mengelola dan mengolah air:</p>
            <ul>
            <li>Sistem Pemantauan Real-time: Sensor IoT memungkinkan pemantauan kualitas air secara konstan dan deteksi
            dini kontaminasi.</li>
            <li>Optimasi Proses Berbasis AI: Algoritma machine learning dapat mengoptimalkan proses pengolahan air,
            meningkatkan efisiensi dan mengurangi penggunaan bahan kimia.</li>
            <li>Prediksi Kebutuhan Air: AI dapat memprediksi kebutuhan air masa depan, membantu dalam perencanaan dan
            manajemen sumber daya yang lebih baik.</li>
            </ul>

            <h2>5. Teknologi Penyerapan dan Adsorpsi Inovatif</h2>
            <p>Material baru sedang dikembangkan untuk meningkatkan efektivitas penyerapan kontaminan:</p>
            <ul>
            <li>Nanopartikel Magnetik: Dapat menghilangkan kontaminan seperti arsenik dan logam berat lainnya dari air.</li>
            <li>Karbon Aktif Lanjutan: Dikembangkan dengan struktur pori yang lebih efisien untuk penyerapan kontaminan
            organik.</li>
            <li>Zeolit Sintetis: Material ini dapat disesuaikan untuk menangkap kontaminan spesifik dengan efektivitas
            tinggi.</li>
            </ul>

            <h2>Kesimpulan</h2>
            <p>Teknologi pengolahan air terus berkembang dengan pesat, menawarkan solusi untuk tantangan air global yang
            semakin kompleks. Dari desalinasi yang lebih efisien hingga sistem daur ulang air canggih, inovasi-inovasi ini
            membuka jalan menuju masa depan di mana air bersih tersedia secara berkelanjutan untuk semua. Namun, penting
            untuk diingat bahwa teknologi harus diimplementasikan bersama dengan kebijakan yang tepat dan perubahan
            perilaku untuk mencapai manajemen air yang benar-benar berkelanjutan.</p>

            <p class="source">Sumber: Nature, MIT, Yale University, PubMed Central, Water Research.</p>
        `,
  },
  4: {
    title:
      "Dampak Perubahan Iklim terhadap Sumber Daya Air: Krisis Global yang Mendesak",
    image: "https://source.unsplash.com/random/800x400?climate,water",
    content: `
            <p>Perubahan iklim telah menjadi salah satu ancaman terbesar bagi ketersediaan dan kualitas sumber daya air di
            seluruh dunia. Artikel ini akan mengeksplorasi bagaimana perubahan iklim mempengaruhi siklus air global dan
            dampaknya terhadap ekosistem serta masyarakat.</p>

            <h2>1. Perubahan Pola Curah Hujan</h2>
            <p>Menurut laporan terbaru dari Intergovernmental Panel on Climate Change (IPCC) tahun 2024, perubahan iklim telah
            secara signifikan mengubah pola curah hujan global:</p>
            <ul>
            <li>Daerah kering menjadi lebih kering: Wilayah seperti Mediterania, Afrika Selatan, dan Australia Barat
                mengalami penurunan curah hujan tahunan yang signifikan.</li>
            <li>Daerah basah menjadi lebih basah: Bagian utara Eropa, Amerika Utara, dan Asia Tenggara mengalami peningkatan
                curah hujan tahunan yang mengakibatkan banjir bandang dan hujan lebat.</li>
            <li>Peningkatan frekuensi cuaca ekstrem: Kejadian hujan lebat dan banjir bandang meningkat sejak tahun 1980,
                seperti dilaporkan oleh IPCC.</li>
            </ul>

            <h2>2. Dampak pada Ketersediaan Air Tawar</h2>
            <p>Perubahan pola curah hujan dan suhu yang meningkat berdampak langsung pada ketersediaan air tawar:</p>
            <ul>
            <li>Mencairnya gletser: Menurut studi yang dipublikasikan dalam <a href="https://www.nature.com/articles/s41586-021-03436-z" target="_blank">Nature</a>, gletser di seluruh dunia kehilangan massa rata-rata 267 gigaton per tahun antara 2000 dan 2019, yang mengancam pasokan air tawar bagi miliaran orang.</li>
            <li>Penurunan muka air tanah: Data dari <a href="https://grace.jpl.nasa.gov/" target="_blank">NASA GRACE-FO</a> menunjukkan penurunan muka air tanah di banyak akuifer utama dunia, terutama di daerah yang bergantung pada air tanah untuk irigasi.</li>
            <li>Kekeringan yang berkepanjangan: Peningkatan kekeringan telah tercatat di berbagai wilayah kering dunia, seperti yang dilaporkan oleh <a href="https://www.ipcc.ch/report/ar6/wg1/" target="_blank">IPCC AR6</a>.</li>
            </ul>

            <h2>3. Dampak pada Kualitas Air</h2>
            <p>Perubahan iklim tidak hanya mempengaruhi kuantitas, tetapi juga kualitas air:</p>
            <ul>
            <li>Peningkatan suhu air: Suhu rata-rata air permukaan global meningkat, menyebabkan peningkatan pertumbuhan alga dan penurunan kadar oksigen terlarut, seperti yang dilaporkan oleh <a href="https://www.epa.gov/climate-indicators/climate-change-indicators-stream-temperature" target="_blank">EPA</a>.</li>
            <li>Intrusi air laut: Kenaikan permukaan laut menyebabkan intrusi air asin ke akuifer pesisir, mengancam pasokan air tawar di daerah pantai. Studi oleh <a href="https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2018WR023324" target="_blank">Water Resources Research</a> menunjukkan peningkatan risiko ini di banyak wilayah pesisir.</li>
            <li>Peningkatan polusi: Curah hujan yang lebih intens meningkatkan limpasan permukaan, membawa lebih banyak polutan ke badan air.</li>
            </ul>

            <h2>4. Dampak pada Ekosistem Akuatik</h2>
            <p>Perubahan iklim memiliki dampak luas pada ekosistem air tawar dan laut:</p>
            <ul>
            <li>Perubahan habitat: Pemanasan air mengubah distribusi spesies akuatik, memaksa beberapa spesies bermigrasi ke arah kutub atau ke perairan yang lebih dalam.</li>
            <li>Ancaman terhadap keanekaragaman hayati: Menurut <a href="https://www.worldwildlife.org/publications/living-planet-report-2020" target="_blank">WWF Living Planet Report 2020</a>, populasi spesies air tawar telah menurun rata-rata 84% sejak 1970.</li>
            <li>Perubahan siklus nutrisi: Perubahan suhu dan pola arus mempengaruhi siklus nutrisi di ekosistem akuatik, berdampak pada produktivitas primer dan rantai makanan.</li>
            </ul>

            <h2>5. Implikasi Sosial-Ekonomi</h2>
            <p>Dampak perubahan iklim pada sumber daya air memiliki implikasi luas bagi masyarakat dan ekonomi:</p>
            <ul>
            <li>Ketahanan pangan: Perubahan dalam ketersediaan air mempengaruhi produksi pertanian global. FAO memperkirakan bahwa perubahan iklim dapat mengurangi hasil panen hingga 30% di beberapa wilayah.</li>
            <li>Konflik air: Kelangkaan air yang meningkat dapat memicu konflik, terutama di daerah lintas batas. <a href="https://www.un.org/en/chronicle/article/womenin-shadow-climate-change" target="_blank">UN Chronicle</a> melaporkan peningkatan risiko konflik terkait air di berbagai wilayah.</li>
            <li>Migrasi iklim: Perubahan dalam ketersediaan air mendorong perpindahan populasi. World Bank memperkirakan bahwa hingga 216 juta orang mungkin bermigrasi secara internal akibat perubahan iklim pada tahun 2050.</li>
            </ul>

            <h2>Kesimpulan dan Langkah ke Depan</h2>
            <p>Dampak perubahan iklim terhadap sumber daya air adalah nyata dan semakin mendesak. Diperlukan tindakan kolektif dan cepat untuk mengatasi krisis ini:</p>
            <ul>
            <li>Mitigasi perubahan iklim: Mengurangi emisi gas rumah kaca untuk membatasi pemanasan global.</li>
            <li>Adaptasi infrastruktur air: Meningkatkan ketahanan sistem penyediaan air terhadap perubahan iklim.</li>
            <li>Konservasi air: Mengimplementasikan praktik penghematan air di semua sektor.</li>
            <li>Penelitian dan inovasi: Mengembangkan teknologi baru untuk manajemen air yang lebih efisien.</li>
            <li>Kerjasama internasional: Meningkatkan kolaborasi lintas batas dalam pengelolaan sumber daya air.</li>
            </ul>
            <p>Hanya dengan tindakan yang terkoordinasi dan berkelanjutan, kita dapat berharap untuk mengatasi tantangan air yang ditimbulkan oleh perubahan iklim dan menjamin ketersediaan air bersih untuk generasi mendatang.</p>

            <p class="source">Sumber: IPCC, NASA, Nature, EPA, Water Resources Research, WWF, FAO, UN Chronicle, World Bank.</p>
        `,
  },
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