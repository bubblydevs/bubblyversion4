
const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/Guild')

module.exports = {
    name: 'unban',
    category: 'Moderation',
    description: `Unban's the member who is mentioned`,
    run: async (client, message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Unban')
                .setDescription(`${message.author}, You don't have permissions for this command (\`BAN_MEMBERS\`)`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        )
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(
            new MessageEmbed()
            .setTitle('Bubbly Unban')
            .setDescription(`${message.author}, This is embarrassing but i don't have permissions for \`BAN_MEMBERS\`.`)
            .setColor('e35962')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))
        )

        let reason = args.slice(1).join(" ");
        let userId = args[0];

        if (!reason) reason = "Moderator specified no reason"
        if (!args[0]) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Unban')
                .setDescription(`${message.author}, I did not find that user ID.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        )
        if (isNaN(args[0])) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Ban')
                .setDescription(`${message.author}, I think that you gave me the wrong user ID to me.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        )

        message.guild.fetchBans().then(async bans => {
            let bUser = bans.find(a => a.user.id == userId);
            if (!bUser) return message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Unban')
                    .setDescription(`${message.author}, That user is not banned.`)
                    .setColor('e35962')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
            )
            await message.guild.members.unban(bUser.user, reason)
            message.channel.send(`Unbaned \`${args[0]}\``)
        })

        const db = await Guild.findOne({
            GuildID: message.guild.id
        }, async (err, guild) => { if (!guild) return; })

        const logchannel = await message.guild.channels.cache.get(db.LogsChannelID);


        if (!logchannel) {
            return;
        } else {
            logchannel.send(
                new MessageEmbed()
                    .setTitle(`Purge | ${message.author.username}`)
                    .setDescription(`Offender: ${args[0]}\n Reason: ${reason}\n Moderator: ${message.author}`)
                    .setTimestamp()
                    .setColor('e35962')
                    .setFooter(`ID: ${message.author.id}`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
            )
        }
    }
}