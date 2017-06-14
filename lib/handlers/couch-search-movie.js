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
	let message = `I found the following `;
	if (movies.length > 1) {
		message += `movies: \n`;
		for (const movie of movies) {
			const title = movie.titles[0];

			if (movie.type === 'movie') {
				message += `• ${title} (${movie.year})  :id: _<http://www.imdb.com/title/${movie.imdb}|${movie.imdb}>_\n`;
			}
		}
	} else {
		message += `movie: ${movies[0].title} (${movies[0].year})  :id: _<http://www.imdb.com/title/${movies[0].imdb}|${movies[0].imdb}>_`;
	}
	return message;
}

module.exports = searchMovieHandler;
