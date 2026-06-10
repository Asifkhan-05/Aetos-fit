import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  page.on('requestfailed', request => console.log('BROWSER REQUEST FAILED:', request.url(), request.failure().errorText));
  
  try {
    console.log("Navigating to /muscle-map...");
    await page.goto('http://localhost:5173/muscle-map', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));

    console.log("Navigating to /workout-generator...");
    await page.goto('http://localhost:5173/workout-generator', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));

    console.log("Navigating to /statistics...");
    await page.goto('http://localhost:5173/statistics', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
  } catch (e) {
    console.error("Test failed:", e);
  } finally {
    await browser.close();
  }
})();
