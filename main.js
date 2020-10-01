const puppeteer = require('puppeteer');
const fs = require('fs');

if (!fs.existsSync('pic'))
{
  fs.mkdir('pic', (err) => {
    if (err) throw err;
  });
}

const data = fs.readFileSync('url.txt', 'utf-8');
let urls = data.split('\n');

const getScreenshot = async (browser, url) => {
  if (url !== '') {
    const page = await browser.newPage();
    let original_url = url;
    const pos = url.indexOf("?");
    if (pos > 0) {
      original_url = url.substring(0, pos);
    }
    await page.goto(original_url);
    let file_name = original_url.replace("https://", '');
    await page.screenshot({path: `pic/${file_name}.png`, fullPage: true});
    console.log(`done! -> ${file_name}`);
    await page.close();
  }
}

(async () => {
  const browser = await puppeteer.launch({timeout: 0});
  await Promise.all(
    urls.map(url => getScreenshot(browser, url))
  );
  await browser.close();
})();
