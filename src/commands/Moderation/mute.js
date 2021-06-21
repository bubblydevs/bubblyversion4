const Guild = require('../../models/Guild')
const {
    MessageEmbed
} = require('discord.js');
const ms = require('ms')


module.exports = {
    name: 'mute',
    category: 'Moderation',
    description: `Mute's the member who is mentioned`,
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const permissions = message.channel.permissionsFor(message.client.user);

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Mute')
                .setDescription(`${message.author}, You don't have permissions for this command (\`MANAGE_MESSAGES\`)`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        )

        if (!permissions.has('MANAGE_ROLES')) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Mute')
                .setDescription(`${message.author}, This is embarrassing but i don't have permissions for \`MANAGE_ROLES\`.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        );

        if (!member) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Mute')
                .setDescription(`${message.author}, I can't find that member, Make sure to mention them.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                })))

        if (member == message.author.id) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Mute')
                .setDescription(`${message.author}, Why would i mute you? There's no need to mute yourself.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        )

        if (message.member.roles.highest.position < member.roles.highest.position) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Mute')
                .setDescription(`${message.author}, This member has the same rank as your or a higher rank then you.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        )

        const db = await Guild.findOne({
            GuildID: message.guild.id
        }, async (err, guild) => { if (!guild) return; })

        let muteRole = message.guild.roles.cache.get(db.MuteRoleID);
        const logchannel = await message.guild.channels.cache.get(db.LogsChannelID);

        if (!muteRole) {
            return message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Mute')
                    .setDescription(`${message.author}, This server has no mute role you can add a mute role by \`b!muterole add (role)\` or i can make a mute role for this server by \`b!muterole create\` `)
                    .setColor('e35962')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
            )
        }

        for (const channel of message.guild.channels.cache) {
            channel[1].updateOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false,
                ADD_REACTIONS: false,
            })
        }

        if (member.roles.cache.has(muteRole.id)) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Mute')
                .setDescription(`${message.author}, This member is alreadey muted.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        )

        const time = args[1]

        if (!time) {
            member.roles.add(muteRole).then(message.channel.send(`Muted \`${member.user.username}\`, To unmute the user use b!unmute user.`)).then()

            if (!logchannel) {
                return;
            } else {
                logchannel.send(
                    new MessageEmbed()
                        .setTitle(`Mute | ${member.user.username}`)
                        .setDescription(`Offender: ${member.user.tag} (${member.user.id})\n Time: No time\n Moderator: ${message.author}`)
                        .setTimestamp()
                        .setColor('e35962')
                        .setFooter(`ID: ${member.user.id}`, member.user.displayAvatarURL({
                            dynamic: true
                        }))
                )
            }
        } else {
            try {
                await member.roles.add(muteRole)
            } catch (err) {
                return message.channel.send(`I could not add the mute role to \`${member.user.username}\`, Please check that the muterole is lower then my **role**, Thank you.`)
            }
    
            message.channel.send(`\`${member.user.username}\` is now muted!`)
    
            if (!logchannel) {
                return;
            } else {
                logchannel.send(
                    new MessageEmbed()
                        .setTitle(`mute | ${member.user.username}`)
                        .setDescription(`Offender: ${member.user.tag} (${member.user.id})\n Time: ${time}\n Moderator: ${message.author}`)
                        .setTimestamp()
                        .setColor('e35962')
                        .setFooter(`ID: ${member.user.id}`, member.user.displayAvatarURL({
                            dynamic: true
                        }))
                )
            }
    
            setTimeout(() => {
                try {
                    member.roles.remove(muteRole)
                } catch {
                    return;
                }
            }, ms(time))
        }
    }
}