import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '1y';

    const symbol = 'BRPT.JK'; 
    const now = Math.floor(Date.now() / 1000);

    // GENERATOR INTRADAY LIVE (1s, 1m, 1h) AGAR SELALU UPDATE KE WAKTU SEKARANG
    if (range === '1s' || range === '1m' || range === '1h' || range === '1m_time') {
      let basePrice = 966.30; // Sesuaikan dengan harga terakhir
      const count = range === '1s' ? 60 : 40;
      const intervalSec = range === '1s' ? 1 : (range === '1h' ? 300 : 60);

      const historyIntraday = Array.from({ length: count }, (_, i) => {
        const time = now - (count - i) * intervalSec;
        const fluctuation = Number(((Math.random() * 2) - 1).toFixed(2));
        basePrice = Number((basePrice + fluctuation).toFixed(2));
        return {
          time: time,
          open: Number((basePrice - 0.3).toFixed(2)),
          high: Number((basePrice + 0.8).toFixed(2)),
          low: Number((basePrice - 0.8).toFixed(2)),
          close: basePrice,
          volume: Math.floor(Math.random() * 1000) + 100,
        };
      });

      return NextResponse.json({
        rawPrice: basePrice,
        price: `Rp${basePrice.toLocaleString('id-ID')}`,
        change: "+4.30 (+0.45%)",
        isPositive: true,
        status: 'Market Open',
        symbol: 'KMIO.JK',
        name: 'PT Kamio Sentra Multiteknologi Tbk',
        marketCap: basePrice * 1800000000,
        shares: 1800000000,
        dayHigh: basePrice + 10,
        dayLow: basePrice - 8,
        history: historyIntraday,
      });
    }

    let period1 = now - 365 * 24 * 60 * 60; 
    let yahooInterval = '1d'; 

    if (range === '1d') {
      period1 = now - 7 * 86400; 
      yahooInterval = '1d';
    } else if (range === '3m') {
      period1 = now - 90 * 86400;
      yahooInterval = '1d';
    } else if (range === '6m') {
      period1 = now - 180 * 86400;
      yahooInterval = '1d';
    } else if (range === 'ytd') {
      const currentYear = new Date().getFullYear();
      period1 = Math.floor(new Date(currentYear, 0, 1).getTime() / 1000);
      yahooInterval = '1d';
    } else if (range === '1y') {
      period1 = now - 365 * 86400;
      yahooInterval = '1d';
    } else if (range === '5y') {
      period1 = now - 5 * 365 * 86400;
      yahooInterval = '1wk';
    }

    const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${period1}&period2=${now}&interval=${yahooInterval}`;

    const response = await fetch(yahooUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    const data = await response.json();
    const result = data.chart?.result?.[0];

    if (!result) {
      throw new Error("Gagal mengambil data dari Yahoo Finance");
    }

    const meta = result.meta;
    const timestamps = result.timestamp || [];
    const quotes = result.indicators.quote[0] || {};
    
    const closes = quotes.close || [];
    const opens = quotes.open || [];
    const highs = quotes.high || [];
    const lows = quotes.low || [];
    const volumes = quotes.volume || [];

    const history = timestamps.map((ts: number, index: number) => {
      const closeVal = closes[index];
      const openVal = opens[index];
      const highVal = highs[index];
      const lowVal = lows[index];

      if (closeVal === null || closeVal === undefined || isNaN(closeVal)) return null;

      const validOpen = openVal !== null && openVal !== undefined && !isNaN(openVal) ? openVal : closeVal;
      const validHigh = highVal !== null && highVal !== undefined && !isNaN(highVal) ? highVal : Math.max(closeVal, validOpen);
      const validLow = lowVal !== null && lowVal !== undefined && !isNaN(lowVal) ? lowVal : Math.min(closeVal, validOpen);

      let timeValue: string | number = ts;
      if (yahooInterval === '1d' || yahooInterval === '1wk' || yahooInterval === '1mo') {
        const dateObj = new Date(ts * 1000);
        const year = dateObj.getUTCFullYear();
        const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getUTCDate()).padStart(2, '0');
        timeValue = `${year}-${month}-${day}`;
      }

      return {
        time: timeValue, 
        open: Number(validOpen.toFixed(2)),
        high: Number(validHigh.toFixed(2)),
        low: Number(validLow.toFixed(2)),
        close: Number(closeVal.toFixed(2)),
        volume: Number(volumes[index] ?? 0),
      };
    })
    .filter((row: any) => row !== null)
    .sort((a: any, b: any) => {
      const timeA = typeof a.time === 'string' ? new Date(a.time).getTime() : a.time;
      const timeB = typeof b.time === 'string' ? new Date(b.time).getTime() : b.time;
      return timeA - timeB;
    });

    const currentPrice = meta.regularMarketPrice ?? closes[closes.length - 1] ?? 966.30;
    const previousClose = meta.chartPreviousClose ?? meta.previousClose ?? currentPrice;
    const rawChange = currentPrice - previousClose;
    const changePercent = (rawChange / previousClose) * 100;
    const isPositive = rawChange >= 0;

    const sharesOutstanding = meta.sharesOutstanding || 1800000000;
    const marketCapValue = currentPrice * sharesOutstanding;

    return NextResponse.json({
      rawPrice: currentPrice,
      price: `Rp${currentPrice.toLocaleString('id-ID')}`,
      change: `${isPositive ? '+' : ''}${rawChange.toFixed(2)} (${changePercent.toFixed(2)}%)`,
      isPositive: isPositive,
      status: 'Market Open',
      symbol: 'KMIO.JK',
      name: 'PT Kamio Sentra Multiteknologi Tbk',
      marketCap: marketCapValue,
      shares: sharesOutstanding,
      dayHigh: meta.regularMarketDayHigh || Math.max(...highs.slice(-5)),
      dayLow: meta.regularMarketDayLow || Math.min(...lows.slice(-5)),
      history: history,
    });

  } catch (error: any) {
    console.error("API Error:", error);
    const fallbackNow = Math.floor(Date.now() / 1000);
    return NextResponse.json({
      rawPrice: 966.30,
      price: "Rp966,30",
      change: "+4.30 (+0.45%)",
      isPositive: true,
      status: 'Market Open',
      symbol: 'KMIO.JK',
      name: 'PT Kamio Sentra Multiteknologi Tbk',
      marketCap: 966.30 * 1800000000,
      shares: 1800000000,
      dayHigh: 977.36,
      dayLow: 940,
      history: [
        { time: fallbackNow - 120, open: 962, high: 966, low: 961, close: 964, volume: 150000 },
        { time: fallbackNow - 60, open: 964, high: 967, low: 963, close: 965, volume: 220000 },
        { time: fallbackNow, open: 965, high: 967.5, low: 965, close: 966.30, volume: 310000 },
      ]
    });
  }
}