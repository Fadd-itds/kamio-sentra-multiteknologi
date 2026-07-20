"use client";
import { useEffect, useState } from 'react';
import { useMarketTime } from './useMarketTime'; // Sesuaikan path folder jika file useMarketTime.ts berada di tempat lain

export default function StockTicker() {
  const marketInfo = useMarketTime(); // <--- Waktu terpusat dari hook
  const defaultPrice = 962;
  const baseReferencePrice = 875;

  const [livePrice, setLivePrice] = useState<number>(defaultPrice);
  const [prevPrice, setPrevPrice] = useState<number>(defaultPrice);
  const [priceChange, setPriceChange] = useState<number>(87);
  const [priceChangePercent, setPriceChangePercent] = useState<number>(9.94);
  const [isClientReady, setIsClientReady] = useState<boolean>(false);
  const [flashColor, setFlashColor] = useState<string>('');

  // Sinkronisasi Harga dari localStorage atau Simulasi Live
  useEffect(() => {
    const saved = localStorage.getItem('kmio_live_price_v2');
    const initialP = saved ? Number(saved) : defaultPrice;
    setLivePrice(initialP);
    setPrevPrice(initialP);
    const diff = initialP - baseReferencePrice;
    setPriceChange(Math.round(diff));
    setPriceChangePercent(Number(((diff / baseReferencePrice) * 100).toFixed(2)));
    setIsClientReady(true);

    const handleStorage = () => {
      const updated = localStorage.getItem('kmio_live_price_v2');
      if (updated) {
        const newP = Number(updated);
        setLivePrice((curr) => {
          if (newP !== curr) {
            setPrevPrice(curr);
            setFlashColor(newP > curr ? 'text-green-600 bg-green-50 scale-105' : 'text-red-600 bg-red-50 scale-105');
            setTimeout(() => setFlashColor(''), 300);
          }
          return newP;
        });
        const d = newP - baseReferencePrice;
        setPriceChange(Math.round(d));
        setPriceChangePercent(Number(((d / baseReferencePrice) * 100).toFixed(2)));
      }
    };

    window.addEventListener('storage', handleStorage);
    const interval = setInterval(handleStorage, 1000);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  const formatRupiah = (num: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);

  const isPositive = priceChange >= 0;

  return (
    <div className={`bg-white p-6 rounded-2xl border border-gray-200 shadow-md max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-start justify-between gap-6 transition-opacity duration-150 ${isClientReady ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* KOLOM KIRI */}
      <div className="space-y-4 w-full md:w-[520px]">
        
        {/* Header Nama Saham & Badge */}
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-black tracking-tight text-gray-900">KMIO.JK</h2>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 shadow-2xs ${marketInfo.badgeColor}`}>
            <span className={`w-2 h-2 rounded-full ${marketInfo.isLive ? 'bg-green-600 animate-pulse' : 'bg-red-600'}`}></span>
            {marketInfo.statusLabel}
          </span>
        </div>

        {/* Info Detail Perusahaan & Tanggal */}
        <div className="space-y-1 text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="text-sm">🏢</span>
            <span>PT Kamio Sentra Multiteknologi Tbk</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">📅</span>
            <span>{marketInfo.dateText}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">🕒</span>
            <span>Last Trade: <strong className="text-gray-700 font-semibold">{marketInfo.lastTradeText}</strong></span>
          </div>
        </div>

        {/* MARKET SESSION BOX */}
        <div className="bg-white rounded-xl border border-gray-200 text-xs overflow-hidden shadow-2xs">
          <div className="px-3.5 py-2.5 font-bold text-gray-700 flex justify-between items-center border-b border-gray-100 bg-gray-50/50">
            <span>Market Session (BEI)</span>
            <span className="text-[10px] text-gray-400 font-normal">WIB (GMT+7)</span>
          </div>
          
          <div className="p-3.5 grid grid-cols-2 gap-x-6 gap-y-2 text-gray-600">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Pre-Open :</span>
              <span className="font-mono text-gray-700">08:45–08:55</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Session I :</span>
              <span className="font-mono text-gray-700">09:00–12:00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Lunch Break :</span>
              <span className="font-mono text-gray-700">12:00–13:30</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Session II :</span>
              <span className="font-mono text-gray-700">13:30–15:49</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Post Trading :</span>
              <span className="font-mono text-gray-700">15:50–16:00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-red-600 font-semibold">Closed :</span>
              <span className="font-mono font-bold text-red-600">16:00 WIB</span>
            </div>
          </div>

          {/* Bagian Bawah Kotak Session (Status & Next Session) */}
          <div className="px-3.5 py-2 bg-gray-50/80 border-t border-gray-100 grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-gray-400 block text-[9px] uppercase font-semibold">Current Session</span>
              <span className="font-bold text-gray-800 flex items-center gap-1">
                ✓ {marketInfo.statusLabel.charAt(0) + marketInfo.statusLabel.slice(1).toLowerCase()}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block text-[9px] uppercase font-semibold">Next Session</span>
              <span className="font-semibold text-green-700">{marketInfo.nextSessionText}</span>
            </div>
          </div>

          {/* Bar Gelap Server Time di Bagian Bawah Kotak */}
          <div className="bg-gray-900 text-emerald-400 px-3.5 py-2 flex justify-between items-center font-mono text-[11px] font-semibold tracking-wide">
            <span className="text-gray-300 font-sans font-normal text-[10px]">Server Time</span>
            <span>{marketInfo.serverTimeText}</span>
          </div>
        </div>

      </div>

      {/* KOLOM KANAN */}
      <div className="text-left md:text-right w-full md:w-auto flex flex-col md:items-end justify-between space-y-4">
        
        {/* Harga & Persentase */}
        <div className="space-y-0.5">
          <div className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
            LAST PRICE
          </div>

          <div className={`text-4xl font-black tracking-tight transition-all duration-300 px-2 py-0.5 rounded-lg inline-block ${flashColor}`}>
            {formatRupiah(livePrice)}
          </div>
          
          <div className={`text-sm font-bold flex items-center md:justify-end gap-1.5 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <span>{isPositive ? `+${priceChange.toLocaleString('id-ID')}` : priceChange.toLocaleString('id-ID')}</span>
            <span>({isPositive ? `+${priceChangePercent.toFixed(2)}%` : `${priceChangePercent.toFixed(2)}%`})</span>
          </div>

          <div className="text-xs text-gray-500 font-medium pt-1">
            Today's Open : <strong className="text-gray-800 font-bold">{formatRupiah(baseReferencePrice)}</strong>
          </div>
        </div>

        {/* Kotak Next Trading Session & Progress */}
        <div className="w-full md:w-64 bg-gray-50/50 p-3.5 rounded-xl border border-gray-100 space-y-2 text-left md:text-right">
          <div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Next Trading Session</span>
            <div className="text-xs font-bold text-gray-800 mt-0.5">{marketInfo.nextSessionText}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Starts in</div>
            <div className="text-base font-extrabold font-mono text-gray-900 tracking-tight">
             {marketInfo?.countdownText || '00h 00m 00s'}
            </div>
          </div>

          {/* Progress Bar Trading Session */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-[10px] text-gray-500 font-semibold">
              <span>Trading Session</span>
              <span>{marketInfo.progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-green-600 h-full rounded-full transition-all duration-500" 
                style={{ width: `${marketInfo.progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tanggal Update Terakhir */}
        <div className="text-[10px] text-gray-400 font-medium pt-1">
          {marketInfo.syncText}
        </div>

      </div>
    </div>
  );
}