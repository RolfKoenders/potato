
# Couchpotato Slackbot
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## Configuration
To configure the bot you can either use a config file or pass environment variables.

### File
In the `config` folder there is a `config.json.example` file you can copy and rename to `config.json`. Once configured you are ready to start the bot.

### Environment variables
If a config file is not ideal for your setup use environment variables. You can see in the table which env var to use for each config value.

| Description | ENV | Required |
|-------------|-----|----------|
| The slack token for this slackbot | CB_SLACK_KEY | ✓ |
| The name of the slackbot | CB_SLACK_NAME | ✓ |
| Only listen for messages in this channel | CB_SLACK_CHNAME | |
| Couchpotato server hostname/ip | CB_HOST | ✓ |
| Couchpotato server port | CB_PORT | ✓ |
| Couchpotato API key | CB_COUCH_KEY | ✓ |
