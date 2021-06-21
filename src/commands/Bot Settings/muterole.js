const Guild = require('../../models/Guild')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'muterole',
    category: 'Bot Settings',
    description: `To add a mute and remove a mute role.`,
    run: async (client, message, args) => {

        if (!args[0]) {
            let muteRole = []

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
                    })

                    autoMod.save()
                }
            })

            if (db.MuteRoleID === 'disabled') muteRole = 'There\'s no mute role here you can add a mute role by b!mute '
            if (db.MuteRoleID !== 'disabled') muteRole = `<@${db.MuteRoleID}>`

            return message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Muterole')
                    .setDescription(muteRole)
                    .setColor('e35962')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
            )

        }

        if (args[0] === 'add') {
            message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Muterole')
                    .setDescription('Alright could you mention the role or can you send me the id of the role under this message?')
                    .setColor('e35962')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    })))

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

                    const role = await m.mentions.roles.first() || m.guild.roles.cache.get(m.content);

                    if (!role) return message.channel.send(
                        message.channel.send(
                            new MessageEmbed()
                                .setTitle('Bubbly Settings')
                                .setDescription(`${message.author}, I did not find that role redo this command.`)
                                .setColor('e35962')
                                .setTimestamp()
                                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                    dynamic: true
                                }))
                        )
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
                            MuteRoleID: `${role.id}`,
                        }).then(m.react('👍'))
                    } catch {
                        message.channel.send(
                            new MessageEmbed()
                                .setTitle('Bubbly Settings')
                                .setDescription(`${message.author}, Something went wrong while saving this data`)
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
                        .setDescription(`${message.author}, You have ran out of time redo this command again.`)
                        .setColor('e35962')
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                            dynamic: true
                        }))

                )
            }
        }

        if (args[0] === 'create') {
            const muteRole = await message.guild.roles.create({
                data: {
                    name: 'muted',
                    color: '201f1f',
                }
            })

            for (const channel of message.guild.channels.cache) {
                channel[1].updateOverwrite(muteRole, {
                    SEND_MESSAGES: false,
                    CONNECT: false,
                    ADD_REACTIONS: false,
                })
            }

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
                            MuteRoleID: muteRole.id,
                        })
    
                        autoMod.save()
                        m.react('👍')
                    }
                })
    
                db.updateOne({
                    MuteRoleID: muteRole.id,
                }).then(message.react('👍'))
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
        }
    },
}