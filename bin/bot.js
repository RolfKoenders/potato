#!/usr/bin/env node
'use strict';

/*
 * Couchpotato SlackBot launch script.
*/

let config = require('../config');
let CouchpotatoBot = require('../lib/couchpotato-bot');

// let bot = new CouchpotatoBot(config.getProperties());
// bot.run();

var OmdbAPI = require('../lib/Omdb');

var api = new OmdbAPI();
api.get({
	movieTitle: 'frozen'
}, (err, movies) => {
	if (err) {
		return console.log(err);
	}
	console.log('Found movies \n ', movies);
});
