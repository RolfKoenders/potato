'use strict';
let Bot = require('slackbots');
let CouchAPI = require('./Couchpotato');

class CouchpotatoBot extends Bot {

    constructor(settings) {
        console.log('[CouchpotatoBot] - Constructor');
        super(settings.bot);
        this.couchApi = new CouchAPI(settings.couch);
        this.settings = settings;
        this.user = null;
    }

    run() {
        this.on('start', this._onStart);
        this.on('message', this._onMessage);
    }

    _onStart() {
        console.log('[CouchpotatoBot] - Start')
    }

    _onMessage(message) {
        console.log('[CouchpotatoBot] - message ', message);
        // {
        //     type: 'message',                                                                      │
        //     channel: 'D265JSXPG',                                                                                             │
        //     user: 'U265J2FJA',                                                                                                │
        //     text: 'i want movie X',                                                                                           │
        //     ts: '1472510767.000003',                                                                                          │
        //     team: 'T265V7KNV'
        // }
        let searchPattrn = /i want movie\s(.*)/;
        let text = message.text;
        let result = searchPattrn.exec(text);
        if(result) {
            let movieToAdd = result[1];
            console.log(`[CouchpotatoBot] - add movie ${movieToAdd}`);
        } else {
            console.log('Hier doe ik niks mee');
        }
    }

    /* Utility functions */
    contains(hay, needle) {
        needle.toLowerCase();
        return hay && hay.indexOf(needle) !== -1;
    }
}

module.exports = CouchpotatoBot;
