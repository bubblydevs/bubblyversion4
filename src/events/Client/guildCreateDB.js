const { MessageEmbed } = require('discord.js')
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

        let channelSend;

        guild.channels.cache.forEach((channel) => {
            if (channel.type == "text") {
                if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                    channelSend = channel;
                }
            }
        })

        if (!channelSend) return;

        channelSend.send(
            new MessageEmbed()
                .setTitle(`Thank's for inviting me! ❤`)
                .setDescription(`My prefix is \`b!\`And You can see my commands by runing the command \`b!help\`.`)
                .setColor('e45962')
                .setTimestamp()
        )



        const logsChannel = await client.channels.cache.get('807557067451662347')
        logsChannel.send(`> New Guild!\n > Name: ${guild.name}\n > ID: ${guild.id}\n > Members: ${guild.memberCount}\n > Now in ${client.guilds.cache.size} guilds`)
    }
}