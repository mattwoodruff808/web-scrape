const puppeteer = require('puppeteer');

(async () => {
    const url = 'https://books.toscrape.com/';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    const scrapePage = async () => {
        let bookResults = await page.evaluate(() => {
            let results = document.querySelectorAll('article.product_pod');
            const books = [];
    
            for (let i = 0; i < results.length; i++){
                const book = {
                    title: results[i].querySelector('h3 a').innerText,
                    price: results[i].querySelector('.price_color').innerText
                }
    
                books.push(book);
            }
    
            return books;
        })

        return bookResults;
    }

    let allBooks = [];
    let num = 1;
    
    while (await page.$('.next a')){
        const pageBooks = await scrapePage();
        console.log(`Page ${num} Scraped`);
        allBooks = [...allBooks, ...pageBooks];
        await Promise.all([
            page.click('.next a'),
            page.waitForNavigation({ waitUntil: 'networkidle2' })
        ])
        num++;
    }

    console.log(allBooks);

    await browser.close();
})();