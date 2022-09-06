const Discord = require('discord.js');
const fs = require('fs');
const path = require('node:path');

function getCommands(commandPath) {
	console.log('AAAAAAAAAAAAAAA')
	const commands = new Discord.Collection();

    const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));
	
	for(const file of commandFiles) {
		const command = require(path.join(commandPath, file));
	
		commands.set(command.name, command);
	}

	console.log(commands, commandPath)
	return commands;
}

class Module {
	static getCommands(commandPath) {
		const commands = new Discord.Collection();
	
		const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));
		
		for(const file of commandFiles) {
			const command = require(path.join(commandPath, file));
		
			commands.set(command.name, command);
		}
	
		return commands;
	}

	constructor(name, commands, options) {
		this.name = name;
		this.commands = commands
	}
}

module.exports = Module;