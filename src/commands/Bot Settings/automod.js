const { MessageEmbed } = require('discord.js')
const Mod = require('../../models/Automod')

module.exports = {
    name: 'automod',
    category: 'Bot Settings',
    description: `To see what is enable or disable and enable and disable functions via this command.`,
    run: async (client, message, args) => {
        const search = args[0]


        if (!args[0]) {
            const db = await Mod.findOne({
                GuildID: message.guild.id
            }, async (err, guild) => {
                if (!guild) {
                    const autoMod = await new Mod({
                        GuildID: message.guild.id,
                        AntiLink: 'Disabled',
                        AntiSpam: 'Disabled',
                        AntiSwear: 'Disabled',
                    })

                    autoMod.save()
                }
            })

            let AntilLinkon = ' '
            let AntilSpamon = ' '
            let AntilSwearon = ' '

            try {
                if (db.AntiLink !== 'enabled') AntilLinkon = '<:OffSetting:837710592188874786> Disabled'

                if (db.AntiSpam !== 'enabled') AntilSpamon = '<:OffSetting:837710592188874786> Disabled (In bata)'

                if (db.AntiSwear !== 'enabled') AntilSwearon = '<:OffSetting:837710592188874786> Disabled'

                if (db.AntiLink == 'enabled') AntilLinkon = '<:OnSetting:837710592671612978> Enabled'

                if (db.AntiSpam == 'enabled') AntilSpamon = '<:OnSetting:837710592671612978> Enabled (In bata)'

                if (db.AntiSwear == 'enabled') AntilSwearon = '<:OnSetting:837710592671612978> Enabled'

            } catch (err) {
                return message.channel.send(
                    new MessageEmbed()
                        .setTitle('Bubbly Automod')
                        .setDescription(`Something went wrong with the database rerun the command.`)
                        .setColor('e35962')
                        .setThumbnail(message.guild.iconURL())
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                )
            }

           return message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Automod')
                    .setDescription(`To enable an option run the command b!automod enable (Name) Or to disable an option run the command b!automod disable (Name).`)
                    .addField('Anti Link', AntilLinkon, true)
                    .addField('Anti Spam', AntilSpamon, true)
                    .addField('Anti Swear', AntilSwearon, true)
                    .addField('‎‎‏‏‎ ‎', '‏‏‎ ‎', true)
                    .addField('‎‎‏‏‎More coming soon.', '‏‏‎ ‎', true)
                    .addField('‎‎‏‏‎ ‎', '‏‏‎ ‎', true)
                    .setColor('e35962')
                    .setThumbnail(message.guild.iconURL())
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
            )
        }

        if (search.toLowerCase().startsWith('enable')) {
            const search2 = args.slice(1).join(" ")

            if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Automod')
                    .setDescription(`${message.author}, You don't have permsions for this command (\`ADMINISTRATOR\`)`)
                    .setColor('e35962')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
            )

            if (search2.toLowerCase().startsWith('anti link')) {
                await Mod.findOne({
                    GuildID: message.guild.id
                }, async (err, guild) => {
                    if (!guild) {
                        const autoMod = await new Mod({
                            GuildID: message.guild.id,
                            AntiLink: 'enabled',
                            AntiSpam: 'Disabled',
                            AntiSwear: 'Disabled',
                        })

                        autoMod.save()
                    } else {
                        guild.updateOne({
                            AntiLink: 'enabled',
                        }).then(result => console.log(result))
                            .catch(err => console.error(err));

                        message.react('👍')
                    }
                })
            }

            if (search2.toLowerCase().startsWith('anti spam')) {
                await Mod.findOne({
                    GuildID: message.guild.id
                }, async (err, guild) => {
                    if (!guild) {
                        const autoMod = await new Mod({
                            GuildID: message.guild.id,
                            AntiLink: 'Disabled',
                            AntiSpam: 'enabled',
                            AntiSwear: 'Disabled',
                        })

                        autoMod.save()
                    } else {
                        guild.updateOne({
                            AntiSpam: 'enabled',
                        }).then(result => console.log(result))
                            .catch(err => console.error(err));

                        message.react('👍')
                    }
                })
            }

            if (search2.toLowerCase().startsWith('anti swear')) {
                await Mod.findOne({
                    GuildID: message.guild.id
                }, async (err, guild) => {
                    if (!guild) {
                        const autoMod = await new Mod({
                            GuildID: message.guild.id,
                            AntiLink: 'Disabled',
                            AntiSpam: 'Disabled',
                            AntiSwear: 'enabled',
                        })

                        autoMod.save()
                    } else {
                        guild.updateOne({
                            AntiSwear: 'enabled',
                        }).then(result => console.log(result))
                            .catch(err => console.error(err));

                        message.react('👍')
                    }
                })
            }

            if (!search) return message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Music')
                    .setDescription('What do want to enable? Pick one of these options.\n\n `b!automod enable Anti Link`\n\n **or** \n\n `b!automod enable Anti Spam`\n\n **or**\n\n `b!automod enable Anti Swear`')
                    .setColor('e35962')
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
            )
        }

        if (search.toLowerCase().startsWith('disable')) {

            const search2 = args.slice(1).join(" ")

            if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Automod')
                    .setDescription(`${message.author}, You don't have permsions for this command (\`ADMINISTRATOR\`)`)
                    .setColor('e35962')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
            )

            if (search2.toLowerCase().startsWith('Anti Link')) {
                await Mod.findOne({
                    GuildID: message.guild.id
                }, async (err, guild) => {
                    if (!guild) {
                        const autoMod = await new Mod({
                            GuildID: message.guild.id,
                            AntiLink: 'Disabled',
                            AntiSpam: 'Disabled',
                            AntiSwear: 'Disabled',
                        })

                        autoMod.save()
                    }
                    await guild.updateOne({
                        AntiLink: 'Disabled'
                    })

                    message.react('👍')
                })
            }

            if (search2.toLowerCase().startsWith('Anti Spam')) {
                await Mod.findOne({
                    GuildID: message.guild.id
                }, async (err, guild) => {
                    if (!guild) {
                        const autoMod = await new Mod({
                            GuildID: message.guild.id,
                            AntiLink: 'Disabled',
                            AntiSpam: 'Disabled',
                            AntiSwear: 'Disabled',
                        })

                        autoMod.save()
                    } else {
                        await guild.updateOne({
                            AntiSpam: 'Disabled',
                        })

                        message.react('👍')
                    }
                })
            }

            if (search2.toLowerCase().startsWith('Anti Swear')) {
                await Mod.findOne({
                    GuildID: message.guild.id
                }, async (err, guild) => {
                    if (!guild) {
                        const autoMod = await new Mod({
                            GuildID: message.guild.id,
                            AntiLink: 'Disabled',
                            AntiSpam: 'Disabled',
                            AntiSwear: 'Disabled',
                        })

                        autoMod.save()
                    } else {
                        await guild.updateOne({
                            AntiSwear: 'Disabled',
                        })

                        message.react('👍')
                    }
                })
            }

            if (!search2) return message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Music')
                    .setDescription('What do want to enable? Pick one of these options.\n\n `b!automod enable Anti Link`\n\n **or** \n\n `b!automod enable Anti Spam`\n\n **or**\n\n `b!automod enable Anti Swear`')
                    .setColor('e35962')
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
            )
        }
    },
}