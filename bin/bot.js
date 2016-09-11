#!/usr/bin/env node
'use strict';

/*
 * Couchpotato SlackBot launch script.
*/

const config = require('../config');
const CouchpotatoBot = require('../lib/bot');

let bot = new CouchpotatoBot(config.getProperties());
bot.run();
