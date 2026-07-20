import { useState, useEffect } from 'react';

export function useMarketTime() {
  const [marketStatus, setMarketStatus] = useState({
    badgeText: 'MARKET CLOSED',
    subLabel: 'Closed',
    badgeColor: 'bg-red-50 text-red-700 border-red-200',
    isLive: false,
    dateText: '',
    lastTradeText: '16:00 WIB',
    serverTimeText: '',
    statusLabel: 'Market Closed',
    nextSessionText: 'Pre-Opening (08:45 WIB)',
    countdownText: '00h 00m 00s',
    progressPercent: 100,
    syncText: ''
  });

  const idxHolidays2026 = [
    '2026-01-01', '2026-01-16', '2026-02-17', '2026-03-19', 
    '2026-04-03', '2026-05-01', '2026-05-14', '2026-06-01', 
    '2026-08-17', '2026-09-25', '2026-12-25'
  ];

  useEffect(() => {
    const updateEngine = () => {
      const now = new Date();
      const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
      const wibDate = new Date(utcTime + (3600000 * 7));

      const year = wibDate.getFullYear();
      const month = String(wibDate.getMonth() + 1).padStart(2, '0');
      const day = String(wibDate.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;

      const hours = wibDate.getHours();
      const minutes = wibDate.getMinutes();
      const seconds = wibDate.getSeconds();
      const currentTotalSeconds = hours * 3600 + minutes * 60 + seconds;

      const dayOfWeek = wibDate.getDay(); 
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isHoliday = idxHolidays2026.includes(dateString);

      const enOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' };
      const formattedTradingDay = wibDate.toLocaleDateString('en-US', enOptions);
      const serverTimeFormatted = `${wibDate.getDate()} ${wibDate.toLocaleString('en-US', { month: 'short', timeZone: 'Asia/Jakarta' })} ${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} WIB`;
      const formattedRealtimeUpdated = `${formattedTradingDay} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} WIB`;

      // Fungsi helper untuk hitung mundur ke target detik tertentu di hari yang ditentukan
      const getCountdownString = (targetDate: Date) => {
        const diffMs = targetDate.getTime() - wibDate.getTime();
        const totalSecsRemaining = Math.max(0, Math.floor(diffMs / 1000));
        const hrs = Math.floor(totalSecsRemaining / 3600);
        const mins = Math.floor((totalSecsRemaining % 3600) / 60);
        const secs = totalSecsRemaining % 60;
        return `${hrs > 0 ? `${hrs}h ` : ''}${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
      };

      // 1. Libur / Weekend
      if (isWeekend || isHoliday) {
        let nextOpen = new Date(wibDate);
        nextOpen.setDate(nextOpen.getDate() + 1);
        nextOpen.setHours(8, 45, 0, 0);

        while (nextOpen.getDay() === 0 || nextOpen.getDay() === 6 || idxHolidays2026.includes(nextOpen.toISOString().split('T')[0])) {
          nextOpen.setDate(nextOpen.getDate() + 1);
          nextOpen.setHours(8, 45, 0, 0);
        }

        setMarketStatus({
          badgeText: isHoliday ? 'MARKET HOLIDAY' : 'WEEKEND CLOSED',
          subLabel: 'Holiday / Weekend',
          badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-300',
          isLive: false,
          dateText: formattedTradingDay,
          lastTradeText: '16:00 WIB',
          serverTimeText: serverTimeFormatted,
          statusLabel: isHoliday ? 'Market Holiday' : 'Weekend Closed',
          nextSessionText: 'Pre-Opening • 08:45 WIB',
          countdownText: getCountdownString(nextOpen),
          progressPercent: 100,
          syncText: `Updated ${formattedTradingDay} 16:00:00 WIB`
        });
        return;
      }

      // Jadwal BEI Sesuai Bursa Asli
      const preOpenStart = 8 * 3600 + 45 * 60;       // 08:45
      const session1Start = 9 * 3600;                // 09:00
      const session1End = 12 * 3600;                 // 12:00
      const lunchEnd = 13 * 3600 + 30 * 60;          // 13:30
      const session2Start = lunchEnd;                // 13:30
      const session2End = 15 * 3600 + 49 * 60;       // 15:49
      const postTradingStart = 15 * 3600 + 50 * 60;  // 15:50
      const closingTime = 16 * 3600;                 // 16:00

      // 08:45 - 08:55: PRE-OPENING
      if (currentTotalSeconds >= preOpenStart && currentTotalSeconds < session1Start) {
        const target = new Date(wibDate);
        target.setHours(9, 0, 0, 0);
        const progress = ((currentTotalSeconds - preOpenStart) / (session1Start - preOpenStart)) * 100;

        setMarketStatus({
          badgeText: 'PRE OPEN',
          subLabel: 'Pre-Opening Session',
          badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
          isLive: false,
          dateText: formattedTradingDay,
          lastTradeText: 'Previous Close',
          serverTimeText: serverTimeFormatted,
          statusLabel: 'Pre-Opening',
          nextSessionText: 'Session I • 09:00 WIB',
          countdownText: getCountdownString(target),
          progressPercent: Math.round(progress),
          syncText: `Updated ${formattedTradingDay} 08:45:00 WIB`
        });
      } 
      // 09:00 - 12:00: SESSION I
      else if (currentTotalSeconds >= session1Start && currentTotalSeconds < session1End) {
        const sessionDuration = session1End - session1Start;
        const progress = ((currentTotalSeconds - session1Start) / sessionDuration) * 100;

        setMarketStatus({
          badgeText: 'SESSION I',
          subLabel: 'Market Live - Session I',
          badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          isLive: true,
          dateText: formattedTradingDay,
          lastTradeText: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} WIB`,
          serverTimeText: serverTimeFormatted,
          statusLabel: 'Session I Active',
          nextSessionText: 'Lunch Break • 12:00 WIB',
          countdownText: 'Session I Active',
          progressPercent: Math.round(progress),
          syncText: `Updated ${formattedRealtimeUpdated}`
        });
      } 
      // 12:00 - 13:30: LUNCH BREAK
      else if (currentTotalSeconds >= session1End && currentTotalSeconds < session2Start) {
        const target = new Date(wibDate);
        target.setHours(13, 30, 0, 0);
        const progress = ((currentTotalSeconds - session1End) / (session2Start - session1End)) * 100;

        setMarketStatus({
          badgeText: 'LUNCH BREAK',
          subLabel: 'Market Istirahat Siang',
          badgeColor: 'bg-yellow-50 text-yellow-800 border-yellow-200',
          isLive: false,
          dateText: formattedTradingDay,
          lastTradeText: '12:00 WIB',
          serverTimeText: serverTimeFormatted,
          statusLabel: 'Lunch Break',
          nextSessionText: 'Session II • 13:30 WIB',
          countdownText: getCountdownString(target),
          progressPercent: Math.round(progress),
          syncText: `Updated ${formattedTradingDay} 12:00:00 WIB`
        });
      } 
      // 13:30 - 15:49: SESSION II
      else if (currentTotalSeconds >= session2Start && currentTotalSeconds < postTradingStart) {
        const sessionDuration = session2End - session2Start;
        const progress = ((currentTotalSeconds - session2Start) / sessionDuration) * 100;

        setMarketStatus({
          badgeText: 'SESSION II',
          subLabel: 'Market Live - Session II',
          badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          isLive: true,
          dateText: formattedTradingDay,
          lastTradeText: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} WIB`,
          serverTimeText: serverTimeFormatted,
          statusLabel: 'Session II Active',
          nextSessionText: 'Post Trading • 15:50 WIB',
          countdownText: 'Session II Active',
          progressPercent: Math.round(progress),
          syncText: `Updated ${formattedRealtimeUpdated}`
        });
      } 
      // 15:50 - 16:00: POST TRADING
      else if (currentTotalSeconds >= postTradingStart && currentTotalSeconds < closingTime) {
        const target = new Date(wibDate);
        target.setHours(16, 0, 0, 0);
        const progress = ((currentTotalSeconds - postTradingStart) / (closingTime - postTradingStart)) * 100;

        setMarketStatus({
          badgeText: 'POST TRADING',
          subLabel: 'Post Closing Session',
          badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
          isLive: false,
          dateText: formattedTradingDay,
          lastTradeText: '15:49 WIB',
          serverTimeText: serverTimeFormatted,
          statusLabel: 'Post Trading',
          nextSessionText: 'Market Closed • 16:00 WIB',
          countdownText: getCountdownString(target),
          progressPercent: Math.round(progress),
          syncText: `Updated ${formattedTradingDay} 15:49:00 WIB`
        });
      } 
      // Diluar Jam (Sebelum 08:45 atau Setelah 16:00)
      else {
        let nextOpenDate = new Date(wibDate);
        if (currentTotalSeconds >= closingTime) {
          nextOpenDate.setDate(nextOpenDate.getDate() + 1);
        }
        nextOpenDate.setHours(8, 45, 0, 0);

        while (nextOpenDate.getDay() === 0 || nextOpenDate.getDay() === 6 || idxHolidays2026.includes(nextOpenDate.toISOString().split('T')[0])) {
          nextOpenDate.setDate(nextOpenDate.getDate() + 1);
          nextOpenDate.setHours(8, 45, 0, 0);
        }

        setMarketStatus({
          badgeText: 'MARKET CLOSED',
          subLabel: 'Closed',
          badgeColor: 'bg-red-50 text-red-700 border-red-200',
          isLive: false,
          dateText: formattedTradingDay,
          lastTradeText: '16:00 WIB',
          serverTimeText: serverTimeFormatted,
          statusLabel: 'Market Closed',
          nextSessionText: 'Pre-Opening • 08:45 WIB',
          countdownText: getCountdownString(nextOpenDate),
          progressPercent: 100,
          syncText: `Updated ${formattedTradingDay} 16:00:00 WIB`
        });
      }
    };

    updateEngine();
    const timer = setInterval(updateEngine, 1000);
    return () => clearInterval(timer);
  }, []);

  return marketStatus;
}