#!/usr/bin/env node
'use strict';

/**
 * Couchpotato SlackBot launch script.
*/

let CouchpotatoBot = require('../lib/couchpotato-bot');

const TOKEN = process.env.BOT_API_KEY || require('../token');
const NAME = process.env.BOT_NAME || 'Coupo';

// let bot = new CouchpotatoBot({
//     bot: {
//         token: TOKEN,
//         name: NAME
//     }
// });
//
// bot.run();


var OmdbAPI = require('../lib/Omdb');

OmdbAPI.search({
    movieTitle: 'frozen'
}, (err, movies) => {
    if(err) {
        return console.log(err);
    }
    console.log('Found movies \n ', movies);
});
