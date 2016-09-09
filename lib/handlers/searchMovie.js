'use strict';

let config = require('../../config');
let CouchAPI = require('../couchpotato');
let OmdbAPI = require('../omdb');

let couch = new CouchAPI(config.get('couch'));
let omdb = new OmdbAPI();

function searchMovieHandler(result, callback) {
	let movieTitle = result[1];

	let sayMessage = null;
	let channel = config.get('bot.channel');
	/* eslint-disable camelcase */
	let params = {
		icon_emoji: ':popcorn:'
	};
	/* eslint-enable camelcase */

	omdb.search({ movieTitle }, (err, movies) => {
		if (err) {
			sayMessage = `I didn't find anything`;
			return callback(channel, sayMessage, params);
		} else {
			sayMessage = _composeResponseMessage(movies);
			return callback(channel, sayMessage, params);
		}
	});
}

function _composeResponseMessage(movies) {
	let message = `I found the following `;
	if(movies.length > 1) {
		message += `movies: \n`;
		for(const movie of movies) {
			if(movie.type === 'movie') {
				message += `• ${movie.title} (${movie.year})\n`;
			}
		}
	} else {
		if(movies[0] !== null && movies[0].type === 'movie') {
			message += `movie: ${movies[0].title} (${movies[0].year})`;
		}
	}
	return message;
}

module.exports = searchMovieHandler;
