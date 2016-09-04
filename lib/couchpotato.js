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

	_version() {
		let reqObj = {uri: '/app.version'};
		this._request(reqObj, (error, response, body) => {
			console.log(`[CouchPotato API ] - Server version: ${body.version}`);
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
		request(reqObj, (err, response, body) => {
			callback(err, response, body);
		});
	}
}

module.exports = Couchpotato;
