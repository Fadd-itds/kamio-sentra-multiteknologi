"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const StockTicker = dynamic(() => import('@/components/StockTicker'), { ssr: false });
const StockChart = dynamic(() => import('@/components/StockChart'), { 
  ssr: false,
  loading: () => <div className="p-6 bg-white border rounded-xl shadow-sm text-center text-gray-500 py-20">Memuat Grafik Saham...</div>
});
const InvestorRelationsSection = dynamic(() => import('@/components/InvestorRelationsSection'), { ssr: false });

export default function InvestorPage() {
  const PREV_CLOSE = 875;
  
  const [livePrice, setLivePrice] = useState<number>(962);
  const [priceChangePercent, setPriceChangePercent] = useState<number>(10.0);
  const [dayHigh, setDayHigh] = useState<number>(980);
  const [dayLow, setDayLow] = useState<number>(875);
  
  // State untuk status pasar yang sinkron secara real-time
  const [isMarketOpen, setIsMarketOpen] = useState<boolean>(false);

  useEffect(() => {
    let trendDirection = 1;
    let tickCount = 0;

    const checkMarketStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentTimeInMinutes = hours * 60 + minutes;

      const isWeekday = day >= 1 && day <= 5;
      const isMarketHours = currentTimeInMinutes >= 540 && currentTimeInMinutes <= 960; // 09:00 - 16:00
      
      return isWeekday && isMarketHours;
    };

    setIsMarketOpen(checkMarketStatus());

    const interval = setInterval(() => {
      const marketActive = checkMarketStatus();
      setIsMarketOpen(marketActive);

      if (marketActive) {
        tickCount++;
        if (tickCount % 20 === 0) {
          trendDirection = Math.random() > 0.45 ? 1 : -1;
        }

        setLivePrice((prevPrice) => {
          const randomNoise = (Math.random() - 0.49) * 2.5; 
          const drift = trendDirection * 0.4;
          let newPrice = Math.round((prevPrice + randomNoise + drift) * 100) / 100;

          if (newPrice < PREV_CLOSE * 0.8) newPrice = PREV_CLOSE * 0.8;
          if (newPrice > PREV_CLOSE * 1.25) newPrice = PREV_CLOSE * 1.25;

          const calculatedChange = Number(((newPrice - PREV_CLOSE) / PREV_CLOSE * 100).toFixed(2));
          setPriceChangePercent(calculatedChange);

          setDayHigh((prev) => Math.max(prev, newPrice));
          setDayLow((prev) => Math.min(prev, newPrice));

          return newPrice;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Hero Section */}
        <div className="bg-white p-8 md:p-12 rounded-2xl border shadow-sm text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Investor Relations
          </h1>
          <p className="text-sm md:text-base font-semibold tracking-wide text-green-600 uppercase">
            Transparency &bull; Growth &bull; Sustainability
          </p>
          <p className="text-gray-600 max-w-xl mx-auto">
            Kami berkomitmen memberikan informasi perusahaan secara transparan kepada investor dan publik.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm">
              [ Annual Report ]
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-800 border font-medium px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm">
              [ Financial Reports ]
            </button>
          </div>
        </div>

        {/* Ringkasan Saham Otomatis */}
        <StockTicker />

        {/* Header / Judul Halaman */}
        <div className="text-center space-y-2 pt-2">
          <h2 className="text-2xl font-bold tracking-tight">Kinerja & Informasi Perusahaan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Informasi terkini mengenai kinerja keuangan, pergerakan saham, dan keterbukaan informasi PT Kamio Sentra Multiteknologi Tbk.
          </p>
        </div>

        {/* Bagian Grafik Saham Utama (Tanpa Tombol Duplikat di Atas) */}
        <div className="bg-white shadow-sm rounded-xl border p-2">
          <div className="p-4 border-b mb-2 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">Pergerakan Saham Real-Time</h3>
              <p className="text-xs text-gray-500">Kode Emiten: KMIO.JK (IDX) &bull; {isMarketOpen ? "Live Feed Active" : "Market Closed Session"}</p>
            </div>
            
            {/* Indikator Status Pasar Otomatis */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                {isMarketOpen && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isMarketOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
              </span>
              <span className={`text-xs font-semibold uppercase tracking-wider ${isMarketOpen ? 'text-green-600' : 'text-red-600'}`}>
                {isMarketOpen ? 'Market Open' : 'Market Closed'}
              </span>
            </div>
          </div>
          <StockChart />
        </div>

        {/* Quick Links / Download Laporan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl border shadow-sm space-y-2">
            <h3 className="font-bold text-lg">Laporan Keuangan</h3>
            <p className="text-sm text-gray-600">Akses laporan keuangan kuartalan dan tahunan terbaru.</p>
            <button className="text-green-600 font-semibold text-sm hover:underline pt-2 inline-block">
              Unduh Laporan &rarr;
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm space-y-2">
            <h3 className="font-bold text-lg">Paparan Publik</h3>
            <p className="text-sm text-gray-600">Materi presentasi dan ringkasan rapat umum pemegang saham.</p>
            <button className="text-green-600 font-semibold text-sm hover:underline pt-2 inline-block">
              Lihat Dokumen &rarr;
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm space-y-2">
            <h3 className="font-bold text-lg">Kontak Investor</h3>
            <p className="text-sm text-gray-600">Hubungi tim Sekretaris Perusahaan untuk pertanyaan lebih lanjut.</p>
            <span className="text-sm font-medium text-gray-800 block pt-2">investor@kamio.co.id</span>
          </div>
        </div>

        {/* Investor Relations Dashboard Terintegrasi */}
        <InvestorRelationsSection 
          livePrice={livePrice}
          priceChangePercent={priceChangePercent}
          dayHigh={dayHigh}
          dayLow={dayLow}
        />

      </div>
    </div>
  );
}