'use strict';

const CouchAPI = require('../couchpotato');
const config = require('../../config');

const couch = new CouchAPI(config.get('couch'));

function searchMovieHandler(message, callback) {
	const movieTitle = message.matchResult[1];

	let sayMessage = null;

	couch.search(movieTitle, (err, movies) => {
		if (err && err.code === 'no_movies_found') {
			sayMessage = `I didn't find anything`;
			callback(sayMessage);
		} else {
			sayMessage = _composeResponseMessage(movies);
			callback(sayMessage);
		}
	});
}

function _composeResponseMessage(searchResult) {
	const movies = searchResult.movies;
	let message = ``;

	if (searchResult.movies) {
		if (movies.length > 1) {
			message += `I found the following `;
			message += `movies :movie_camera: \n`;
			for (const movie of movies) {
				const title = movie.titles[0];
				if (movie.type === 'movie' && movie.imdb) {
					message += `• <http://www.imdb.com/title/${movie.imdb} (${movie.year})|${title}>  :id: _${movie.imdb}_\n`;
				}
			}
		}
	} else {
		message += `No movies found :pensive:`;
	}

	return message;
}

module.exports = searchMovieHandler;
