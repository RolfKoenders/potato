'use strict';

let config = require('../../config');
let CouchAPI = require('../couchpotato');
let pkg = require('../../package.json');

let couch = new CouchAPI(config.get('couch'));

function couchpotatoHandler(message, callback) {
	let command = message[0];
	switch (command) {
		case '!version' :
			_version(callback);
			break;
		default:
			break;
	}
}

function _version(callback) {
	couch.version((err, version) => {
		callback(`Bot version: ${pkg.version} & Couchpotato version: ${version}`);
	});
}

module.exports = couchpotatoHandler;
