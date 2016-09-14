#!/usr/bin/env node
'use strict';

/*
 * Couchpotato SlackBot launch script.
*/

const Bot = require('slackbotify');
const config = require('../config');
const MessageHandlers = require('../lib/handlers');

let bot = new Bot(config.getProperties());

bot.registerHandler({
	groups: ['channel', 'direct'],
	match: /download movie\s(.*)/,
	handler: MessageHandlers.downloadMovieHandler
});

bot.registerHandler({
	groups: ['channel', 'direct'],
	match: /search movie\s(.*)/,
	handler: MessageHandlers.searchMovieHandler
});

bot.registerHandler({
	groups: ['direct'],
	match: /hi/ig,
	handler: function (message, callback) {
		callback('Hi there! :smiley:');
	}
});

bot.registerHandler({
	groups: ['direct'],
	match: /thanks/ig,
	handler: function (message, callback) {
		callback('Your welcome! :innocent:');
	}
});

bot.registerHandler({
	groups: ['direct'],
	match: /:popcorn:/ig,
	handler: function (message, callback) {
		callback('POPCORN! :yum:');
	}
});

bot.registerHandler({
	groups: ['direct'],
	match: 'help',
	handler: MessageHandlers.helpHandler
});

bot.registerHandler({
	groups: ['admin'],
	match: /!version/i,
	handler: MessageHandlers.couchPotatoAdminHandler
});

bot.registerHandler({
	groups: ['admin'],
	match: /!update/i,
	handler: MessageHandlers.couchPotatoAdminHandler
});

bot.registerHandler({
	groups: ['channel', 'direct'],
	match: /do i have movie\s(.*)/i,
	handler: MessageHandlers.couchPotatoHandler.searchMedia
});

bot.run();
