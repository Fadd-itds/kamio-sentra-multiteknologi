import Navbar from "@/components/Navbar";

export default function ServicePage() {
  const services = [
    {
      title: "Digital Game Publishing",
      icon: "🎮",
      description: "Penerbitan dan distribusi game berkualitas ke pasar global dengan jangkauan luas.",
      features: ["Optimasi Store", "Manajemen Komunitas", "Strategi Marketing"]
    },
    {
      title: "Mobile App Publishing",
      icon: "📱",
      description: "Solusi lengkap penerbitan aplikasi mobile agar tampil menonjol dan siap diunduh pengguna dunia.",
      features: ["ASO (App Store Optimization)", "Monitoring Performa", "Update Berkala"]
    },
    {
      title: "Digital Book Publishing",
      icon: "📚",
      description: "Distribusi karya tulis ke berbagai platform e-book dan penerbitan digital terkemuka.",
      features: ["Format Digital", "Distribusi Global", "Perlindungan Hak Cipta"]
    },
    {
      title: "Software Solutions",
      icon: "💻",
      description: "Pengembangan perangkat lunak yang andal dan disesuaikan dengan kebutuhan bisnis Anda.",
      features: ["Custom Software Dev", "UI/UX Design", "Pemeliharaan Sistem"]
    },
    {
      title: "Digital Distribution",
      icon: "🌐",
      description: "Membantu memperluas jangkauan distribusi karya digital agar dapat diakses oleh pengguna di berbagai wilayah secara luas.",
      features: ["Global Reach", "Platform Integration", "Regional Targeting"]
    },
    {
      title: "Publishing Partnership",
      icon: "🤝",
      description: "Membuka peluang kerja sama penerbitan jangka panjang bagi developer, penulis, startup, dan studio kreatif.",
      features: ["Long-term Support", "Strategic Growth", "Mutual Collaboration"]
    },
    {
      title: "Publishing Management",
      icon: "📈",
      description: "Pengelolaan proses penerbitan, metadata, serta koordinasi publikasi agar karya tetap terkelola dengan baik.",
      features: ["Metadata Management", "Update Coordination", "Lifecycle Support"]
    }
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-black">Layanan Kami</h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Solusi teknologi dan penerbitan digital profesional untuk mengakselerasi karya Anda ke tingkat global.
        </p>
      </section>

      {/* SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 border border-gray-200 rounded-3xl p-8 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(0,87,184,0.1)] transition-all duration-300">
              <div className="text-4xl mb-6">{service.icon}</div>
              <h2 className="text-xl font-bold mb-4 text-black">{service.title}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                    <span className="text-blue-600">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-16 text-black">Bagaimana Kami Bekerja</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Konsultasi", desc: "Diskusi kebutuhan proyek Anda." },
            { step: "02", title: "Perencanaan", desc: "Strategi teknis & distribusi." },
            { step: "03", title: "Eksekusi", desc: "Pengembangan & Peluncuran." },
            { step: "04", title: "Optimasi", desc: "Maintenance & Pertumbuhan." }
          ].map((step, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-black text-blue-100 mb-4">{step.step}</div>
              <h3 className="text-xl font-bold mb-2 text-black">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-4xl mx-auto px-6 pb-20 text-center">
        <div className="bg-gray-900 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-6">Siap Memulai Proyek Anda?</h2>
          <p className="text-gray-300 mb-10 text-lg">
            Konsultasikan ide atau karya digital Anda kepada tim ahli kami hari ini.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30">
              Hubungi Kami
            </a>
            <a href="/partnership" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all">
              Ajukan Kerja Sama
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}