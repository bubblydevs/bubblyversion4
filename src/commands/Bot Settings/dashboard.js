const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'dashboard',
    description: `Coming soon.`,
    run: async (client, message, args) => {
        message.channel.send(
            new MessageEmbed()
            .setDescription('Coming soon.')
        )
    },
}