import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function PartnershipPage() {
  const partners = [
    { title: "Indie Game Developer", icon: "🎮" },
    { title: "Mobile App Developer", icon: "📱" },
    { title: "Penulis & Penerbit Buku Digital", icon: "📚" },
    { title: "Studio Pengembang", icon: "🏢" },
    { title: "Startup Teknologi", icon: "🚀" },
    { title: "Kreator Digital", icon: "🎨" },
    { title: "Institusi Pendidikan & Organisasi", icon: "🏫" }
  ];

  return (
    <div className="bg-white min-h-screen text-black pt-32 pb-20">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">Partnership</h1>
          <h2 className="text-5xl font-extrabold mb-8">Build the Future Together</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            PT Kamio Sentra Multiteknologi membuka peluang kemitraan bagi developer, penulis, studio, startup, organisasi, dan pelaku industri kreatif yang ingin menerbitkan serta mendistribusikan karya digital mereka secara profesional. Kami percaya bahwa kolaborasi yang baik dapat menghasilkan inovasi yang memberikan manfaat bagi lebih banyak orang.
          </p>
        </div>

        {/* Siapa yang Dapat Bermitra */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-6">Siapa yang Dapat Bermitra?</h3>
          <p className="mb-4 text-gray-700">Kami membuka kesempatan kerja sama bagi:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partners.map((partner, i) => (
              <li 
                key={i} 
                className="flex items-center gap-3 p-4 border border-gray-100 rounded-2xl bg-gray-50 font-bold transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(0,87,184,0.2)] hover:border-transparent cursor-pointer"
              >
                <span className="text-xl">{partner.icon}</span>
                {partner.title}
              </li>
            ))}
          </ul>
        </section>

        {/* Layanan Kemitraan */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-6">Layanan Kemitraan</h3>
          <div className="p-8 border border-gray-200 rounded-2xl">
            <ul className="space-y-4">
              {[
                "Penerbitan Game Digital",
                "Penerbitan Aplikasi Android",
                "Penerbitan Buku Digital (E-Book)",
                "Pendampingan proses publikasi",
                "Pengelolaan distribusi digital",
                "Dukungan selama masa kerja sama sesuai perjanjian"
              ].map((service, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <span className="font-semibold">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Alur Kerja Sama - DIPERBAIKI */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-8">Alur Kerja Sama</h3>
          <div className="space-y-8">
            {[
              { title: "Pengajuan Proyek", desc: "Mitra mengirimkan informasi mengenai proyek yang ingin diajukan." },
              { title: "Proses Evaluasi", desc: "Tim kami akan melakukan peninjauan terhadap proyek berdasarkan kualitas, kelayakan, dan kesesuaian dengan standar perusahaan." },
              { title: "Diskusi & Kesepakatan", desc: "Apabila proyek dinyatakan layak, kedua belah pihak akan mendiskusikan ruang lingkup kerja sama, hak, kewajiban, dan ketentuan lainnya." },
              { title: "Proses Penerbitan", desc: "Setelah seluruh persyaratan terpenuhi, proyek akan diproses untuk diterbitkan sesuai platform yang disepakati." },
              { title: "Dukungan Berkelanjutan", desc: "Kami akan terus berkoordinasi dengan mitra selama masa kerja sama sesuai ketentuan yang berlaku." }
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="text-xl font-bold text-gray-300 pt-1 shrink-0">
                  {`0${i + 1}`}
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{`${i + 1}. ${step.title}`}</h4>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mengapa Bermitra & Persyaratan */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-900 text-white p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-6">Mengapa Bermitra?</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>✓ Profesional dan transparan.</li>
              <li>✓ Berorientasi pada kualitas.</li>
              <li>✓ Komunikasi yang terbuka.</li>
              <li>✓ Mendukung pertumbuhan kreator lokal.</li>
              <li>✓ Berkomitmen membangun hubungan jangka panjang.</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Persyaratan Umum</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Memiliki hak atas karya yang diajukan.</li>
              <li>• Tidak melanggar hukum atau IP pihak lain.</li>
              <li>• Bersedia mengikuti proses evaluasi.</li>
              <li>• Menyetujui perjanjian kemitraan.</li>
            </ul>
          </div>
        </section>

        {/* Footer CTA */}
        <div className="text-center pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-bold mb-4">Mari Berkembang Bersama</h3>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Jika Anda sedang mencari mitra penerbitan digital yang profesional dan terpercaya, PT Kamio Sentra Multiteknologi siap menjadi bagian dari perjalanan tersebut.
          </p>
          <Link href="/contact" className="px-10 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-all">
            Hubungi Kami
          </Link>
        </div>
      </div>
    </div>
  );
}