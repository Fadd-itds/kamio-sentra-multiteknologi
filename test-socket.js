const yahooFinance = require('yahoo-finance2').default;
const yf = new yahooFinance({ suppressNotices: ['yahooSurvey'] });

const symbol = 'BRPT.JK'; 

async function getPrice() {
  try {
    const quote = await yf.quote(symbol); // Gunakan instance 'yf'
    
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] Harga ${symbol}: Rp ${quote.regularMarketPrice}`);
    
  } catch (error) {
    console.error('Gagal mengambil data:', error.message);
  }
}

console.log(`Memulai sistem penarikan data untuk ${symbol}...`);

getPrice();
setInterval(getPrice, 5000);