import puppeteer from "puppeteer";
import fs from "fs";

const url = "https://stats.tcgmatchmaking.com/matchups";

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // true kar sakta hai baad me
    defaultViewport: null
  });

  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  // IMPORTANT: wait for data to load
  await page.waitForSelector("table"); // ya koi specific class inspect kar

  // scroll kar (lazy load ke liye)
  await autoScroll(page);

  const data = await page.evaluate(() => {
    const rows = document.querySelectorAll("table tr");
    const result = [];

    rows.forEach(row => {
      const cols = row.querySelectorAll("td");

      if (cols.length > 0) {
        result.push({
          leader1: cols[0]?.innerText,
          leader2: cols[1]?.innerText,
          winrate_first: cols[2]?.innerText,
          winrate_second: cols[3]?.innerText,
          overall: cols[4]?.innerText
        });
      }
    });

    return result;
  });

  fs.writeFileSync("matchups.json", JSON.stringify(data, null, 2));

  console.log("✅ Data saved:", data.length);

  await browser.close();
})();

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;

      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}