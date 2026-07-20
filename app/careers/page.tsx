import Navbar from "../../components/Navbar";

export default function CareersPage() {
  return (
    <div className="bg-white min-h-screen text-black pt-32 pb-20">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-6">Careers</h1>
          <h2 className="text-5xl font-extrabold mb-8">Build the Future with Us</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Di PT Kamio Sentra Multiteknologi, kami percaya bahwa inovasi lahir dari kolaborasi, kreativitas, dan semangat untuk terus berkembang. Kami selalu terbuka bagi individu yang memiliki dedikasi, integritas, dan keinginan untuk menciptakan dampak positif melalui teknologi dan penerbitan digital.
          </p>
        </div>

        {/* Why Join Us */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-10">Why Join Us?</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "🚀 Grow Together", desc: "Kami memberikan kesempatan bagi setiap anggota tim untuk berkembang, belajar, dan berkontribusi dalam membangun solusi digital yang inovatif." },
              { title: "💡 Innovation First", desc: "Kami mendorong lahirnya ide-ide baru dan memberikan ruang bagi setiap individu untuk berinovasi." },
              { title: "🤝 Collaborative Culture", desc: "Kami percaya bahwa kolaborasi adalah kunci untuk menghasilkan karya dan layanan yang berkualitas." },
              { title: "🌍 Meaningful Impact", desc: "Setiap proyek yang kami kerjakan bertujuan memberikan manfaat bagi masyarakat, kreator, dan industri digital." }
            ].map((item, i) => (
              <div 
                key={i} 
                className="p-8 border border-gray-100 rounded-3xl bg-white transition-all duration-300 hover:border-blue-200 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]"
              >
                <h4 className="font-bold text-xl mb-3">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Culture */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-6">Our Culture</h3>
          <p className="text-gray-600 mb-6">Di PT Kamio Sentra Multiteknologi, kami membangun budaya kerja yang mengedepankan:</p>
          <div className="flex flex-wrap gap-3">
            {["Profesionalisme", "Integritas", "Kolaborasi", "Inovasi", "Pembelajaran Berkelanjutan", "Tanggung Jawab"].map((tag) => (
              <span key={tag} className="px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-lg text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Current Opportunities */}
        <div className="mb-20 p-10 border-2 border-dashed border-gray-200 rounded-3xl text-center">
          <h3 className="text-2xl font-bold mb-4">Current Opportunities</h3>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Saat ini belum ada lowongan yang tersedia. Kami belum membuka proses rekrutmen pada saat ini. 
            Namun, kami selalu mencari individu berbakat yang memiliki semangat untuk berkembang bersama perusahaan.
          </p>
        </div>

        {/* Recruitment Process */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-10">Recruitment Process</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[ "Submit Application", "Initial Review", "Interview", "Assessment", "Final Decision", "Welcome" ].map((step, i) => (
              <div key={i} className="text-center p-2">
                <div className="w-10 h-10 mx-auto bg-black text-white rounded-full flex items-center justify-center font-bold mb-3">
                  {i + 1}
                </div>
                <p className="font-semibold text-xs">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Equal Opportunity */}
        <div className="mb-20">
            <h3 className="text-xl font-bold mb-3">Equal Opportunity</h3>
            <p className="text-gray-600">PT Kamio Sentra Multiteknologi berkomitmen menciptakan lingkungan kerja yang profesional, inklusif, dan menghargai setiap individu. Proses rekrutmen dilakukan berdasarkan kompetensi, pengalaman, dan kesesuaian dengan kebutuhan perusahaan.</p>
        </div>

        {/* Join Our Talent Pool */}
        <div className="bg-[#071a3d] text-white p-12 rounded-3xl text-center">
          <h3 className="text-3xl font-bold mb-4">Belum menemukan posisi yang sesuai?</h3>
          <p className="text-gray-300 mb-8 max-w-lg mx-auto">Kirimkan CV dan portofolio Anda kepada kami. Kami akan menyimpannya dalam database talenta dan menghubungi Anda apabila terdapat peluang yang relevan di masa mendatang.</p>
          <a 
            href="mailto:hr@kamio.com" 
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 transition-all font-bold rounded-full text-white"
          >
            Submit Your CV
          </a>
        </div>
      </div>
    </div>
  );
}