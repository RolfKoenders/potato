'use strict';

const fs = require('fs');
const convict = require('convict');
const pathExists = require('path-exists');

let confFile = `${__dirname}/config.json`;
let conf = convict({
	bot: {
		token: {
			doc: 'Slackbot token',
			format: String,
			default: null,
			env: 'CB_SLACK_KEY'
		},
		name: {
			doc: 'Name of the slack bot',
			format: String,
			default: 'Potato',
			env: 'CB_SLACK_NAME'
		}
	},
	couch: {
		host: {
			doc: 'Couchpotato host including protocol (http/https)',
			format: String,
			default: '127.0.0.1',
			env: 'CB_HOST'
		},
		port: {
			doc: 'Couchpotato port',
			format: 'port',
			default: 5050,
			env: 'CB_PORT'
		},
		key: {
			doc: 'Couchpotato API Key',
			format: String,
			default: null,
			env: 'CB_COUCH_KEY'
		}
	}
});

if (pathExists.sync(confFile))
	conf.loadFile(confFile);
}

conf.validate({strict: true});

module.exports = conf;
