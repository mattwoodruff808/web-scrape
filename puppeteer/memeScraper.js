const puppeteer = require('puppeteer');

(async () => {
    const url = 'https://iwastesomuchtime.com/';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    const memes = await page.evaluate(() => {
        const memeList = document.querySelectorAll('div.blog-post');
        const scrapedMemes = [];

        for (let i = 0; i < memeList.length; i++){
            const meme = {
                title: memeList[i].querySelector('.blog-post-title').innerText
            }

            scrapedMemes.push(meme);
        }

        return scrapedMemes;
    });

    console.log(memes);
    console.log(memes.length);

    await browser.close();
})();