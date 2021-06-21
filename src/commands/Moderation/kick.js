const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/Guild')
const moment = require("moment")

module.exports = {
    name: 'kick',
    category: 'Moderation',
    description: `Kick's the member who is mentioned`,
    run: async(client, message, args) => {
        const db = await Guild.findOne({
            GuildID: message.guild.id
        }, async (err, guild) => { if(!guild) return; })
        
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const logchannel = await message.guild.channels.cache.get(db.LogsChannelID);
        const permissions = message.channel.permissionsFor(message.client.user);

        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(
            new MessageEmbed()
            .setTitle('Bubbly Kick')
            .setDescription(`${message.author}, You don't have permissions for this command (\`KICK_MEMBERS\`)`)
            .setColor('e35962')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))
        )

        if (!permissions.has('KICK_MEMBERS')) return message.channel.send(
            new MessageEmbed()
            .setTitle('Bubbly Kick')
            .setDescription(`${message.author}, This is embarrassing but i don't have permissions for \`KICK_MEMBERS\`.`)
            .setColor('e35962')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))
        );

        if (!member) return message.channel.send(
            new MessageEmbed()
            .setTitle('Bubbly Kick')
            .setDescription(`${message.author}, I can't find that member, Make sure to mention them.`)
            .setColor('e35962')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
         })))

        if (member == message.author.id) return message.channel.send(
            new MessageEmbed()
            .setTitle('Bubbly Kick')
            .setDescription(`${message.author}, Why would i kick you? There's no need to kick yourself.`)
            .setColor('e35962')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))
        )

        if (member == client.user.id) return message.channel.send(
            new MessageEmbed()
            .setTitle('Bubbly Kick')
            .setDescription(`${message.author}, Why me? I am doing all of this hard work and now you want me to go :(`)
            .setColor('e35962')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))
        )

        if (message.member.roles.highest.position < member.roles.highest.position) return message.channel.send(
            new MessageEmbed()
            .setTitle('Bubbly Kick')
            .setDescription(`${message.author}, This member has the same rank as your or a higher rank then you.`)
            .setColor('e35962')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))
        )

        if (!member.kickable) return message.channel.send(
            new MessageEmbed()
            .setTitle('Bubbly Kick')
            .setDescription(`${message.author}, This member has a higher role then me.`)
            .setColor('e35962')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))
        )

        let reason = 'Moderator specified no reason'

        if (args.length > 1) reason = args.slice(1).join(" ")
        
        try  {
            await member.send(
                new MessageEmbed()
                .setTitle('Bubbly Kick')
                .setDescription(`${message.author}, You have been kicked from ${message.guild.name} for the reason \`${reason}\`.`)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Kicked by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
             })))
        } catch {}
        
        member.kick({ reason: reason })

        message.channel.send(`\`${member.user.username}\` was kicked!`)

        if (!logchannel) {
            return;
        } else  {
            logchannel.send(
                new MessageEmbed()
                .setTitle(`Kick | ${member.user.username}`)
                .setDescription(`Offender: ${member.user.tag} (${member.user.id})\n Reason: ${reason}\n Moderator: ${message.author}`)
                .setTimestamp()
                .setColor('e35962')
                .setFooter(`ID: ${member.user.id}`, member.user.displayAvatarURL({
                    dynamic: true
                }))
            )
        }

    }
}