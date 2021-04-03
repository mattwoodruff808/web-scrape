const rp = require('request-promise');
const $ = require('cheerio');
const cosParse = require('./cosParse');
// const url = 'https://coppermind.net/wiki/Category:Selish';
// const url = 'https://coppermind.net/wiki/Category:Threnodite';
// const url = 'https://coppermind.net/wiki/Category:Nalthians';
// const url = 'https://coppermind.net/wiki/Category:Taldaini';

// DOESN'T EVEN SCRAPE
// const url = 'https://coppermind.net/wiki/Category:Eelakin';

// NEEDS DELAY SCRAPE
const url = 'https://coppermind.net/wiki/Category:Scadrians';
// const url = 'https://coppermind.net/wiki/Category:Rosharans';

rp(url)
    .then((html) => {
        const charUrls = [];
        const characters = $('.mw-category-group > ul > li > a', html);

        for (let i = 0; i < characters.length; i++){
            charUrls.push(characters[i].attribs.href);
        }

        return Promise.all(
            charUrls.map((url) => {
                return cosParse('https://coppermind.net' + url);
            })
        );
    })
    .then(characters => {
        console.log(characters);
        console.log('finished');
    })
    .catch((err) => {
        console.log(err);
    });