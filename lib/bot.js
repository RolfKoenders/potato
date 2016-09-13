'use strict';

const Slackbots = require('slackbots');
const _ = require('lodash');

class Bot extends Slackbots {

	constructor(settings) {
		super(settings.bot);
		this.settings = settings;
		this.user = null;
		this.cmds = {channel: [], direct: [], admin: []};
	}

	run() {
		this.on('start', this._onStart);
		this.on('message', this._onMessage);
	}

	registerHandler(handler) {
		let group = handler.group;
		if (group === 'channel' || group === 'direct' || group === 'admin') {
			this.cmds[handler.group].push(handler);
		} else {
			throw new Error('Invalid handler group. Cannot register handler.');
		}
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
		if (this._isChatMessage(message) && !this._isFromBot(message) && this._isChannelMessage(message)) {
			let channel = this._getChannelById(message.channel).name;
			this._handleMessage(message, {channel});
		} else if (this._isChatMessage(message) && !this._isFromBot(message) && this._isDirectMessage(message)) {
			let user = this._getUserById(message.user);
			this._handleMessage(message, {user});
		}
	}

	_handleMessage(message, target) {
		let text = message.text;
		let messageParams = {
			/* eslint-disable camelcase */
			as_user: true
			/* eslint-enable camelcase */
		};

		let CMDS = null;
		if (target.channel) {
			CMDS = this.cmds.channel;
		} else if (target.user) {
			CMDS = this.cmds.direct;
			CMDS = CMDS.concat(this.cmds.channel);

			if (target.user.is_admin) {
				CMDS = CMDS.concat(this.cmds.admin);
			}
		}

		let handler = null;
		let matchResult = null;

		for (const cmd of CMDS) {
			let result = text.match(cmd.match);
			if (result !== null) {
				matchResult = result;
				handler = cmd.handler;
			}
		}

		if (handler !== null) {
			handler(matchResult, (response, channel, params) => {
				if (params) {
					messageParams = _.merge(messageParams, params);
				}
				if (target.channel) {
					this.postMessageToChannel(target.channel, response, messageParams);
				} else {
					this.postMessageToUser(target.user.name, response, messageParams);
				}
			});
		}
	}

	// Check if message is a chat message
	_isChatMessage(message) {
		return message.type === 'message' && Boolean(message.text);
	}

	// Check if message is sent by the bot
	_isFromBot(message) {
		if (message.user === this.user.id || message.subtype === 'bot_message') {
			return true;
		}
		return false;
	}

	_isDirectMessage(message) {
		let channel = message.channel;
		if (channel.charAt(0) === 'D') {
			return true;
		}
		return false;
	}

	_isChannelMessage(message) {
		let channel = message.channel;
		if (channel.charAt(0) === 'C') {
			return true;
		}
		return false;
	}

	// Get channel name by id
	_getChannelById(channelId) {
		return this.channels.filter(item => {
			return item.id === channelId;
		})[0];
	}

	_getUserById(userId) {
		return this.users.filter(item => {
			return item.id === userId;
		})[0];
	}
}

module.exports = Bot;
