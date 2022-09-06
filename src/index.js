'use strict';

const DiscordJS = require('discord.js');

exports.Bot = require('./Bot.js');

exports.Event = require('./structures/Event.js');
exports.Listener = require('./structures/Listener.js');
exports.Module = require('./structures/Module.js');
exports.Command = require('./structures/Command.js');

exports.CommandHandler = require('./handlers/CommandHandler.js');
exports.EventHandler = require('./handlers/EventHandler.js');

exports.DiscordJS = DiscordJS;
exports.Intents = DiscordJS.GatewayIntentBits;
