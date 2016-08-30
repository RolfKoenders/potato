'use strict';

let omdb = require('omdb');

class Omdb {

    constructor() {}

    search(options, callback) {
        let movieTitle = options.movieTitle;
        omdb.search(movieTitle, (err, movies) => {
            if(err) {
                return callback(err, null);
            }

            if(movies.length < 1) {
                let error = {
                    message: 'No movie found',
                    code: 'no_movie_found'
                }
                return callback(error, null);
            }

            let foundMovies = [];
            for(const movie of movies) {
                foundMovies.push({
                    title: movie.title,
                    year: movie.year,
                    imdb_id: movie.imdb.id,
                    imdb_rating: movie.imdb.rating
                });
            }

            return callback(null, foundMovies);
        });
    }

}

module.exports = Omdb;
