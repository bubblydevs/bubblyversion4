const { MessageEmbed } = require('discord.js')
const Guild = require('../../models/Guild')

module.exports = {
    name: 'settings',
    category: 'Bot Settings',
    description: `To see what is enable or disable and enable and disable functions via this command.`,
    run: async (client, message, args) => {
        const search = args[0]

        if (!args[0]) {
            const db = await Guild.findOne({
                GuildID: message.guild.id
            }, async (err, guild) => {
                if (!guild) {
                    const autoMod = await new Guild({
                        GuildName: message.guild.name,
                        GuildID: message.guild.id,
                        Preifx: 'b!',
                        WelcomeChannelID: 'disabled',
                        CustomWelcomeText: 'disabled',
                        LogsChannelID: 'disabled',
                        AutoroleID: 'disabled',
                        MuteRoleID: 'disabled',
                    })

                    autoMod.save()
                }
            })

            let WelcomeChannl = ' '
            let CustomText = ' '
            let LogsChannel = ' '
            let Autorole = ' '
            let Muterole = ' '
            let Preifx = ' '

            try {
                if (db.WelcomeChannelID !== 'disabled') WelcomeChannl = `<:OnSetting:837710592671612978> Enabled (<#${db.WelcomeChannelID}>)`

                if (db.CustomWelcomeText !== 'disabled') CustomText = `<:OnSetting:837710592671612978> Enabled`

                if (db.LogsChannelID !== 'disabled') LogsChannel = `<:OnSetting:837710592671612978> Enabled (<#${db.LogsChannelID}>)`

                if (db.AutoroleID !== 'disabled') Autorole = `<:OnSetting:837710592671612978> Enabled (<@&${db.AutoroleID}>)`

                if (db.MuteRoleID !== 'disabled') Muterole = `<:OnSetting:837710592671612978> Enabled (<@&${db.MuteRoleID}>)`

                if (db.Preifx !== 'b!') Preifx = `<:OnSetting:837710592671612978> Enabled (${db.Preifx})`

                // Off

                if (db.WelcomeChannelID == 'disabled') WelcomeChannl = '<:OffSetting:837710592188874786> Disabled'

                if (db.CustomWelcomeText == 'disabled') CustomText = '<:OffSetting:837710592188874786> Disabled (Welcome Text up to Me)'

                if (db.LogsChannelID == 'disabled') LogsChannel = '<:OffSetting:837710592188874786> Disabled'

                if (db.AutoroleID == 'disabled') Autorole = `<:OffSetting:837710592188874786> Disabled`

                if (db.MuteRoleID == 'disabled') Muterole = `<:OffSetting:837710592188874786> Disabled (enable by the command \`b!muterole add\`)`

                if (db.Preifx == 'b!') Preifx = `<:OffSetting:837710592188874786> Disabled (enable by the command \`b!prefix\`)`

            } catch {
                return message.channel.send(
                    new MessageEmbed()
                        .setTitle('Bubbly Settings')
                        .setDescription(`Something went wrong with the database rerun the command.`)
                        .setColor('e35962')
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                )
            }

            return message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Settings')
                    .setDescription(`To enable an option run the command b!settings enable (Name) Or to disable an option run the command b!settings disable (Name).`)
                    .addField('Welcome System', WelcomeChannl, true)
                    .addField('Log System', LogsChannel, true)
                    .addField('Autorole System', Autorole, true)
                    .addField('Mute role', Muterole, true)
                    .addField('Welcome Description System', CustomText, true)
                    .addField('Custom Prefix', Preifx, true)
                    .setColor('e35962')
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
                    .setTitle('Bubbly Settings')
                    .setDescription(`${message.author}, You don't have permissions for this command (\`ADMINISTRATOR\`)`)
                    .setColor('e35962')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
            )

            if (search2.toLowerCase() == 'welcome system') {
                message.channel.send(
                    new MessageEmbed()
                        .setTitle('Bubbly Settings')
                        .setDescription(`${message.author}, Before you enable this setting could you mention the welcome channel under this message?`)
                        .setColor('e35962')
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                )

                const filter = m => m.author.id === message.author.id;
                const collector = message.channel.createMessageCollector(filter, {
                    max: '1',
                    maxMatches: '1',
                    time: '120000',
                    errors: ['time']
                })

                try {
                    collector.on('collect', async m => {
                        if (m.content.toLowerCase() === 'cancel') {
                            message.react('👍')
                            return;
                        }

                        const channel = await m.mentions.channels.first();

                        if (!channel) return message.channel.send(
                            new MessageEmbed()
                                .setTitle('Bubbly Settings')
                                .setDescription(`${message.author}, I did not find that channel redo this command to enable this setting.`)
                                .setColor('e35962')
                                .setTimestamp()
                                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                    dynamic: true
                                }))
                        )

                        try {
                            const db = await Guild.findOne({
                                GuildID: message.guild.id
                            }, async (err, guild) => {
                                if (!guild) {
                                    const autoMod = await new Guild({
                                        GuildName: message.guild.name,
                                        GuildID: message.guild.id,
                                        Preifx: 'b!',
                                        WelcomeChannelID: 'disabled',
                                        CustomWelcomeText: 'disabled',
                                        LogsChannelID: 'disabled',
                                        AutoroleID: 'disabled',
                                        MuteRoleID: 'disabled',
                                    })

                                    autoMod.save()
                                }
                            })

                            db.updateOne({
                                WelcomeChannelID: `${channel.id}`,
                            }).then(message.channel.send(
                                new MessageEmbed()
                                    .setTitle('Bubbly Settings')
                                    .setDescription(`${message.author}, The Welcome System is now **Enabled**`)
                                    .setColor('e35962')
                                    .setTimestamp()
                                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                        dynamic: true
                                    }))
                            ))
                        } catch (err) {
                            message.channel.send(
                                new MessageEmbed()
                                    .setTitle('Bubbly Settings')
                                    .setDescription(`${message.author}, Something went wrong while saving this data ${err}`)
                                    .setColor('e35962')
                                    .setTimestamp()
                                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                        dynamic: true
                                    }))
                            )
                        }
                    })

                } catch {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, You have ran out of time redo this command again to enable this setting.`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))

                    )
                }

            } else if (search2.toLowerCase() == 'welcome') {
                message.channel.send(
                    new MessageEmbed()
                        .setTitle('Bubbly Settings')
                        .setDescription(`${message.author}, Before you enable this setting could you mention the welcome channel under this message?`)
                        .setColor('e35962')
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                )

                const filter = m => m.author.id === message.author.id;
                const collector = message.channel.createMessageCollector(filter, {
                    max: '1',
                    maxMatches: '1',
                    time: '120000',
                    errors: ['time']
                })

                try {
                    collector.on('collect', async m => {
                        if (m.content.toLowerCase() === 'cancel') {
                            message.react('👍')
                            return;
                        }

                        const channel = await m.mentions.channels.first();

                        if (!channel) return message.channel.send(
                            new MessageEmbed()
                                .setTitle('Bubbly Settings')
                                .setDescription(`${message.author}, I did not find that channel redo this command to enable this setting.`)
                                .setColor('e35962')
                                .setTimestamp()
                                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                    dynamic: true
                                }))
                        )

                        try {
                            const db = await Guild.findOne({
                                GuildID: message.guild.id
                            }, async (err, guild) => {
                                if (!guild) {
                                    const autoMod = await new Guild({
                                        GuildName: message.guild.name,
                                        GuildID: message.guild.id,
                                        Preifx: 'b!',
                                        WelcomeChannelID: 'disabled',
                                        CustomWelcomeText: 'disabled',
                                        LogsChannelID: 'disabled',
                                        AutoroleID: 'disabled',
                                        MuteRoleID: 'disabled',
                                    })

                                    autoMod.save()
                                }
                            })

                            db.updateOne({
                                WelcomeChannelID: `${channel.id}`,
                            }).then(message.channel.send(
                                new MessageEmbed()
                                    .setTitle('Bubbly Settings')
                                    .setDescription(`${message.author}, The Welcome System is now **Enabled**`)
                                    .setColor('e35962')
                                    .setTimestamp()
                                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                        dynamic: true
                                    }))
                            ))
                        } catch (err) {
                            message.channel.send(
                                new MessageEmbed()
                                    .setTitle('Bubbly Settings')
                                    .setDescription(`${message.author}, Something went wrong while saving this data ${err}`)
                                    .setColor('e35962')
                                    .setTimestamp()
                                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                        dynamic: true
                                    }))
                            )
                        }
                    })

                } catch {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, You have ran out of time redo this command again to enable this setting.`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))

                    )
                }

            } else if (search2.toLowerCase() == 'log system') {
                message.channel.send(
                    new MessageEmbed()
                        .setTitle('Bubbly Settings')
                        .setDescription(`${message.author}, Before you enable this setting could you mention the logs channel under this message?`)
                        .setColor('e35962')
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                )

                const filter = m => m.author.id === message.author.id;
                const collector = message.channel.createMessageCollector(filter, {
                    max: '1',
                    maxMatches: '1',
                    time: '120000',
                    errors: ['time']
                })

                try {
                    collector.on('collect', async m => {
                        if (m.content.toLowerCase() === 'cancel') {
                            message.react('👍')
                            return;
                        }

                        const channel = await m.mentions.channels.first();

                        if (!channel) return message.channel.send(
                            new MessageEmbed()
                                .setTitle('Bubbly Settings')
                                .setDescription(`${message.author}, I did not find that channel redo this command to enable this setting.`)
                                .setColor('e35962')
                                .setTimestamp()
                                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                    dynamic: true
                                }))
                        )

                        try {
                            const db = await Guild.findOne({
                                GuildID: message.guild.id
                            }, async (err, guild) => {
                                if (!guild) {
                                    const autoMod = await new Guild({
                                        GuildName: message.guild.name,
                                        GuildID: message.guild.id,
                                        Preifx: 'b!',
                                        WelcomeChannelID: 'disabled',
                                        CustomWelcomeText: 'disabled',
                                        LogsChannelID: 'disabled',
                                        AutoroleID: 'disabled',
                                        MuteRoleID: 'disabled',
                                    })

                                    autoMod.save()
                                }
                            })

                            channel.send(
                                new MessageEmbed()
                                    .setTitle('Bubbly Logs')
                                    .setDescription(`<:BotTick:763459632077078548> Now the logs will send here.`)
                                    .setColor('e35962')
                                    .setTimestamp()
                                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                        dynamic: true
                                    }))
                            )

                            db.updateOne({
                                LogsChannelID: `${channel.id}`,
                            }).then(message.channel.send(
                                new MessageEmbed()
                                    .setTitle('Bubbly Settings')
                                    .setDescription(`${message.author}, The Log System is now **Enabled**`)
                                    .setColor('e35962')
                                    .setTimestamp()
                                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                        dynamic: true
                                    }))
                            ))
                        } catch (err) {
                            message.channel.send(
                                new MessageEmbed()
                                    .setTitle('Bubbly Settings')
                                    .setDescription(`${message.author}, Something went wrong while saving this data ${err}`)
                                    .setColor('e35962')
                                    .setTimestamp()
                                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                        dynamic: true
                                    }))
                            )
                        }
                    })

                } catch {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, You have ran out of time redo this command again to enable this setting.`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))

                    )
                }

            } else if (search2.toLowerCase() == 'log') {
                message.channel.send(
                    new MessageEmbed()
                        .setTitle('Bubbly Settings')
                        .setDescription(`${message.author}, Before you enable this setting could you mention the logs channel under this message?`)
                        .setColor('e35962')
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                )

                const filter = m => m.author.id === message.author.id;
                const collector = message.channel.createMessageCollector(filter, {
                    max: '1',
                    maxMatches: '1',
                    time: '120000',
                    errors: ['time']
                })

                try {
                    collector.on('collect', async m => {
                        if (m.content.toLowerCase() === 'cancel') {
                            message.react('👍')
                            return;
                        }

                        const channel = await m.mentions.channels.first();

                        if (!channel) return message.channel.send(
                            new MessageEmbed()
                                .setTitle('Bubbly Settings')
                                .setDescription(`${message.author}, I did not find that channel redo this command to enable this setting.`)
                                .setColor('e35962')
                                .setTimestamp()
                                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                    dynamic: true
                                }))
                        )

                        channel.send(
                            new MessageEmbed()
                                .setTitle('Bubbly Logs')
                                .setDescription(`<:BotTick:763459632077078548> Now the logs will send here.`)
                                .setColor('e35962')
                                .setTimestamp()
                                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                    dynamic: true
                                }))
                        )

                        try {
                            const db = await Guild.findOne({
                                GuildID: message.guild.id
                            }, async (err, guild) => {
                                if (!guild) {
                                    const autoMod = await new Guild({
                                        GuildName: message.guild.name,
                                        GuildID: message.guild.id,
                                        Preifx: 'b!',
                                        WelcomeChannelID: 'disabled',
                                        CustomWelcomeText: 'disabled',
                                        LogsChannelID: 'disabled',
                                        AutoroleID: 'disabled',
                                        MuteRoleID: 'disabled',
                                    })

                                    autoMod.save()
                                }
                            })

                            db.updateOne({
                                LogsChannelID: `${channel.id}`,
                            }).then(message.channel.send(
                                new MessageEmbed()
                                    .setTitle('Bubbly Settings')
                                    .setDescription(`${message.author}, The Log System is now **Enabled**`)
                                    .setColor('e35962')
                                    .setTimestamp()
                                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                        dynamic: true
                                    }))
                            ))
                        } catch (err) {
                            message.channel.send(
                                new MessageEmbed()
                                    .setTitle('Bubbly Settings')
                                    .setDescription(`${message.author}, Something went wrong while saving this data ${err}`)
                                    .setColor('e35962')
                                    .setTimestamp()
                                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                        dynamic: true
                                    }))
                            )
                        }
                    })

                } catch {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, You have ran out of time redo this command again to enable this setting.`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))

                    )
                }

            } else if (search2.toLowerCase() == 'autorole system') {
                message.channel.send(
                    new MessageEmbed()
                        .setTitle('Bubbly Settings')
                        .setDescription(`${message.author}, Before you enable this setting could you mention the role under this message?`)
                        .setColor('e35962')
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                )

                const filter = m => m.author.id === message.author.id;
                const collector = message.channel.createMessageCollector(filter, {
                    max: '1',
                    maxMatches: '1',
                    time: '120000',
                    errors: ['time']
                })

                try {
                    collector.on('collect', async m => {
                        if (m.content.toLowerCase() === 'cancel') {
                            message.react('👍')
                            return;
                        }

                        const channel = await m.mentions.roles.first() || m.guild.roles.cache.get(m.content);

                        if (!channel) return message.channel.send(
                            new MessageEmbed()
                                .setTitle('Bubbly Settings')
                                .setDescription(`${message.author}, I did not find that channel redo this command to enable this setting.`)
                                .setColor('e35962')
                                .setTimestamp()
                                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                    dynamic: true
                                }))
                        )

                        try {
                            const db = await Guild.findOne({
                                GuildID: message.guild.id
                            }, async (err, guild) => {
                                if (!guild) {
                                    const autoMod = await new Guild({
                                        GuildName: message.guild.name,
                                        GuildID: message.guild.id,
                                        Preifx: 'b!',
                                        WelcomeChannelID: 'disabled',
                                        CustomWelcomeText: 'disabled',
                                        LogsChannelID: 'disabled',
                                        AutoroleID: 'disabled',
                                        MuteRoleID: 'disabled',
                                    })

                                    autoMod.save()
                                }
                            })

                            db.updateOne({
                                AutoroleID: `${channel.id}`,
                            }).then(message.channel.send(
                                new MessageEmbed()
                                    .setTitle('Bubbly Settings')
                                    .setDescription(`${message.author}, The Autorole System is now **Enabled**`)
                                    .setColor('e35962')
                                    .setTimestamp()
                                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                        dynamic: true
                                    }))
                            ))
                        } catch (err) {
                            message.channel.send(
                                new MessageEmbed()
                                    .setTitle('Bubbly Settings')
                                    .setDescription(`${message.author}, Something went wrong while saving this data ${err}`)
                                    .setColor('e35962')
                                    .setTimestamp()
                                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                        dynamic: true
                                    }))
                            )
                        }
                    })

                } catch {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, You have ran out of time redo this command again to enable this setting.`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))

                    )
                }

            } else if (search2.toLowerCase() == 'autorole') {
                message.channel.send(
                    new MessageEmbed()
                        .setTitle('Bubbly Settings')
                        .setDescription(`${message.author}, Before you enable this setting could you mention the role under this message?`)
                        .setColor('e35962')
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                )

                const filter = m => m.author.id === message.author.id;
                const collector = message.channel.createMessageCollector(filter, {
                    max: '1',
                    maxMatches: '1',
                    time: '120000',
                    errors: ['time']
                })

                try {
                    collector.on('collect', async m => {
                        if (m.content.toLowerCase() === 'cancel') {
                            message.react('👍')
                            return;
                        }

                        const channel = await m.mentions.roles.first() || m.guild.roles.cache.get(m.content);

                        if (!channel) return message.channel.send(
                            new MessageEmbed()
                                .setTitle('Bubbly Settings')
                                .setDescription(`${message.author}, I did not find that channel redo this command to enable this setting.`)
                                .setColor('e35962')
                                .setTimestamp()
                                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                    dynamic: true
                                }))
                        )

                        try {
                            const db = await Guild.findOne({
                                GuildID: message.guild.id
                            }, async (err, guild) => {
                                if (!guild) {
                                    const autoMod = await new Guild({
                                        GuildName: message.guild.name,
                                        GuildID: message.guild.id,
                                        Preifx: 'b!',
                                        WelcomeChannelID: 'disabled',
                                        CustomWelcomeText: 'disabled',
                                        LogsChannelID: 'disabled',
                                        AutoroleID: 'disabled',
                                        MuteRoleID: 'disabled',
                                    })

                                    autoMod.save()
                                }
                            })

                            db.updateOne({
                                AutoroleID: `${channel.id}`,
                            }).then(message.channel.send(
                                new MessageEmbed()
                                    .setTitle('Bubbly Settings')
                                    .setDescription(`${message.author}, The Autorole System is now **Enabled**`)
                                    .setColor('e35962')
                                    .setTimestamp()
                                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                        dynamic: true
                                    }))
                            ))
                        } catch (err) {
                            message.channel.send(
                                new MessageEmbed()
                                    .setTitle('Bubbly Settings')
                                    .setDescription(`${message.author}, Something went wrong while saving this data ${err}`)
                                    .setColor('e35962')
                                    .setTimestamp()
                                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                        dynamic: true
                                    }))
                            )
                        }
                    })

                } catch {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, You have ran out of time redo this command again to enable this setting.`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))

                    )
                }

            } else if (search2.toLowerCase() == 'welcome description system') {
                message.channel.send(
                    new MessageEmbed()
                        .setTitle('Bubbly Settings')
                        .setDescription(`${message.author}, Before you enable this setting could you enter the description under this message and make sure to use {user} to mention the user and want to mention the server name just use {guild}!`)
                        .setColor('e35962')
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                )

                const filter = m => m.author.id === message.author.id;
                const collector = message.channel.createMessageCollector(filter, {
                    max: '1',
                    maxMatches: '1',
                    time: '120000',
                    errors: ['time']
                })

                try {
                    collector.on('collect', async m => {
                        if (m.content.toLowerCase() === 'cancel') {
                            message.react('👍')
                            return;
                        }

                        const channel = m.content


                        try {
                            const db = await Guild.findOne({
                                GuildID: message.guild.id
                            }, async (err, guild) => {
                                if (!guild) {
                                    const autoMod = await new Guild({
                                        GuildName: message.guild.name,
                                        GuildID: message.guild.id,
                                        Preifx: 'b!',
                                        WelcomeChannelID: 'disabled',
                                        CustomWelcomeText: 'disabled',
                                        LogsChannelID: 'disabled',
                                        AutoroleID: 'disabled',
                                        MuteRoleID: 'disabled',
                                    })

                                    autoMod.save()
                                }
                            })

                            db.updateOne({
                                CustomWelcomeText: `${channel}`,
                            }).then(message.channel.send(
                                new MessageEmbed()
                                    .setTitle('Bubbly Settings')
                                    .setDescription(`${message.author}, The Welcome Description System is now **Enabled**`)
                                    .setColor('e35962')
                                    .setTimestamp()
                                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                        dynamic: true
                                    }))
                            ))
                        } catch (err) {
                            message.channel.send(
                                new MessageEmbed()
                                    .setTitle('Bubbly Settings')
                                    .setDescription(`${message.author}, Something went wrong while saving this data ${err}`)
                                    .setColor('e35962')
                                    .setTimestamp()
                                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                        dynamic: true
                                    }))
                            )
                        }
                    })

                } catch {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, You have ran out of time redo this command again to enable this setting.`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))

                    )
                }

            } else if (search2.toLowerCase() == 'welcome description') {
                message.channel.send(
                    new MessageEmbed()
                        .setTitle('Bubbly Settings')
                        .setDescription(`${message.author}, Before you enable this setting could you enter the description under this message and make sure to use {user} to mention the user and want to mention the server name just use {guild}!`)
                        .setColor('e35962')
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                )

                const filter = m => m.author.id === message.author.id;
                const collector = message.channel.createMessageCollector(filter, {
                    max: '1',
                    maxMatches: '1',
                    time: '120000',
                    errors: ['time']
                })

                try {
                    collector.on('collect', async m => {
                        if (m.content.toLowerCase() === 'cancel') {
                            message.react('👍')
                            return;
                        }

                        const channel = m.content


                        try {
                            const db = await Guild.findOne({
                                GuildID: message.guild.id
                            }, async (err, guild) => {
                                if (!guild) {
                                    const autoMod = await new Guild({
                                        GuildName: message.guild.name,
                                        GuildID: message.guild.id,
                                        Preifx: 'b!',
                                        WelcomeChannelID: 'disabled',
                                        CustomWelcomeText: 'disabled',
                                        LogsChannelID: 'disabled',
                                        AutoroleID: 'disabled',
                                        MuteRoleID: 'disabled',
                                    })

                                    autoMod.save()
                                }
                            })

                            db.updateOne({
                                CustomWelcomeText: `${channel}`,
                            }).then(message.channel.send(
                                new MessageEmbed()
                                    .setTitle('Bubbly Settings')
                                    .setDescription(`${message.author}, The Welcome Description System is now **Enabled**`)
                                    .setColor('e35962')
                                    .setTimestamp()
                                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                        dynamic: true
                                    }))
                            ))
                        } catch (err) {
                            message.channel.send(
                                new MessageEmbed()
                                    .setTitle('Bubbly Settings')
                                    .setDescription(`${message.author}, Something went wrong while saving this data ${err}`)
                                    .setColor('e35962')
                                    .setTimestamp()
                                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                        dynamic: true
                                    }))
                            )
                        }
                    })

                } catch {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, You have ran out of time redo this command again to enable this setting.`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))

                    )
                }

            } else if (search2.toLowerCase() == 'welcome text') {
                message.channel.send(
                    new MessageEmbed()
                        .setTitle('Bubbly Settings')
                        .setDescription(`${message.author}, Before you enable this setting could you enter the description under this message and make sure to use {user} to mention the user and want to mention the server name just use {guild}!`)
                        .setColor('e35962')
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                )

                const filter = m => m.author.id === message.author.id;
                const collector = message.channel.createMessageCollector(filter, {
                    max: '1',
                    maxMatches: '1',
                    time: '120000',
                    errors: ['time']
                })

                try {
                    collector.on('collect', async m => {
                        if (m.content.toLowerCase() === 'cancel') {
                            message.react('👍')
                            return;
                        }

                        const channel = m.content


                        try {
                            const db = await Guild.findOne({
                                GuildID: message.guild.id
                            }, async (err, guild) => {
                                if (!guild) {
                                    const autoMod = await new Guild({
                                        GuildName: message.guild.name,
                                        GuildID: message.guild.id,
                                        Preifx: 'b!',
                                        WelcomeChannelID: 'disabled',
                                        CustomWelcomeText: 'disabled',
                                        LogsChannelID: 'disabled',
                                        AutoroleID: 'disabled',
                                        MuteRoleID: 'disabled',
                                    })

                                    autoMod.save()
                                }
                            })

                            db.updateOne({
                                CustomWelcomeText: `${channel}`,
                            }).then(message.channel.send(
                                new MessageEmbed()
                                    .setTitle('Bubbly Settings')
                                    .setDescription(`${message.author}, The Welcome Description System is now **Enabled**`)
                                    .setColor('e35962')
                                    .setTimestamp()
                                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                        dynamic: true
                                    }))
                            ))
                        } catch (err) {
                            message.channel.send(
                                new MessageEmbed()
                                    .setTitle('Bubbly Settings')
                                    .setDescription(`${message.author}, Something went wrong while saving this data ${err}`)
                                    .setColor('e35962')
                                    .setTimestamp()
                                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                        dynamic: true
                                    }))
                            )
                        }
                    })

                } catch {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, You have ran out of time redo this command again to enable this setting.`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))

                    )
                }

            } else {
                return message.channel.send(
                    new MessageEmbed()
                        .setTitle('Bubbly Settings')
                        .setDescription('I don\'t see that option. Here are some of the options.\n\n `b!settings enable Welcome System`\n `b!settings enable Log System`\n `b!settings enable Autorole System`\n\n See the rest of  the options by b!settings.')
                        .setColor('e35962')
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                )
            }
        }

        if (search.toLowerCase().startsWith('disable')) {
            const search2 = args.slice(1).join(" ")

            if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Settings')
                    .setDescription(`${message.author}, You don't have permissions for this command (\`ADMINISTRATOR\`)`)
                    .setColor('e35962')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
            )

            if (search2.toLowerCase() == 'welcome system') {
                try {
                    const db = await Guild.findOne({
                        GuildID: message.guild.id
                    }, async (err, guild) => {
                        if (!guild) {
                            const autoMod = await new Guild({
                                GuildName: message.guild.name,
                                GuildID: message.guild.id,
                                Preifx: 'b!',
                                WelcomeChannelID: 'disabled',
                                CustomWelcomeText: 'disabled',
                                LogsChannelID: 'disabled',
                                AutoroleID: 'disabled',
                                MuteRoleID: 'disabled',
                            })

                            autoMod.save()
                        }
                    })

                    db.updateOne({
                        WelcomeChannelID: 'disabled',
                    }).then(message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, The Welcome System is now **disabled**`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    ))
                } catch (err) {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, Something went wrong while saving this data ${err}`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    )
                }

            } else if (search2.toLowerCase() == 'welcome') {
                try {
                    const db = await Guild.findOne({
                        GuildID: message.guild.id
                    }, async (err, guild) => {
                        if (!guild) {
                            const autoMod = await new Guild({
                                GuildName: message.guild.name,
                                GuildID: message.guild.id,
                                Preifx: 'b!',
                                WelcomeChannelID: 'disabled',
                                CustomWelcomeText: 'disabled',
                                LogsChannelID: 'disabled',
                                AutoroleID: 'disabled',
                                MuteRoleID: 'disabled',
                            })

                            autoMod.save()
                        }
                    })

                    db.updateOne({
                        WelcomeChannelID: 'disabled',
                    }).then(message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, The Welcome System is now **disabled**`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    ))
                } catch (err) {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, Something went wrong while saving this data ${err}`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    )
                }

            } else if (search2.toLowerCase() == 'log system') {
                try {
                    const db = await Guild.findOne({
                        GuildID: message.guild.id
                    }, async (err, guild) => {
                        if (!guild) {
                            const autoMod = await new Guild({
                                GuildName: message.guild.name,
                                GuildID: message.guild.id,
                                Preifx: 'b!',
                                WelcomeChannelID: 'disabled',
                                CustomWelcomeText: 'disabled',
                                LogsChannelID: 'disabled',
                                AutoroleID: 'disabled',
                                MuteRoleID: 'disabled',
                            })

                            autoMod.save()
                        }
                    })

                    db.updateOne({
                        LogsChannelID: 'disabled',
                    }).then(message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, The Log System is now **disabled**`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    ))
                } catch (err) {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, Something went wrong while saving this data ${err}`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    )
                }

            } else if (search2.toLowerCase() == 'log') {
                try {
                    const db = await Guild.findOne({
                        GuildID: message.guild.id
                    }, async (err, guild) => {
                        if (!guild) {
                            const autoMod = await new Guild({
                                GuildName: message.guild.name,
                                GuildID: message.guild.id,
                                Preifx: 'b!',
                                WelcomeChannelID: 'disabled',
                                CustomWelcomeText: 'disabled',
                                LogsChannelID: 'disabled',
                                AutoroleID: 'disabled',
                                MuteRoleID: 'disabled',
                            })

                            autoMod.save()
                        }
                    })

                    db.updateOne({
                        LogsChannelID: 'disabled',
                    }).then(message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, The Log System is now **disabled**`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    ))
                } catch (err) {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, Something went wrong while saving this data ${err}`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    )
                }

            } else if (search2.toLowerCase() == 'autorole system') {
                try {
                    const db = await Guild.findOne({
                        GuildID: message.guild.id
                    }, async (err, guild) => {
                        if (!guild) {
                            const autoMod = await new Guild({
                                GuildName: message.guild.name,
                                GuildID: message.guild.id,
                                Preifx: 'b!',
                                WelcomeChannelID: 'disabled',
                                CustomWelcomeText: 'disabled',
                                LogsChannelID: 'disabled',
                                AutoroleID: 'disabled',
                                MuteRoleID: 'disabled',
                            })

                            autoMod.save()
                        }
                    })

                    db.updateOne({
                        AutoroleID: 'disabled',
                    }).then(message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, The Autorole System is now **disabled**`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    ))
                } catch (err) {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, Something went wrong while saving this data ${err}`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    )
                }
            } else if (search2.toLowerCase() == 'autorole') {
                try {
                    const db = await Guild.findOne({
                        GuildID: message.guild.id
                    }, async (err, guild) => {
                        if (!guild) {
                            const autoMod = await new Guild({
                                GuildName: message.guild.name,
                                GuildID: message.guild.id,
                                Preifx: 'b!',
                                WelcomeChannelID: 'disabled',
                                CustomWelcomeText: 'disabled',
                                LogsChannelID: 'disabled',
                                AutoroleID: 'disabled',
                                MuteRoleID: 'disabled',
                            })

                            autoMod.save()
                        }
                    })

                    db.updateOne({
                        AutoroleID: 'disabled',
                    }).then(message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, The Autorole System is now **disabled**`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    ))
                } catch (err) {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, Something went wrong while saving this data ${err}`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    )
                }
            } else if (search2.toLowerCase() == 'welcome description system') {
                try {
                    const db = await Guild.findOne({
                        GuildID: message.guild.id
                    }, async (err, guild) => {
                        if (!guild) {
                            const autoMod = await new Guild({
                                GuildName: message.guild.name,
                                GuildID: message.guild.id,
                                Preifx: 'b!',
                                WelcomeChannelID: 'disabled',
                                CustomWelcomeText: 'disabled',
                                LogsChannelID: 'disabled',
                                AutoroleID: 'disabled',
                                MuteRoleID: 'disabled',
                            })

                            autoMod.save()
                        }
                    })

                    db.updateOne({
                        CustomWelcomeText: 'disabled',
                    }).then(message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, The Welcome Description System is now **disabled**`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    ))
                } catch (err) {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, Something went wrong while saving this data ${err}`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    )
                }
            } else if (search2.toLowerCase() == 'welcome description') {
                try {
                    const db = await Guild.findOne({
                        GuildID: message.guild.id
                    }, async (err, guild) => {
                        if (!guild) {
                            const autoMod = await new Guild({
                                GuildName: message.guild.name,
                                GuildID: message.guild.id,
                                Preifx: 'b!',
                                WelcomeChannelID: 'disabled',
                                CustomWelcomeText: 'disabled',
                                LogsChannelID: 'disabled',
                                AutoroleID: 'disabled',
                                MuteRoleID: 'disabled',
                            })

                            autoMod.save()
                        }
                    })

                    db.updateOne({
                        CustomWelcomeText: 'disabled',
                    }).then(message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, The Welcome Description System is now **disabled**`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    ))
                } catch (err) {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, Something went wrong while saving this data ${err}`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    )
                }
            } else if (search2.toLowerCase() == 'welcome text') {
                try {
                    const db = await Guild.findOne({
                        GuildID: message.guild.id
                    }, async (err, guild) => {
                        if (!guild) {
                            const autoMod = await new Guild({
                                GuildName: message.guild.name,
                                GuildID: message.guild.id,
                                Preifx: 'b!',
                                WelcomeChannelID: 'disabled',
                                CustomWelcomeText: 'disabled',
                                LogsChannelID: 'disabled',
                                AutoroleID: 'disabled',
                                MuteRoleID: 'disabled',
                            })

                            autoMod.save()
                        }
                    })

                    db.updateOne({
                        CustomWelcomeText: 'disabled',
                    }).then(message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, The Welcome Description System is now **disabled**`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    ))
                } catch (err) {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Settings')
                            .setDescription(`${message.author}, Something went wrong while saving this data ${err}`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    )
                }
            } else {
                return message.channel.send(
                    new MessageEmbed()
                        .setTitle('Bubbly Settings')
                        .setDescription('I don\'t see that option. Here are some of the options.\n\n `b!settings disable Welcome System`\n `b!settings disable Log System`\n `b!settings disable Autorole System`\n\n See the rest of  the options by b!settings.')
                        .setColor('e35962')
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                )
            }
        }
    },
}