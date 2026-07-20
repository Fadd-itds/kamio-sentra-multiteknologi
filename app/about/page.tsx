import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-black">Tentang KAMIO</h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Solusi teknologi finansial untuk masa depan yang lebih cepat, aman, dan terintegrasi.
        </p>
      </section>

      {/* SECTION TENTANG & SIAPA KAMI */}
      <section className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-10 shadow-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(0,87,184,0.12)]">
            <h2 className="text-3xl font-bold mb-6 text-black">Tentang PT Kamio Sentra Multiteknologi</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
                PT Kamio Sentra Multiteknologi adalah perusahaan yang bergerak di bidang teknologi dan penerbitan digital (Digital Publishing). Kami berkomitmen menghadirkan solusi inovatif serta mendukung para kreator, developer, dan penulis dalam mendistribusikan karya mereka ke pasar yang lebih luas.
            </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-10 shadow-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(0,87,184,0.12)]">
            <h2 className="text-3xl font-bold mb-8 text-black text-center">Siapa Kami</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                    Didirikan pada tahun 2026, PT Kamio Sentra Multiteknologi merupakan perusahaan yang bergerak di bidang teknologi dan penerbitan digital (Digital Publishing). 
                    Kami berkomitmen untuk menghadirkan layanan penerbitan yang profesional, transparan, dan berkualitas bagi para developer, penulis, kreator, serta pelaku usaha 
                    yang ingin mendistribusikan karya digital mereka ke pasar yang lebih luas.
                </p>
                <p>
                    Selain menyediakan layanan penerbitan game, aplikasi, dan buku digital, perusahaan juga mengembangkan berbagai produk digital inovatif sebagai bagian 
                    dari komitmen dalam mendorong pertumbuhan ekosistem teknologi dan industri kreatif di Indonesia. Dengan mengedepankan inovasi, integritas, dan kolaborasi, 
                    PT Kamio Sentra Multiteknologi terus berupaya menciptakan solusi digital yang memberikan manfaat bagi masyarakat serta mampu bersaing di tingkat nasional maupun internasional.
                </p>
            </div>
        </div>
      </section>

      {/* SECTION TIMELINE */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">Perjalanan Kami</h2>
        <div className="relative border-l-2 border-blue-500 ml-3 md:ml-0 space-y-12">
          <div className="relative pl-8">
            <div className="absolute -left-[9px] top-1 w-4 h-4 bg-blue-600 rounded-full"></div>
            <h3 className="text-xl font-bold text-black">Mei 2026</h3>
            <p className="text-gray-600">PT Kamio Sentra Multiteknologi didirikan.</p>
          </div>
          <div className="relative pl-8">
            <div className="absolute -left-[9px] top-1 w-4 h-4 bg-blue-600 rounded-full"></div>
            <h3 className="text-xl font-bold text-black">Juli 2026</h3>
            <p className="text-gray-600">Membuka layanan Digital Publishing.</p>
          </div>
        </div>
      </section>

      {/* VISI & MISI SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-10 shadow-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_35px_rgba(0,87,184,0.15)]">
            <h2 className="text-2xl font-bold mb-6 text-black">Visi Kami</h2>
            <p className="text-gray-700 leading-relaxed">
              Memberikan layanan penerbitan digital dan solusi teknologi yang inovatif, profesional, dan terpercaya, serta mendukung para kreator dan pelaku usaha dalam menghadirkan karya serta produk digital yang berkualitas, berdaya saing, dan menjangkau pasar global.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-10 shadow-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_35px_rgba(0,87,184,0.15)]">
            <h2 className="text-2xl font-bold mb-6 text-black">Misi Kami</h2>
            <p className="text-gray-700 leading-relaxed">
              Memberikan layanan penerbitan digital dan solusi teknologi yang berkualitas dengan mengedepankan inovasi, profesionalisme, transparansi, dan kolaborasi, guna mendukung terciptanya ekosistem digital yang berkelanjutan serta memperluas jangkauan karya dan produk digital Indonesia hingga ke tingkat global.
            </p>
          </div>
        </div>
      </section>

      {/* CORE VALUES SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">Nilai Perusahaan</h2>
        <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "💡", title: "Innovation", desc: "Terus berinovasi menghadirkan solusi terbaik." },
              { icon: "🤝", title: "Integrity", desc: "Menjunjung tinggi kepercayaan dan transparansi." },
              { icon: "⭐", title: "Quality", desc: "Mengutamakan kualitas dalam setiap layanan." },
              { icon: "🌍", title: "Global Vision", desc: "Membawa karya Indonesia ke pasar internasional." },
              { icon: "🚀", title: "Collaboration", desc: "Bertumbuh bersama mitra dan kreator." }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-3xl p-8 shadow-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_35px_rgba(0,87,184,0.15)]">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-black">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
            <div className="hidden md:flex bg-gray-50/50 border border-dashed border-gray-200 rounded-3xl p-8 items-center justify-center">
              <p className="text-gray-400 italic">Nilai-nilai kami untuk Anda.</p>
            </div>
        </div>
      </section>

      {/* SECTION BIDANG USAHA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">Bidang Usaha</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: "🎮", title: "Digital Game Publishing", desc: "Penerbitan dan distribusi game berkualitas ke pasar global." },
            { icon: "📱", title: "Mobile App Publishing", desc: "Solusi penerbitan aplikasi mobile yang inovatif dan efisien." },
            { icon: "📚", title: "Digital Book Publishing", desc: "Membantu penulis mendistribusikan karya secara digital." },
            { icon: "💻", title: "Software Solutions", desc: "Pengembangan solusi teknologi perangkat lunak yang andal." }
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 border border-gray-200 rounded-3xl p-8 shadow-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_35px_rgba(0,87,184,0.15)]">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-black">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION STATISTIK */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "1+", label: "Project Published" },
            { value: "1+", label: "Business Partners" },
            { value: "150+", label: "Countries Distribution" },
            { value: "99.99%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 border border-gray-200 rounded-3xl shadow-sm hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(0,87,184,0.1)] transition-all duration-300">
              <div className="text-4xl font-extrabold text-black mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION MENGAPA MEMILIH KAMI */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-gray-900 rounded-3xl p-12 text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-10 text-center text-white">Mengapa Memilih Kami?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Penerbitan profesional.",
              "Transparansi kerja sama.",
              "Dukungan teknis.",
              "Distribusi digital.",
              "Pendampingan publisher."
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-all duration-300">
                <span className="text-blue-400 text-xl">✓</span>
                <span className="text-lg font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION AJAKAN BERGABUNG */}
      <section className="max-w-4xl mx-auto px-6 pb-20 text-center">
        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-12 shadow-sm">
          <h2 className="text-3xl font-bold mb-6 text-black">Mari Bergabung Bersama Kami</h2>
          <p className="text-gray-700 text-lg mb-10 max-w-2xl mx-auto">
            Mari tumbuh bersama PT Kamio Sentra Multiteknologi dalam membangun ekosistem teknologi dan penerbitan digital Indonesia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30">
              Hubungi Kami
            </a>
            <a href="/partnership" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-all">
              Ajukan Kerja Sama
            </a>
          </div>
        </div>
      </section>
      
    </div>
  );
}