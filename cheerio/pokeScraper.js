const rp = require('request-promise');
const $ = require('cheerio');
const pokeParse = require('./pokeParse');
const url = 'https://pokemondb.net/pokedex/all';

rp(url)
    .then((html) => {
        //success!
        const pokeUrls = [];
        const entities = $('.ent-name', html);

        for (let i = 0; i < entities.length; i++){
            pokeUrls.push(entities[i].attribs.href);
        }

        return Promise.allSettled(
            pokeUrls.map((url) => {
                return pokeParse('https://pokemondb.net' + url);
            })
        )

        // return Promise.all(
        //     pokeUrls.map((url) => {
        //         return pokeParse('https://pokemondb.net' + url);
        //     })
        // )
    })
    .then((pokemon) => {
        console.log(pokemon);
    })
    .catch((err) => {
        console.log(err);
    });