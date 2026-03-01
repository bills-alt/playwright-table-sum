const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (let seed = 35; seed <= 44; seed++) {
    const url = `https://exam.iitm.ac.in/seed/${seed}`;
    await page.goto(url);

    const numbers = await page.$$eval('table td', cells =>
      cells
        .map(td => td.innerText.trim())
        .filter(text => /^-?\d+(\.\d+)?$/.test(text))
        .map(Number)
    );

    totalSum += numbers.reduce((a, b) => a + b, 0);
  }

  console.log("FINAL_SUM:", totalSum);

  await browser.close();
})();
