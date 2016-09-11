
# Couchpotato Slackbot
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

> Add movies to your couchpotato wanted list with just a simple slack message!

![search and download example](assets/images/search-download.gif)

## Features
At the moment Mr. Potato has these features.
- Search for movies
- Add a movie by title ('download movie Frozen')
- Add a movie by IMDB id ('download movie tt2788732')

## Run
To start the bot simply run the start script inside the bin directory:
```
$ ./bin/start
```
Or `npm install` and `npm start` to launch the bot!

### Docker
There is a dockerfile to build a docker image.
Run the following inside the project directory to build the image:
```
$ docker build -t couchbot .
```
And launch it with the following command:
```
$ docker run -d --name couch-slackbot couchbot
```

## Configuration
Configuration of your bot can either be done using a config file or pass environment variables.

### File
In the `config` folder there is a `config.json.example` file you can copy and rename to `config.json`. Once configured you are ready to start the bot.

### Environment variables
If a config file is not ideal for your setup use environment variables. You can see in the table which env var to use for each config value.

| Description | ENV | Required |
|-------------|-----|----------|
| The slack token for this slackbot | CB_SLACK_KEY | ✓ |
| The name of the slackbot | CB_SLACK_NAME | ✓ |
| Couchpotato server hostname/ip | CB_HOST | ✓ |
| Couchpotato server port | CB_PORT | ✓ |
| Couchpotato API key | CB_COUCH_KEY | ✓ |

## Usage
There are 3 types of commands the bot will listen to. Channel, Direct and Admin commands.

### Channel commands
The channel commands is where the bot is listening for when he is invited to a channel.

#### Search and add movie to couchpotato
The following example shows

### Direct commands
Direct commands are send in a private message to the bot.

### Admin commands
Admin commands are send in a private message to the bot, but the bot will only react on it if a admin user has send the message. Otherwise its ignored.

### License
[MIT](https://opensource.org/licenses/MIT)
