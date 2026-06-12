const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');
const fs = require('fs');
const path = require('path');
const handler = require('serve-handler');
const http = require('http');

const PORT = 3000;
const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

const server = http.createServer((request, response) => {
  return handler(request, response, { public: distPath });
});

server.listen(PORT, async () => {
  console.log(`Prerendering starting on port ${PORT}...`);
  try {
    const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL;

    const browser = await puppeteer.launch({ 
      args: isProd ? chromium.args : [],
      defaultViewport: isProd ? chromium.defaultViewport : null,
      executablePath: isProd 
        ? await chromium.executablePath() 
        : undefined, // Uses your default local Chrome installation outside Vercel
      headless: isProd ? chromium.headless : 'new'
    });
    const page = await browser.newPage();
    
    // Disable JS requests to external services if we want to speed it up,
    // but allowing them ensures complete render.
    await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });
    
    let html = await page.content();
    
    fs.writeFileSync(indexPath, html);
    console.log('Successfully prerendered index.html!');
    
    await browser.close();
  } catch (error) {
    console.error('Error during prerendering:', error);
    process.exit(1);
  } finally {
    server.close();
  }
});