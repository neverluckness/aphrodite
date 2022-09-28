const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const config = require('./config.json')
global.builders = require('@discordjs/builders')


const token = process.env.TOKEN || config.TOKEN;
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`| Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands("1024753026487033867"),
			{ body: commands },
		);

		console.log(`| Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();