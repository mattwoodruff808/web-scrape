const rp = require('request-promise');
const $ = require('cheerio');

const cosParse = (url) => {
    return rp(url)
        .then(html => {
            const infoRows = $('table.infobox tr.kv', html);
            const charInfo = {};
            
            for (let i = 0; i < infoRows.length; i++){
                const key = $('th', infoRows[i]).text().replace(/^\s+|\s+$/g, '');
                const value = $('td', infoRows[i]).text().replace(/^\s+|\s+$/g, '');

                charInfo[key] = value;
            }

            return {
                name: $('.firstHeading', html).text(),
                ...charInfo
            }
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = cosParse;