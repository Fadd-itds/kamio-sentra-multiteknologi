"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  
  const categories = ["Semua", "Perusahaan", "Penerbitan", "Produk", "Kemitraan", "Acara", "Karier"];

  const newsItems = [
    {
      title: "🎮 Profesional",
      category: "Produk",
      date: "30 Juli 2026",
      desc: "Sebagai bagian dari komitmen terhadap inovasi, PT Kamio Sentra Multiteknologi terus mengembangkan berbagai produk digital internal di berbagai bidang teknologi. Informasi mengenai peluncuran produk akan diumumkan secara resmi melalui website dan media sosial perusahaan.",
    },
    {
      title: "🌐 Website Resmi PT Kamio Sentra Multiteknologi Diluncurkan",
      category: "Perusahaan",
      date: "29 Juli 2026",
      desc: "Website resmi PT Kamio Sentra Multiteknologi telah diluncurkan sebagai pusat informasi perusahaan. Melalui website ini, pengunjung dapat mengenal perusahaan lebih dekat, melihat layanan, portofolio, informasi kemitraan, hingga menghubungi tim kami secara langsung.",
    },
    {
      title: "🤝 Program Kemitraan Dibuka untuk Developer dan Kreator",
      category: "Kemitraan",
      date: "21 Juli 2026",
      desc: "Kami membuka kesempatan kerja sama bagi developer, studio, penulis, startup, organisasi, dan kreator digital yang ingin menerbitkan karya mereka bersama PT Kamio Sentra Multiteknologi. Program kemitraan ini bertujuan membangun kolaborasi jangka panjang yang saling menguntungkan.",
    },
    {
      title: "🚀 Layanan Digital Publishing Resmi Dibuka",
      category: "Penerbitan",
      date: "19 Juli 2026",
      desc: "PT Kamio Sentra Multiteknologi kini membuka layanan penerbitan digital yang mencakup game, aplikasi Android, dan buku digital (e-book). Layanan ini dirancang untuk membantu para kreator mempublikasikan karya mereka secara profesional melalui proses yang transparan dan terstruktur.",
    },
    {
      title: "PT Kamio Sentra Multiteknologi Resmi Didirikan",
      category: "Perusahaan",
      date: "26 Mei 2026",
      desc: "PT Kamio Sentra Multiteknologi secara resmi didirikan sebagai perusahaan yang bergerak di bidang teknologi dan penerbitan digital. Dengan semangat inovasi dan kolaborasi, perusahaan hadir untuk membangun ekosistem digital yang mendukung para developer, penulis, kreator, serta pelaku usaha dalam menghadirkan karya digital yang berkualitas.",
    }
  ];

  // Fungsi filter: Jika 'Semua', tampilkan semua, jika tidak, filter berdasarkan kategori
  const filteredNews = activeCategory === "Semua" 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  return (
    <div className="bg-white min-h-screen text-black pt-32 pb-20">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-12 border-b border-gray-100 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📰</span>
            <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">Berita</h1>
          </div>
          
          <h2 className="text-5xl font-extrabold mb-8">Berita & Pengumuman Terbaru</h2>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            Ikuti perkembangan terbaru dari PT Kamio Sentra Multiteknologi, mulai dari pengumuman perusahaan, 
            peluncuran layanan, kerja sama, hingga berbagai pencapaian dan inovasi yang kami hadirkan.
          </p>
        </div>

        {/* Kategori Section */}
        <div className="mb-12">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Kategori</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all border ${
                  activeCategory === cat 
                    ? "bg-black text-white border-black" 
                    : "bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List Berita */}
        <div className="space-y-8">
          {filteredNews.length > 0 ? (
            filteredNews.map((news, i) => (
              <article key={i} className="group p-8 border border-gray-100 rounded-3xl hover:shadow-[0_0_30px_rgba(0,87,184,0.1)] transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {news.category}
                  </span>
                  <span className="text-xs text-gray-400">{news.date}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-700 transition-colors">
                  {news.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {news.desc}
                </p>
              </article>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              Tidak ada berita ditemukan untuk kategori ini.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}