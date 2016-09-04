'use strict';

let request = require('request');

class Couchpotato {

	constructor(settings) {
		this.settings = settings;
		this.baseUrl = `http://${settings.host}:${settings.port}/api/${settings.key}/`;

		this._available(reachable => {
			if (!reachable) {
				throw new Error('Couchpotato server unreachable.');
			}
		});
	}

	addMovie(movie, callback) {
		// movie.imdb.id
		console.log('movie id: ', movie.imdb.id);
		let reqObj = {
			uri: '/movie.add',
			qs: {
				identifier: movie.imdb.id
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

	version() {
		let reqObj = {uri: '/app.version'};
		this._request(reqObj, (error, response, body) => {
			console.log(`[CouchPotato API] - Server version: ${body.version}`);
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
