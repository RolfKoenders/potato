'use strict';

let config = require('../../config');
let CouchAPI = require('../couchpotato');

let couch = new CouchAPI(config.get('couch'));

function searchMediaHandler(message, callback) {
	let movieTitle = message.matchResult[1];

	couch.searchMedia(movieTitle, (err, result) => {
		if (err) {
			return callback(`Something went wrong.. Check my console`);
		}

		if (result.empty) {
			callback(`No. ${movieTitle} is *not* downloaded or watched for.`);
		} else {
			let responseMessage = _composeResponseMessage(result);
			callback(responseMessage);
		}
	});
}

function _composeResponseMessage(result) {
	let responseMessage = ``;

	for (const movie of result.movies) {
		responseMessage += `• <http://www.imdb.com/title/${movie.identifiers.imdb}|${movie.title}>`;
		if (movie.status === 'active') {
			responseMessage += ` is on the *wanted list*. \n`;
		} else if (movie.status === 'done') {
			responseMessage += ` is already *downloaded!* \n`;
		}
	}

	return responseMessage;
}

module.exports = {
	searchMedia: searchMediaHandler
};
