'use strict';

let request = require('request');

class Couchpotato {

	constructor(settings) {
		this.settings = settings;
		this.baseUrl = `${settings.host}:${settings.port}/api/${settings.key}/`;

		this._available(reachable => {
			if (!reachable) {
				throw new Error('Couchpotato server unreachable.');
			}
		});
	}

	/**
	 * Add a movie to couchpotato.
	 * @param: {string} movie - The IMDB id of the movie to add.
	 * @param: {function} callback - Callback with (err, result).
	 */
	addMovie(movie, callback) {
		let reqObj = {
			uri: '/movie.add',
			qs: {
				identifier: movie
			},
			json: false
		};
		this._request(reqObj, (err, response, body) => {
			if (!err || body.success) {
				callback(null, body);
			} else {
				console.log('[CouchPotato API] - Error adding movie to couchpotato.');
				callback(err);
			}
		});
	}

	version(callback) {
		let reqObj = {uri: '/app.version'};
		this._request(reqObj, (err, response, body) => {
			if (err) {
				return callback(err);
			}
			// console.log(`[CouchPotato API] - Server version: ${body.version}`);
			return callback(null, body.version);
		});
	}

	_available(callback) {
		let reqObj = {uri: '/app.available'};
		this._request(reqObj, (error, response, body) => {
			if (error || !body.success) {
				callback(false);
			} else {
				callback(true);
			}
		});
	}

	_request(req, callback) {
		let reqObj = {
			baseUrl: this.baseUrl,
			uri: req.uri,
			method: req.method || 'GET',
			json: req.json || true
		};
		if (req.qs) {
			reqObj.qs = req.qs;
		}
		request(reqObj, (err, response, body) => {
			return callback(err, response, body);
		});
	}
}

module.exports = Couchpotato;
