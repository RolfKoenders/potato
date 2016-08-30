#!/usr/bin/env node
'use strict';

/*
 * Couchpotato SlackBot launch script.
*/

let config = require('../config');
let CouchpotatoBot = require('../lib/couchpotato-bot');

let bot = new CouchpotatoBot(config.getProperties());
bot.run();
