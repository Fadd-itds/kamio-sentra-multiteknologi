import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function PressKitPage() {
  // Gaya untuk kartu utama dengan efek glow
  const glowStyle = "p-8 border border-gray-100 rounded-3xl bg-white transition-all duration-300 hover:border-blue-300 hover:shadow-[0_0_40px_rgba(37,99,235,0.25)] hover:scale-[1.01]";

  return (
    <div className="bg-white min-h-screen text-black pt-32 pb-20">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-6">Media</h1>
          <h2 className="text-5xl font-extrabold mb-8">Press Kit</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Informasi resmi mengenai PT Kamio Sentra Multiteknologi untuk kebutuhan media, jurnalis, mitra, maupun pihak lain yang memerlukan referensi terpercaya mengenai perusahaan.
          </p>
        </div>

        <div className="space-y-8">
          {/* Company Overview */}
          <div className={glowStyle}>
            <h3 className="text-2xl font-bold mb-4">Company Overview</h3>
            <p className="text-gray-700 leading-relaxed">
              PT Kamio Sentra Multiteknologi merupakan perusahaan yang bergerak di bidang teknologi dan digital publishing. 
              Kami berfokus pada pengembangan produk digital serta layanan penerbitan game, aplikasi, dan buku digital 
              melalui berbagai unit bisnis yang saling terintegrasi.
            </p>
          </div>

          {/* Company Facts */}
          <div className={glowStyle}>
            <h3 className="text-2xl font-bold mb-6">Company Facts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
              {[
                { label: "Nama Perusahaan", val: "PT Kamio Sentra Multiteknologi" },
                { label: "Didirikan", val: "2026" },
                { label: "Industri", val: "Technology & Digital Publishing" },
                { label: "Kantor Pusat", val: "Indonesia" },
                { label: "Website", val: "www.kamio.co.id" },
              ].map((fact, i) => (
                <div key={i}>
                  <p className="text-sm text-gray-500 font-medium">{fact.label}</p>
                  <p className="font-bold text-black">{fact.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Business Units - Dengan Efek Hover */}
          <div className={glowStyle}>
            <h3 className="text-2xl font-bold mb-6">Business Units</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Kamio Games", icon: "🎮" },
                { name: "Kamio App", icon: "📱" },
                { name: "Kamio Books", icon: "📚" },
                { name: "Kamio FinTech (Coming Soon)", icon: "💳" },
              ].map((unit, i) => (
                <div 
                  key={i} 
                  className="p-4 bg-gray-50 rounded-2xl font-bold text-black border border-gray-100 flex items-center gap-3 transition-all duration-300 hover:bg-white hover:border-blue-200 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] hover:scale-[1.02] cursor-pointer"
                >
                  <span className="text-xl">{unit.icon}</span> {unit.name}
                </div>
              ))}
            </div>
          </div>

          {/* Media Resources */}
          <div className={glowStyle}>
            <h3 className="text-2xl font-bold mb-4">Media Resources</h3>
            <p className="text-gray-700 mb-6">Media dan mitra dapat mengunduh berbagai aset resmi perusahaan melalui halaman Brand Assets, termasuk:</p>
            <ul className="list-disc pl-5 text-gray-700 mb-6 space-y-1">
              <li>Logo perusahaan</li>
              <li>Logo unit bisnis</li>
              <li>Brand Guidelines</li>
              <li>Company Profile (jika sudah tersedia)</li>
            </ul>
            <Link href="/brand-assets" className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all">
              Lihat Brand Assets
            </Link>
          </div>

          {/* Media Contact */}
          <div className={glowStyle}>
            <h3 className="text-2xl font-bold mb-4">Media Contact</h3>
            <p className="text-gray-700 mb-6">Untuk kebutuhan wawancara, kerja sama media, atau permintaan informasi resmi, silakan menghubungi kami melalui halaman Contact atau email resmi perusahaan.</p>
            <Link href="/contact" className="text-blue-600 font-bold underline">
              Halaman Contact →
            </Link>
          </div>

          {/* Brand Statement */}
          <div className="p-8 border border-gray-100 rounded-3xl bg-[#071a3d] text-white">
            <h3 className="text-xl font-bold mb-4">Brand Statement</h3>
            <p className="italic text-gray-300 leading-relaxed">
              "PT Kamio Sentra Multiteknologi berkomitmen membangun ekosistem teknologi dan digital publishing yang inovatif, 
              profesional, serta berorientasi pada kualitas untuk mendukung perkembangan industri digital di Indonesia dan pasar global."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}