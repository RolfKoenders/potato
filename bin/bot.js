#!/usr/bin/env node
'use strict';

/*
 * Couchpotato SlackBot launch script.
*/

let config = require('../config');
let CouchpotatoBot = require('../lib/bot');

let bot = new CouchpotatoBot(config.getProperties());
bot.run();
