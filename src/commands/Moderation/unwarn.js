const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/Guild')
const warns = require('../../models/Warns')

module.exports = {
    name: 'unwarn',
    category: 'Moderation',
    description: `Unwarn's the member who is mentioned`,
    run: async (client, message, args) => {
        const db = await Guild.findOne({
            GuildID: message.guild.id
        }, async (err, guild) => { if (!guild) return; })

        const logChannel = await message.guild.channels.cache.get(db.LogsChannelID);
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Unwarn')
                .setDescription(`${message.author}, You don't have permissions for this command (\`MANAGE_ROLES\`)`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        )

        if (!member) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Unwarn')
                .setDescription(`${message.author}, I can't find that member, Make sure to mention them. format: b!unwarn @user (warn number find by b!warnings)`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                })))

        if (!args[1]) return message.channel.send(
            new MessageEmbed()
            .setTitle('Bubbly Unwarn')
            .setDescription(`${message.author}, You must enter the warnid. format: b!unwarn @user (warnid)`)
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

            if (data) {
                try {
                    let number = parseInt(args[0]) - 1
                    data.Warns.splice(number, 1)
                    message.channel.send('``')
                    data.save()
                } catch (err) {
                    return message.channel.send(new MessageEmbed()
                        .setTitle('Bubbly Unwarn')
                        .setDescription(`${message.author}, Wait... You can't remove a warn if the warn is not real.`)
                        .setColor('e35962')
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                            dynamic: true
                        })))
                }
            }

        })

        if (!logChannel) {
            return;
        } else  {
            return logChannel.send(
                new MessageEmbed()
                .setTitle(`Unwarn | ${member.user.username}`)
                .setDescription(`Offender: ${member.user.tag} (${member.user.id})\n Warning number: ${args[1]}\n Moderator: ${message.author}`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`ID: ${member.user.id}`, member.user.displayAvatarURL({
                    dynamic: true
                }))
            )
        }
    }
}