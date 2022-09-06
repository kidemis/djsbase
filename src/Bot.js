const Discord = require('discord.js');
const path = require('node:path');
const fs = require('fs');

const CustomClient = require('./structures/CustomClient');

const commandHandler = require('./handlers/CommandHandler');
const eventHandler = require('./handlers/EventHandler');

function intentsParser(intents, bits) {
}

function loadEvents(events, eventsPath) {
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
	
	for(const file of eventFiles) {
		const ev = require(path.join(eventsPath, file));
	
		events.set(ev.name, ev);
	}
}
function loadModules(modules, modulesPath){
	const moduleFolders = fs.readdirSync(modulesPath);
    
	for(const folder of moduleFolders) {
		const m = require(path.join(modulesPath, folder));
        
		modules.set(m.name, m);
	}
}
function loadCommands(commands, modules) {
	for(const [_, module] of modules.entries()) {

		for(const [_, command] of module.commands.entries()) {
			console.log(`loaded command ${command.name}`);
			commands.set(command.name, command);
		}
	}
    console.log(commands, modules)
}

class Bot {
    constructor(config) {
        this.intents = new Discord.IntentsBitField();
        intentsParser(this.intents, config.intents);

        this.client = new CustomClient(this.client, this.intents);
        this.client.bot = this;
        
        const basedir = path.resolve('./');

        this.events = new Discord.Collection();
        this.modules = new Discord.Collection();
        this.commands = new Discord.Collection();

        const eventsPath = path.join(basedir, config.eventsPath);
        const modulesPath = path.join(basedir, config.modulesPath);

        loadEvents(this.events, eventsPath);
        loadModules(this.modules, modulesPath);
        loadCommands(this.commands, this.modules);

        if(config.commandHandler !== false) {
            this.client.on('interactionCreate', commandHandler);
        }
        if(config.eventHandler !== false) {
            eventHandler(this.client, this.events);
        }
    }

    login(token) {
        this.client.login(token);
    }
}

module.exports = Bot;