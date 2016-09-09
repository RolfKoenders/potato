'use strict';

let omdb = require('omdb');

class Omdb {

	get(options, callback) {
		let {movieTitle} = options;
		omdb.get(movieTitle, (err, movie) => {
			if (err) {
				return callback(err, null);
			}
			if (!movie) {
				let error = {
					message: 'No movie found',
					code: 'no_movie_found'
				};
				return callback(error, null);
			}
			return callback(null, movie);
		});
	}

	search(options, callback) {
		let {movieTitle} = options;
		omdb.search(movieTitle, (err, movies) => {
			if (err) {
				return callback(err, null);
			}
			if (movies.length < 1) {
				let error = {
					message: 'No movies found',
					code: 'no_movies_found'
				};
				return callback(error, null);
			}
			return callback(null, movies);
		});
	}

}

module.exports = Omdb;
