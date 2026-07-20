"use client";
import { useState } from 'react';

interface InvestorRelationsProps {
  livePrice?: number;
  priceChangePercent?: number;
  dayHigh?: number;
  dayLow?: number;
}

export default function InvestorRelationsSection({
  livePrice = 962,
  priceChangePercent = 10.0,
  dayHigh = 980,
  dayLow = 875,
}: InvestorRelationsProps) {
  const [compareTarget, setCompareTarget] = useState<'GOTO' | 'TLKM' | 'BBCA'>('BBCA');

  // Kalkulasi Otomatis Berdasarkan Live Price dari Grafik
  const baseShares = 1800000000; // 1.8 Miliar Lembar
  const dynamicMarketCap = livePrice * baseShares;
  const formatMarketCap = (cap: number) => `Rp${(cap / 1e12).toFixed(2)} Triliun`;

  // Kalkulasi PER & PBV Dinamis terhadap Live Price (Asumsi EPS Rp65 & BVPS Rp450)
  const currentEPS = 65;
  const currentBVPS = 450;
  const dynamicPER = (livePrice / currentEPS).toFixed(1);
  const dynamicPBV = (livePrice / currentBVPS).toFixed(1);

  // Perbandingan Return otomatis berdasarkan fluktuasi harga live
  const getComparisonReturn = () => {
    const targetMap = { BBCA: 8.2, TLKM: 5.4, GOTO: -14.5 };
    const targetVal = targetMap[compareTarget];
    const diff = (priceChangePercent - targetVal).toFixed(1);
    return {
      targetReturn: `${targetVal > 0 ? `+${targetVal}` : targetVal}%`,
      outperform: Number(diff) >= 0 ? `+${diff}%` : `${diff}%`,
    };
  };

  const compData = getComparisonReturn();

  return (
    <div className="space-y-8 text-gray-900">
      
      {/* 1. FINANCIAL PERFORMANCE (Dinamis / Otomatis) */}
      <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md space-y-6">
        <div>
          <h3 className="text-xl font-black tracking-tight text-gray-900">Financial Performance</h3>
          <p className="text-xs text-gray-500">Dashboard keuangan komprehensif perkembangan perusahaan.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-[11px] font-semibold text-gray-400 uppercase">Revenue</span>
            <div className="text-lg font-bold text-gray-900 mt-1">Rp1,45 Triliun</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-[11px] font-semibold text-gray-400 uppercase">Net Profit</span>
            <div className="text-lg font-bold text-emerald-600 mt-1">Rp385 Miliar</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-[11px] font-semibold text-gray-400 uppercase">Operating Profit</span>
            <div className="text-lg font-bold text-gray-900 mt-1">Rp520 Miliar</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-[11px] font-semibold text-gray-400 uppercase">Cash Flow</span>
            <div className="text-lg font-bold text-emerald-600 mt-1">Rp210 Miliar</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-[11px] font-semibold text-gray-400 uppercase">Assets</span>
            <div className="text-lg font-bold text-gray-900 mt-1">Rp2,80 Triliun</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-[11px] font-semibold text-gray-400 uppercase">Liabilities</span>
            <div className="text-lg font-bold text-gray-900 mt-1">Rp950 Miliar</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 sm:col-span-2">
            <span className="text-[11px] font-semibold text-gray-400 uppercase">Equity</span>
            <div className="text-lg font-bold text-gray-900 mt-1">Rp1,85 Triliun</div>
          </div>
        </div>

        {/* Grafik Revenue Growth */}
        <div className="pt-4 border-t border-gray-100">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wide block mb-3">Revenue Growth (Triliun IDR)</span>
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="text-[10px] text-gray-500 font-semibold block">2023</span>
              <span className="text-sm font-bold text-emerald-800">Rp0.95T</span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="text-[10px] text-gray-500 font-semibold block">2024</span>
              <span className="text-sm font-bold text-emerald-800">Rp1.12T</span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="text-[10px] text-gray-500 font-semibold block">2025</span>
              <span className="text-sm font-bold text-emerald-800">Rp1.30T</span>
            </div>
            <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-xs">
              <span className="text-[10px] text-emerald-100 font-semibold block">2026 (Est)</span>
              <span className="text-sm font-bold">Rp1.45T</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. AI SUMMARY */}
      <div className="p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-2xl shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider rounded-md">AI Insights</span>
            <h3 className="text-lg font-black tracking-tight">AI Summary Laporan Keuangan</h3>
          </div>
          <span className="text-[10px] text-zinc-400">Ringkasan Instan Berbasis Kinerja Real-Time</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
            <span className="text-zinc-400 block mb-1">Stock Momentum</span>
            <span className="text-emerald-400 font-bold text-sm">+{priceChangePercent}% YTD</span>
          </div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
            <span className="text-zinc-400 block mb-1">Net Profit</span>
            <span className="text-emerald-400 font-bold text-sm">naik 26% YoY</span>
          </div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
            <span className="text-zinc-400 block mb-1">Cash Flow Status</span>
            <span className="text-emerald-400 font-bold text-sm">Positif & Kuat</span>
          </div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
            <span className="text-zinc-400 block mb-1">Valuation PER</span>
            <span className="text-emerald-400 font-bold text-sm">{dynamicPER}x (Atraktif)</span>
          </div>
        </div>
      </div>

      {/* 3. STOCK STATISTICS (Sinkron dengan Harga Live Chart) */}
      <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md space-y-4">
        <div>
          <h3 className="text-xl font-black tracking-tight text-gray-900">Stock Statistics</h3>
          <p className="text-xs text-gray-500">Statistik pasar otomatis menyesuaikan pergerakan harga real-time.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex justify-between"><span className="text-gray-500">Market Cap</span><span className="font-bold">{formatMarketCap(dynamicMarketCap)}</span></div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex justify-between"><span className="text-gray-500">Shares Out</span><span className="font-bold">1.80 B</span></div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex justify-between"><span className="text-gray-500">Free Float</span><span className="font-bold">21%</span></div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex justify-between"><span className="text-gray-500">52W High</span><span className="font-bold text-green-600">Rp{dayHigh}</span></div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex justify-between"><span className="text-gray-500">52W Low</span><span className="font-bold text-red-600">Rp{dayLow}</span></div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex justify-between"><span className="text-gray-500">Volume</span><span className="font-bold">14.2M</span></div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex justify-between"><span className="text-gray-500">Avg. Volume</span><span className="font-bold">12.5M</span></div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex justify-between"><span className="text-gray-500">PER</span><span className="font-bold">{dynamicPER}x</span></div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex justify-between"><span className="text-gray-500">PBV</span><span className="font-bold">{dynamicPBV}x</span></div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex justify-between"><span className="text-gray-500">EPS</span><span className="font-bold">Rp{currentEPS}</span></div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex justify-between"><span className="text-gray-500">Div. Yield</span><span className="font-bold">3.5%</span></div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex justify-between"><span className="text-gray-500">Beta</span><span className="font-bold">1.15</span></div>
        </div>
      </div>

      {/* 4. COMPARE STOCK (Dinamis terhadap Return Live) */}
      <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-xl font-black tracking-tight text-gray-900">Compare Stock</h3>
            <p className="text-xs text-gray-500">Bandingkan performa real-time KMIO dengan emiten unggulan.</p>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-bold">
            {(['BBCA', 'TLKM', 'GOTO'] as const).map((ticker) => (
              <button
                key={ticker}
                onClick={() => setCompareTarget(ticker)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${compareTarget === ticker ? 'bg-white shadow-xs text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              >
                KMIO vs {ticker}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-3">
          <div className="flex justify-between font-bold border-b border-gray-200 pb-2">
            <span>Metrik Perbandingan</span>
            <span>KMIO.JK vs {compareTarget}.JK</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">YTD Return (Live)</span>
            <span className="font-bold text-emerald-600">+{priceChangePercent}% vs {compData.targetReturn} ({compData.outperform})</span>
          </div>
          <div className="flex justify-between"><span className="text-gray-500">Live Price</span><span className="font-bold">Rp{livePrice} per lembar</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Profitability Margin</span><span className="font-bold text-emerald-600">26.5% vs Industry Avg</span></div>
        </div>
      </div>

      {/* 5. REPORTS & FILINGS */}
      <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md space-y-4">
        <div>
          <h3 className="text-xl font-black tracking-tight text-gray-900">Reports & Filings</h3>
          <p className="text-xs text-gray-500">Dokumen dan keterbukaan informasi resmi perusahaan.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          {[
            { title: 'Annual Report 2025', category: 'Annual Reports' },
            { title: 'Financial Statement Q2', category: 'Financial Reports' },
            { title: 'Quarterly Presentation Q2', category: 'Quarterly Reports' },
            { title: 'IPO Prospectus', category: 'Prospectus' },
            { title: 'Public Expose Material 2026', category: 'Public Expose' },
            { title: 'Corporate Presentation', category: 'Corporate Presentation' },
            { title: 'Sustainability & ESG Report', category: 'ESG Report' },
            { title: 'Good Corporate Governance', category: 'Governance Report' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{item.category}</span>
                <div className="font-bold text-gray-900 mt-0.5">{item.title}</div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <span className="text-[10px] font-mono text-gray-400 font-semibold">PDF • 4.2 MB</span>
                <button className="px-3 py-1 bg-gray-900 text-white font-bold rounded-lg text-[10px] hover:bg-gray-800 transition-colors">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. CORPORATE ACTIONS */}
      <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md space-y-4">
        <div>
          <h3 className="text-xl font-black tracking-tight text-gray-900">Corporate Actions</h3>
          <p className="text-xs text-gray-500">Linimasa aksi korporasi emiten.</p>
        </div>

        <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 text-xs">
          {[
            { action: 'Public Expose Tahunan', date: '18 September 2026', status: 'Upcoming' },
            { action: 'Rapat Umum Pemegang Saham (AGMS)', date: '12 August 2026', status: 'Upcoming' },
            { action: 'Dividen Tunai Interim', date: '15 May 2026', status: 'Completed' },
            { action: 'Stock Split (1:2)', date: '10 March 2026', status: 'Completed' },
            { action: 'Initial Public Offering (IPO)', date: '15 January 2024', status: 'Completed' },
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <span className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white bg-emerald-600 shadow-xs" />
              <div className="font-bold text-gray-900">{item.action}</div>
              <div className="text-gray-500 text-[11px] mt-0.5">{item.date} • <span className="font-semibold text-emerald-600">{item.status}</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. SHAREHOLDER INFORMATION */}
      <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md space-y-4">
        <div>
          <h3 className="text-xl font-black tracking-tight text-gray-900">Shareholder Information</h3>
          <p className="text-xs text-gray-500">Komposisi pemegang saham dan kepemilikan mayoritas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3 text-xs">
            <div className="flex justify-between items-center font-bold text-gray-700 pb-2 border-b border-gray-200">
              <span>Struktur Kepemilikan</span>
              <span>Persentase</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Founder / Pengendali</span>
              <span className="font-bold">60%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Institution</span>
              <span className="font-bold">25%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Public (Free Float)</span>
              <span className="font-bold">15%</span>
            </div>
          </div>

          <div className="overflow-hidden border border-gray-200 rounded-xl text-xs">
            <div className="bg-gray-50 px-4 py-2 font-bold text-gray-700 border-b border-gray-200 flex justify-between">
              <span>Top Shareholders</span>
              <span>Persentase</span>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="px-4 py-2.5 flex justify-between"><span className="font-medium">Kamio Holdings</span><span className="font-bold">52%</span></div>
              <div className="px-4 py-2.5 flex justify-between"><span className="font-medium">Public (Masyarakat)</span><span className="font-bold">21%</span></div>
              <div className="px-4 py-2.5 flex justify-between"><span className="font-medium">PT Taspen (Persero)</span><span className="font-bold">18%</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. INVESTOR NEWS & EVENT CALENDAR */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black tracking-tight text-gray-900 mb-1">Investor News</h3>
            <p className="text-xs text-gray-500">Berita dan rilis pers terbaru perusahaan.</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-gray-400 block">20 July 2026</span>
                <span className="font-bold text-gray-900">Quarter II Revenue Up 18% YoY</span>
              </div>
              <button className="text-emerald-600 font-bold hover:underline">Read More →</button>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-gray-400 block">05 July 2026</span>
                <span className="font-bold text-gray-900">Annual Report 2025 Released</span>
              </div>
              <button className="text-emerald-600 font-bold hover:underline">Read More →</button>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black tracking-tight text-gray-900 mb-1">Event Calendar</h3>
            <p className="text-xs text-gray-500">Agenda penting jadwal korporat.</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-3">
              <div className="px-2.5 py-1.5 bg-emerald-100 text-emerald-800 font-extrabold text-center rounded-lg">
                <span className="block text-[10px] uppercase">Jul</span>
                <span className="text-sm">30</span>
              </div>
              <div>
                <span className="font-bold text-gray-900 block">Quarter II Financial Report Release</span>
                <span className="text-[10px] text-gray-500">Financial Performance Briefing</span>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-3">
              <div className="px-2.5 py-1.5 bg-emerald-100 text-emerald-800 font-extrabold text-center rounded-lg">
                <span className="block text-[10px] uppercase">Aug</span>
                <span className="text-sm">12</span>
              </div>
              <div>
                <span className="font-bold text-gray-900 block">Annual General Meeting of Shareholders (AGMS)</span>
                <span className="text-[10px] text-gray-500">Grand Sahid Hotel Jakarta</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 9. DOWNLOAD CENTER & CONTACTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md space-y-4">
          <div>
            <h3 className="text-xl font-black tracking-tight text-gray-900 mb-1">Download Center</h3>
            <p className="text-xs text-gray-500">Pusat unduhan dokumen publik.</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-gray-700">
            {['Annual Report', 'Financial Report', 'Fact Sheet', 'Prospectus', 'Presentation', 'Governance', 'ESG Report', 'Company Profile'].map((doc, idx) => (
              <button key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 text-left flex justify-between items-center transition-colors">
                <span>{doc}</span>
                <span className="text-emerald-600 font-bold">↓</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black tracking-tight text-gray-900 mb-1">Investor Relations</h3>
            <p className="text-xs text-gray-500">Hubungi tim hubungan investor kami.</p>
          </div>

          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex justify-between py-1.5 border-b border-gray-100"><span className="text-gray-400">Email</span><span className="font-bold text-gray-900">investor@kamio.co.id</span></div>
            <div className="flex justify-between py-1.5 border-b border-gray-100"><span className="text-gray-400">Phone</span><span className="font-bold text-gray-900">+62 21 5088 9000</span></div>
            <div className="flex justify-between py-1.5 border-b border-gray-100"><span className="text-gray-400">WhatsApp</span><span className="font-bold text-gray-900">+62 811 9888 2026</span></div>
            <div className="flex justify-between py-1.5 border-b border-gray-100"><span className="text-gray-400">LinkedIn</span><span className="font-bold text-gray-900">PT Kamio Sentra Tbk</span></div>
            <div className="flex justify-between py-1.5"><span className="text-gray-400">Office</span><span className="font-bold text-gray-900 text-right">SCBD Lot 28, Jakarta Selatan</span></div>
          </div>
        </div>
      </div>

    </div>
  );
}