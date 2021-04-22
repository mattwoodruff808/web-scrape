const puppeteer = require('puppeteer');

(async () => {
    const url = 'https://www.pluralsight.com/guides';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    let guides = await page.evaluate(() => {
        let cards = document.querySelectorAll('.card');
        let cardList = [];

        for (let i = 0; i < cards.length; i++){
            let card = {
                title: cards[i].querySelector('.title').innerText,
                datePosted: cards[i].querySelector('.meta > li').innerText,
                author: cards[i].querySelector('.author-name').innerText
            };

            cardList.push(card);
        }
        
        return cardList;
    })

    console.log(guides);

    await browser.close();
})();