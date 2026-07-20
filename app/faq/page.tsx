"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "Apa itu PT Kamio Sentra Multiteknologi?", a: "PT Kamio Sentra Multiteknologi adalah perusahaan yang bergerak di bidang teknologi dan penerbitan digital (Digital Publishing), berfokus pada layanan penerbitan game, aplikasi, dan buku digital, serta pengembangan produk digital milik perusahaan." },
    { q: "Layanan apa saja yang disediakan?", a: "Kami menyediakan layanan: Penerbitan Game Digital, Penerbitan Aplikasi Android, Penerbitan Buku Digital (E-Book), dan Publishing Partnership." },
    { q: "Siapa saja yang dapat bekerja sama?", a: "Kami membuka kesempatan kerja sama bagi developer, studio, penulis, startup, institusi, organisasi, serta kreator digital yang ingin menerbitkan karya mereka secara profesional." },
    { q: "Bagaimana cara mengajukan kerja sama?", a: "Anda dapat menghubungi kami melalui halaman Contact atau mengirimkan proposal proyek melalui email resmi perusahaan. Tim kami akan meninjau setiap pengajuan sebelum melanjutkan ke tahap berikutnya." },
    { q: "Apa saja karya yang dapat diterbitkan?", a: "Kami menerima berbagai karya digital, meliputi: Game Digital, Aplikasi Android, dan Buku Digital (E-Book)." },
    { q: "Apakah semua proyek akan diterima?", a: "Tidak. Seluruh proyek akan melalui proses evaluasi untuk memastikan kesesuaian dengan standar kualitas, ketentuan perusahaan, dan persyaratan platform distribusi." },
    { q: "Siapa yang memiliki hak cipta atas karya yang diterbitkan?", a: "Hak cipta dan hak kepelikan karya mengikuti ketentuan yang telah disepakati dalam perjanjian kerja sama antara PT Kamio Sentra Multiteknologi dan mitra." },
    { q: "Apakah ada biaya atau sistem pembagian pendapatan?", a: "Setiap kerja sama memiliki ketentuan yang dapat berbeda, tergantung pada jenis proyek, ruang lingkup layanan, dan kesepakatan yang disetujui oleh kedua belah pihak." },
    { q: "Berapa lama proses evaluasi proyek?", a: "Lama proses evaluasi bergantung pada jenis, kompleksitas, dan kelengkapan proyek yang diajukan. Tim kami akan memberikan informasi perkembangan selama proses berlangsung." },
    { q: "Apakah PT Kamio Sentra Multiteknologi menerima developer atau penulis independen?", a: "Ya. Kami membuka peluang kerja sama bagi developer indie, studio, penulis, maupun kreator independen yang memiliki karya digital dan memenuhi persyaratan yang berlaku." },
    { q: "Apakah saya harus memiliki perusahaan untuk bekerja sama?", a: "Tidak. Individu maupun badan usaha dapat mengajukan kerja sama, selama memenuhi persyaratan dan ketentuan yang berlaku." },
    { q: "Bagaimana cara menghubungi PT Kamio Sentra Multiteknologi?", a: "Anda dapat menghubungi kami melalui halaman Contact, email resmi perusahaan, atau saluran komunikasi resmi lainnya yang tersedia di website." }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen text-black pt-32 pb-20">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold mb-12 text-center uppercase tracking-widest">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-blue-50 hover:border-blue-200"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left p-6 flex justify-between items-center font-bold transition-all duration-300 hover:text-blue-900"
              >
                {item.q}
                <span className="text-2xl transition-transform duration-300">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="p-6 pt-0 text-gray-700 border-t border-blue-100 bg-blue-50/50 leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}