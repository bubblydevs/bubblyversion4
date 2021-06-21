const Guild = require('../../models/Guild')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'prefix',
    category: 'Bot Settings',
    description: `To add a mute and remove a mute role.`,
    run: async (client, message, args) => {
        if (!args[0]) {
            return message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Prefix')
                    .setDescription('`view` **-** View all of the prefixes in the server example: `(p)prefix view`\n `add` **-** Add prefixes in this server example: `(p)prefix add !`')
                    .setColor('e35962')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
            )
        } else if (args[0].toLowerCase().startsWith('add')) {
            if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Prefix')
                    .setDescription(`${message.author}, You don't have permissions for this command (\`MANAGE_GUILD\`)`)
                    .setColor('e35962')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
            )
            const prefix = args.slice(1).join(" ")

            if (!prefix) return message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Prefix')
                    .setDescription(`${message.author}, The new prefix can't be blank`)
                    .setColor('e35962')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
            )

            const db = await Guild.findOne({
                GuildID: message.guild.id
            }, async (err, data) => {
                if (err) return message.channel.send(
                    new MessageEmbed()
                        .setTitle('Bubbly Prefix')
                        .setDescription(`${message.author}, Something went wrong.`)
                        .setColor('e35962')
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                )

                if (data) {
                    const obj = `${prefix}`

                    data.Preifx.push(obj)

                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Prefix')
                            .setDescription(`${message.author}, Added *${prefix}* to this server.`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    )
                }

                data.save()
            })


        } else if (args[0].toLowerCase().startsWith('view')) {
            const db = await Guild.findOne({
                GuildID: message.guild.id
            }, async (err, data) => {
                if (err) return message.channel.send(
                    new MessageEmbed()
                        .setTitle('Bubbly Prefix')
                        .setDescription(`${message.author}, Something went wrong.`)
                        .setColor('e35962')
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                )

                if (data) {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle(`Bubbly Prefixs (${data.Preifx.length})`)
                            .setDescription(
                                data.Preifx.map(
                                    (p, i) => `**${i + 1}** - ${p}`
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
        } else if (args[0].toLowerCase().startsWith('remove')) {
            if (!args) {
                new MessageEmbed()
                    .setTitle('Bubbly Prefix')
                    .setDescription(`${message.author}, You can't remove a prefix what is not even there. example: (p)prefix remove (prefix number)`)
                    .setColor('e35962')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
            }

            const db = await Guild.findOne({
                GuildID: message.guild.id
            }, async (err, data) => {
                if (err) return message.channel.send(
                    new MessageEmbed()
                        .setTitle('Bubbly Prefix')
                        .setDescription(`${message.author}, Something went wrong.`)
                        .setColor('e35962')
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                )

                if (data.Preifx.length === 1) {
                    return message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Prefix')
                            .setDescription(`${message.author}, You can not remove any more prefixs due to theres only 1 prefix left. To delete this prefix make a new prefix by **b!prefix add** and then you can remove this prefix.`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    )
                }

                return message.channel.send('soon.')
            })
        }
    },
}