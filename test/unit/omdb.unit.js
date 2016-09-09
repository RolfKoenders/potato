'use strict';
import test from 'ava';

const OmdbAPI = require('../../lib/omdb.js');
let omdbApi = null;

test.beforeEach(t => {
	omdbApi = new OmdbAPI();
});

test.cb('Omdb Wrapper get method should return 1 movie when i try to get a existing movie', t => {
	let frozenMovieObject = {
		title: 'Frozen',
		year: 2013,
		imdb: {
			id: 'tt2294629'
		},
		type: 'movie'
	};
	omdbApi.get({ movieTitle: 'Frozen'}, (err, movie) => {
		if (err) {
			t.fail();
		} else {
			t.is(movie.title, frozenMovieObject.title, 'Movie title is not Frozen.');
			t.is(movie.imdb.id, frozenMovieObject.imdb.id, 'imdb id is not from Frozen.')
		}
		t.end();
	});
});

test.cb('Omdb Wrapper get method should return an error when a movie can not be found', t => {
	omdbApi.get({ movieTitle: 'NOTEXISTINGMOVIETITLE'}, (err, movie) => {
		if (err) {
			t.is(err.code, 'no_movie_found', 'Error code for movie_not_found is not correct.')
		} else {
			t.fail();
		}
		t.end();
	});
});

test.cb('Omdb wrapper search method will return me an array of 10 movies when i search for Harry Potter', t => {
	omdbApi.search({ movieTitle: 'Harry Potter' }, (err, movies) => {
		if (err) {
			t.fail();
		} else {
			t.is(movies.length, 10, 'The array has more movies! new harry potter movie came out!');
		}
		t.end();
	});
});

test.cb('Omdb wrapper search method will return an error when a movie cannot be found', t => {
	omdbApi.search({ movieTitle: 'NOTEXISTINGMOVIETITLE'}, (err, movies) => {
		if (err) {
			t.is(err.code, 'no_movies_found', 'Error code for movie_not_found is not correct.')
		} else {
			t.fail();
		}
		t.end();
	});
});
