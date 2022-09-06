const Discord = require('discord.js');

class CustomClient extends Discord.Client {
    constructor(bot, intents) {
        super({ intents });
        this.bot = bot;
    }
}

module.exports = CustomClient;