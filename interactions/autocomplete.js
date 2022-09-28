module.exports = {
    async run (interaction) {
        const focusedValue = interaction.options.getFocused().toLowerCase();
        const data = require(`../jsons/${interaction.commandName}.json`)
        let filtered = data.filter(choice => choice.name.toLowerCase().includes(focusedValue))
        filtered = filtered.map(choice => ({
            name: choice.name, value: choice.name
        }))
        interaction.respond(filtered.slice(0, 25))
    }
}