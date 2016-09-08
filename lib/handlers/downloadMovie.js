'use strict';

let config = require('../../config');
let CouchAPI = require('../couchpotato');
let OmdbAPI = require('../omdb');

let couch = new CouchAPI(config.get('couch'));
let omdb = new OmdbAPI();

function downloadMovieHandler(result, callback) {
	let movieTitle = result[1];

	let channel = config.get('bot.channel');
	let sayMessage = null;

	/* eslint-disable camelcase */
	let params = {
		icon_emoji: ':popcorn:'
	};
	/* eslint-enable camelcase */

	omdb.get({movieTitle}, (err, movie) => {
		if (err) {
			console.log('Error: ', err);
			if (err.code === 'no_movie_found') {
				sayMessage = `I was not able to find ${movieTitle} :disappointed:`;
			} else {
				sayMessage = 'I failed :disappointed: check my console.. :';
			}
			return callback(channel, sayMessage, params);
		} else {
			//console.log('No error : ', err, movie);
			couch.addMovie(movie, error /* , result) */ => {
				/* eslint-disable no-negated-condition */
				if (!error) {
					sayMessage = `Added ${movie.title} (${movie.year}) with IMDB rating: ${movie.imdb.rating} to wanted list.`;
				} else {
					sayMessage = `I was not able to add that movie to couchpotato :disappointed:, check my console for more information..`;
				}
				/* eslint-enable no-negated-condition */
				return callback(channel, sayMessage, params);
			});
		}
	});
}

module.exports = downloadMovieHandler;
