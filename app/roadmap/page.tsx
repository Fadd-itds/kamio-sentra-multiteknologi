import Navbar from "../../components/Navbar";

export default function RoadmapPage() {
  const glowStyle = "p-8 border border-gray-100 rounded-3xl bg-white transition-all duration-300 hover:border-blue-300 hover:shadow-[0_0_40px_rgba(37,99,235,0.25)] hover:scale-[1.01]";

  return (
    <div className="bg-white min-h-screen text-black pt-32 pb-20">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-6">Strategy</h1>
          <h2 className="text-5xl font-extrabold mb-8">Roadmap</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Membangun Masa Depan Melalui Inovasi. Roadmap PT Kamio Sentra Multiteknologi menggambarkan arah pengembangan perusahaan dalam membangun ekosistem teknologi dan digital publishing.
          </p>
        </div>

        <div className="space-y-8">
          {/* 2026 */}
          <div className={glowStyle}>
            <h3 className="text-3xl font-bold mb-2">2026</h3>
            <p className="text-blue-600 font-bold mb-6 italic">Foundation & Establishment</p>
            <p className="text-gray-700 mb-6">Tahun ini menjadi awal perjalanan PT Kamio Sentra Multiteknologi dalam membangun fondasi perusahaan.</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-3 text-black">Pencapaian:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                  <li>Pendirian PT Kamio Sentra Multiteknologi</li>
                  <li>Peluncuran website resmi</li>
                  <li>Pembentukan identitas merek</li>
                  <li>Peluncuran layanan Digital Publishing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3 text-black">Unit Bisnis:</h4>
                <div className="space-y-2">
                  {[
                    { name: "Kamio Games", icon: "🎮" },
                    { name: "Kamio App", icon: "📱" },
                    { name: "Kamio Books", icon: "📚" },
                    { name: "Pengembangan awal Kamio FinTech", icon: "💳" },
                  ].map((unit, i) => (
                    <div 
                      key={i} 
                      className="p-3 bg-gray-50 rounded-xl text-sm font-medium border border-gray-100 transition-all duration-300 hover:bg-white hover:border-blue-200 hover:shadow-[0_0_15px_rgba(37,99,235,0.15)] hover:scale-[1.02] cursor-pointer flex items-center gap-2"
                    >
                      <span>{unit.icon}</span> {unit.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 2027 */}
          <div className={glowStyle}>
            <h3 className="text-3xl font-bold mb-2">2027</h3>
            <p className="text-blue-600 font-bold mb-6 italic">Expansion & Growth</p>
            <p className="text-gray-700 mb-4">Fokus pada perluasan layanan dan peningkatan kualitas.</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
              <li>Pengembangan Kamio FinTech</li>
              <li>Memperluas layanan penerbitan digital</li>
              <li>Menjalin lebih banyak kemitraan strategis</li>
              <li>Meningkatkan kualitas produk dan layanan</li>
              <li>Memperluas jangkauan pasar</li>
            </ul>
          </div>

          {/* 2028 */}
          <div className={glowStyle}>
            <h3 className="text-3xl font-bold mb-2">2028</h3>
            <p className="text-blue-600 font-bold mb-6 italic">Innovation & Technology</p>
            <p className="text-gray-700 mb-4">Menghadirkan inovasi baru untuk mendukung transformasi digital.</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
              <li>Pengembangan solusi teknologi baru</li>
              <li>Optimalisasi ekosistem digital perusahaan</li>
              <li>Peningkatan keamanan dan infrastruktur</li>
              <li>Pengembangan layanan berbasis kebutuhan industri</li>
            </ul>
          </div>

          {/* Future Vision */}
          <div className="p-8 border border-gray-100 rounded-3xl bg-blue-600 text-white">
            <h3 className="text-2xl font-bold mb-4">Future Vision</h3>
            <p className="font-bold mb-2 italic">Toward a Better Digital Future</p>
            <p className="text-blue-50 leading-relaxed">
              PT Kamio Sentra Multiteknologi akan terus beradaptasi dengan perkembangan teknologi serta kebutuhan masyarakat. 
              Kami berkomitmen untuk membangun ekosistem digital yang berkelanjutan melalui inovasi, kolaborasi, dan pengembangan layanan.
            </p>
          </div>

          {/* Commitment */}
          <div className="p-6 border border-gray-100 rounded-3xl bg-gray-50 text-center">
            <p className="text-sm text-gray-500 italic">
              <strong>Our Commitment:</strong> Roadmap ini merupakan gambaran arah pengembangan perusahaan dan dapat diperbarui 
              sesuai dengan perkembangan bisnis, teknologi, serta kebutuhan industri.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}