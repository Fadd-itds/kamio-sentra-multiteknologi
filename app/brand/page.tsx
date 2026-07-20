import Navbar from "../../components/Navbar";

export default function BrandAssetsPage() {
  const brandColors = [
    { name: "Kamio Blue", hex: "#2563EB", desc: "Warna utama perusahaan." },
    { name: "White", hex: "#FFFFFF", desc: "Warna latar dan pendukung." },
    { name: "Dark Navy", hex: "#071a3d", desc: "Warna elemen gelap/kontras." },
  ];

  const businessUnits = [
    { name: "Kamio Games", hex: "#a316ce", label: "🎮" },
    { name: "Kamio App", hex: "#e62323", label: "📱" },
    { name: "Kamio Books", hex: "#0aaa52", label: "📚" },
    { name: "Kamio FinTech", hex: "#13c7e3", label: "💳" },
  ];

  // Komponen gaya untuk kotak dengan efek glow tajam
  const glowStyle = "p-8 border border-gray-100 rounded-3xl bg-white transition-all duration-300 hover:border-blue-300 hover:shadow-[0_0_40px_rgba(37,99,235,0.25)] hover:scale-[1.01]";

  return (
    <div className="bg-white min-h-screen text-black pt-32 pb-20">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-6">Identity</h1>
          <h2 className="text-5xl font-extrabold mb-8">Brand Assets</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Identitas visual resmi PT Kamio Sentra Multiteknologi untuk media, mitra, dan pihak terkait.
          </p>
        </div>

        {/* Logo Section */}
        <div className={`${glowStyle} mb-12`}>
          <h3 className="text-2xl font-bold mb-6">Logo Resmi</h3>
          <p className="text-gray-600 mb-6">Tersedia dalam format: PNG, SVG, PDF, JPEG.</p>
          <a href="#" className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all">
            📥 Download Logo
          </a>
        </div>

        {/* Colors Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Main Colors */}
          <div className={glowStyle}>
            <h3 className="text-2xl font-bold mb-6">Warna Brand Utama</h3>
            <div className="space-y-4">
              {brandColors.map((color, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl border border-gray-100 shadow-inner" style={{ backgroundColor: color.hex }}></div>
                  <div>
                    <p className="font-bold">{color.name}</p>
                    <p className="text-sm text-gray-500 font-mono">{color.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Units Accent Colors */}
          <div className={glowStyle}>
            <h3 className="text-2xl font-bold mb-6">Aksen Unit Bisnis</h3>
            <div className="space-y-4">
              {businessUnits.map((unit, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner" style={{ backgroundColor: unit.hex }}>
                    {unit.label}
                  </div>
                  <div>
                    <p className="font-bold">{unit.name}</p>
                    <p className="text-sm text-gray-500 font-mono">{unit.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Typography Section */}
        <div className={`${glowStyle} mb-12`}>
          <h3 className="text-2xl font-bold mb-6">Typography</h3>
          <p className="text-4xl font-sans mb-2">Inter</p>
          <p className="text-gray-600">Font utama untuk isi konten dan paragraf.</p>
        </div>

        {/* Usage Rules */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-8 border border-green-100 rounded-3xl bg-green-50/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all">
            <h4 className="font-bold text-green-700 mb-4">✅ Diperbolehkan</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Menggunakan logo dalam proporsi asli.</li>
              <li>• Menggunakan file resmi yang disediakan.</li>
              <li>• Memberikan ruang kosong yang cukup.</li>
            </ul>
          </div>
          <div className="p-8 border border-red-100 rounded-3xl bg-red-50/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-all">
            <h4 className="font-bold text-red-700 mb-4">❌ Tidak Diperbolehkan</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Mengubah warna logo tanpa izin.</li>
              <li>• Meregangkan atau mengubah proporsi.</li>
              <li>• Menambahkan efek bayangan atau outline.</li>
            </ul>
          </div>
        </div>

        {/* Download All */}
        <div className="bg-[#071a3d] text-white p-12 rounded-3xl text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Unduh Aset Resmi</h3>
          <p className="text-gray-300 mb-8 max-w-lg mx-auto">Logo perusahaan, unit bisnis, brand guidelines, dan company profile dalam satu paket.</p>
          <a href="#" className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 transition-all font-bold rounded-full hover:scale-105">
            📥 Download Brand Assets
          </a>
        </div>

        {/* Contact */}
        <div className="text-center">
          <h4 className="font-bold text-xl mb-2">Butuh Bantuan?</h4>
          <p className="text-gray-600">Hubungi kami melalui halaman <a href="/contact" className="text-blue-600 font-bold underline">Contact</a> untuk kebutuhan format khusus.</p>
        </div>
      </div>
    </div>
  );
}