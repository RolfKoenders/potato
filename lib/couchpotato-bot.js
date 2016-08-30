'use strict';
let Bot = require('slackbots');

let CouchAPI = require('./Couchpotato');
let OmdbAPI = require('./Omdb');

class CouchpotatoBot extends Bot {

    constructor(settings) {
        console.log('[CouchpotatoBot] - Constructor');
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
        console.log('[CouchpotatoBot] - Start');
        this._loadBotDetails();
    }

    // Load bot details
    _loadBotDetails() {
        let self = this;
        this.user = this.users.filter((user) => {
            return user.name === self.name;
        })[0];
    }

    // Message event
    _onMessage(message) {
        console.log('[CouchpotatoBot] - message ', message);
        if(this._isChatmessage(message) &&
            !this._isFromBot(message)) {
            this._handleBotMessage(message);
        }
    }

    _handleBotMessage(message) {
        let searchPattrn = /i want movie\s(.*)/;
        let text = message.text;
        let result = searchPattrn.exec(text);
        if(result) {
            let movieToAdd = result[1];
            console.log(`[CouchpotatoBot] - add movie ${movieToAdd}`);
        }
    }

    // Check if message is a chat message
    _isChatmessage(message) {
        return message.type === 'message' && Boolean(message.text);
    }

    // Check if message is sent by the bot
    _isFromBot(message) {
        return message.user === this.user.id;
    }
}

module.exports = CouchpotatoBot;
