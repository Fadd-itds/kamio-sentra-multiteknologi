import Navbar from "../../components/Navbar";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "Komitmen Kami terhadap Privasi Anda",
      content: (
        <>
          <p>PT Kamio Sentra Multiteknologi berkomitmen untuk melindungi privasi serta keamanan informasi pribadi setiap pengunjung, mitra, dan pengguna website kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi yang Anda berikan saat mengakses website maupun menggunakan layanan kami.</p>
          <p className="font-semibold text-black mt-2">Dengan menggunakan website ini, Anda dianggap telah membaca dan menyetujui ketentuan dalam Kebijakan Privasi ini.</p>
        </>
      )
    },
    {
      title: "Informasi yang Kami Kumpulkan",
      content: (
        <>
          <p>Kami dapat mengumpulkan informasi yang Anda berikan secara sukarela, antara lain:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Nama lengkap</li>
            <li>Alamat email</li>
            <li>Nomor telepon (jika diberikan)</li>
            <li>Nama perusahaan atau organisasi (jika ada)</li>
            <li>Informasi yang dikirimkan melalui formulir kontak atau pengajuan kerja sama</li>
          </ul>
          <p className="mt-4">Selain itu, kami juga dapat mengumpulkan informasi teknis secara otomatis, seperti alamat IP, jenis browser, sistem operasi, informasi perangkat, halaman yang dikunjungi, serta waktu dan tanggal akses.</p>
        </>
      )
    },
    {
      title: "Penggunaan Informasi",
      content: (
        <ul className="list-disc pl-6 space-y-1">
          <li>Menanggapi pertanyaan, permintaan, atau konsultasi.</li>
          <li>Memproses pengajuan kerja sama dan layanan penerbitan.</li>
          <li>Meningkatkan kualitas website, produk, dan layanan.</li>
          <li>Menyampaikan informasi atau pembaruan yang relevan.</li>
          <li>Menjaga keamanan website dan mencegah penyalahgunaan.</li>
          <li>Memenuhi kewajiban sesuai peraturan perundang-undangan yang berlaku.</li>
        </ul>
      )
    },
    {
      title: "Perlindungan Data",
      content: <p>Kami menerapkan langkah-langkah teknis dan administratif yang wajar untuk melindungi informasi pribadi dari akses, penggunaan, perubahan, atau pengungkapan yang tidak sah. Meskipun demikian, tidak ada sistem keamanan yang dapat menjamin perlindungan secara mutlak terhadap seluruh risiko yang mungkin terjadi.</p>
    },
    {
      title: "Pembagian Informasi",
      content: (
        <>
          <p>PT Kamio Sentra Multiteknologi tidak menjual, memperdagangkan, maupun menyewakan informasi pribadi pengguna kepada pihak lain. Informasi hanya akan dibagikan apabila:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Diperlukan untuk memenuhi ketentuan hukum yang berlaku.</li>
            <li>Diperlukan untuk melindungi hak dan kepentingan perusahaan.</li>
            <li>Diperlukan dalam pelaksanaan kerja sama yang telah disepakati.</li>
            <li>Pengguna telah memberikan persetujuan.</li>
          </ul>
        </>
      )
    },
    {
      title: "Cookies",
      content: <p>Website ini dapat menggunakan cookies atau teknologi serupa untuk meningkatkan pengalaman pengguna, menganalisis penggunaan website, serta membantu pengembangan layanan. Pengguna dapat mengatur atau menonaktifkan cookies melalui pengaturan browser. Namun, beberapa fitur website mungkin tidak berfungsi secara optimal apabila cookies dinonaktifkan.</p>
    },
    {
      title: "Tautan ke Situs Pihak Ketiga",
      content: <p>Website kami dapat berisi tautan menuju website atau layanan pihak ketiga. PT Kamio Sentra Multiteknologi tidak bertanggung jawab atas kebijakan privasi maupun isi dari website tersebut. Kami menyarankan pengguna untuk membaca kebijakan privasi masing-masing website yang dikunjungi.</p>
    },
    {
      title: "Hak Pengguna",
      content: (
        <ul className="list-disc pl-6 space-y-1">
          <li>Meminta akses terhadap informasi pribadi yang kami simpan.</li>
          <li>Meminta perbaikan apabila terdapat data yang tidak akurat.</li>
          <li>Meminta penghapusan data pribadi sesuai ketentuan hukum yang berlaku.</li>
          <li>Menghubungi kami apabila memiliki pertanyaan mengenai penggunaan data pribadi.</li>
        </ul>
      )
    },
    {
      title: "Hubungi Kami",
      content: <p>Apabila Anda memiliki pertanyaan mengenai Kebijakan Privasi ini atau penggunaan data pribadi, silakan menghubungi kami melalui halaman Contact atau melalui kontak resmi PT Kamio Sentra Multiteknologi yang tercantum di website.</p>
    }
  ];

  return (
    <div className="bg-white min-h-screen text-black pt-32 pb-20">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-6">Legal</h1>
          <h2 className="text-5xl font-extrabold mb-8">Privacy Policy</h2>
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