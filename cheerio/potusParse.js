const rp = require('request-promise');
const $ = require('cheerio');

const potusParse = function(url){
    return rp(url)
        .then(function(html){
            return {
                name: $('.firstHeading', html).text(),
                birthday: $('td > span > .bday', html).text()
            }
        })
        .catch(function(error){
            //handle error
        });
};

module.exports = potusParse;