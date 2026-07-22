import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '1y';

    const symbol = 'BRPT.JK'; 
    const now = Math.floor(Date.now() / 1000);

    // KHUSUS RANGE 1S: Generate data per detik secara instan agar tidak kosong
    if (range === '1s') {
      let basePrice = 962;
      const history1s = Array.from({ length: 60 }, (_, i) => {
        const time = now - (60 - i);
        const fluctuation = Number(((Math.random() * 4) - 2).toFixed(2));
        basePrice = Number((basePrice + fluctuation).toFixed(2));
        return {
          time: time,
          open: Number((basePrice - 0.5).toFixed(2)),
          high: Number((basePrice + 1.2).toFixed(2)),
          low: Number((basePrice - 1.2).toFixed(2)),
          close: basePrice,
          volume: Math.floor(Math.random() * 500) + 50,
        };
      });

      return NextResponse.json({
        rawPrice: basePrice,
        price: `Rp${basePrice.toLocaleString('id-ID')}`,
        change: "+12 (+1.26%)",
        isPositive: true,
        status: 'Market Open',
        symbol: 'KMIO.JK',
        name: 'PT Kamio Sentra Multiteknologi Tbk',
        marketCap: basePrice * 1800000000,
        shares: 1800000000,
        dayHigh: basePrice + 15,
        dayLow: basePrice - 10,
        history: history1s,
      });
    }

    let period1 = now - 365 * 24 * 60 * 60; 
    let yahooInterval = '1d'; 

    // Konfigurasi rentang waktu dan interval Yahoo Finance untuk pilihan lainnya
    if (range === '1m_time' || range === '1m') {
      period1 = now - 7 * 86400; 
      yahooInterval = '15m';
    } else if (range === '1h') {
      period1 = now - 30 * 86400; 
      yahooInterval = '60m';
    } else if (range === '1d') {
      period1 = now - 60 * 86400; 
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

    // Mapping data dengan validasi ketat dan format waktu yang disesuaikan dengan interval chart
    const history = timestamps.map((ts: number, index: number) => {
      const closeVal = closes[index];
      const openVal = opens[index];
      const highVal = highs[index];
      const lowVal = lows[index];

      if (closeVal === null || closeVal === undefined || isNaN(closeVal)) return null;

      const validOpen = openVal !== null && openVal !== undefined && !isNaN(openVal) ? openVal : closeVal;
      const validHigh = highVal !== null && highVal !== undefined && !isNaN(highVal) ? highVal : Math.max(closeVal, validOpen);
      const validLow = lowVal !== null && lowVal !== undefined && !isNaN(lowVal) ? lowVal : Math.min(closeVal, validOpen);

      // Format waktu: 'YYYY-MM-DD' untuk harian/mingguan, Unix timestamp (number) untuk intraday
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

    const currentPrice = meta.regularMarketPrice ?? closes[closes.length - 1] ?? 962;
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
      rawPrice: 962,
      price: "Rp962",
      change: "+87 (+9.94%)",
      isPositive: true,
      status: 'Market Open',
      symbol: 'KMIO.JK',
      name: 'PT Kamio Sentra Multiteknologi Tbk',
      marketCap: 962 * 1800000000,
      shares: 1800000000,
      dayHigh: 980,
      dayLow: 950,
      history: [
        { time: fallbackNow - 86400 * 3, open: 875, high: 900, low: 870, close: 890, volume: 1500000 },
        { time: fallbackNow - 86400 * 2, open: 890, high: 930, low: 885, close: 920, volume: 2200000 },
        { time: fallbackNow - 86400, open: 920, high: 965, low: 915, close: 962, volume: 3100000 },
      ]
    });
  }
}