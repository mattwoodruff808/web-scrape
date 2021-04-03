const puppeteer = require('puppeteer');

(async () => {
    const url = 'https://coppermind.net/wiki/Category:Selish';
    // const url = 'https://coppermind.net/wiki/Category:Scadrians';

    let browser = await puppeteer.launch();
    let page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    let charUrls = await page.evaluate(() => {
        let urls = [];
        let charRows = document.querySelectorAll('.mw-category-group > ul > li > a');

        for (let i = 0; i < charRows.length; i++){
            urls.push(charRows[i].href);
        }

        return urls
    })

    const characters = [];

    for (let i = 0; i < charUrls.length; i++){
        const url = charUrls[i];
        await page.goto(url, { waitUntil: 'networkidle2' });

        let data = await page.evaluate(() => {
            let name = document.querySelector('#firstHeading').innerText;
            let infoRows = document.querySelectorAll('table.infobox tr.kv');
            let charInfo = {};
    
            for (let i = 0; i < infoRows.length; i++){
                const key = infoRows[i].querySelector('th').innerText.replace(/^\s+|\s+$/g, '');
                const value = infoRows[i].querySelector('td').innerText.replace(/^\s+|\s+$/g, '');
                
                charInfo[key] = value;
            }
            
            return {
                name,
                ...charInfo
            }
        });
        
        characters.push(data);
    }

    
    console.log(characters);

    await browser.close();
})();