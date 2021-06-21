const Guild = require('../../models/Guild')
const {
    MessageEmbed
} = require('discord.js');
require('../../inline')

module.exports = {
    name: 'ban',
    category: 'Moderation',
    description: `Ban's the member who is mentioned`,
    run: async (client, message, args) => {
        const db = await Guild.findOne({
            GuildID: message.guild.id
        }, async (err, guild) => { if (!guild) return; })


        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const logChannel = await message.guild.channels.cache.get(db.LogsChannelID);
        const permissions = message.channel.permissionsFor(message.client.user);

        // if's
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.inlineReply(
            new MessageEmbed()
                .setTitle('Bubbly Ban')
                .setDescription(`${message.author}, You don't have permissions for this command (\`BAN_MEMBERS\`)`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        )

        if (!permissions.has('BAN_MEMBERS')) return message.inlineReply(
            new MessageEmbed()
                .setTitle('Bubbly Ban')
                .setDescription(`${message.author}, This is embarrassing but i don't have permissions for \`BAN_MEMBERS\`.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        );

        if (!member) return message.inlineReply(
            new MessageEmbed()
                .setTitle('Bubbly Ban')
                .setDescription(`${message.author}, I can't find that member, Make sure to mention them.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                })))

        if (member == message.author.id) return message.inlineReply(
            new MessageEmbed()
                .setTitle('Bubbly Ban')
                .setDescription(`${message.author}, Why would i ban you? There's no need to ban yourself.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        )

        if (member == client.user.id) return message.inlineReply(
            new MessageEmbed()
                .setTitle('Bubbly Ban')
                .setDescription(`${message.author}, Why me? I am doing all of this hard work and now you want me to go :(`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        )

        if (message.member.roles.highest.position < member.roles.highest.position) return message.inlineReply(
            new MessageEmbed()
                .setTitle('Bubbly Ban')
                .setDescription(`${message.author}, This member has the same rank as your or a higher rank then you.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        )

        if (!member.bannable) return message.inlineReply(
            new MessageEmbed()
                .setTitle('Bubbly Ban')
                .setDescription(`${message.author}, This member has a higher role then me.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        )

        let reason = 'Moderator specified no reason'

        if (args.length > 1) reason = args.slice(1).join(" ")

        try {
            await member.send(
                new MessageEmbed()
                    .setTitle('Bubbly Ban')
                    .setDescription(`${message.author}, You have been banned from ${message.guild.name} for the reason \`${reason}\`.`)
                    .setColor('e35962')
                    .setTimestamp()
                    .setFooter(`Banned by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    })))
        } catch { }

        member.ban({ reason: reason })

        message.inlineReply(`\`${member.user.username}\` is now banned!`)


        if (!logChannel) {
            return;
        } else {
            return logChannel.send(
                new MessageEmbed()
                    .setTitle(`Ban | ${member.user.username}`)
                    .setDescription(`Offender: ${member.user.tag} (${member.user.id})\n Reason: ${reason}\n Moderator: ${message.author}`)
                    .setColor('e35962')
                    .setTimestamp()
                    .setFooter(`ID: ${member.user.id}`, member.user.displayAvatarURL({
                        dynamic: true
                    }))
            )
        }
    }
}