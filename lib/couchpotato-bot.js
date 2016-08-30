'use strict';
let Bot = require('slackbots');

let config = require('../config');
let CouchAPI = require('./Couchpotato');
let OmdbAPI = require('./Omdb');

class CouchpotatoBot extends Bot {

    constructor(settings) {
        super(settings.bot);

        this.couchApi = new CouchAPI(settings.couch);
        this.omdbApi = new OmdbAPI();

        this.settings = settings;
        this.user = null;
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
	    this.user = this.users.filter((user) => {
			return user.name === self.name.toLowerCase();
	    })[0];
    }

    // Message event
    _onMessage(message) {
        //console.log('[CouchpotatoBot] - message ', message);

		let isChannelMsg = ((config.get('bot.channel').length > 0) && this._isFromWatchedChannel(message));
		if(this._isChatMessage(message) && !this._isFromBot(message) && isChannelMsg) {
			this._handleBotMessage(message);
        }
    }

    _handleBotMessage(message) {
        let searchPattrn = /download movie\s(.*)/;
        let text = message.text;
        let result = searchPattrn.exec(text);
        if(result) {
            let movieTitle = result[1];

			let channel = config.get('bot.channel');
			let sayMessage = null;
			let params = null;

			this.omdbApi.get({ movieTitle }, (err, movie) => {
				if (err) {
					console.log('Error: \n',err);
					sayMessage = 'I failed :disappointed: check my console.. :';
				}
				else {
					params = {
						icon_emoji: ':popcorn:'
					};
					sayMessage = `Adding ${movie.title} (${movie.year}) with IMDB rating: ${movie.imdb.rating} to wanted list.`;
				}
				this.postMessageToChannel(channel, sayMessage, params);
			});
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
		if(!message.channel) {
			return false;
		}
		let channel = this._getChannelById(message.channel);
		return config.get('bot.channel') === channel.name;
	}

	//Get channel name by id
	_getChannelById(channelId) {
		return this.channels.filter((item) => {
			return item.id === channelId;
		})[0];
	}
}

module.exports = CouchpotatoBot;
