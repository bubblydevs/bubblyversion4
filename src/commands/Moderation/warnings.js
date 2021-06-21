const {
    MessageEmbed
} = require('discord.js');
const warns = require('../../models/Warns')

module.exports = {
    name: 'warnings',
    aliases: ['warns'],
    category: 'Moderation',
    description: `See how meny warnings a user has.`,
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        warns.findOne({
            GuildID: message.guild.id,
            User: member.user.id
        }, async (err, data) => {

            if (err) return message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Warnings')
                    .setDescription(`${message.author}, Something went wrong with the database rerun the command.`)
                    .setColor('e35962')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    })))

            if (!data) return message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Warnings')
                    .setDescription(`${message.author}, This user has no warnings.`)
                    .setColor('e35962')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
            )

            if (data) {
                message.channel.send(
                    new MessageEmbed()
                        .setTitle('Bubbly Warnings')
                        .setDescription(
                            data.Warns.map(
                                (w, i) => `\`${i + 1}\` - Reason: ${w.reason} Moderator: ${w.moderator}\n`
                            )
                        )
                        .setColor('e35962')
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                )
            }

        })
    }
}