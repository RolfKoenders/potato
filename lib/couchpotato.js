'use strict';

let request = require('request');

class Couchpotato {

	constructor(settings) {
		this.settings = settings;
		this.baseUrl = `${settings.host}:${settings.port}${settings.baseUrl}/api/${settings.key}/`;
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

	/**
	 * Search the media in couchpotato.
	 * @param: {string} movie - The movie title to search for
	 * @param: {function} callback - Callback with (err, result).
	 */
	searchMedia(movie, callback) {
		let reqObj = {
			uri: '/movie.list',
			qs: {
				search: movie
			},
			json: true
		};
		this._request(reqObj, (err, response, body) => {
			if (!err || body.success) {
				callback(null, body);
			} else {
				console.log('[CouchPotato API] - Error searching for media.');
				callback(err);
			}
		});
	}

	version(callback) {
		let reqObj = {uri: '/updater.info'};
		this._request(reqObj, (err, response, body) => {
			callback(err, body);
		});
	}

	update(callback) {
		let reqObj = {
			uri: '/updater.update',
			json: true
		};
		this._request(reqObj, (err, response, body) => {
			if (err) {
				console.log('[CouchPotato API] - Error updating.');
				callback(err);
			} else {
				callback(null, body);
			}
		});
	}

	suggestions(callback) {
		let reqObj = {
			uri: '/suggestion.view',
			json: true
		};
		this._request(reqObj, (err, response, body) => {
			if (err || !body.success) {
				console.log('[CouchPotato API] - Error while getting list of suggestions.');
			} else {
				callback(null, body);
			}
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
