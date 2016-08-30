'use strict';

let convict = require('convict');

let conf = convict({
    bot: {
        token: {
            doc: 'Slack bot token',
            format: String,
            default: null,
            env: 'CB_SLACK_KEY'
        },
        name: {
            doc: 'Name of the slack bot',
            format: String,
            default: 'Potato',
            env: 'CB_SLACK_NAME'
        },
		channel: {
			doc: 'Name of the channel where the bot will live',
			format: String,
			default: '',
			env: 'CB_SLACK_CHNAME'
		}
    },
    couch: {
        host: {
            doc: 'Couchpotato hostname',
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

let configFile = conf.loadFile('./config/config.json');
conf.validate({ strict: true});

module.exports = conf;
