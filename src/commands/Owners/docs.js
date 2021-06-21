const {
    MessageEmbed
} = require('discord.js');
const {
    inspect
} = require('util')
const fetch = require('node-fetch')

module.exports = {
    name: 'docs',
    description: `Nothing...`,
    aliases: ['djs'],
    ownerOnly: true,
    run: async (client, message, args) => {
        const docsserch = args[0]
        if (!docsserch) return;
        
        const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(docsserch)}`

        const docFetch = await fetch(url)
        const embed = await docFetch.json()

        if (!embed || embed.error) {
            message.channel.send('This is not on discord.js.')
        }

        message.channel.send({ embed })
    }
}