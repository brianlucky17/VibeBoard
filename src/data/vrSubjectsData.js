export const VR_SUBJECTS = [
  {
    id: 'ipa-tata-surya',
    subject: 'IPA',
    title: 'Tata Surya Interaktif',
    fase: ['Fase B', 'Fase C'],
    emoji: '🪐',
    badgeColor: 'bg-cyan-600 text-white',
    gradient: 'from-teal-400 to-cyan-500',
    bgColor: '#080710',
    description: 'Investigasi simulasi 3D interaktif mengenai tata surya: menganalisis orbit, hukum gravitasi, perbandingan ukuran planet, serta hubungan sebab akibat rotasi terhadap iklim planet.',
    cp: 'Murid mampu merefleksikan sistem organ tubuh manusia yang dikaitkan dengan cara menjaga kesehatan tubuhnya; menganalisis hubungan antar komponen biotik dan abiotik, serta pengaruhnya terhadap ekosistem; menjelaskan fenomena gelombang bunyi dan cahaya dalam kehidupan sehari-hari; menghasilkan upaya penghematan energi, serta pemanfaatan sumber energi alternatif dari sumber daya yang ada di sekitarnya sebagai upaya mitigasi perubahan iklim; menjelaskan sistem tata surya, serta kaitannya dengan rotasi dan revolusi bumi; menjelaskan letak dan kondisi geografis negara Indonesia dengan menggunakan peta konvensional/digital; meninjau sejarah perjuangan para pahlawan di lingkungan sekitar tempat tinggalnya; menemukan keragaman budaya nasional dalam konteks kebhinekaan berdasarkan pemahaman terhadap nilai-nilai kearifan lokal yang berlaku di wilayah tempat tinggal; serta menerapkan kegiatan ekonomi masyarakat di lingkungan sekitar.',
    tp: [
      'Siswa mampu mengidentifikasi karakteristik planet-planet dalam tata surya secara tepat.',
      'Siswa dapat memodelkan rotasi dan revolusi planet terhadap matahari secara imersif.'
    ],
    steps: [
      {
        title: 'Matahari: Jantung Tata Surya Kita',
        focusObject: 'sun',
        audioUrl: 'https://elevenlabs.io/app/voice-library?voiceId=GdyFAZdMpKMBHw5pc1Bu',
        info: 'Matahari adalah bintang raksasa berbentuk bola gas pijar yang menjadi pusat dari sistem tata surya kita. Seluruh planet, asteroid, komet, dan meteoroid berputar mengelilingi Matahari karena gaya gravitasinya yang sangat besar. Energi yang dipancarkan oleh Matahari berupa cahaya dan panas dihasilkan dari reaksi fusi nuklir hidrogen menjadi helium yang terus-menerus terjadi di intinya. Panas dan cahaya ini sangat penting karena menjadi sumber kehidupan utama bagi seluruh makhluk hidup bagi planet Bumi.',
        facts: [
          'Suhu bagian inti Matahari bisa mencapai 15 juta derajat Celsius, sedangkan suhu permukaannya sekitar 5.500 derajat Celsius.',
          'Matahari berukuran sangat raksasa, sehingga sekitar 1,3 juta planet Bumi bisa muat jika dimasukkan ke dalamnya.',
          'Jarak rata-rata Matahari ke Bumi adalah 150 juta kilometer, dan cahaya Matahari butuh waktu sekitar 8 menit untuk sampai ke Bumi.',
          'Gaya gravitasi Matahari 28 kali lebih kuat daripada gaya gravitasi Bumi, yang menjaga seluruh planet tetap berada di orbitnya.',
          'Matahari tersusun atas 74% gas Hidrogen, 24% gas Helium, serta sisanya adalah unsur Oksigen, Karbon, dan Besi.',
          'Usia Matahari saat ini diperkirakan sudah mencapai 4,6 miliar tahun dan diprediksi masih bisa bersinar hingga 5 miliar tahun lagi.'
        ]
      },
      {
        title: 'Merkurius & Venus: Planet Terdekat',
        focusObject: 'mercury',
        info: 'Merkurius adalah planet terkecil di tata surya dan terletak paling dekat dengan Matahari. Permukaannya dipenuhi kawah seperti Bulan. Sementara Venus adalah planet kedua yang paling terang di langit malam. Venus memiliki atmosfer yang sangat tebal berupa gas karbon dioksida, yang memerangkap panas Matahari sehingga menjadikannya planet terpanas di tata surya kita, bahkan melebihi Merkurius.',
        facts: [
          'Merkurius tidak memiliki atmosfer sama sekali, sehingga suhunya ekstrem: siang hari mencapai 430 derajat Celsius dan malam hari turun hingga minus 180 derajat Celsius.',
          'Venus berputar pada porosnya berlawanan arah dari sebagian besar planet lain (rotasi retrograde).',
          'Satu hari di Venus lebih lama daripada satu tahunnya sendiri karena rotasinya yang sangat lambat.',
          'Efek rumah kaca yang ekstrem di Venus melelehkan timbal dengan suhu permukaan mencapai 475 derajat Celsius.',
          'Merkurius mengitari matahari sangat cepat, hanya membutuhkan waktu 88 hari Bumi untuk satu tahunnya.',
          'Venus sering disebut sebagai Bintang Fajar atau Bintang Kejora karena tampak sangat bersinar indah sebelum matahari terbit.'
        ]
      },
      {
        title: 'Bumi: Rumah Kehidupan Kita',
        focusObject: 'earth',
        info: 'Bumi adalah planet ketiga dari Matahari dan merupakan satu-satunya tempat di alam semesta yang diketahui memiliki tanda-tanda kehidupan. Bumi berada pada zona layak huni (Habitable Zone), di mana suhunya tidak terlalu panas seperti Venus dan tidak terlalu dingin seperti Mars. Hal ini memungkinkan air tetap berada dalam bentuk cair di permukaan Bumi. Lapisan atmosfer Bumi tersusun atas nitrogen dan oksigen yang berfungsi menyaring sinar ultraviolet berbahaya serta menjaga suhu permukaan agar tetap stabil.',
        facts: [
          'Sekitar 71% permukaan Bumi ditutupi oleh air, sedangkan 29% sisanya adalah daratan berupa benua dan pulau-pulau.',
          'Bumi memiliki satu satelit alami bernama Bulan yang mengorbit Bumi setiap 27,3 hari dan mempengaruhi pasang surut air laut.',
          'Atmosfer Bumi juga berfungsi sebagai pelindung (perisai) yang membakar sebagian besar meteor sebelum menabrak tanah.',
          'Bumi berotasi pada porosnya dengan kecepatan sekitar 1.670 km/jam, menghasilkan siklus siang dan malam selama 24 jam.',
          'Inti dalam Bumi berupa bola logam besi dan nikel padat yang sangat panas dengan suhu menyamai permukaan Matahari.',
          'Medan magnet Bumi (magnetosfer) berfungsi seperti perisai tak terlihat yang menangkis radiasi badai angin matahari yang mematikan.'
        ]
      },
      {
        title: 'Mars & Sabuk Asteroid: Tetangga Merah',
        focusObject: 'mars',
        info: 'Mars adalah planet keempat dari Matahari dan dikenal sebagai Planet Merah karena kandungan besi oksida (karat) di permukaannya. Mars memiliki ukuran setengah dari Bumi dan memiliki gunung berapi terbesar di tata surya kita. Di antara orbit Mars dan Jupiter terdapat Sabuk Asteroid, yaitu kumpulan jutaan bongkahan batu dan logam sisa pembentukan tata surya yang ikut mengitari Matahari.',
        facts: [
          'Mars memiliki gunung berapi raksasa bernama Olympus Mons yang tingginya tiga kali lipat gunung Everest di Bumi.',
          'Atmosfer Mars sangat tipis, didominasi oleh gas Karbon Dioksida, sehingga suhunya sangat dingin berkisar minus 60 derajat Celsius.',
          'Mars memiliki dua satelit alami berukuran kecil dan berbentuk tidak beraturan bernama Phobos dan Deimos.',
          'Sabuk asteroid menampung jutaan asteroid dengan diameter bervariasi mulai dari beberapa meter hingga ratusan kilometer.',
          'Waktu satu hari di Mars (disebut Sol) sangat mirip dengan Bumi, yaitu sekitar 24 jam 37 menit.',
          'Terdapat tanda-tanda kuat adanya air es yang membeku di kutub Mars dan di bawah permukaan tanahnya.'
        ]
      },
      {
        title: 'Jupiter & Saturnus: Raksasa Gas & Cincin Es',
        focusObject: 'saturn',
        info: 'Jupiter adalah planet terbesar di tata surya kita dengan ukuran 11 kali diameter Bumi. Planet ini terkenal dengan Bintik Merah Raksasanya, yang merupakan badai badai raksasa berumur ratusan tahun. Saturnus adalah planet terbesar kedua dan sangat terkenal karena keindahan cincinnya yang tersusun atas miliaran bongkahan es dan batuan kosmik.',
        facts: [
          'Jupiter memiliki gaya gravitasi yang sangat kuat sehingga berfungsi sebagai perisai pelindung Bumi dari tabrakan komet raksasa.',
          'Saturnus memiliki kerapatan yang sangat rendah, bahkan lebih ringan daripada air; jika diletakkan di kolam raksasa, ia akan mengapung!',
          'Cincin Saturnus membentang sejauh 282.000 kilometer tetapi memiliki ketebalan rata-rata hanya 10 meter saja.',
          'Jupiter memiliki lebih dari 95 bulan (satelit), termasuk Ganymede yang merupakan satelit terbesar di tata surya kita.',
          'Badai Bintik Merah Raksasa di Jupiter berukuran lebih besar daripada ukuran planet Bumi secara keseluruhan.',
          'Atmosfer kedua planet gas ini didominasi oleh Hidrogen dan Helium, sehingga tidak memiliki permukaan padat untuk dipijak.'
        ]
      },
      {
        title: 'Uranus & Neptunus: Raksasa Es Terluar',
        focusObject: 'uranus',
        info: 'Uranus dan Neptunus adalah dua planet terluar yang tergolong dalam kelompok Raksasa Es (Ice Giants). Uranus memiliki keunikan karena poros rotasinya yang sangat miring hampir 98 derajat, sehingga tampak berputar rebah di orbitnya. Sementara Neptunus adalah planet paling berangin kencang dengan badai supersonik yang berhembus di atmosfer birunya.',
        facts: [
          'Warna biru-hijau indah pada Uranus dan Neptunus disebabkan oleh kandungan gas metana di atmosfer atasnya yang menyerap cahaya merah.',
          'Uranus memiliki sistem cincin tipis vertikal dan mengitari Matahari sekali setiap 84 tahun Bumi.',
          'Neptunus membutuhkan waktu sekitar 165 tahun Bumi untuk mengitari Matahari sebanyak satu putaran penuh.',
          'Suhu di atmosfer Uranus sangat dingin hingga mencapai minus 224 derajat Celsius, menjadikannya atmosfer terdingin.',
          'Neptunus memiliki satelit besar bernama Triton yang mengorbit berlawanan arah dengan rotasi planetnya sendiri.',
          'Kecepatan angin di Neptunus dapat mencapai 2.100 kilometer per jam, yang merupakan rekor tercepat di tata surya.'
        ]
      }
    ]
  },
  {
    id: 'math-geometry',
    subject: 'Matematika',
    title: 'Petualangan Bangun Ruang',
    fase: ['Fase B', 'Fase C'],
    emoji: '📐',
    badgeColor: 'bg-purple-650 text-white',
    gradient: 'from-purple-400 to-indigo-500',
    bgColor: '#1e1b4b',
    description: 'Eksplorasi dan pengamatan bangun ruang 3D: mengklasifikasikan sifat kubus, balok, kerucut, tabung, serta mengamati jaring-jaring bentuk geometri secara interaktif.',
    cp: 'Murid mampu mengkonstruksi dan mengurai bangun ruang (kubus, balok, dan gabungannya) dan mengenali visualisasi spasial (bangun depan, atas, dan samping); membandingkan karakteristik antar bangun datar dan antar bangun ruang; serta menentukan lokasi pada peta yang menggunakan sistem berpetak.',
    tp: [
      'Siswa mampu mengidentifikasi sifat-sifat dan jaring-jaring bangun ruang dengan tepat.',
      'Siswa dapat menghitung volume dan luas permukaan bangun ruang dalam simulasi 3D.'
    ],
    steps: [
      {
        title: 'Kubus: Bangun Ruang Sempurna',
        focusObject: 'cube',
        info: 'Kubus adalah bangun ruang tiga dimensi yang dibatasi oleh enam bidang sisi berbentuk bujur sangkar atau persegi yang kongruen (sama besar). Seluruh rusuk kubus memiliki panjang yang sama persis, dan pertemuan antar rusuknya membentuk sudut siku-siku (90 derajat). Rumus mencari volume kubus adalah sisi dikali sisi dikali sisi (S x S x S), sedangkan luas permukaannya adalah enam kali luas persegi sisinya. Contoh benda kubus di kehidupan sehari-hari antara lain dadu, kotak kado, dan rubik.',
        facts: [
          'Kubus memiliki tepat 6 buah sisi datar berbentuk persegi yang ukurannya persis sama.',
          'Kubus memiliki 12 buah rusuk yang sama panjang dan 8 buah titik sudut yang semuanya siku-siku.',
          'Rumus volume kubus: V = s x s x s = s^3, dengan s adalah panjang sisi.',
          'Rumus luas permukaan kubus: LP = 6 x s x s = 6s^2.',
          'Pada bentuk aslinya, kubus terlihat seperti kotak yang panjang, lebar, dan tingginya sama.',
          'Setiap sisi kubus bertemu dengan sisi lain pada garis yang disebut rusuk.',
          'Garis diagonal bidang pada kubus berjumlah 12 buah, sedangkan diagonal ruangnya berjumlah 4 buah yang saling berpotongan.',
          'Rumus Euler berlaku pada kubus: Jumlah Titik Sudut ditambah Jumlah Sisi dikurangi Jumlah Rusuk selalu bernilai 2 (8 + 6 - 12 = 2).'
        ]
      },
      {
        title: 'Kerucut: Bentuk Lingkaran Lancip',
        focusObject: 'cone',
        info: 'Kerucut adalah bangun ruang tiga dimensi yang dibatasi oleh sebuah alas datar berbentuk lingkaran dan selimut melengkung yang meruncing menuju satu titik puncak di bagian atas. Selimut kerucut jika dibentangkan akan berbentuk juring lingkaran. Tinggi kerucut diukur dari pusat lingkaran alas tegak lurus sampai ke titik puncak tertinggi. Contoh benda berbentuk kerucut yang mudah kita temui adalah topi ulang tahun, cone es krim, dan tumpeng nasi.',
        facts: [
          'Kerucut hanya memiliki 2 sisi saja, yaitu 1 sisi alas berbentuk lingkaran dan 1 sisi selimut melengkung.',
          'Kerucut memiliki 1 buah rusuk berbentuk lingkaran di bagian bawah dan 1 titik sudut puncak di bagian paling atas.',
          'Rumus volume kerucut: V = 1/3 x pi x r^2 x t, dengan r adalah jari-jari dan t adalah tinggi.',
          'Rumus luas permukaan kerucut: LP = pi x r x (r + s), dengan s adalah garis pelukis.',
          'Garis miring yang menghubungkan titik puncak kerucut dengan keliling lingkaran alas disebut Garis Pelukis (Apotema / s).',
          'Volume kerucut setara dengan sepertiga volume tabung jika keduanya memiliki luas alas lingkaran dan tinggi yang sama.',
          'Bentuk kerucut banyak digunakan pada desain atap bangunan menara kastil kuno karena efisien mengalirkan air hujan.'
        ]
      },
      {
        title: 'Limas Segiempat: Piramida Kokoh',
        focusObject: 'pyramid',
        info: 'Limas segiempat adalah bangun ruang yang dibatasi oleh satu alas berbentuk segiempat (persegi atau persegi panjang) dan empat buah sisi tegak berbentuk segitiga yang puncaknya saling bertemu di satu titik. Limas segiempat menyerupai bentuk piramida kuno di Mesir yang sangat kokoh. Rumus volume limas segiempat adalah sepertiga dikali luas alas segiempat dikali tinggi limas.',
        facts: [
          'Limas segiempat memiliki total 5 sisi: 1 sisi alas berbentuk segiempat dan 4 sisi tegak berbentuk segitiga.',
          'Limas segiempat memiliki 8 buah rusuk (4 rusuk alas dan 4 rusuk tegak) serta memiliki 5 buah titik sudut.',
          'Rumus volume limas segiempat: V = 1/3 x luas alas x tinggi.',
          'Jika alasnya persegi, rumus volume menjadi V = 1/3 x s x s x t.',
          'Rumus luas permukaan limas segiempat: LP = luas alas + jumlah luas semua sisi tegak segitiga.',
          'Titik puncak di bagian atas limas tegak lurus dengan titik pusat alas persegi.',
          'Pada bentuk aslinya, limas segiempat memiliki satu puncak di atas dan alas segiempat di bawah.',
          'Piramida Giza di Mesir adalah mahakarya arsitektur dunia nyata yang mengadopsi struktur limas segiempat ini.',
          'Luas permukaan limas segiempat dihitung dengan menjumlahkan luas alas segiempat dengan total luas keempat segitiga selimutnya.'
        ]
      },
      {
        title: 'Balok: Kotak Persegi Panjang',
        focusObject: 'cuboid',
        info: 'Balok adalah bangun ruang tiga dimensi yang memiliki enam sisi berbentuk persegi panjang. Berbeda dari kubus, ukuran panjang, lebar, dan tinggi balok tidak harus sama. Balok banyak dijumpai pada benda sehari-hari seperti lemari, buku tebal, kardus, batu bata, dan kotak pensil. Volume balok dihitung dengan mengalikan panjang, lebar, dan tinggi.',
        facts: [
          'Balok memiliki 6 sisi, 12 rusuk, dan 8 titik sudut.',
          'Sisi-sisi yang saling berhadapan pada balok memiliki bentuk dan ukuran yang sama.',
          'Rumus volume balok: V = p x l x t, dengan p adalah panjang, l adalah lebar, dan t adalah tinggi.',
          'Rumus luas permukaan balok: LP = 2 x (p x l + p x t + l x t).',
          'Balok memiliki tiga pasang sisi berhadapan yang sejajar.',
          'Contoh balok di sekitar kita adalah kotak sepatu, penghapus, dan kemasan susu.'
        ]
      },
      {
        title: 'Tabung: Dua Lingkaran Sejajar',
        focusObject: 'cylinder',
        info: 'Tabung adalah bangun ruang yang memiliki dua sisi datar berbentuk lingkaran yang sejajar dan satu sisi lengkung sebagai selimutnya. Tabung tidak memiliki titik sudut karena permukaannya melengkung. Bentuk tabung sering ditemukan pada kaleng minuman, drum, pipa, gelas, dan baterai. Volume tabung dihitung dari luas alas lingkaran dikali tinggi.',
        facts: [
          'Tabung memiliki 3 sisi, yaitu 2 lingkaran sebagai alas dan tutup, serta 1 sisi lengkung.',
          'Tabung memiliki 2 rusuk lengkung dan tidak memiliki titik sudut.',
          'Rumus volume tabung: V = pi x r^2 x t, dengan r adalah jari-jari dan t adalah tinggi.',
          'Rumus luas permukaan tabung: LP = 2 x pi x r x (r + t).',
          'Rumus luas selimut tabung: L selimut = 2 x pi x r x t.',
          'Jika tabung dipotong tegak dari atas ke bawah, penampangnya dapat terlihat seperti persegi panjang.',
          'Tinggi tabung adalah jarak lurus antara alas dan tutup lingkarannya.',
          'Contoh tabung di sekitar kita adalah kaleng, botol, pipa, dan gulungan tisu.'
        ]
      },
      {
        title: 'Bola: Lengkung Sempurna',
        focusObject: 'sphere',
        info: 'Bola adalah bangun ruang yang seluruh permukaannya melengkung dan semua titik pada permukaannya berjarak sama dari titik pusat. Bola tidak memiliki sisi datar, rusuk, maupun titik sudut. Contoh benda berbentuk bola adalah bola sepak, kelereng, globe, dan bola basket. Volume bola berhubungan dengan jari-jari, yaitu jarak dari pusat bola ke permukaannya.',
        facts: [
          'Bola memiliki 1 sisi lengkung utuh tanpa sisi datar.',
          'Bola tidak memiliki rusuk dan tidak memiliki titik sudut.',
          'Jari-jari bola adalah jarak dari titik pusat ke permukaan bola.',
          'Diameter bola adalah garis lurus yang melewati pusat dan menghubungkan dua titik pada permukaan bola.',
          'Rumus volume bola: V = 4/3 x pi x r^3, dengan r adalah jari-jari bola.',
          'Rumus luas permukaan bola: LP = 4 x pi x r^2.',
          'Contoh bola di sekitar kita adalah globe, bola tenis, bola sepak, dan kelereng.'
        ]
      }
    ]
  },
  {
    id: 'english-zoo',
    subject: 'Bahasa Inggris',
    title: 'English Classroom Quest',
    fase: ['Fase A', 'Fase B'],
    emoji: '📚',
    badgeColor: 'bg-sky-600 text-white',
    gradient: 'from-sky-400 to-blue-500',
    bgColor: '#0f172a',
    description: 'Pengenalan objek kosakata bahasa Inggris di ruang kelas secara menyenangkan. Desain penuh warna cerah, gambar besar, dan teks sangat sederhana untuk anak-anak.',
    cp: 'Murid mampu memahami teks tulis pendek sederhana atau teks multimodal tentang kehidupan sehari-hari dan meresponsnya secara verbal or non-verbal sesuai konteks.\n(Understand simple short texts or multimodal texts about everyday life and respond to them verbally or non-verbally in line with its context).',
    tp: [
      'Siswa mampu mengucapkan nama-nama benda sekolah dalam bahasa Inggris secara lancar.',
      'Siswa dapat mencocokkan benda fisik dengan padanan kosakata bahasa Inggris yang sesuai.'
    ],
    steps: [
      {
        title: 'Book: A Window to Knowledge',
        focusObject: 'book',
        info: 'A book is an object made of pages that contain words, pictures, and knowledge. Students use books to read stories, learn lessons, and remember important information. In English, "book" means buku.',
        facts: [
          'Book artinya buku.',
          'Books have pages and covers.',
          'Students read books to learn new things.',
          'A simple sentence: "I read a book."',
          'Library means perpustakaan, a place with many books.'
        ]
      },
      {
        title: 'Pencil: A Tool for Writing',
        focusObject: 'pencil',
        info: 'A pencil is a writing tool used to write, draw, and answer questions. A pencil usually has graphite inside and an eraser at the end. In English, "pencil" means pensil.',
        facts: [
          'Pencil artinya pensil.',
          'We write with a pencil.',
          'An eraser can remove pencil marks.',
          'A simple sentence: "This is my pencil."',
          'Sharp means tajam, as in a sharp pencil.'
        ]
      },
      {
        title: 'Bag: Carry Your School Things',
        focusObject: 'bag',
        info: 'A bag is used to carry school things such as books, pencils, rulers, and lunch boxes. Students often bring a school bag every day. In English, "bag" means tas.',
        facts: [
          'Bag artinya tas.',
          'A school bag can carry books and pencils.',
          'Pocket means kantong.',
          'A simple sentence: "My bag is red."',
          'Heavy means berat, as in a heavy bag.'
        ]
      },
      {
        title: 'Chair: A Place to Sit',
        focusObject: 'chair',
        info: 'A chair is a piece of furniture used for sitting. In the classroom, students sit on chairs while listening, reading, and writing. In English, "chair" means kursi.',
        facts: [
          'Chair artinya kursi.',
          'We sit on a chair.',
          'A chair usually has legs and a back.',
          'A simple sentence: "Please sit on the chair."',
          'Sit means duduk.'
        ]
      },
      {
        title: 'Desk: A Place to Study',
        focusObject: 'desk',
        info: 'A desk is a table used for studying, writing, and placing school supplies. In the classroom, each student may use a desk for books and notebooks. In English, "desk" means meja belajar.',
        facts: [
          'Desk artinya meja belajar.',
          'Students write on a desk.',
          'A desk can hold books, pencils, and a bag.',
          'A simple sentence: "The book is on the desk."',
          'On means di atas.'
        ]
      },
      {
        title: 'Clock: Telling the Time',
        focusObject: 'clock',
        info: 'A clock is used to show time. In school, a clock helps students know when class starts, when break time begins, and when lessons finish. In English, "clock" means jam.',
        facts: [
          'Clock artinya jam.',
          'A clock has hands or numbers.',
          'Time means waktu.',
          'A simple sentence: "The clock is on the wall."',
          'Wall means dinding.'
        ]
      },
      {
        title: 'Globe: The Small Model of Earth',
        focusObject: 'globe',
        info: 'A globe is a round model of Earth. Students use a globe to learn about countries, oceans, and continents. In English, "globe" can also be called globe in Indonesian.',
        facts: [
          'Globe artinya globe atau bola dunia.',
          'A globe shows the Earth.',
          'Country means negara.',
          'A simple sentence: "I see Indonesia on the globe."',
          'Ocean means samudra.'
        ]
      },
      {
        title: 'Ruler: Measuring Length',
        focusObject: 'ruler',
        info: 'A ruler is a tool used to measure length and draw straight lines. Students often use rulers in math, art, and writing activities. In English, "ruler" means penggaris.',
        facts: [
          'Ruler artinya penggaris.',
          'A ruler measures length.',
          'Straight line means garis lurus.',
          'A simple sentence: "I draw a line with a ruler."',
          'Centimeter means sentimeter.'
        ]
      }
    ]
  },



  {
    id: 'indo-vocab',
    subject: 'Bahasa Indonesia',
    title: 'Kebun Kosakata Benda',
    fase: ['Fase A'],
    emoji: '🍎',
    badgeColor: 'bg-emerald-700 text-white',
    gradient: 'from-emerald-400 to-teal-500',
    bgColor: '#022c22',
    description: 'Eksplorasi kata benda 3D dengan warna cerah dan tulisan sederhana untuk melatih anak mengeja nama objek di sekitarnya.',
    cp: 'Murid mampu membaca kata-kata sederhana dengan fasih dari bacaan dan/atau tayangan yang dipirsa tentang diri, keluarga, kesehatan, dan/atau lingkungan sekitar; dan memahami isi bacaan dan/atau tayangan yang dipirsa tentang diri, keluarga, kesehatan, dan/atau lingkungan sekitar.',
    tp: [
      'Siswa mampu mengeja kata benda 3 suku kata dengan pelafalan yang benar.',
      'Siswa dapat menyusun huruf acak menjadi kata benda yang bermakna.'
    ],
    steps: [
      {
        title: 'Mengeja Kata Buah Apel (A-P-E-L)',
        focusObject: 'apple',
        info: 'Apel adalah buah lezat yang tumbuh dari pohon apel dan sangat populer di seluruh dunia karena rasanya yang manis dan segar. Mari belajar mengeja kata benda ini. Kata "APEL" terdiri dari empat huruf utama, yaitu huruf A, P, E, dan L. Huruf "A" dan "E" berperan sebagai huruf vokal yang memberikan suara hidup pada kata, sedangkan huruf "P" dan "L" adalah huruf konsonan yang merangkai kata tersebut menjadi utuh.',
        facts: [
          'Ejaan resmi kata ini menurut Kamus Besar Bahasa Indonesia (KBBI) adalah A-P-E-L. Cara membacanya adalah /a.pəl/.',
          'Apel mengandung zat antioksidan dan serat yang tinggi untuk memelihara kesehatan sistem pencernaan anak-anak.',
          'Apel memiliki kulit dengan aneka warna menarik seperti merah menyala, hijau muda yang asam, dan kuning manis.',
          'Huruf vokal dalam kata APEL adalah A dan E, sedangkan huruf konsonannya adalah P dan L.',
          'Contoh kalimat sederhana untuk anak: "Budi memakan buah Apel merah yang rasanya manis sekali."',
          'Apel pertama kali dibudidayakan di Asia Tengah ribuan tahun yang lalu sebelum menyebar ke seluruh penjuru benua.'
        ]
      },
      {
        title: 'Mengeja Kata Buku Pelajaran (B-U-K-U)',
        focusObject: 'book',
        info: 'Buku adalah kumpulan kertas berisi tulisan dan gambar yang dijilid untuk dibaca dan dipelajari. Belajar mengeja kata "BUKU" sangat mudah! Kata ini terdiri dari empat huruf yaitu B, U, K, dan U. Huruf "U" adalah huruf vokal ganda yang memberi bunyi meliuk pada kata, sedangkan huruf "B" dan "K" adalah konsonan. Buku adalah jendela dunia yang membantu anak-anak membuka wawasan baru tentang sains, sejarah, dan cerita seru.',
        facts: [
          'Ejaan resmi kata ini menurut KBBI adalah B-U-K-U. Cara mengejarnya adalah B-U (Bu), K-U (ku).',
          'Membaca buku secara rutin dapat meningkatkan kecerdasan bahasa, memori, dan daya imajinasi anak SD.',
          'Buku pelajaran adalah sumber ilmu utama di kelas yang melengkapi penjelasan guru di papan tulis.',
          'Huruf vokal dalam kata BUKU adalah U, sedangkan huruf konsonannya adalah B dan K.',
          'Contoh kalimat: "Siti sedang rajin membaca buku cerita rakyat di perpustakaan sekolah."',
          'Buku tertua di dunia dicetak menggunakan cetakan kayu ribuan tahun lalu di daratan Asia.'
        ]
      },
      {
        title: 'Mengeja Kata Meja Belajar (M-E-J-A)',
        focusObject: 'table',
        info: 'Meja adalah perabotan rumah tangga berbentuk permukaan datar yang ditopang oleh beberapa kaki penyangga. Meja sangat berguna sebagai alas untuk menulis, meletakkan buku, atau memakai komputer. Kata "MEJA" dieja dengan empat huruf yaitu M, E, J, dan A. Ejaan ini sangat sederhana dan mudah diingat oleh anak-anak.',
        facts: [
          'Ejaan resmi kata ini menurut KBBI adalah M-E-J-A. Terdiri atas suku kata Me-ja.',
          'Meja biasanya memiliki 4 kaki penopang, namun ada juga desain meja modern berkaki satu atau tiga.',
          'Kayu, plastik, besi, dan kaca adalah bahan-bahan yang paling sering dipakai untuk membuat meja belajar.',
          'Sikap duduk yang tegak di depan meja belajar sangat baik untuk menjaga pertumbuhan tulang punggung anak.',
          'Huruf vokal pada kata MEJA adalah E dan A, sedangkan huruf konsonannya adalah M dan J.',
          'Membiasakan merapikan meja belajar setelah selesai belajar melatih anak untuk hidup tertib dan disiplin.'
        ]
      }
    ]
  },
  {
    id: 'ips-culture',
    subject: 'IPS',
    title: 'Rumah Adat Nusantara',
    fase: ['Fase B', 'Fase C'],
    emoji: '🏠',
    badgeColor: 'bg-orange-600 text-white',
    gradient: 'from-orange-400 to-amber-500',
    bgColor: '#0f172a',
    description: 'Eksplorasi bentuk arsitektur rumah adat tradisional Indonesia secara 360 derajat.',
    cp: 'Murid mampu menjelaskan bentuk dan fungsi pancaindra; menganalisis siklus hidup makhluk hidup dan upaya pelestariannya; menghasilkan solusi untuk masalah yang berkaitan dengan pelestarian sumber daya alam sebagai upaya mitigasi perubahan iklim; menyimpulkan proses perubahan wujud zat; menjelaskan sumber dan bentuk energi, serta proses perubahan bentuk energi dalam kehidupan sehari-hari; membedakan jenis gaya dan pengaruhnya terhadap arah, gerak, dan bentuk benda; menjelaskan peran, tugas, dan tanggung jawab serta interaksi sosial yang terjadi di sekitar tempat tinggal dan sekolah; mengenali letak kabupaten/kota dan provinsi tempat tinggalnya dengan menggunakan peta konvensional/digital; mengklasifikasikan ragam bentang alam dan keterkaitannya dengan profesi masyarakat, ragam budaya serta upaya untuk melestarikannya; menganalisis sejarah masyarakat di lingkungan tempat tinggal; menjelaskan nilai mata uang dan fungsinya, serta cara mengelola keuangan secara bijak.',
    tp: [
      'Siswa mampu mengenali keunikan arsitektur rumah adat dari berbagai daerah di Indonesia.',
      'Siswa dapat menjelaskan nilai-nilai budaya yang terkandung dalam struktur rumah tradisional.'
    ],
    steps: [
      {
        title: 'Keunikan Rumah Gadang Minangkabau',
        focusObject: 'gadang',
        info: 'Rumah Gadang adalah rumah adat tradisional dari suku Minangkabau yang mendiami daerah Sumatera Barat. Ciri khas paling utama dari bangunan ini adalah bentuk atapnya yang melengkung tajam dan runcing ke atas menyerupai tanduk kerbau, yang disebut Gonjong. Rumah Gadang dibangun dengan bentuk rumah panggung untuk menghindari banjir dan serangan binatang liar di hutan. Struktur tiang bangunannya sengaja dibuat condong agar bangunan menjadi fleksibel dan tidak roboh saat diguncang gempa bumi.',
        facts: [
          'Rumah Gadang tradisional dibangun tanpa menggunakan paku besi tunggal pun, melainkan memakai pasak kayu agar strukturnya fleksibel.',
          'Jumlah ruangan atau kamar di dalam Rumah Gadang ditentukan berdasarkan jumlah anak perempuan yang tinggal di keluarga tersebut.',
          'Di depan rumah biasanya terdapat bangunan kecil bernama Rangkiang yang berfungsi sebagai lumbung padi cadangan pangan warga.',
          'Terdapat tiga jenis Rangkiang: Sitinjau Lauik (padi untuk tamu), Sibayau-bayau (untuk keluarga), dan Kabaa-kabaa (untuk bencana).',
          'Tangga masuk Rumah Gadang selalu berada di bagian luar depan rumah, biasanya dihiasi ukiran kayu khas Minang yang indah.',
          'Rumah Gadang mencerminkan adat matrilineal (garis keturunan ibu) suku Minangkabau, di mana kepemilikan rumah diwariskan ke wanita.'
        ]
      },
      {
        title: 'Arsitektur Rumah Joglo Jawa Tengah',
        focusObject: 'joglo',
        info: 'Rumah Joglo adalah rumah adat tradisional masyarakat Jawa yang memiliki struktur atap sangat khas berbentuk tajug (gunung). Struktur atap Joglo ditopang oleh empat tiang utama di tengah ruangan yang disebut Soko Guru. Soko Guru ini mewakili kekuatan utama bangunan dan penyangga kehidupan keluarga. Di masa lalu, ukuran dan kemegahan Rumah Joglo mencerminkan status sosial pemiliknya karena proses pembuatannya membutuhkan bahan kayu jati berkualitas tinggi yang tahan lama.',
        facts: [
          'Atap Joglo memiliki bagian tengah yang menjulang tinggi seperti gunung, melambangkan rasa hormat pada tempat tinggi.',
          'Empat tiang Soko Guru melambangkan empat arah mata angin utama: Utara, Selatan, Timur, dan Barat.',
          'Rumah Joglo terbagi menjadi beberapa bagian: Pendopo (luar/pertemuan), Pringgitan (tengah), dan Dalem (keluarga).',
          'Bagian Pendopo bersifat terbuka tanpa dinding untuk menunjukkan keramahan tuan rumah menerima tamu.',
          'Kayu Jati tua yang digunakan sebagai tiang penopang terbukti kokoh dan tahan gempa serta rayap hingga ratusan tahun.',
          'Bagian belakang rumah biasanya memiliki kebun luas untuk bertanam sayur dan tanaman obat keluarga.'
        ]
      },
      {
        title: 'Rumah Tongkonan Suku Toraja',
        focusObject: 'tongkonan',
        info: 'Rumah Tongkonan adalah rumah adat tradisional masyarakat suku Toraja di Sulawesi Selatan. Ciri utama Tongkonan adalah atapnya yang melengkung indah seperti perahu terbalik atau tanduk kerbau raksasa. Rumah Tongkonan didirikan menghadap ke utara untuk menghormati leluhur mereka, dan di bagian depan tiang utamanya dipajang deretan tanduk kerbau yang melambangkan status sosial serta kejayaan pemilik rumah.',
        facts: [
          'Kata Tongkonan berasal dari kata "tongkon" yang berarti menduduki atau tempat duduk untuk berkumpul bermusyawarah.',
          'Tanduk kerbau yang dipajang di tiang depan menunjukkan jumlah kerbau yang dikorbankan dalam upacara adat pemakaman (Rambu Solo).',
          'Atap aslinya terbuat dari susunan bambu berlapis-lapis, namun di masa modern banyak diganti dengan seng gelombang.',
          'Dinding Tongkonan dihiasi dengan empat motif ukiran warna utama Toraja: merah, kuning, putih, dan hitam.',
          'Bagian kolong rumah panggung Tongkonan biasanya difungsikan sebagai kandang kerbau belang (Tedong Bonga) yang berharga mahal.',
          'Setiap bangunan Tongkonan selalu berpasangan dengan lumbung padi kecil yang disebut Alang di depannya.'
        ]
      }
    ]
  },
  {
    id: 'ppkn-pancasila',
    subject: 'PPKn',
    title: 'Makna Setiap Sila pada Lambang Garuda Pancasila',
    fase: ['Fase A', 'Fase B'],
    // Use external PNG symbol for Pancasila
    iconUrl: 'https://w7.pngwing.com/pngs/415/674/png-transparent-national-emblem-of-indonesia-garuda-pancasila-coat-of-arms-symbol-miscellaneous-emblem-logo.png',
    emoji: '🦅',
    badgeColor: 'bg-rose-600 text-white',
    gradient: 'from-red-400 to-rose-500',
    bgColor: '#4c0519',
    description: 'Eksplorasi visual simbol negara Garuda Pancasila dan makna sila-silanya melalui model 3D interaktif.',
    cp: 'Murid mampu mengidentifikasi makna sila-sila Pancasila, dan penerapannya dalam kehidupan sehari-hari; mengenal karakter para perumus Pancasila; menunjukkan sikap bangga menjadi anak Indonesia yang memiliki bahasa Indonesia sebagai bahasa persatuan di lingkungan sekitar.',
    tp: [
      'Siswa mampu menyebutkan simbol dan bunyi sila-sila Pancasila secara runtut.',
      'Siswa dapat mengidentifikasi contoh perilaku sehari-hari yang sesuai dengan pengamalan Pancasila.'
    ],
    steps: [
      {
        title: 'Makna Setiap Sila pada Lambang Garuda Pancasila',
        focusObject: 'garuda',
        info: 'Garuda Pancasila adalah lambang negara Indonesia. Burung Garuda melambangkan kekuatan dan kejayaan bangsa. Di dadanya terdapat perisai yang berisi lima simbol yang mewakili sila-sila dalam Pancasila: Bintang Emas (Sila ke-1), Rantai Emas (Sila ke-2), Pohon Beringin (Sila ke-3), Kepala Banteng (Sila ke-4), dan Padi & Kapas (Sila ke-5). Silakan putar dan klik nomor (anotasi) pada model 3D Garuda di samping untuk mempelajari makna dari setiap lambang tersebut secara interaktif!',
        facts: [
          'Bintang Emas melambangkan Ketuhanan Yang Maha Esa (Sila ke-1).',
          'Rantai Emas melambangkan Kemanusiaan yang Adil dan Beradab (Sila ke-2).',
          'Pohon Beringin melambangkan Persatuan Indonesia (Sila ke-3).',
          'Kepala Banteng melambangkan Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan (Sila ke-4).',
          'Padi dan Kapas melambangkan Keadilan Sosial bagi Seluruh Rakyat Indonesia (Sila ke-5).',
          'Pita putih yang dicengkeram oleh burung Garuda bertuliskan semboyan negara kita: Bhinneka Tunggal Ika (Berbeda-beda tetapi tetap satu jua).'
        ]
      }
    ]
  },
  {
    id: 'seni-angklung',
    subject: 'Seni Budaya',
    title: 'Orkestra Angklung Digital',
    fase: ['Fase A', 'Fase B', 'Fase C'],
    emoji: '🎵',
    badgeColor: 'bg-pink-650 text-white',
    gradient: 'from-pink-400 to-fuchsia-500',
    bgColor: '#4a044e',
    description: 'Belajar tangga nada tradisional dengan memainkan alat musik angklung bambu secara virtual.',
    cp: 'Murid mampu mengenali dan menerapkan unsur-unsur musik (nada, irama dan melodi) menggunakan alat musik ritmis dan melodis serta menunjukkan tingkat kepekaan akan unsur-unsur musik dengan menggunakan alat musik ritmis dan melodis.',
    tp: [
      'Siswa mampu membedakan tinggi rendah nada pada alat musik angklung.',
      'Siswa dapat memainkan melodi sederhana secara berkelompok menggunakan orkestra virtual.'
    ],
    steps: [
      {
        title: 'Sejarah dan Struktur Nada Angklung',
        focusObject: 'angklung',
        info: 'Angklung adalah alat musik multitonal tradisional warisan nenek moyang suku Sunda di Jawa Barat yang terbuat dari bahan bambu berkualitas tinggi. Suara angklung dihasilkan dari benturan pipa-pipa bambu yang bergoyang di atas kerangka penyangga saat kita menggoyangkannya. Setiap alat musik angklung dirancang untuk menghasilkan satu nada tertentu. Nada ini ditentukan oleh diameter dan panjang pemotongan bilah bambu di dalam tabung getar.',
        facts: [
          'Angklung telah dinobatkan secara resmi oleh UNESCO sebagai Karya Agung Warisan Budaya Lisan dan Nonbendawi Manusia pada tahun 2010.',
          'Untuk memainkan lagu yang indah, pemain angklung harus bekerjasama secara berkelompok dipimpin oleh seorang konduktor musik.',
          'Bambu yang biasa digunakan untuk membuat angklung berkualitas adalah Bambu Hitam (Awi Wulung) atau Bambu Temen.',
          'Terdapat beberapa jenis angklung tradisional, seperti Angklung Kanekes (Baduy), Angklung Gubrag, dan Angklung Dogdog Lojor.',
          'Daeng Soetigna adalah tokoh yang memodifikasi tangga nada angklung tradisional (pentatonik) menjadi diatonik (modern/do-re-mi).',
          'Untuk mencegah bambu retak dan diserang serangga, bambu harus diawetkan dengan cara direndam dalam air lumpur selama berbulan-bulan.'
        ]
      },
      {
        title: 'Melodi Angklung: Tangga Nada Diatonis',
        focusObject: 'melody',
        info: 'Setelah memahami bagian-bagian angklung, kini saatnya belajar memainkannya secara harmonis! Angklung modern menggunakan tangga nada diatonis (Do, Re, Mi, Fa, Sol, La, Si, Do) yang memungkinkan kita memainkan berbagai lagu anak dan lagu daerah tradisional. Karena satu angklung hanya mewakili satu nada, memainkan lagu membutuhkan pembagian nada yang rapi. Mari ketuk tabung angklung secara bergantian untuk menciptakan irama melodi yang ceria dan menenangkan.',
        facts: [
          'Goyangkan angklung dengan getaran cepat dan stabil agar suara bambu terdengar nyaring dan berkelanjutan.',
          'Lagu daerah seperti "Gundul Pacul" (Jawa) dan "Manuk Dadali" (Sunda) sangat sering diajarkan menggunakan angklung.',
          'Setiap nada dalam angklung diberi nomor atau kode warna khusus untuk memudahkan anak-anak membaca partitur lagu.',
          'Memainkan angklung melatih konsentrasi anak dalam mengenali tempo ketukan dan harmonisasi nada.',
          'Angklung juga melatih kerja sama tim, karena satu lagu hanya bisa selesai jika semua pemain membunyikan nadanya tepat waktu.',
          'Sekolah-sekolah di Indonesia dan mancanegara sering mengadakan festival orkestra angklung kolosal untuk anak-anak.'
        ]
      },
      {
        title: 'Bermain Musik Orkestra Tradisional',
        focusObject: 'orchestra',
        info: 'Mari kita latih kekompakan dan harmoni musik orkestra tradisional dengan menggabungkan bunyi angklung bersama alunan musik kendang dan gong digital. Siswa dapat menekan deretan angklung secara berurutan sesuai pola nada lagu anak untuk menghasilkan melodi nusantara yang sangat indah.',
        facts: [
          'Dalam orkestra angklung besar, konduktor menggunakan gerakan isyarat tangan khusus yang disebut kodaly untuk memimpin nada.',
          'Alunan musik angklung terbukti memiliki efek terapi psikologis yang menenangkan pikiran anak-anak sekolah.',
          'Bunyi getaran bambu menghasilkan gelombang suara akustik alami yang tidak memekakkan telinga.',
          'Permainan angklung melatih koordinasi kerja motorik kasar tangan kiri (memegang) dan tangan kanan (menggoyang).',
          'Alat musik pengiring angklung yang ideal antara lain kendang kayu, gong logam perunggu, dan arumba (bambu pukul).',
          'Orkestra angklung sekolah dasar sering dipentaskan untuk memeriahkan upacara hari kemerdekaan nasional.'
        ]
      }
    ]
  },
  {
    id: 'pjok-lokomotor',
    subject: 'PJOK',
    title: 'Taman Gerak Lokomotor',
    fase: ['Fase A', 'Fase B'],
    emoji: '🏃',
    badgeColor: 'bg-amber-600 text-white',
    gradient: 'from-yellow-400 to-lime-500',
    bgColor: '#3f6212',
    description: 'Visualisasi 3D gerakan motorik kasar seperti melompat, berlari, dan merayap.',
    cp: 'Murid mampu menghaluskan keterampilan gerak fundamental dan menerapkannya dalam situasi gerak yang baru; menyesuaikan strategi gerak untuk mendapatkan capaian keterampilan gerak; dan memperagakan berbagai konsep gerak yang dapat diterapkan dalam rangkaian gerak.',
    tp: [
      'Siswa mampu membedakan teknik gerak melompat, berlari, dan meluncur secara benar.',
      'Siswa dapat menerapkan gerak lokomotor dalam permainan kebugaran jasmani terstruktur.'
    ],
    steps: [
      {
        title: 'Memahami Teknik Gerak Melompat (Jumping)',
        focusObject: 'jump',
        info: 'Gerak lokomotor adalah gerakan fisik yang ditandai dengan adanya perpindahan seluruh tubuh dari satu titik lokasi ke lokasi lainnya. Contoh utama dari gerakan lokomotor ini adalah berjalan, berlari, meluncur, dan melompat. Melompat adalah tindakan mendorong tubuh ke atas dengan menumpukan kekuatan pada kaki, lalu melayang di udara sebelum mendarat kembali. Gerakan ini sangat baik untuk melatih kekuatan otot kaki, keseimbangan, serta kelincahan gerak refleks.',
        facts: [
          'Saat mendarat setelah melompat, gunakan ujung telapak kaki terlebih dahulu dan tekuk sedikit lutut agar persendian tidak cedera.',
          'Melompat berbeda dengan meloncat. Melompat bertumpu pada satu kaki, sedangkan meloncat bertumpu pada kedua kaki sekaligus.',
          'Olahraga atletik lompat jauh dan lompat tinggi merupakan cabang kompetisi resmi olahraga yang mengandalkan teknik gerak lokomotor ini.',
          'Otot paha depan (quadriceps) dan otot betis adalah motor penggerak utama yang memberikan dorongan kuat saat melompat.',
          'Melakukan peregangan otot (pemanasan) sebelum melatih gerakan melompat sangat penting untuk menghindari kram dan terkilir.',
          'Melompat melatih koordinasi dinamis antara mata, keseimbangan otak kecil, dan otot motorik kasar pada kaki anak.'
        ]
      },
      {
        title: 'Teknik Gerak Berlari Cepat (Sprinting)',
        focusObject: 'run',
        info: 'Berlari cepat atau sprint adalah gerak lokomotor pemindahan tubuh secara cepat di mana kedua kaki memiliki momen melayang di udara secara bergantian. Berbeda dengan berjalan, saat berlari langkah kaki kita lebih lebar dan dorongan lutut lebih tinggi untuk memaksimalkan kecepatan. Gerakan berlari sangat bagus untuk melatih kesehatan jantung, pernapasan, kecepatan refleks, serta ketahanan fisik anak SD.',
        facts: [
          'Saat berlari cepat, pandangan mata harus fokus lurus ke depan dan posisi tubuh agak condong ke depan sekitar 10 derajat.',
          'Ayunkan kedua lengan di samping tubuh dengan menekuk siku membentuk sudut 90 derajat untuk menambah daya dorong.',
          'Pendaratan kaki saat berlari cepat bertumpu pada bagian bola kaki (ujung kaki depan), bukan pada tumit belakang.',
          'Berlari melatih otot paha (quadriceps), hamstring, otot betis, dan memperkuat kepadatan tulang kaki anak.',
          'Lakukan pemanasan peregangan otot kaki sebelum berlari untuk menghindari cedera kram otot betis.',
          'Berlari secara teratur merangsang sirkulasi oksigen to otak, membuat tubuh segar dan meningkatkan fokus belajar siswa.'
        ]
      },
      {
        title: 'Teknik Gerak Meluncur & Menghindar',
        focusObject: 'slide',
        info: 'Gerak meluncur (sliding) dan menghindar (dodging) adalah keterampilan gerak lokomotor tingkat lanjut untuk memindahkan arah tubuh dengan cepat demi menghindari rintangan atau kejaran lawan dalam permainan olahraga. Gerakan ini membutuhkan keseimbangan tubuh yang mantap dan respon refleks kaki yang sangat responsif.',
        facts: [
          'Gerak meluncur dilakukan dengan menggeser tumpuan berat badan ke samping kiri atau kanan tanpa kehilangan keseimbangan.',
          'Menghindar sangat melatih kemampuan kelincahan otot motorik (agility) untuk mengubah arah gerak seketika.',
          'Pemain sepak bola dan bola basket menggunakan kombinasi gerak meluncur dan menghindar ini untuk mengecoh lawan.',
          'Gaya gesek telapak sepatu olahraga dengan permukaan lantai lapangan sangat menentukan keberhasilan manuver menghindar.',
          'Melakukan pendinginan (cooling down) setelah latihan kelincahan sangat dianjurkan untuk mengendurkan ketegangan otot paha.',
          'Latihan gerak menghindar di taman dapat dilakukan dengan berlari zig-zag memutari tiang-tiang kerucut pembatas (cone).'
        ]
      }
    ]
  },
  {
    id: 'tik-hardware',
    subject: 'Informatika',
    title: 'Pengenalan Perangkat Keras Komputer',
    fase: ['Fase C'],
    emoji: '💻',
    badgeColor: 'bg-sky-600 text-white',
    gradient: 'from-sky-400 to-blue-500',
    bgColor: '#0c4a6e',
    description: 'Pengenalan interaktif berbagai komponen hardware komputer dari monitor hingga isi dalam casing PC dalam visualisasi 3D. Klik setiap komponen untuk mempelajari fungsinya!',
    cp: 'Murid mampu menerapkan berpikir komputasional dalam menyelesaikan persoalan sehari-hari secara sistematis, membuat program visual sederhana (koding), dan mengenali pola kecerdasan artifisial dasar.',
    tp: [
      'Siswa mampu mengidentifikasi dan menjelaskan fungsi setiap komponen utama hardware komputer.',
      'Siswa dapat mengetahui letak, bentuk, dan peran masing-masing komponen di dalam sistem komputer.'
    ],
    steps: [
      {
        title: 'Monitor: Layar Tampilan Komputer',
        focusObject: 'monitor',
        info: 'Monitor adalah perangkat output utama komputer yang berfungsi menampilkan informasi visual berupa teks, gambar, video, dan antarmuka sistem operasi kepada pengguna. Monitor menerima sinyal video digital dari kartu grafis (GPU) melalui kabel seperti HDMI, DisplayPort, atau VGA, lalu mengubahnya menjadi tampilan gambar yang bisa kita lihat di layar. Tanpa monitor, kita tidak bisa melihat hasil kerja komputer sama sekali.',
        facts: [
          'Monitor modern menggunakan teknologi panel LCD (Liquid Crystal Display) atau LED (Light Emitting Diode) yang lebih hemat energi dibanding monitor tabung CRT zaman dahulu.',
          'Resolusi layar monitor menentukan ketajaman gambar. Resolusi Full HD (1920x1080) berarti layar menampilkan sekitar 2 juta titik piksel warna-warni.',
          'Refresh rate monitor diukur dalam satuan Hertz (Hz). Monitor 60Hz menampilkan 60 frame gambar per detik, sedangkan monitor gaming bisa mencapai 144Hz atau 240Hz.',
          'Ukuran monitor diukur secara diagonal dari sudut ke sudut. Monitor umum berukuran 21 hingga 27 inci untuk keperluan belajar dan bekerja.',
          'Monitor layar sentuh (touchscreen) menggabungkan fungsi output dan input sekaligus, sehingga pengguna bisa langsung menyentuh layar untuk memberikan perintah.',
          'Kabel HDMI (High-Definition Multimedia Interface) adalah kabel paling umum yang digunakan untuk menghubungkan monitor ke komputer karena mampu mengirimkan gambar dan suara sekaligus.'
        ]
      },
      {
        title: 'Keyboard: Papan Ketik Perintah',
        focusObject: 'keyboard',
        info: 'Keyboard adalah perangkat input utama komputer yang digunakan untuk memasukkan huruf, angka, simbol, dan perintah ke dalam komputer. Keyboard standar memiliki sekitar 104 tombol yang terbagi menjadi beberapa kelompok: tombol alfanumerik (huruf dan angka), tombol fungsi (F1-F12), tombol navigasi (panah, Page Up/Down), dan tombol modifikasi (Shift, Ctrl, Alt). Setiap kali kita menekan tombol, sinyal elektronik dikirim ke prosesor komputer melalui kabel USB atau koneksi nirkabel Bluetooth.',
        facts: [
          'Susunan huruf pada keyboard yang paling umum digunakan disebut QWERTY, dinamai dari enam huruf pertama di baris atas keyboard.',
          'Keyboard mekanik menggunakan saklar (switch) individual di bawah setiap tombol yang memberikan umpan balik bunyi klik yang khas dan lebih tahan lama.',
          'Tombol Ctrl+C (Copy) dan Ctrl+V (Paste) adalah pintasan keyboard paling sering digunakan di seluruh dunia untuk menyalin dan menempel teks.',
          'Keyboard membran menggunakan lapisan karet silikon di bawah tombol yang lebih murah dan lebih senyap dibandingkan keyboard mekanik.',
          'Keyboard ergonomis dirancang khusus dengan bentuk melengkung untuk mengurangi kelelahan dan cedera otot pergelangan tangan (RSI) saat mengetik lama.',
          'Tombol Caps Lock mengubah semua huruf yang diketik menjadi huruf kapital (besar), sedangkan tombol Num Lock mengaktifkan fungsi angka pada keypad numerik di sisi kanan.'
        ]
      },
      {
        title: 'Mouse: Pengendali Kursor',
        focusObject: 'mouse',
        info: 'Mouse adalah perangkat input berbentuk genggaman tangan yang berfungsi untuk menggerakkan kursor (pointer) di layar monitor. Dengan mouse, pengguna dapat memilih menu, membuka program, menyeret berkas, dan berinteraksi dengan antarmuka grafis komputer secara intuitif. Mouse modern menggunakan sensor optik atau laser di bagian bawahnya yang membaca gerakan tangan di atas permukaan meja, lalu menerjemahkannya menjadi pergerakan kursor di layar.',
        facts: [
          'Mouse pertama di dunia ditemukan oleh Douglas Engelbart pada tahun 1964 dan terbuat dari kayu dengan satu tombol serta dua roda logam di bawahnya.',
          'Mouse optik menggunakan LED (lampu merah kecil) dan sensor kamera mini untuk mendeteksi gerakan, menggantikan bola karet pada mouse generasi lama.',
          'DPI (Dots Per Inch) pada mouse menentukan sensitivitas gerakan kursor. Mouse gaming biasanya memiliki DPI tinggi (1600-16000) agar kursor bergerak lebih presisi.',
          'Scroll wheel (roda gulir) di tengah mouse berfungsi untuk menggulir halaman ke atas dan ke bawah dengan cepat tanpa harus mengklik scrollbar.',
          'Mouse nirkabel (wireless) menggunakan teknologi Bluetooth atau receiver USB kecil (dongle) dan ditenagai baterai AA atau baterai isi ulang internal.',
          'Klik kiri mouse berfungsi untuk memilih dan membuka, klik kanan untuk membuka menu konteks, dan klik dua kali (double-click) untuk menjalankan program.'
        ]
      },
      {
        title: 'Motherboard: Papan Induk Sirkuit Utama',
        focusObject: 'mobo',
        info: 'Motherboard (papan induk) adalah papan sirkuit cetak (PCB) terbesar di dalam casing komputer yang berfungsi sebagai penghubung utama seluruh komponen hardware. Semua perangkat keras seperti CPU, RAM, kartu grafis, SSD, dan power supply dipasangkan ke motherboard melalui soket dan slot yang telah ditentukan. Motherboard juga memiliki chipset yang berfungsi mengatur komunikasi data antar komponen agar berjalan lancar dan terkoordinasi.',
        facts: [
          'Chipset pada motherboard terbagi dua: Northbridge mengatur komunikasi cepat antara CPU, RAM, dan GPU, sedangkan Southbridge menangani perangkat lambat seperti USB dan audio.',
          'Soket CPU pada motherboard memiliki ratusan hingga ribuan pin kontak tembaga yang harus tepat sejajar dengan pin prosesor agar tidak rusak.',
          'Slot PCIe (Peripheral Component Interconnect Express) adalah jalur kecepatan tinggi pada motherboard tempat memasang kartu grafis, kartu suara, dan kartu jaringan.',
          'BIOS (Basic Input/Output System) atau UEFI adalah firmware mini yang tertanam di chip motherboard dan menjadi program pertama yang berjalan saat komputer dinyalakan.',
          'Port I/O (Input/Output) di bagian belakang motherboard menyediakan colokan USB, HDMI, Ethernet (LAN), dan jack audio 3.5mm untuk menghubungkan perangkat eksternal.',
          'Motherboard hadir dalam berbagai ukuran standar: ATX (paling besar dan lengkap), Micro-ATX (sedang), dan Mini-ITX (paling kecil untuk casing kompak).'
        ]
      },
      {
        title: 'CPU (Prosesor): Otak Komputer',
        focusObject: 'cpu',
        info: 'CPU (Central Processing Unit) atau prosesor adalah komponen terpenting yang dijuluki "otak komputer". CPU bertugas menjalankan seluruh instruksi dan perhitungan logika dari program yang sedang berjalan. Setiap kali kita membuka aplikasi, mengetik dokumen, atau bermain game, CPU-lah yang memproses triliunan operasi aritmatika dan logika per detiknya. CPU berbentuk chip silikon persegi kecil yang dipasang pada soket khusus di motherboard.',
        facts: [
          'Kecepatan CPU diukur dalam satuan GHz (Gigahertz). CPU modern berkecepatan 3-5 GHz, artinya mampu memproses miliaran siklus operasi per detiknya.',
          'CPU memiliki banyak inti (core). CPU dual-core memiliki 2 inti, quad-core 4 inti, dan prosesor server bisa memiliki hingga 64 inti untuk menjalankan banyak tugas sekaligus.',
          'Dua produsen CPU terbesar di dunia adalah Intel (seri Core i3, i5, i7, i9) dan AMD (seri Ryzen 3, 5, 7, 9), keduanya bersaing ketat dalam performa dan efisiensi.',
          'CPU menghasilkan panas yang sangat tinggi saat bekerja, sehingga wajib dipasangkan pendingin (cooler) di atasnya agar suhunya tidak melebihi batas aman sekitar 90 derajat Celsius.',
          'Proses pembuatan CPU menggunakan teknologi litografi semikonduktor berukuran nanometer (nm). Semakin kecil ukurannya (misalnya 5nm), semakin hemat daya dan cepat prosesnya.',
          'Cache memory adalah memori super cepat berukuran kecil (L1, L2, L3) yang tertanam langsung di dalam chip CPU untuk menyimpan data yang paling sering diakses agar tidak perlu mengambil dari RAM.'
        ]
      },
      {
        title: 'RAM (Memori): Meja Kerja Sementara',
        focusObject: 'ram',
        info: 'RAM (Random Access Memory) adalah memori utama komputer yang berfungsi menyimpan data sementara dari program dan berkas yang sedang aktif digunakan. RAM sering diibaratkan sebagai "meja kerja" komputer: semakin besar meja kerjanya, semakin banyak dokumen yang bisa dibuka dan dikerjakan secara bersamaan tanpa berantakan. Data di dalam RAM bersifat volatile, artinya semua data akan hilang ketika komputer dimatikan.',
        facts: [
          'Kapasitas RAM diukur dalam satuan GB (Gigabyte). Komputer untuk belajar umumnya membutuhkan minimal 8GB RAM, sedangkan untuk editing video disarankan 16-32GB.',
          'RAM DDR (Double Data Rate) adalah jenis RAM paling umum saat ini. Generasi terbaru DDR5 memiliki kecepatan transfer data dua kali lipat dibanding DDR4.',
          'RAM dipasang pada slot DIMM di motherboard dengan cara menekan kedua ujungnya hingga kunci pengaman otomatis menutup dan berbunyi klik.',
          'Dual Channel adalah teknologi yang memasangkan dua keping RAM identik agar bekerja bersama dan meningkatkan kecepatan transfer data hingga 2 kali lipat.',
          'Jika RAM penuh (karena terlalu banyak program dibuka), komputer akan terasa sangat lambat karena sistem terpaksa menggunakan harddisk sebagai pengganti RAM (swap/virtual memory).',
          'Kecepatan RAM diukur dalam MHz (Megahertz). RAM DDR4-3200 berarti memiliki kecepatan transfer 3200 juta siklus per detik untuk mengakses data secara acak.'
        ]
      },
      {
        title: 'CPU Cooler: Pendingin Prosesor',
        focusObject: 'cooler',
        info: 'CPU Cooler (pendingin prosesor) adalah perangkat yang bertugas menyerap dan membuang panas yang dihasilkan oleh CPU saat bekerja keras. Tanpa pendingin, suhu CPU bisa melonjak hingga lebih dari 100 derajat Celsius dan menyebabkan kerusakan permanen pada chip. Ada dua jenis utama: pendingin udara (air cooler) yang menggunakan sirip aluminium dan kipas, serta pendingin cairan (liquid cooler / AIO) yang menggunakan cairan khusus di dalam selang tertutup.',
        facts: [
          'Thermal paste (pasta termal) adalah lapisan krim konduktor panas yang dioleskan setipis mungkin di antara permukaan CPU dan alas pendingin agar transfer panas lebih efisien.',
          'Heat pipe adalah pipa tembaga berongga berisi cairan khusus di dalam pendingin udara yang menyerap panas dari CPU dan menyalurkannya ke sirip-sirip aluminium untuk ditiup kipas.',
          'Pendingin cairan AIO (All-In-One) terdiri dari blok tembaga (waterblock), selang, radiator, dan kipas yang lebih efektif mendinginkan CPU bertenaga tinggi.',
          'Kipas pendingin berputar dengan kecepatan 600-2000 RPM (putaran per menit) dan dapat diatur secara otomatis berdasarkan suhu CPU melalui pengaturan BIOS.',
          'Arah aliran udara di dalam casing harus diperhatikan: kipas depan menarik udara dingin masuk (intake), sedangkan kipas belakang dan atas mendorong udara panas keluar (exhaust).',
          'Pendingin tower (menara) berukuran besar seperti Noctua NH-D15 mampu mendinginkan CPU sama efektifnya dengan pendingin cairan, namun membutuhkan ruang casing yang besar.'
        ]
      },
      {
        title: 'Power Supply (PSU): Sumber Daya Listrik',
        focusObject: 'psu',
        info: 'Power Supply Unit (PSU) adalah komponen vital yang bertugas menyediakan daya listrik bagi seluruh komponen di dalam komputer. PSU mengubah arus listrik bolak-balik (AC) dari stopkontak dinding 220V menjadi arus searah (DC) bertegangan rendah (12V, 5V, 3.3V) yang aman dan stabil untuk digunakan oleh CPU, motherboard, kartu grafis, dan perangkat keras lainnya. Tanpa PSU yang baik, komputer tidak akan bisa menyala sama sekali.',
        facts: [
          'Daya PSU diukur dalam satuan Watt. Komputer standar membutuhkan PSU 450-550W, sedangkan PC gaming dengan GPU bertenaga tinggi membutuhkan 750-1000W atau lebih.',
          'Sertifikasi 80 PLUS (Bronze, Silver, Gold, Platinum, Titanium) menunjukkan tingkat efisiensi PSU dalam mengubah listrik AC ke DC. Semakin tinggi sertifikasi, semakin sedikit energi yang terbuang menjadi panas.',
          'PSU modular memungkinkan pengguna hanya memasang kabel daya yang dibutuhkan saja, sehingga bagian dalam casing lebih rapi dan sirkulasi udara lebih lancar.',
          'Konektor ATX 24-pin adalah kabel utama yang menghubungkan PSU ke motherboard untuk menyuplai daya ke seluruh sistem komputer.',
          'Konektor EPS 8-pin (4+4 pin) khusus menyuplai daya tambahan langsung ke soket CPU pada motherboard agar prosesor mendapatkan arus listrik yang stabil.',
          'PSU memiliki kipas pendingin internal berdiameter 120-140mm yang berputar untuk membuang panas dari transformator dan kapasitor di dalamnya.'
        ]
      },
      {
        title: 'SSD / Harddisk: Penyimpanan Permanen',
        focusObject: 'ssd',
        info: 'SSD (Solid State Drive) dan HDD (Hard Disk Drive) adalah perangkat penyimpanan data permanen di dalam komputer. Di sinilah semua berkas, foto, video, game, aplikasi, dan sistem operasi (Windows/Linux) disimpan secara non-volatile, artinya data tidak akan hilang walau komputer dimatikan. SSD menggunakan chip memori flash tanpa bagian bergerak sehingga jauh lebih cepat, senyap, dan tahan guncangan dibanding HDD yang masih menggunakan piringan magnetik berputar.',
        facts: [
          'Kecepatan baca SSD NVMe M.2 modern bisa mencapai 7000 MB/detik, sedangkan HDD tradisional hanya sekitar 100-200 MB/detik, hampir 50 kali lebih lambat.',
          'SSD berbentuk M.2 berukuran sangat kecil (sekitar 2,2 cm x 8 cm) dan dipasang langsung ke slot M.2 pada motherboard tanpa memerlukan kabel apapun.',
          'HDD (Hard Disk Drive) menyimpan data pada piringan magnetik yang berputar sangat cepat (5400-7200 RPM) dan dibaca oleh lengan mekanis berujung jarum magnet.',
          'Kapasitas penyimpanan diukur dalam GB dan TB. SSD umum berkapasitas 256GB-2TB, sedangkan HDD bisa mencapai 4-20TB dengan harga yang lebih terjangkau per GB-nya.',
          'Komputer modern disarankan menggunakan SSD sebagai drive utama untuk sistem operasi dan aplikasi (agar boot cepat), dan HDD sebagai drive sekunder untuk menyimpan data besar.',
          'Teknologi TRIM pada SSD membantu menjaga performa tetap optimal dengan membersihkan blok data yang sudah dihapus agar siap ditulisi data baru secara efisien.'
        ]
      },
      {
        title: 'GPU (Kartu Grafis): Pengolah Visual',
        focusObject: 'gpu',
        info: 'GPU (Graphics Processing Unit) atau kartu grafis (VGA card) adalah komponen yang bertugas memproses dan merender seluruh tampilan visual di layar monitor. GPU memiliki ribuan inti pemroses kecil (CUDA cores / Stream Processors) yang bekerja secara paralel untuk menghitung jutaan piksel gambar secara bersamaan. Kartu grafis sangat penting untuk bermain game 3D, editing video, desain grafis, dan bahkan pelatihan kecerdasan buatan (AI).',
        facts: [
          'GPU modern memiliki ribuan inti pemroses: misalnya NVIDIA RTX 4090 memiliki lebih dari 16.000 CUDA cores yang mampu merender grafik 3D ultra realistis secara real-time.',
          'VRAM (Video RAM) adalah memori khusus yang tertanam pada kartu grafis untuk menyimpan data tekstur, model 3D, dan frame gambar. GPU gaming umumnya memiliki 8-24 GB VRAM.',
          'Dua produsen GPU diskrit terbesar di dunia adalah NVIDIA (seri GeForce RTX) dan AMD (seri Radeon RX), keduanya bersaing dalam performa rendering game dan komputasi AI.',
          'Kartu grafis dipasang pada slot PCIe x16 di motherboard dan biasanya membutuhkan kabel daya tambahan 6-pin atau 8-pin langsung dari PSU.',
          'Teknologi Ray Tracing pada GPU modern mensimulasikan pantulan cahaya secara realistis dalam game 3D, menghasilkan efek bayangan, refleksi, dan pencahayaan yang sangat nyata.',
          'GPU juga digunakan di luar gaming: untuk mempercepat rendering video (GPU Encoding), pelatihan model kecerdasan buatan (AI/Machine Learning), dan penambangan kripto (mining).'
        ]
      }
    ]
  },
  {
    id: 'informatika-ai',
    subject: 'Informatika',
    title: 'Dunia Koding & Kecerdasan Artifisial',
    fase: ['Fase C'],
    emoji: '🤖',
    badgeColor: 'bg-violet-600 text-white',
    gradient: 'from-violet-400 to-purple-500',
    bgColor: '#2e1065',
    description: 'Pengenalan konsep Berpikir Komputasional, Literasi Digital, dan Kecerdasan Artifisial (AI) sesuai kurikulum Koding & AI BSKAP 046/H/KR/2025 untuk Fase C.',
    cp: 'Murid mampu menerapkan berpikir komputasional dalam menyelesaikan persoalan sehari-hari secara sistematis, membuat program visual sederhana (koding), dan mengenali pola kecerdasan artifisial dasar.',
    tp: [
      'Siswa mampu menuliskan instruksi logis dan terstruktur (algoritma) untuk menyelesaikan masalah sederhana.',
      'Siswa dapat memahami konsep dasar kecerdasan artifisial dan cara AI belajar dari data.'
    ],
    steps: [
      {
        title: 'Apa itu Algoritma? Resep Langkah demi Langkah',
        focusObject: 'algorithm',
        info: 'Algoritma adalah urutan langkah-langkah logis dan terstruktur yang disusun untuk menyelesaikan sebuah masalah atau mencapai tujuan tertentu. Konsep ini sama seperti resep masakan: kita harus mengikuti instruksi yang tepat secara berurutan agar hasilnya benar. Dalam dunia komputer, programmer menuliskan algoritma agar komputer tahu persis apa yang harus dilakukan. Berpikir komputasional adalah kemampuan memecah masalah besar menjadi langkah-langkah kecil yang bisa dipahami komputer.',
        facts: [
          'Algoritma ada di mana-mana dalam kehidupan sehari-hari: dari cara membuat teh (panaskan air → masukkan teh → tunggu → angkat) hingga cara mencari jalan di Google Maps.',
          'Decomposition (dekomposisi) adalah teknik memecah masalah besar menjadi bagian-bagian kecil yang lebih mudah diselesaikan satu per satu.',
          'Pattern Recognition (pengenalan pola) adalah kemampuan menemukan kesamaan atau pola berulang dalam data untuk mempercepat penyelesaian masalah.',
          'Abstraction (abstraksi) berarti menyaring informasi penting dan mengabaikan detail yang tidak relevan agar fokus pada inti masalah.',
          'Flowchart (diagram alir) adalah cara visual menggambarkan algoritma menggunakan kotak, belah ketupat, dan panah agar lebih mudah dipahami.',
          'Pseudocode adalah cara menuliskan algoritma dalam bahasa sehari-hari yang mirip kode program, contoh: JIKA hujan MAKA bawa payung.'
        ]
      },
      {
        title: 'Input, Proses, Output: Cara Komputer Bekerja',
        focusObject: 'computer',
        info: 'Setiap sistem komputer bekerja berdasarkan tiga tahapan utama: Input (memasukkan data), Proses (mengolah data), dan Output (mengeluarkan hasil). Input bisa berupa ketikan keyboard, klik mouse, atau suara mikrofon. CPU kemudian memproses data tersebut sesuai instruksi program. Hasilnya ditampilkan sebagai output di layar monitor, speaker, atau printer. Memahami siklus IPO ini adalah dasar literasi digital yang penting untuk Fase C.',
        facts: [
          'Perangkat input mencakup keyboard, mouse, mikrofon, kamera webcam, scanner, dan sensor sentuh pada layar touchscreen.',
          'CPU (prosesor) adalah komponen yang melakukan proses pengolahan data. Ia menjalankan instruksi program jutaan kali per detik.',
          'Perangkat output mencakup monitor (menampilkan gambar), speaker (mengeluarkan suara), dan printer (mencetak dokumen ke kertas).',
          'RAM (memori) menyimpan data sementara yang sedang diproses, sedangkan SSD/HDD menyimpan data secara permanen.',
          'Sistem operasi (seperti Windows, macOS, atau Linux) adalah program utama yang mengatur kerja seluruh perangkat keras dan lunak komputer.',
          'Jaringan internet menghubungkan komputer-komputer di seluruh dunia sehingga kita bisa berbagi informasi, belajar online, dan berkomunikasi jarak jauh.'
        ]
      },
      {
        title: 'Mengenal Kecerdasan Artifisial (AI)',
        focusObject: 'ai',
        info: 'Kecerdasan Artifisial (Artificial Intelligence / AI) adalah cabang ilmu komputer yang membuat mesin atau program komputer mampu meniru kemampuan berpikir manusia. AI bisa mengenali wajah di foto, memahami perintah suara, menerjemahkan bahasa, dan bahkan mengalahkan pemain catur terbaik dunia. AI bekerja dengan cara dilatih menggunakan data dalam jumlah sangat besar hingga menemukan pola-pola tersembunyi yang berguna untuk membuat keputusan atau prediksi.',
        facts: [
          'Asisten virtual seperti Google Assistant, Siri (Apple), dan Alexa (Amazon) menggunakan AI untuk memahami perintah suara manusia dan memberikan jawaban.',
          'AI di balik fitur pengenalan wajah (Face ID) pada smartphone menganalisis ratusan titik unik pada wajah kita untuk membuka kunci layar dengan aman.',
          'Filter wajah lucu di Instagram dan TikTok menggunakan AI Computer Vision untuk mendeteksi posisi mata, hidung, dan mulut secara real-time.',
          'Google Translate menggunakan AI Neural Machine Translation untuk menerjemahkan teks antar bahasa dengan akurasi yang semakin baik dari waktu ke waktu.',
          'Rekomendasi video di YouTube dan lagu di Spotify ditentukan oleh algoritma AI yang mempelajari pola tontonan dan pendengaran kita.',
          'AI bisa digunakan untuk mendeteksi penyakit dari foto rontgen, memprediksi cuaca, dan bahkan membantu petani mengidentifikasi hama tanaman secara otomatis.'
        ]
      },
      {
        title: 'Bagaimana AI Belajar dari Data?',
        focusObject: 'learning',
        info: 'AI belajar melalui proses yang disebut Machine Learning (Pembelajaran Mesin). Caranya mirip dengan cara manusia belajar: semakin banyak contoh yang dilihat, semakin pintar AI dalam mengenali pola. Misalnya, untuk mengajari AI mengenali kucing, kita memberikan ribuan foto kucing dan bukan-kucing. AI akan menemukan pola (telinga lancip, kumis, mata bulat) dan belajar membedakannya sendiri. Proses ini disebut pelatihan (training).',
        facts: [
          'Supervised Learning (pembelajaran terawasi): AI dilatih dengan data yang sudah diberi label jawaban benar, seperti foto kucing yang diberi label "kucing".',
          'Dataset adalah kumpulan data besar yang digunakan untuk melatih AI. Semakin banyak dan beragam datanya, semakin akurat AI dalam membuat prediksi.',
          'AI klasifikasi dapat mengelompokkan benda berdasarkan ciri-cirinya, misalnya mengelompokkan buah berdasarkan warna, bentuk, dan ukurannya.',
          'Chatbot AI seperti ChatGPT dilatih menggunakan miliaran teks dari buku, artikel, dan situs web hingga bisa menjawab pertanyaan dalam berbagai bahasa.',
          'AI tidak benar-benar berpikir seperti manusia. AI hanya menghitung probabilitas (kemungkinan) jawaban terbaik berdasarkan pola data yang sudah dipelajari.',
          'Overfitting terjadi ketika AI terlalu menghafal data latihan sehingga tidak bisa bekerja baik dengan data baru yang belum pernah dilihat.'
        ]
      },
      {
        title: 'AI untuk Kebaikan: Etika dan Manfaat',
        focusObject: 'ethics',
        info: 'Kecerdasan Artifisial memiliki potensi luar biasa untuk membantu kehidupan manusia, namun juga memiliki risiko yang harus dipahami. AI harus dikembangkan dan digunakan secara bertanggung jawab dengan memperhatikan etika, keadilan, privasi, dan keselamatan. Sebagai generasi muda yang melek digital, kita perlu memahami bahwa AI adalah alat bantu yang dibuat oleh manusia, dan keputusan penting tetap harus melibatkan pertimbangan moral dan empati manusia.',
        facts: [
          'AI membantu dunia kesehatan: mendeteksi kanker dari foto rontgen lebih cepat dari dokter, mempercepat penemuan obat baru, dan memantau kesehatan pasien jarak jauh.',
          'AI membantu lingkungan: memprediksi bencana alam seperti banjir dan gempa, memantau kebakaran hutan lewat satelit, dan mengoptimalkan penggunaan energi listrik.',
          'Bias AI terjadi jika data pelatihan tidak seimbang atau diskriminatif. AI bisa membuat keputusan tidak adil jika data yang digunakan mengandung prasangka.',
          'Privasi data harus dijaga: AI membutuhkan data pribadi untuk belajar, sehingga penting untuk tidak membagikan informasi sensitif (password, alamat rumah) secara sembarangan.',
          'Deepfake adalah teknologi AI yang bisa membuat video palsu seseorang yang sangat meyakinkan. Kita harus kritis dan cek fakta sebelum mempercayai konten di internet.',
          'Prinsip utama etika AI: AI harus transparan (bisa dijelaskan cara kerjanya), adil (tidak diskriminatif), aman (tidak membahayakan), dan bermanfaat bagi kesejahteraan manusia.'
        ]
      },
    ]
  },
];
