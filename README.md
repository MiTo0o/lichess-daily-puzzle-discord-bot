# lichess-daily-puzzle-discord-bot

A discord bot that posts a daily chess puzzle from lichess

## Stats
Posting daily chess puzzles to 3500+ users and 15+ channels

## Usage
* Click [HERE](https://discord.com/oauth2/authorize?client_id=959385106991157278&permissions=18432&scope=applications.commands%20bot) to invite the bot to your server

## Available Commands  
`/puzzle` Posts the daily chess puzzle by Lichess on-demand  
`/register` Receive daily chess puzzles in this channel  
`/setpuzzletime` Configures the time of day the daily puzzle should be posted (in UTC)  
`/unregister` Stop receiving daily chess puzzles in this channel  

## Tech stack: 

* Built using [typescript](https://www.typescriptlang.org) and the [discord.js](https://discord.js.org/#/) library
* Hosted using [Fly.io](https://fly.io/)
* Storage with [MongoDB Atlas](https://www.mongodb.com/atlas)
* Error logging with [sentry](https://sentry.io/organizations/derzan/issues/?project=6307741)
