'use strict';

// TODO Extend help with a check for admin and respond with admin commands
function helpHandler(message, callback) {
	let helpMessage = `
*Here you go!*
To *search* for a movie send me:
\`search movie movie-title\`
To *add* a movie to the wanted list:
\`download movie movie-title\`
Or if you know the *IMDB id* (which is also returned by searching for a movie) send me:
\`download movie IMDB-id\`
If you want to see some suggestions:
\`do you have suggestions?\``;

	if (message.user.is_admin) {
		helpMessage += `\n
*Admin commands*
\`!version\` Check which version of the bot and couchpotato is running.
\`!update\` Update couchpotato to the latest version.`;
	}

	helpMessage += `\n\nAnd i also really like :popcorn: so you can always give me some!`;

	callback(helpMessage);
}

module.exports = helpHandler;
