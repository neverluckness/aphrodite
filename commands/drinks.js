module.exports = {
    data: new builders.SlashCommandBuilder()
        .setName("drinks")
        .setNameLocalizations({
            ru: 'напитки',
        })
        .setDescription("Choose some drinks")
        .setDescriptionLocalizations({
			ru: 'Выберите какой-нибудь напиток',
		})
        .addStringOption(option => 
            option.setName("drink")
                .setNameLocalizations({
                    ru: 'напиток',
                })
                .setDescription("wine, coffee or maybe stil cold water?")
                .setDescriptionLocalizations({
                    ru: 'Вино, кофе или быть может холодную воду без газа?'
                })
                .setRequired(true)
                .setAutocomplete(true)),
    async run(interaction) {
        const drink = interaction.options.getString("drink")
        const drinksData = require('../jsons/drinks.json')
        let data = drinksData.filter(d => d.name === drink)[0]

        let embed = {
            title: data.name,
            color: 0x303434,
            footer: {
              text: `По заказу от ${interaction.user.tag}`
            },
            image: {
              url: data.images[Math.floor(Math.random() * data.images.length )]
            },
            description: `**Факт**\n*${data.facts[Math.floor(Math.random() * data.facts.length )]}*`
        }

        interaction.reply({ embeds: [ embed ]})
    }
}