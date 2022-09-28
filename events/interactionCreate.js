module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (interaction.isCommand()) {
	        const command = require ('../interactions/command.js')
	        await command.run(interaction)
        }
		if (interaction.isAutocomplete()) {
	        const command = require ('../interactions/autocomplete.js')
	        await command.run(interaction)
		}
	}
}