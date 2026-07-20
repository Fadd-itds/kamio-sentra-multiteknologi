import Navbar from "../../components/Navbar";

export default function BusinessUnitsPage() {
  const units = [
    {
      name: "Kamio Games",
      category: "Game Development & Digital Publishing",
      desc: "Mengembangkan, menerbitkan, dan mendistribusikan game digital untuk pasar nasional maupun internasional.",
      status: "Active"
    },
    {
      name: "Kamio App",
      category: "Application Development & Publishing",
      desc: "Mengembangkan aplikasi digital serta menyediakan layanan penerbitan aplikasi untuk berbagai kebutuhan.",
      status: "Active"
    },
    {
      name: "Kamio Books",
      category: "Digital Book Publishing",
      desc: "Menyediakan layanan penerbitan buku digital dan membantu penulis mendistribusikan karya mereka secara profesional.",
      status: "Active"
    },
    {
      name: "Kamio FinTech",
      category: "Financial Technology",
      desc: "Mengembangkan solusi teknologi keuangan untuk mendukung transformasi digital di masa mendatang.",
      status: "Coming Soon"
    }
  ];

  return (
    <div className="bg-white min-h-screen text-black pt-32 pb-20">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-6">Business Units</h1>
          <h2 className="text-5xl font-extrabold mb-6">Our Business Units</h2>
          <p className="text-xl text-gray-700">
            Mendorong inovasi melalui divisi bisnis khusus di bidang teknologi dan penerbitan digital.
          </p>
        </div>

        {/* Business Units Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {units.map((unit, i) => (
            <div 
              key={i} 
              className="p-8 border border-gray-100 rounded-3xl bg-gray-50/50 hover:border-blue-200 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{unit.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  unit.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  {unit.status}
                </span>
              </div>
              <p className="text-blue-600 font-semibold text-sm mb-4">{unit.category}</p>
              <p className="text-gray-600 leading-relaxed">{unit.desc}</p>
            </div>
          ))}
        </div>

        {/* Growing Together */}
        <div className="bg-black text-white p-12 rounded-3xl">
          <h3 className="text-3xl font-bold mb-6">Growing Together</h3>
          <p className="text-gray-400 leading-relaxed max-w-2xl">
            Melalui sinergi antar unit bisnis, PT Kamio Sentra Multiteknologi berkomitmen membangun ekosistem digital yang inovatif, 
            berkelanjutan, dan memberikan nilai tambah bagi masyarakat serta mitra di berbagai sektor industri.
          </p>
        </div>
      </div>
    </div>
  );
}