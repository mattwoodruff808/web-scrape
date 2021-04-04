import puppeteer from 'puppeteer';

(async () => {
    const url = 'https://www.investing.com/indices/major-indices';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    let data = await page.evaluate(() => {
        let rows = document.querySelectorAll('main > div > table > tbody > tr');
        let indices = [];

        for (let i = 0; i < rows.length; i++){
            const index = {
                name: rows[i].querySelector('a.link_link__d47Lg').innerText,
                last: rows[i].querySelector('tr > td:nth-of-type(3)').innerText,
                high: rows[i].querySelector('tr > td:nth-of-type(4)').innerText,
                low: rows[i].querySelector('tr > td:nth-of-type(5)').innerText,
                change: rows[i].querySelector('tr > td:nth-of-type(6)').innerText,
                chgPercent: rows[i].querySelector('tr > td:nth-of-type(7)').innerText,
                time: rows[i].querySelector('time').innerText
            }

            indices.push(index);
        }

        return indices;
    })

    console.log(data);

    await browser.close();
})();