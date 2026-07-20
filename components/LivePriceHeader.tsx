"use client";
import { useState, useEffect } from 'react';

export default function LivePriceHeader() {
  const [livePrice, setLivePrice] = useState<number>(1765);
  const [priceChange, setPriceChange] = useState<number>(-495);
  const [priceChangePercent, setPriceChangePercent] = useState<number>(-21.90);

  const baseReferencePrice = 2260;

  useEffect(() => {
    const interval = setInterval(() => {
      setLivePrice((prevPrice) => {
        const fluctuation = Number(((Math.random() * 10) - 5).toFixed(2));
        const newPrice = Number((prevPrice + fluctuation).toFixed(2));
        
        const diff = newPrice - baseReferencePrice;
        const diffPercent = (diff / baseReferencePrice) * 100;

        setPriceChange(Number(diff.toFixed(2)));
        setPriceChangePercent(Number(diffPercent.toFixed(2)));

        return newPrice;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatRupiah = (num: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);

  const isPositive = priceChange >= 0;

  return (
    <div className="p-4 bg-white rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-4xl mx-auto shadow-sm">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">KMIO.JK</h2>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            Market Open
          </span>
        </div>
        <p className="text-gray-500 text-sm">PT Kamio Sentra Multiteknologi Tbk</p>
      </div>

      <div className="text-right">
        <div className="text-3xl font-extrabold tracking-tight text-gray-900">
          {formatRupiah(livePrice)}
        </div>
        <div className={`text-sm font-semibold flex items-center justify-end gap-1 mt-0.5 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          <span>{isPositive ? '▲' : '▼'}</span>
          <span>{isPositive ? `+${priceChange.toLocaleString('id-ID')}` : priceChange.toLocaleString('id-ID')}</span>
          <span>({isPositive ? `+${priceChangePercent.toFixed(2)}%` : `${priceChangePercent.toFixed(2)}%`})</span>
        </div>
        <span className="text-[10px] text-gray-400 block mt-0.5">Updated Live</span>
      </div>
    </div>
  );
}