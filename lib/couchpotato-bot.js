'use strict';
let Bot = require('slackbots');

let config = require('../config');
let MessageHandler = require('./message-handler');

class CouchpotatoBot extends Bot {

	constructor(settings) {
		super(settings.bot);

		this.settings = settings;
		this.user = null;

		this.cmds = [
			{
				regex: /download movie\s(.*)/,
				handler: MessageHandler.downloadMovieHandler
			},
			{
				regex: /search movie\s(.*)/,
				handler: MessageHandler.searchMovieHandler
			}
		];
	}

	run() {
		this.on('start', this._onStart);
		this.on('message', this._onMessage);
	}

	_onStart() {
		this._loadBotDetails();
	}

	// Load bot details
	_loadBotDetails() {
		var self = this;
		this.user = this.users.filter(user => {
			return user.name === self.name.toLowerCase();
		})[0];
	}

	// Message event
	_onMessage(message) {
		// console.log('[CouchpotatoBot] - message ', message);
		let isChannelMsg = ((config.get('bot.channel').length > 0) && this._isFromWatchedChannel(message));
		if (this._isChatMessage(message) && !this._isFromBot(message) && isChannelMsg) {
			this._handleMessage(message);
		}
	}

	_handleMessage(message) {
		let text = message.text;
		for (const cmd of this.cmds) {
			let result = text.match(cmd.regex, 'gi');
			if (result !== null) {
				cmd.handler(result, (channel, response, params) => {
					this.postMessageToChannel(channel, response, params);
				});
			}
		}
	}

	// Check if message is a chat message
	_isChatMessage(message) {
		return message.type === 'message' && Boolean(message.text);
	}

	// Check if message is sent by the bot
	_isFromBot(message) {
		return message.user === this.user.id;
	}

	_isFromWatchedChannel(message) {
		if (!message.channel) {
			return false;
		}
		let channel = this._getChannelById(message.channel);
		return config.get('bot.channel') === channel.name;
	}

	// Get channel name by id
	_getChannelById(channelId) {
		return this.channels.filter(item => {
			return item.id === channelId;
		})[0];
	}
}

module.exports = CouchpotatoBot;
