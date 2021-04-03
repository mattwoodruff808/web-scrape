const rp = require('request-promise');
const $ = require('cheerio');

const pokeParse = (url) => {
    return rp(url)
        .then((html) => {
            return {
                name: $('main > h1', html).text(),
                number: $('strong', html).text(),
                type: $('.vitals-table > tbody > tr > td > .type-icon', html).text(),
                species: $('.grid-row > .span-lg-4:nth-of-type(2) > .vitals-table > tbody > tr:nth-of-type(3) > td', html).text()
            }
        })
        .catch((err) => {
            console.log(err)
        });
}

module.exports = pokeParse;