import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function DeveloperResourcesPage() {
  const sections = [
    {
      title: "Proses Penerbitan",
      content: (
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { step: "1", title: "Pengajuan Proyek", desc: "Kirimkan informasi game, aplikasi, atau buku melalui kontak resmi." },
            { step: "2", title: "Peninjauan Awal", desc: "Pemeriksaan kelengkapan informasi dan kesesuaian proyek." },
            { step: "3", title: "Evaluasi", desc: "Penilaian kualitas, orisinalitas, dan kebijakan platform." },
            { step: "4", title: "Persetujuan", desc: "Langkah lanjut melalui perjanjian kerjasama resmi." },
            { step: "5", title: "Penerbitan", desc: "Persiapan dan perilisan di platform distribusi terkait." },
            { step: "6", title: "Dukungan Berkelanjutan", desc: "Bantuan teknis, pembaruan, dan pengelolaan produk." },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-4 border border-gray-100 rounded-2xl bg-white">
              <span className="text-2xl font-black text-blue-600">{item.step}</span>
              <div>
                <h4 className="font-bold text-black">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Persyaratan Pengajuan",
      content: (
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Nama produk dan deskripsi lengkap.</li>
          <li>Logo, ikon, serta materi promosi (screenshot/video).</li>
          <li>Informasi pengembang atau penulis.</li>
          <li>Dokumen pendukung dan informasi hak cipta.</li>
        </ul>
      )
    },
    {
      title: "Standar Kualitas",
      content: (
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Karya asli dengan hak penggunaan yang sah.</li>
          <li>Tidak melanggar hak cipta maupun kekayaan intelektual pihak lain.</li>
          <li>Menyediakan informasi produk secara jelas dan akurat.</li>
          <li>Mematuhi kebijakan platform distribusi.</li>
          <li>Kualitas produk yang layak untuk dipublikasikan.</li>
        </ul>
      )
    },
    {
      title: "Hak Kekayaan Intelektual",
      content: <p className="text-gray-700 leading-relaxed">Seluruh hak cipta dan kepemilikan atas karya tetap menjadi milik pemiliknya, kecuali ditentukan lain melalui perjanjian tertulis. PT Kamio Sentra Multiteknologi sangat menghormati dan mendukung perlindungan hak kekayaan intelektual.</p>
    },
    {
      title: "Pertanyaan yang Sering Diajukan",
      content: (
        <div className="space-y-4">
          {[
            { q: "Apakah semua proyek akan diterima?", a: "Tidak, setiap pengajuan melalui proses evaluasi kualitas dan kelayakan." },
            { q: "Apakah saya tetap memiliki hak atas karya saya?", a: "Ya, hak karya tetap milik Anda kecuali ada kesepakatan lain di perjanjian resmi." },
            { q: "Berapa lama proses peninjauan?", a: "Bervariasi tergantung jenis proyek dan kelengkapan dokumen." },
            { q: "Apakah ada biaya penerbitan?", a: "Ketentuan biaya/bagi hasil akan dibahas secara terpisah sesuai jenis layanan." },
          ].map((faq, i) => (
            <div key={i} className="border-b border-gray-100 pb-2">
              <h4 className="font-bold text-black">{faq.q}</h4>
              <p className="text-sm text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="bg-white min-h-screen text-black pt-32 pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-6">Resources</h1>
          <h2 className="text-5xl font-extrabold mb-8">Developer Resources</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Pusat informasi bagi developer, penulis, dan mitra untuk memahami proses penerbitan profesional di PT Kamio Sentra Multiteknologi.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((sec, i) => (
            <div key={i} className="p-8 border border-gray-100 rounded-3xl bg-white transition-all duration-300 hover:border-blue-200 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]">
              <h3 className="text-2xl font-bold text-black mb-6">{sec.title}</h3>
              {sec.content}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-[#071a3d] text-white p-12 rounded-3xl text-center">
          <h3 className="text-3xl font-bold mb-4">Siap Menerbitkan Karya Anda?</h3>
          <p className="text-gray-300 mb-8 max-w-lg mx-auto">Kami siap menjadi mitra profesional dalam penerbitan game, aplikasi, dan buku digital Anda.</p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 transition-all font-bold rounded-full">
            🚀 Ajukan Proyek Anda Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}