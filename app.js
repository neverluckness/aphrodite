const { Client, GatewayIntentBits, Collection } = require('discord.js');
global.builders = require('@discordjs/builders');
global.client = new Client({ intents: [ GatewayIntentBits.Guilds ] });
global.path = require('path'); global.fs = require('fs');
global.config = require('./config.json');

client.login( process.env.TOKEN || config.TOKEN );
process.on('SIGINT', async () => { client.destroy() });

// COMMAND HANDLING
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	client.on(event.name, (...args) => event.execute(...args));
}

