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
	group: 'channel',
	match: /download movie\s(.*)/,
	handler: MessageHandlers.downloadMovieHandler
});

bot.registerHandler({
	group: 'channel',
	match: /search movie\s(.*)/,
	handler: MessageHandlers.searchMovieHandler
});

bot.registerHandler({
	group: 'direct',
	match: /hi/ig,
	handler: function (message, callback) {
		callback('Hi there! :smiley:');
	}
});

bot.registerHandler({
	group: 'direct',
	match: /:popcorn:/ig,
	handler: function (message, callback) {
		callback('POPCORN! :yum:');
	}
});

bot.registerHandler({
	group: 'direct',
	match: 'help',
	handler: MessageHandlers.helpHandler
});

bot.registerHandler({
	group: 'admin',
	match: /!version/i,
	handler: MessageHandlers.couchPotatoHandler
});

bot.run();
