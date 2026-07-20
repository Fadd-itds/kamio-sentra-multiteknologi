"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Capabilities from "../components/Capabilities";

// Pindahkan deklarasi ini ke sini (di luar fungsi Home)
const StockChart = dynamic(() => import('../components/StockChart'), { 
  ssr: false 
});

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen p-10 pt-28">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center w-full max-w-5xl"
        >
          {/* Logo Utama */}
          <div className="flex justify-center mb-10">
            <Image 
              src="/images/KSM2.png" 
              alt="Logo PT Kamio Sentra Multiteknologi" 
              width={300} 
              height={100} 
              className="w-auto h-auto max-w-[250px]"
              priority
            />
          </div>

          <h1 className="text-6xl font-bold text-black mb-6 tracking-tight">
            Transforming Complexity into <br /> 
            <span className="text-blue-600">Seamless Digital Reality.</span>
          </h1>
          
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto font-light">
            PT Kamio Sentra Multiteknologi menghadirkan integrasi sistem yang presisi untuk kebutuhan bisnis masa depan.
          </p>
          
          <button className="px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 mb-24">
            Get Started
          </button>

          {/* Section: Informasi & Logo */}
          <div className="grid md:grid-cols-2 gap-12 items-center border-t border-gray-100 pt-16 text-left text-black">
            <div>
              <h2 className="text-3xl font-bold mb-4">PT Kamio Sentra Multiteknologi</h2>
              <p className="text-blue-600 font-semibold mb-4">
                Membangun Masa Depan Digital Melalui Teknologi, Inovasi, dan Penerbitan Digital.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                PT Kamio Sentra Multiteknologi adalah perusahaan teknologi yang menghadirkan solusi digital melalui pengembangan produk inovatif serta layanan penerbitan game, aplikasi, dan buku digital untuk mendukung pertumbuhan industri kreatif di Indonesia dan pasar global.
              </p>
              
              <div className="flex gap-4">
                <Link href="/services" className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all">
                  🔵 Jelajahi Layanan
                </Link>
                <Link href="/contact" className="px-6 py-3 border border-gray-300 text-black rounded-full font-bold hover:bg-gray-100 transition-all">
                  ⚪ Hubungi Kami
                </Link>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <Image 
                src="/images/KSM2.png" 
                alt="Logo KSM" 
                width={400} 
                height={400} 
                className="opacity-90 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </div>

          {/* Section: Company Overview */}
          <div className="mt-24 p-10 bg-white rounded-3xl border border-gray-100 text-left w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(37,99,235,0.15)] hover:border-blue-100">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 block mb-3">
              Company Overview
            </span>
            <h2 className="text-4xl font-extrabold text-black mb-6">Tentang Kami</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-3xl">
              PT Kamio Sentra Multiteknologi merupakan perusahaan yang bergerak di bidang teknologi dan digital publishing. Kami membangun ekosistem digital melalui berbagai unit bisnis yang berfokus pada pengembangan produk, layanan penerbitan, dan inovasi teknologi.
            </p>
            <Link href="/about" className="inline-flex items-center px-6 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
              → Selengkapnya
            </Link>
          </div>

          {/* Section: Why Choose Kamio? */}
          <div className="mt-32 text-left">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 block mb-3">
              Why Choose Kamio?
            </span>
            <h2 className="text-4xl font-extrabold text-black mb-12">Keunggulan Kami</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                { title: "Innovation", desc: "Kami terus menghadirkan solusi digital yang inovatif.", icon: "🚀" },
                { title: "Professional", desc: "Proses kerja yang profesional dan terstruktur.", icon: "🛡️" },
                { title: "Partnership", desc: "Membangun kerja sama jangka panjang.", icon: "🤝" },
                { title: "Global Vision", desc: "Berorientasi pada perkembangan teknologi dan pasar global.", icon: "🌎" },
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white border border-gray-100 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(37,99,235,0.1)] hover:border-blue-100 flex gap-6 items-start">
                  <div className="text-4xl">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Our Ecosystem */}
          <div className="mt-32 text-left">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 block mb-3">
              Our Ecosystem
            </span>
            <h2 className="text-4xl font-extrabold text-black mb-12">Membangun Ekosistem Digital Terintegrasi</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { name: "Kamio Games", desc: "Game Development & Digital Publishing", icon: "🎮" },
                { name: "Kamio App", desc: "Application Development & Publishing", icon: "📱" },
                { name: "Kamio Books", desc: "Digital Book Publishing", icon: "📚" },
                { name: "Kamio FinTech", desc: "Financial Technology", icon: "💳", badge: "Coming Soon" },
              ].map((unit, i) => (
                <div key={i} className="p-8 bg-white border border-gray-100 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(37,99,235,0.1)] hover:border-blue-100">
                  <div className="text-4xl mb-6">{unit.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-black">{unit.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{unit.desc}</p>
                  {unit.badge && <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-full">{unit.badge}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Section: What We Do */}
          <div className="mt-32 text-left">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 block mb-3">
              What We Do
            </span>
            <h2 className="text-4xl font-extrabold text-black mb-12">Layanan Kami</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { title: "Game Publishing", desc: "Menerbitkan game digital untuk berbagai platform.", icon: "🎮" },
                { title: "App Publishing", desc: "Menerbitkan aplikasi Android secara profesional.", icon: "📱" },
                { title: "Book Publishing", desc: "Penerbitan buku digital (E-Book).", icon: "📚" },
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white border border-gray-100 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(37,99,235,0.1)] hover:border-blue-100">
                  <div className="text-4xl mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-black">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <Link href="/services" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-all">
              → Semua Layanan
            </Link>
          </div>

          {/* Section: By The Numbers */}
          <div className="mt-32 mb-32 p-16 bg-black rounded-[3rem] text-white text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-500 block mb-3">
              By The Numbers
            </span>
            <h2 className="text-4xl font-extrabold mb-16">PT Kamio Sentra Multiteknologi <br /> Dalam Angka</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Business Units", value: "4" },
                { label: "Active Services", value: "3" },
                { label: "Coming Soon", value: "1" },
                { label: "Commitment", value: "100%" },
              ].map((stat, i) => (
                <div key={i} className="p-6 border border-gray-800 rounded-3xl hover:border-blue-500 transition-all duration-300">
                  <div className="text-5xl font-extrabold text-blue-500 mb-2">{stat.value}</div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 w-full max-w-5xl">
            <h2 className="text-4xl font-extrabold text-black mb-8">Live Stock Chart</h2>
            <div className="w-full h-[400px]">
              <StockChart />
            </div>
          </div>

          {/* Section: Latest News */}
          <div className="mt-32 mb-24 text-left">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 block mb-3">
              Latest News
            </span>
            <div className="grid md:grid-cols-2 gap-12 items-center bg-gray-50 p-10 rounded-3xl border border-gray-100">
              <div>
                <h2 className="text-4xl font-extrabold text-black mb-6">Berita Terbaru</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Dapatkan informasi terkini mengenai inovasi teknologi, pembaruan produk, dan perkembangan industri dari PT Kamio Sentra Multiteknologi.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <select className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:border-blue-500 cursor-pointer" onChange={(e) => window.location.href = `/news?date=${e.target.value}`}>
                    <option value="">Pilih Tanggal</option>
                    {[...Array(31)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                  </select>
                  
                  <select className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:border-blue-500 cursor-pointer" onChange={(e) => window.location.href = `/news?category=${e.target.value}`}>
                    <option value="">Pilih Kategori</option>
                    <option value="tech">Technology</option>
                    <option value="business">Business</option>
                    <option value="publishing">Publishing</option>
                  </select>
                </div>

                <Link href="/news" className="inline-flex items-center px-6 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                  → Read More
                </Link>
              </div>

              <div className="h-64 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 font-bold">
                News Feed Illustration
              </div>
            </div>
          </div>

        </motion.div>
      </div>

      <Capabilities />
    </main>
  );
}