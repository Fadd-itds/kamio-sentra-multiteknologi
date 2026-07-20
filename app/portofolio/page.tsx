import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function PortfolioPage() {
  const portfolioItems = [
    { title: "Video Game", slug: "video-game", icon: "🎮" },
    { title: "Mobile App", slug: "mobile-app", icon: "📱" },
    { title: "E-Book", slug: "e-book", icon: "📚" },
    { title: "Software Solution", slug: "software-solution", icon: "⚙️" },
  ];

  const statistics = [
    { label: "Projects Published", count: "1" },
    { label: "Games (Closed Test)", count: "1" },
    { label: "Applications (Underway)", count: "6" },
    { label: "Digital Books", count: "0" },
  ];

  return (
    <div className="bg-white min-h-screen text-black pt-32 pb-20">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-16 text-center uppercase tracking-widest">
          Portfolio
        </h1>
        
        {/* LIST PORTOFOLIO */}
        <div className="space-y-2 mb-24">
          {portfolioItems.map((item) => (
            <div 
              key={item.slug} 
              className="flex justify-between items-center p-8 border-b border-gray-200 transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(0,87,184,0.2)] hover:border-transparent hover:rounded-2xl"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{item.icon}</span>
                <h2 className="text-xl font-bold">
                  {item.title}
                </h2>
              </div>
              
              <Link 
                href={`/portofolio/${item.slug}`} 
                className="px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-all text-xs font-bold uppercase tracking-wider"
              >
                Lihat
              </Link>
            </div>
          ))}
        </div>

        {/* SECTION STATISTIK */}
        <div className="border-t border-black pt-16 mb-24">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-12 text-center text-gray-500">
            Statistic
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statistics.map((stat, index) => (
              <div key={index} className="space-y-2">
                <p className="text-4xl font-extrabold">{stat.count}</p>
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION CTA */}
        <div className="text-center bg-gray-50 p-12 rounded-2xl border border-gray-100">
          <h2 className="text-2xl font-bold mb-4">Siap Menerbitkan Produk Digital Anda?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Bermitra dengan PT Kamio Sentra Multiteknologi dan hadirkan kreasi digital Anda ke khalayak yang lebih luas.
          </p>
          <Link 
            href="/contact" 
            className="inline-block px-10 py-4 bg-black text-white hover:bg-blue-700 transition-all font-bold uppercase tracking-widest text-sm"
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </div>
  );
}