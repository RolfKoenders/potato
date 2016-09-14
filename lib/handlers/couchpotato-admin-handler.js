'use strict';

let config = require('../../config');
let CouchAPI = require('../couchpotato');
let pkg = require('../../package.json');

let couch = new CouchAPI(config.get('couch'));

function couchpotatoHandler(message, callback) {
	let command = message.matchResult[0];
	switch (command) {
		case '!version' :
			_version(callback);
			break;
		default:
			break;
	}
}

function _version(callback) {
	couch.version((err, result) => {
		let responseMessage = `*My* version is ${pkg.version} \n`;
		if (err) {
			responseMessage += `Oooopsy, something went wrong dude! Try again.`;
		} else {
			responseMessage += `*Couchpotato* is running version is: ${result.version.hash}`;
			if (result.update_version) {
				responseMessage += ` and there is an update available! Send \`!update\` to update to the latest version.`;
			}
		}
		callback(responseMessage);
	});
}

module.exports = couchpotatoHandler;
