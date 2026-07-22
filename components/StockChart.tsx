"use client";
import { useEffect, useRef, useState } from 'react';
import { createChart, LineSeries, CandlestickSeries, BarSeries, HistogramSeries, ColorType } from 'lightweight-charts';
import { useMarketTime } from './useMarketTime';

const PERIOD_DATA: Record<string, { price: number; base: number; open: number; high: number; low: number }> = {
  '1s':       { price: 962, base: 950, open: 950, high: 975, low: 940 },   
  '1m_time': { price: 950, base: 920, open: 925, high: 965, low: 910 },   
  '1h':       { price: 945, base: 900, open: 902, high: 970, low: 895 },   
  '1d':       { price: 960, base: 875, open: 875, high: 980, low: 870 },   
  '1m':       { price: 980, base: 820, open: 825, high: 990, low: 810 },   
  '3m':       { price: 1020, base: 740, open: 745, high: 1040, low: 720 }, 
  '6m':       { price: 1050, base: 650, open: 660, high: 1080, low: 630 }, 
  'ytd':      { price: 1100, base: 580, open: 585, high: 1120, low: 550 }, 
  '1y':       { price: 1250, base: 480, open: 490, high: 1280, low: 460 }, 
  '5y':       { price: 2100, base: 200, open: 210, high: 2150, low: 180 }, 
};

export default function StockChart() {
  const marketInfo = useMarketTime();

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);
  const volumeSeriesRef = useRef<any>(null);
  const historyRef = useRef<any[]>([]); 
  
  const [stockInfo, setStockInfo] = useState<any>(null);
  const [isClientReady, setIsClientReady] = useState<boolean>(false);
  
  const [timeRange, setTimeRange] = useState<keyof typeof PERIOD_DATA>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selected_time_range');
      if (saved && saved in PERIOD_DATA) return saved as keyof typeof PERIOD_DATA;
    }
    return '1s';
  });

  const targetData = PERIOD_DATA[timeRange] || PERIOD_DATA['1s'];

  const [livePrice, setLivePrice] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const savedRange = localStorage.getItem('selected_time_range');
      if (savedRange && savedRange in PERIOD_DATA) {
        const savedPrice = localStorage.getItem(`live_price_${savedRange}`);
        if (savedPrice) {
          const parsed = Number(savedPrice);
          if (!isNaN(parsed)) return parsed;
        }
      }
    }
    return targetData.price;
  });

  const [basePrice, setBasePrice] = useState<number>(targetData.base);
  const [periodOpen, setPeriodOpen] = useState<number>(targetData.open);
  
  const [priceChange, setPriceChange] = useState<number>(livePrice - targetData.base);
  const [priceChangePercent, setPriceChangePercent] = useState<number>(Number((((livePrice - targetData.base) / targetData.base) * 100).toFixed(2)));
  
  const [priceFlash, setPriceFlash] = useState<'up' | 'down' | null>(null);
  
  const [dayHigh, setDayHigh] = useState<number>(Math.max(targetData.high, livePrice));
  const [dayLow, setDayLow] = useState<number>(Math.min(targetData.low, livePrice));

  const [chartType, setChartType] = useState<'line' | 'candlestick' | 'ohlc'>('candlestick');
  const [feedStatus, setFeedStatus] = useState<'Connected' | 'Reconnecting...' | 'Disconnected'>('Connected');

  const latestPriceRef = useRef<number>(livePrice);
  const marketOpenRef = useRef<boolean>(false);

  useEffect(() => {
    marketOpenRef.current = marketInfo.isLive;
  }, [marketInfo.isLive]);

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  const handlePeriodChange = (range: keyof typeof PERIOD_DATA) => {
    setTimeRange(range);

    if (typeof window !== 'undefined') {
      localStorage.setItem('selected_time_range', range);
      
      const target = PERIOD_DATA[range];
      const savedPrice = localStorage.getItem(`live_price_${range}`);
      const activePrice = savedPrice ? Number(savedPrice) : (historyRef.current.length > 0 ? historyRef.current[historyRef.current.length - 1].close : target.price);

      setLivePrice(activePrice);
      setBasePrice(target.base);
      setPeriodOpen(target.open);
      
      const diff = activePrice - target.base;
      setPriceChange(Math.round(diff));
      setPriceChangePercent(Number(((diff / target.base) * 100).toFixed(2)));
      
      setDayHigh(Math.max(target.high, activePrice));
      setDayLow(Math.min(target.low, activePrice));
      latestPriceRef.current = activePrice;
    }
  };

  // 1. INISISALISASI CHART SEKALI SAJA SAAT MOUNT
  useEffect(() => {
    if (!isClientReady || !chartContainerRef.current) return;

    const containerWidth = chartContainerRef.current.clientWidth || 600;

    const chart = createChart(chartContainerRef.current, {
      width: containerWidth,
      height: 450,
      layout: {
        background: { type: ColorType.Solid, color: '#ffffff' },
        textColor: '#1f2937',
      },
      grid: {
        vertLines: { color: '#f3f4f6' },
        horzLines: { color: '#f3f4f6' },
      },
      rightPriceScale: { borderColor: '#d1d5db' },
      timeScale: { 
        borderColor: '#d1d5db', 
        timeVisible: true,
      },
    });
    chartRef.current = chart;

    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: '#93c5fd',
      priceFormat: { type: 'volume' },
      priceScaleId: '',
    });
    volumeSeriesRef.current = volumeSeries;

    chart.priceScale('').applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
        seriesRef.current = null;
        volumeSeriesRef.current = null;
      }
    };
  }, [isClientReady]);

  // 2. LOAD & UPDATE DATA SAAT TIMRANGE ATAU CHARTTYPE BERUBAH (TANPA HAPUS CHART)
  useEffect(() => {
    if (!isClientReady || !chartRef.current) return;

    let isDisposed = false;

    // Hapus series lama jika ada, lalu buat baru sesuai tipe chart
    if (seriesRef.current) {
      chartRef.current.removeSeries(seriesRef.current);
      seriesRef.current = null;
    }

    let series: any;
    if (chartType === 'line') {
      series = chartRef.current.addSeries(LineSeries, { color: '#16a34a', lineWidth: 2 });
    } else if (chartType === 'candlestick') {
      series = chartRef.current.addSeries(CandlestickSeries, {
        upColor: '#16a34a',
        downColor: '#dc2626',
        borderVisible: false,
        wickUpColor: '#16a34a',
        wickDownColor: '#dc2626',
      });
    } else {
      series = chartRef.current.addSeries(BarSeries, {
        upColor: '#16a34a',
        downColor: '#dc2626',
      });
    }
    seriesRef.current = series;

    chartRef.current.timeScale().applyOptions({
      secondsVisible: timeRange === '1s' || timeRange === '1m_time',
    });

    const loadData = async () => {
      try {
        const apiParam = timeRange === '1m_time' ? '1m' : timeRange;
        const res = await fetch(`/api/stock?range=${apiParam}`);
        const json = await res.json();

        if (isDisposed) return;

        if (json.history && json.history.length > 0) {
          const rawHistory = json.history;
          const targetMeta = PERIOD_DATA[timeRange] || PERIOD_DATA['1s'];
          
          const firstClose = rawHistory[0]?.close || targetMeta.base;
          const currentActivePrice = latestPriceRef.current || livePrice || targetMeta.price;
          
          const scaleFactor = currentActivePrice / firstClose;

          const formattedHistory = rawHistory.map((row: any) => ({
            time: row.time,
            open: Number((row.open * scaleFactor).toFixed(2)),
            high: Number((row.high * scaleFactor).toFixed(2)),
            low: Number((row.low * scaleFactor).toFixed(2)),
            close: Number((row.close * scaleFactor).toFixed(2)),
            volume: row.volume || 1000,
          })).sort((a: any, b: any) => a.time - b.time);

          if (formattedHistory.length > 0) {
            const lastIdx = formattedHistory.length - 1;
            const finalClosePrice = formattedHistory[lastIdx].close;

            setLivePrice(finalClosePrice);
            latestPriceRef.current = finalClosePrice;

            const diff = finalClosePrice - targetMeta.base;
            setPriceChange(Math.round(diff));
            setPriceChangePercent(Number(((diff / targetMeta.base) * 100).toFixed(2)));

            if (typeof window !== 'undefined') {
              localStorage.setItem(`live_price_${timeRange}`, finalClosePrice.toString());
            }

            if (finalClosePrice > formattedHistory[lastIdx].high) {
              formattedHistory[lastIdx].high = finalClosePrice;
            }
            if (finalClosePrice < formattedHistory[lastIdx].low) {
              formattedHistory[lastIdx].low = finalClosePrice;
            }
          }

          historyRef.current = formattedHistory;

          const mainData = historyRef.current.map((row: any) => {
            if (chartType === 'line') return { time: row.time, value: row.close };
            return { time: row.time, open: row.open, high: row.high, low: row.low, close: row.close };
          });

          const volumeData = historyRef.current.map((row: any) => ({
            time: row.time,
            value: row.volume,
            color: row.close >= row.open ? '#bbf7d0' : '#fecaca',
          }));

          if (!isDisposed && chartRef.current && seriesRef.current && volumeSeriesRef.current) {
            seriesRef.current.setData(mainData);
            volumeSeriesRef.current.setData(volumeData);
            chartRef.current.timeScale().fitContent();

            const lastRowData = historyRef.current[historyRef.current.length - 1];
            if (lastRowData) {
              setDayHigh(Math.max(lastRowData.high, targetMeta.high, currentActivePrice));
              setDayLow(Math.min(lastRowData.low, targetMeta.low, currentActivePrice));
            }
          }
        }
        if (!isDisposed) {
          setStockInfo(json);
          setFeedStatus('Connected');
        }
      } catch (err) {
        if (!isDisposed) {
          console.error("Gagal memuat data:", err);
          setFeedStatus('Reconnecting...');
        }
      }
    };

    loadData();

    return () => {
      isDisposed = true;
    };
  }, [isClientReady, chartType, timeRange]);

  // 3. INTERVAL UPDATE REAL-TIME LIVE PRICE
  useEffect(() => {
    let updateIntervalMs = 1000;
    if (timeRange === '1m_time') updateIntervalMs = 5000;
    if (timeRange === '1h') updateIntervalMs = 15000;
    if (timeRange === '1d') updateIntervalMs = 30000;
    if (['1m', '3m', '6m', 'ytd', '1y', '5y'].includes(timeRange)) {
      updateIntervalMs = 60000;
    }

    const liveInterval = setInterval(() => {
      if (!marketOpenRef.current) return; 

      const currentHistory = historyRef.current;
      if (currentHistory.length > 0 && seriesRef.current) {
        const lastIndex = currentHistory.length - 1;
        const lastRow = currentHistory[lastIndex];

        const fluctuation = Number(((Math.random() * 6) - 3).toFixed(2));
        let newClose = Number((lastRow.close + fluctuation).toFixed(2));
        if (newClose === lastRow.close) newClose += 1;

        const flashType = newClose > lastRow.close ? 'up' : 'down';
        setPriceFlash(flashType);
        setTimeout(() => setPriceFlash(null), 300);

        let activeRow: any;
        const currentTimestamp = Math.floor(Date.now() / 1000);

        if (timeRange === '1s') {
          const nextTimestamp = Math.max(currentTimestamp, lastRow.time + 1);
          activeRow = {
            time: nextTimestamp,
            open: lastRow.close,
            high: Math.max(lastRow.close, newClose),
            low: Math.min(lastRow.close, newClose),
            close: newClose,
            volume: Math.floor(Math.random() * 5000) + 500,
          };
          historyRef.current.push(activeRow);
        } else {
          activeRow = { ...lastRow };
          activeRow.close = newClose;
          if (activeRow.close > activeRow.high) activeRow.high = activeRow.close;
          if (activeRow.close < activeRow.low) activeRow.low = activeRow.close;
          historyRef.current[lastIndex] = activeRow;
        }

        if (chartRef.current && seriesRef.current) {
          if (chartType === 'line') {
            seriesRef.current.update({ time: activeRow.time, value: activeRow.close });
          } else {
            seriesRef.current.update({
              time: activeRow.time,
              open: activeRow.open,
              high: activeRow.high,
              low: activeRow.low,
              close: activeRow.close,
            });
          }

          const currentMeta = PERIOD_DATA[timeRange] || PERIOD_DATA['1s'];
          const diff = activeRow.close - currentMeta.base;
          const diffPercent = (diff / currentMeta.base) * 100;

          setLivePrice(activeRow.close);
          setPriceChange(Math.round(diff));
          setPriceChangePercent(Number(diffPercent.toFixed(2)));
          setDayHigh(prev => Math.max(prev, activeRow.high));
          setDayLow(prev => Math.min(prev, activeRow.low));
          latestPriceRef.current = activeRow.close;

          if (typeof window !== 'undefined') {
            localStorage.setItem(`live_price_${timeRange}`, activeRow.close.toString());
          }
        }
      }
    }, updateIntervalMs);

    return () => {
      clearInterval(liveInterval);
    };
  }, [timeRange, chartType]);

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);

  const formatMarketCap = (marketCap: number) => {
    if (!marketCap) return 'Rp0';
    const triliun = marketCap / 1e12;
    return `Rp${triliun.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 3 })} T`;
  };

  const formatShares = (shares: number) => {
    if (!shares) return '0';
    return `${(shares / 1e9).toFixed(1)} Billion`;
  };

  const isPositive = priceChange >= 0;

  if (!isClientReady) {
    return <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md max-w-4xl mx-auto h-[450px] flex items-center justify-center text-gray-400">Memuat Grafik...</div>;
  }

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md text-gray-900 max-w-4xl mx-auto space-y-6">
      
      {/* HEADER SECTION */}
      <div className="p-5 bg-white rounded-xl border border-gray-200 flex flex-col md:flex-row md:items-start justify-between gap-6">
        
        {/* KOLOM KIRI */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-2xl font-black tracking-tight text-gray-900">KMIO.JK</h2>
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border shadow-2xs ${marketInfo.badgeColor}`}>
              <span className={`w-2 h-2 rounded-full ${marketInfo.isLive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
              {marketInfo.statusLabel}
            </span>
          </div>

          <div className="space-y-1 text-xs text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <span>🏢</span>
              <span>PT Kamio Sentra Multiteknologi Tbk</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>{marketInfo.dateText}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🕘</span>
              <span>Last Trade: <strong className="text-gray-700">{marketInfo.lastTradeText}</strong></span>
            </div>
          </div>

          {/* MARKET SESSIONS & STATE */}
          <div className="text-xs bg-white rounded-lg border border-gray-200 overflow-hidden shadow-2xs max-w-md">
            <div className="bg-gray-50 px-3 py-1.5 border-b border-gray-200 flex justify-between items-center font-bold text-gray-700">
              <span>Market Session (BEI)</span>
              <span className="text-[10px] text-gray-400 font-normal">WIB (GMT+7)</span>
            </div>
            
            <div className="p-3 grid grid-cols-2 gap-x-4 gap-y-1 text-gray-600">
              <div className="flex justify-between"><span className="text-gray-500">Pre-Open :</span><span className="font-mono font-medium">08:45–08:55</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Session I :</span><span className="font-mono font-medium">09:00–12:00</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Lunch Break :</span><span className="font-mono font-medium">12:00–13:30</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Session II :</span><span className="font-mono font-medium">13:30–15:49</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Post Trading :</span><span className="font-mono font-medium">15:50–16:00</span></div>
              <div className="flex justify-between"><span className="text-red-600 font-semibold">Closed :</span><span className="font-mono font-bold text-red-600">16:00 WIB</span></div>
            </div>

            {/* Market State Widget */}
            <div className="px-3 py-2 bg-gray-50/70 border-t border-gray-100 flex justify-between items-center text-[11px]">
              <div>
                <span className="text-gray-400 block font-normal">Current Session</span>
                <span className="font-bold text-gray-800">✔ {marketInfo.statusLabel}</span>
              </div>
              <div className="text-right">
                <span className="text-gray-400 block font-normal">Next Session</span>
                <span className="font-semibold text-emerald-600">{marketInfo.nextSessionText}</span>
              </div>
            </div>

            {/* Server Time Widget */}
            <div className="px-3 py-1.5 bg-zinc-900 text-zinc-100 flex justify-between items-center text-[10px]">
              <span className="font-medium text-zinc-400">Server Time</span>
              <span className="font-mono font-semibold tracking-wider text-emerald-400">{marketInfo.serverTimeText}</span>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN */}
        <div className="text-left md:text-right space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center md:justify-end gap-1.5">
            <span>{marketInfo.isLive ? 'Live Price' : 'Last Price'}</span>
            <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded text-[9px] font-mono border border-emerald-200 uppercase font-bold">
              Period: {timeRange}
            </span>
          </div>

          <div className={`text-4xl font-black tracking-tight transition-colors duration-300 ${isClientReady ? 'opacity-100' : 'opacity-0'} ${
            priceFlash === 'up' ? 'text-green-600 bg-green-50 px-2 py-0.5 rounded-md inline-block animate-pulse' : 
            priceFlash === 'down' ? 'text-red-600 bg-red-50 px-2 py-0.5 rounded-md inline-block animate-pulse' : 'text-gray-900'
          }`}>
            {formatRupiah(livePrice)}
          </div>

          <div className={`text-sm font-bold flex items-center md:justify-end gap-1.5 mt-0.5 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <span>{isPositive ? `+${priceChange}` : priceChange}</span>
            <span>({isPositive ? `+${priceChangePercent.toFixed(2)}%` : `${priceChangePercent.toFixed(2)}%`})</span>
          </div>

          <div className="text-xs text-gray-500 font-medium">
            Period Open Ref : <strong className="text-gray-700">{formatRupiah(periodOpen)}</strong>
          </div>

          {/* Countdown & Session Progress */}
          <div className="pt-2 space-y-2 border-t border-gray-100 mt-2">
            <div>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Next Trading Session</span>
              <div className="text-xs font-bold text-gray-800 mt-0.5">{marketInfo.nextSessionText}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Starts in</div>
              <div className="text-base font-extrabold font-mono text-gray-900 tracking-tight">
                {marketInfo?.countdownText || '00h 00m 00s'}
              </div>
            </div>

            {/* Trading Session Progress Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[10px] font-semibold text-gray-500">
                <span>Trading Session</span>
                <span className="font-mono text-gray-800">{marketInfo.progressPercent}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden border border-gray-200">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${marketInfo.progressPercent}%` }}
                />
              </div>
            </div>
            
            <div className="pt-1 text-[10px] text-gray-400">
              {marketInfo.syncText}
            </div>
          </div>
        </div>

      </div>

      {/* CHART CONFIGURATION CONTROLS */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-700 text-xs uppercase tracking-wide">Chart Type:</span>
          <div className="flex gap-4 text-xs font-medium text-gray-600">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" name="chartType" checked={chartType === 'line'} onChange={() => setChartType('line')} />
              Line
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" name="chartType" checked={chartType === 'candlestick'} onChange={() => setChartType('candlestick')} />
              Candlestick
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" name="chartType" checked={chartType === 'ohlc'} onChange={() => setChartType('ohlc')} />
              OHLC
            </label>
          </div>
        </div>

        {/* PERIOD SELECTION */}
        <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="font-semibold text-gray-700 text-xs uppercase tracking-wide whitespace-nowrap">Period:</span>
          <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden shadow-2xs">
            {(['1s', '1m_time', '1h', '1d', '1m', '3m', '6m', 'ytd', '1y', '5y'] as const).map((range) => {
              let label = range;
              if (range === '1s') label = '1s';
              if (range === '1m_time') label = '1m';
              if (range === '1h') label = '1h';
              if (range === '1d') label = '1d';

              return (
                <button
                  key={range}
                  onClick={() => handlePeriodChange(range)}
                  className={`px-2.5 py-1.5 text-xs font-semibold uppercase transition-colors border-r border-gray-200 last:border-r-0 whitespace-nowrap ${
                    timeRange === range ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
          <span className="text-gray-400 block text-xs font-semibold uppercase tracking-wider mb-1">Market Cap</span>
          <span className="text-lg font-bold text-gray-900">
            {formatMarketCap(livePrice * (stockInfo?.shares ?? 1800000000))}
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
          <span className="text-gray-400 block text-xs font-semibold uppercase tracking-wider mb-1">Shares</span>
          <span className="text-lg font-bold text-gray-900">
            {formatShares(stockInfo?.shares)}
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
          <span className="text-gray-400 block text-xs font-semibold uppercase tracking-wider mb-1">Period High</span>
          <span className={`text-lg font-bold text-green-600 ${isClientReady ? 'opacity-100' : 'opacity-0'}`}>
            {dayHigh.toLocaleString('id-ID')}
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
          <span className="text-gray-400 block text-xs font-semibold uppercase tracking-wider mb-1">Period Low</span>
          <span className={`text-lg font-bold text-red-600 ${isClientReady ? 'opacity-100' : 'opacity-0'}`}>
            {dayLow.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      {/* LIGHTWEIGHT CHART CONTAINER */}
      <div ref={chartContainerRef} className="w-full h-[450px] border border-gray-200 rounded-xl overflow-hidden shadow-2xs" />

      {/* FOOTER PREMIUM & MARKET FEED INDICATOR */}
      <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2">
        <div>
          <span className="font-semibold text-gray-600">Source:</span> Indonesia Stock Exchange (IDX) • Market data synchronized automatically.
        </div>
        <div className="flex items-center gap-1.5 font-medium">
          <span className={`w-2 h-2 rounded-full ${
            feedStatus === 'Connected' ? 'bg-emerald-500 animate-pulse' : 
            feedStatus === 'Reconnecting...' ? 'bg-amber-500 animate-ping' : 'bg-red-500'
          }`} />
          <span className={
            feedStatus === 'Connected' ? 'text-emerald-600' : 'text-amber-600'
          }>{feedStatus}</span>
        </div>
      </div>

    </div>
  );
}