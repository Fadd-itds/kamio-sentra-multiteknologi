import Navbar from "../../components/Navbar";

export default function TermsOfServicePage() {
  const sections = [
    {
      title: "Ketentuan Umum",
      content: (
        <>
          <p>Selamat datang di website resmi PT Kamio Sentra Multiteknologi. Dengan mengakses dan menggunakan website ini, Anda dianggap telah membaca, memahami, dan menyetujui seluruh Syarat dan Ketentuan yang berlaku.</p>
          <p className="mt-2 font-semibold text-black">Apabila Anda tidak menyetujui salah satu atau seluruh ketentuan yang tercantum, kami menyarankan untuk tidak menggunakan website ini.</p>
        </>
      )
    },
    {
      title: "Penggunaan Website",
      content: <p>Pengguna diperkenankan menggunakan website ini untuk memperoleh informasi mengenai perusahaan, layanan, produk, berita, maupun peluang kerja sama. Pengguna dilarang menggunakan website ini untuk tujuan yang melanggar hukum, merugikan pihak lain, mengganggu operasional website, atau melakukan aktivitas yang dapat membahayakan keamanan sistem.</p>
    },
    {
      title: "Hak Kekayaan Intelektual",
      content: <p>Seluruh konten pada website ini (logo, desain, teks, gambar, video, dll) adalah milik PT Kamio Sentra Multiteknologi atau digunakan berdasarkan izin yang sah. Pengguna tidak diperkenankan menyalin, memperbanyak, memodifikasi, atau mendistribusikan isi website tanpa izin tertulis dari perusahaan.</p>
    },
    {
      title: "Informasi Website",
      content: <p>Kami berupaya menyajikan informasi yang akurat, namun perusahaan tidak menjamin bahwa seluruh informasi selalu lengkap atau bebas dari kesalahan. Perusahaan berhak melakukan perubahan atau pembaruan informasi sewaktu-waktu tanpa pemberitahuan sebelumnya.</p>
    },
    {
      title: "Tautan ke Situs Pihak Ketiga",
      content: <p>Website ini dapat memuat tautan menuju website pihak ketiga. PT Kamio Sentra Multiteknologi tidak bertanggung jawab atas isi, layanan, maupun kebijakan privasi yang diterapkan oleh website pihak ketiga tersebut.</p>
    },
    {
      title: "Pengajuan Kerja Sama",
      content: <p>Pengajuan kerja sama atau komunikasi lainnya melalui website tidak secara otomatis dianggap sebagai persetujuan atau terbentuknya hubungan kontraktual. Seluruh kerja sama akan melalui proses evaluasi serta tunduk pada perjanjian resmi yang disepakati.</p>
    },
    {
      title: "Pembatasan Tanggung Jawab",
      content: <p>PT Kamio Sentra Multiteknologi tidak bertanggung jawab atas kerugian secara langsung maupun tidak langsung yang timbul akibat penggunaan website, gangguan sistem, kesalahan informasi, maupun keadaan di luar kendali perusahaan.</p>
    },
    {
      title: "Perubahan Syarat dan Ketentuan",
      content: <p>Perusahaan berhak mengubah atau menyesuaikan Syarat dan Ketentuan ini sewaktu-waktu. Perubahan akan berlaku segera setelah dipublikasikan pada halaman ini.</p>
    },
    {
      title: "Hukum yang Berlaku",
      content: <p>Syarat dan Ketentuan ini diatur berdasarkan hukum yang berlaku di Republik Indonesia. Segala perselisihan yang timbul akan diselesaikan sesuai dengan ketentuan hukum yang berlaku di Indonesia.</p>
    },
    {
      title: "Hubungi Kami",
      content: <p>Apabila Anda memiliki pertanyaan, silakan menghubungi PT Kamio Sentra Multiteknologi melalui halaman Contact atau melalui kontak resmi yang tersedia pada website.</p>
    }
  ];

  return (
    <div className="bg-white min-h-screen text-black pt-32 pb-20">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-6">Legal</h1>
          <h2 className="text-5xl font-extrabold mb-8">Terms of Service</h2>
          <p className="text-gray-500 italic">Terakhir diperbarui: Juli 2026</p>
        </div>

        <div className="space-y-8">
          {sections.map((sec, i) => (
            <div 
              key={i} 
              className="p-8 border border-gray-100 rounded-3xl bg-white transition-all duration-300 hover:border-blue-200 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]"
            >
              <h3 className="text-2xl font-bold text-black mb-4">{sec.title}</h3>
              <div className="text-gray-700 leading-relaxed">
                {sec.content}
              </div>
            </div>
          ))}

          {/* Catatan Tambahan */}
          <div className="p-8 border border-gray-100 rounded-3xl bg-gray-50">
            <p className="text-sm text-gray-600 italic leading-relaxed">
              <span className="font-bold text-black block mb-2">Catatan:</span>
              Dokumen ini berlaku untuk penggunaan website resmi PT Kamio Sentra Multiteknologi. Ketentuan mengenai kerja sama bisnis, layanan penerbitan, maupun perjanjian komersial akan diatur dalam perjanjian atau kontrak terpisah sesuai kesepakatan antara PT Kamio Sentra Multiteknologi dan mitra terkait.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} PT Kamio Sentra Multiteknologi. Seluruh Hak Dilindungi.</p>
        </div>
      </div>
    </div>
  );
}