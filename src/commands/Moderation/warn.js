const {
    MessageEmbed
} = require('discord.js');
const Guild = require('../../models/Guild')
const warns = require('../../models/Warns')

module.exports = {
    name: 'warn',
    category: 'Moderation',
    description: `Warn's the member who is mentioned`,
    run: async (client, message, args) => {
        const db = await Guild.findOne({
            GuildID: message.guild.id
        }, async (err, guild) => { if (!guild) return; })

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const logChannel = await message.guild.channels.cache.get(db.LogsChannelID);
        const reason = args.slice(1).join(" ")


        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Warn')
                .setDescription(`${message.author}, You don't have permissions for this command (\`MANAGE_ROLES\`)`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        )

        if (!member) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Warn')
                .setDescription(`${message.author}, I can't find that member make sure to mention them.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                })))

        if (!reason) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Warn')
                .setDescription(`${message.author}, Next time mention a reason.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                })))

        if (member == message.author.id) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Warn')
                .setDescription(`${message.author}, Why would i mute you? There's no need to mute yourself.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        )

        if (message.member.roles.highest.position < member.roles.highest.position) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Warn')
                .setDescription(`${message.author}, This member has the same rank as your or a higher rank then you.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        )

        warns.findOne({
            GuildID: message.guild.id,
            User: member.user.id
        }, async (err, data) => {
            if (err) return message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Warn')
                    .setDescription(`${message.author}, Something went wrong with the database rerun the command.`)
                    .setColor('e35962')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    })))

            if (!data) {
                data = new warns({
                    GuildID: message.guild.id,
                    User: member.user.id,
                    Warns: [
                        {
                            moderator: message.author.tag,
                            reason: reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.tag,
                    reason: reason
                }
                data.Warns.push(obj)
            }
            data.save()
        })

        try {
            member.send(`You have been warned at **${message.guild.name}** for the reason **${reason}**`)
        } catch(err) {
            return message.channel.send(`Warned \`${member.user.tag}\``);
        }

        message.channel.send(`Warned \`${member.user.tag}\``)

        if (!logChannel) {
            return;
        } else  {
            return logChannel.send(
                new MessageEmbed()
                .setTitle(`Warn | ${member.user.username}`)
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