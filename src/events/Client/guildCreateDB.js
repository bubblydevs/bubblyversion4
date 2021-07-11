const { MessageEmbed, WebhookClient } = require('discord.js')
const Guild = require('../../models/Guild')
const Mod = require('../../models/Automod')

module.exports = {
    name: 'guildCreate',
    run: async (client, guild) => {
        duild = new Guild({
            GuildName: guild.name,
            GuildID: guild.id,
            Preifx: ['b!'],
            WelcomeChannelID: 'disabled',
            CustomWelcomeText: 'disabled',
            LogsChannelID: 'disabled',
            AutoroleID: 'disabled',
            MuteRoleID: 'disabled',
        })

        duild.save()

        autoMod = new Mod({
            GuildID: guild.id,
            AntiLink: 'Disabled',
            AntiSpam: 'Disabled',
            AntiSwear: 'Disabled',
        })

        autoMod.save()


        const guildClient = new WebhookClient('863828246801154118', 'OBMtIJWu9YfwbNvT1c1Q0HIkZf4alca9yyicrJL0j11HgtAwtluzBl7UvoPlymmRrOZu');
        guildClient.send(`> New Guild!\n > Name: ${guild.name}\n > ID: ${guild.id}\n > Members: ${guild.memberCount}\n > Now in ${client.guilds.cache.size} guilds`)
    }
}