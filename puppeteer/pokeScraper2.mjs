import puppeteer from 'puppeteer';
import PQueue from 'p-queue';
const queue = new PQueue({
    concurrency: 5
});

(async () => {
    const url = 'https://pokemondb.net/pokedex/all';

    let browser = await puppeteer.launch();
    let page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    let pokeUrls = await page.evaluate(() => {
        let urls = [];
        let pokeRows = document.querySelectorAll('a.ent-name');

        for (let i = 0; i < pokeRows.length; i++){
            urls.push(pokeRows[i].href);
        }

        return urls;
    })

    console.log(pokeUrls);

    const pokemon = [];

    const createInstance = async (url) => {
        let page = await browser.newPage();

        await page.goto(url, { waitUntil: 'networkidle2' });

        let data = await page.evaluate(() => {
            let name = document.querySelector('main > h1').innerText;
            let number = document.querySelector('strong').innerText;
            let type = document.querySelector('.vitals-table > tbody > tr > td > .type-icon').innerText;
            let species = document.querySelector('.grid-row > .span-lg-4:nth-of-type(2) > .vitals-table > tbody > tr:nth-of-type(3) > td').innerText;

            return {
                name,
                number,
                type,
                species
            }
        });

        console.log(data);
        pokemon.push(data);

        await page.close();
    }

    for (let i = 0; i < pokeUrls.length; i++){
        queue.add(async () => createInstance(pokeUrls[i]));
    }

    await queue.onIdle();
    console.log(pokemon);

    await browser.close();
})();