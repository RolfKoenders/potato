'use strict';

let Url = require('url');
let request = require('request');

class Couchpotato {

    constructor(settings) {
        console.log('[CouchPotato API] - init');
        this.settings = settings;
        this.baseUrl = `http://${settings.host}:${settings.port}/api/${settings.key}/`;

        this._available((reachable) => {
            if(!reachable) {
                process.exit(1);
            }
        });
    }

    _version() {
        let reqObj = { uri: '/app.version' };
        this._request(reqObj, (error, response, body) => {
            console.log(`[CouchPotato API ] - Server version: ${body.version}`);
        });
    }

    _available() {
        let reqObj = { uri: '/app.available' };
        this._request(reqObj, (error, response, body) => {
            if(error || !body.success) {
                process.exit(1);
            }
        });
    }

    _request(req, callback) {
        let reqObj = {
            baseUrl: this.baseUrl,
            uri: req.uri,
            method: req.method || 'GET',
            json: req.json || true
        };
        request(reqObj, (err, response, body) => {
            callback(err, response, body);
        });
    }
}

module.exports = Couchpotato;
