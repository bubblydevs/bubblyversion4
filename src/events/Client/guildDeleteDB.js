const { MessageEmbed } = require('discord.js')
const Guild = require('../../models/Guild')
const Mod = require('../../models/Automod')

module.exports = {
    name: 'guildDelete',
    run: async (client, guild) => {
        Guild.findOneAndDelete({
            GuildID: guild.id
        }, (err, res) => {})

        Mod.findOneAndDelete({
            GuildID: guild.id
        }, (err, res) => {})

            client.channels.cache.get('807557067451662347').send(`> Bye Guild!\n > Name: ${guild.name}\n > ID: ${guild.id}\n > Members: ${guild.memberCount}\n > Now in ${client.guilds.cache.size} guilds`)
    }
}