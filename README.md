
# Couchpotato Slackbot
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

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

### License
[MIT](https://opensource.org/licenses/MIT)
