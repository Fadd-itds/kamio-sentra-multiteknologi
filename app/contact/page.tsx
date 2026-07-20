import { Phone, Mail, MessageSquare, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    // Menggunakan background gradasi dari slate-950 via-blue-950 ke cyan-900 agar sama dengan Beranda
    <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 text-white min-h-screen font-sans animate-page">
      
      {/* ================= 1. HERO HEADER ================= */}
      <section className="relative pt-44 pb-24 text-center overflow-hidden">
        {/* Efek glow radial cyan lambat khas KAMIO */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full"></div>
        <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold tracking-tight">
          Contact Us
        </h1>
        <p className="relative z-10 mt-4 text-cyan-400 text-xs tracking-widest uppercase font-semibold">
          Home &nbsp;/&nbsp; <span className="text-gray-300">Contact</span>
        </p>
      </section>

      {/* ================= 2. MAIN CONTENT (GRID 2 KOLOM) ================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* --- KOLOM KIRI: FORM GET IN TOUCH (Warna disamakan dengan kartu Layanan KAMIO) --- */}
          <div className="lg:col-span-5 bg-slate-900/60 backdrop-blur-md border border-cyan-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
            <span className="text-sm font-semibold tracking-wider text-cyan-400 block mb-2">CONTACT US</span>
            <h2 className="text-3xl font-bold tracking-tight mb-8">Menghubungi</h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Nama</label>
                <input 
                  type="text" 
                  placeholder="Nama Anda..." 
                  className="w-full bg-slate-950/80 border border-cyan-500/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition text-gray-200 placeholder-gray-600"
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="emailanda@gmail.com" 
                  className="w-full bg-slate-950/80 border border-cyan-500/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition text-gray-200 placeholder-gray-600"
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Subjek</label>
                <input 
                  type="text" 
                  placeholder="Judul..." 
                  className="w-full bg-slate-950/80 border border-cyan-500/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition text-gray-200 placeholder-gray-600"
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Pesan</label>
                <textarea 
                  rows={4} 
                  placeholder="Silahkan Ketik Pesan Disini..." 
                  className="w-full bg-slate-950/80 border border-cyan-500/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition text-gray-200 placeholder-gray-600 resize-none"
                  required
                ></textarea>
              </div>

              {/* Tombol disamakan dengan style tombol Utama KAMIO (Cyan solid) */}
              <button 
                type="submit" 
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3.5 rounded-full text-sm transition duration-300 tracking-wider shadow-lg shadow-cyan-500/20"
              >
                Kirim Sekarang
              </button>
            </form>
          </div>

          {/* --- KOLOM KANAN: INFO & MAPS --- */}
          <div className="lg:col-span-7 space-y-12 lg:pl-6">
            <p className="text-gray-300 leading-relaxed text-base">
              Hubungi tim support PT Kamio FinTech Solutions untuk konsultasi produk, 
              kemitraan b2b, atau pertanyaan seputar limit dan keamanan integrasi finansial digital Anda.
            </p>

            {/* Grid Informasi Kontak dengan warna icon menyesuaikan tema */}
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
              {/* Phone */}
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="w-12 h-12 rounded-2xl border border-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400 bg-cyan-950/40">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white tracking-wide">Nomor Telepon</h4>
                <p className="text-sm text-gray-400 mt-1">+6289 5339 7189 14</p>
              </div>

              {/* Email */}
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="w-12 h-12 rounded-2xl border border-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400 bg-cyan-950/40">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white tracking-wide">Alamat Email</h4>
                <p className="text-sm text-gray-400 mt-1">kamiofintech@gmail.com</p>
              </div>

              {/* Whatsapp */}
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="w-12 h-12 rounded-2xl border border-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400 bg-cyan-950/40">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white tracking-wide">Whatsapp</h4>
                <p className="text-sm text-gray-400 mt-1">0895-3397-18914</p>
              </div>

              {/* Office */}
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="w-12 h-12 rounded-2xl border border-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400 bg-cyan-950/40">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white tracking-wide">Kantor Kami</h4>
                <p className="text-sm text-gray-400 mt-1">Hargorejo, Kulon Progo, Daerah Istimewa Yogyakarta</p>
              </div>
            </div>

            {/* Google Map Mini dengan paduan border cyan tipis */}
            <div className="w-full h-[280px] bg-slate-900 rounded-2xl overflow-hidden border border-cyan-500/20 relative grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition duration-500 shadow-xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d718.3595145514054!2d110.11674041028134!3d-7.861179158527942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sid!2sid!4v1784196779461!5m2!1sid!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 3. BANNER CTA (Style disesuaikan dengan tema gelap FinTech) ================= */}
      <section className="relative w-full py-24 overflow-hidden border-t border-cyan-500/10 bg-slate-950/40 backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <span className="text-sm font-semibold tracking-widest text-cyan-400 uppercase">MULAI SEKARANG</span>
          <h3 className="text-4xl font-bold tracking-tight text-white mt-4 mb-8 leading-tight">
            Siap Mengakselerasi Keuangan <br /> Digital Anda Bersama KAMIO?
          </h3>
          <button className="bg-cyan-500 text-black font-bold text-sm px-8 py-3.5 rounded-full hover:bg-cyan-400 transition-all duration-300 shadow-xl shadow-cyan-500/10">
            Ajukan Limit Sekarang
          </button>
        </div>
      </section>

    </div>
  );
}