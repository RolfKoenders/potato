
const downloadMovieHandler = require('./download-movie');
const searchMovieHandler = require('./couch-search-movie');
const couchPotatoAdminHandler = require('./couchpotato-admin-handler');
const couchPotatoHandler = require('./couchpotato-handler');
const helpHandler = require('./help-handler');

module.exports = {downloadMovieHandler, searchMovieHandler, couchPotatoHandler, couchPotatoAdminHandler, helpHandler};
