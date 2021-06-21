const {
    MessageEmbed
} = require('discord.js');
const Guild = require('../../models/Guild')

module.exports = {
    name: 'purge',
    category: 'Moderation',
    description: `Delete a number of messages from a channel.`,
    run: async (client, message, args) => {
        const db = await Guild.findOne({
            GuildID: message.guild.id
        }, async (err, guild) => { if (!guild) return; })

        const logchannel = await message.guild.channels.cache.get(db.LogsChannelID);

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Purge')
                .setDescription(`${message.author}, You don't have permissions for this command (\`MANAGE_MESSAGE\`)`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                })))

        if (!args[0]) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Purge')
                .setDescription(`${message.author}, You need to enter the amount to delete.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                })))

        const ToDelete = Number(args[0]);

        if (isNaN(ToDelete)) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Purge')
                .setDescription(`${message.author}, Gosh! That is not a valid number.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                })))


        if (!ToDelete || ToDelete < 1 || ToDelete > 99) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Purge')
                .setDescription(`${message.author}, You've gone over the limit and the limt is 1 to 100.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                })))

        const messagesFetch = await message.channel.messages.fetch({
            limit: ToDelete
        });


        try {
            await message.channel.bulkDelete(messagesFetch)
              .then(messages => message.channel.send(`<:BotTick:763459632077078548> Purged ${messages.size} messages.`))

            if (!logchannel) {
                return;
            } else {
                logchannel.send(
                    new MessageEmbed()
                        .setTitle(`Purge | ${message.author.username}`)
                        .setDescription(`Offender: ${message.author.tag} (${message.author.id})\n Channel: <#${message.channel.id}>\n Amount: ${args[0]}`)
                        .setTimestamp()
                        .setColor('e35962')
                        .setFooter(`ID: ${message.author.id}`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                )
            }
        } catch (err) {
            message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Purge')
                    .setDescription(`${message.author}, Something went wrong rerun the command. ${err}`)
                    .setColor('e35962')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
            })))
        }
    }
}