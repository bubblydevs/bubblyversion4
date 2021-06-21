const Guild = require('../../models/Guild')
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'unmute',
    category: 'Moderation',
    description: `Unmute's the member who is mentioned`,
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const permissions = message.channel.permissionsFor(message.client.user);

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Unmute')
                .setDescription(`${message.author}, You don't have permissions for this command (\`MANAGE_MESSAGES\`)`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        )

        if (!permissions.has('MANAGE_ROLES')) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Unmute')
                .setDescription(`${message.author}, This is embarrassing but i don't have permissions for \`MANAGE_ROLES\`.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        );

        if (!member) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Unmute')
                .setDescription(`${message.author}, I can't find that member, Make sure to mention them.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                })))

        const db = await Guild.findOne({
            GuildID: message.guild.id
        }, async (err, guild) => { if (!guild) return; })

        let muteRole = message.guild.roles.cache.get(db.MuteRoleID);
        const logchannel = await message.guild.channels.cache.get(db.LogsChannelID);

        if (!member.roles.cache.has(muteRole.id)) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Unmute')
                .setDescription(`${message.author}, This member is not muted.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        )

        try {
            member.roles.remove(muteRole)
        } catch {
            return message.channel.send('Something went wrong.')
        }

        if (!logchannel) {
            return;
        } else {
            logchannel.send(
                new MessageEmbed()
                    .setTitle(`Unmute | ${member.user.username}`)
                    .setDescription(`Offender: ${member.user.tag} (${member.user.id})\n Moderator: ${message.author}`)
                    .setTimestamp()
                    .setColor('e35962')
                    .setFooter(`ID: ${member.user.id}`, member.user.displayAvatarURL({
                        dynamic: true
                    }))
            )
        }

        message.channel.send(`\`${member.user.username}\` is now unmuted!`)
    }
}