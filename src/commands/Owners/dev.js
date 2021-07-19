const {
    MessageEmbed
} = require('discord.js');
const {
    inspect
} = require('util')
const fs = require('fs')

module.exports = {
    name: 'dev',
    description: `Nothing...`,
    aliases: ['developer'],
    run: async (client, message, args) => {
    
        if (!args[0]) return message.channel.send(
            new MessageEmbed()
            .setTitle('Bubbly Developer')
            .addField(`dm`, `\`b!dev dm\``, true)
            .addField(`say`, `\`b!dev say\``, true)
            .addField(`eval`, `\`b!dev eval\``, true)
            .addField(`guilds`, `\`b!dev guilds (SENDS A MESSAGE TO ALL OF THE GUILDS.)\``, true)
            .addField(`restart`, `\`b!dev restart\``, true)
            .addField(`servers`, `\`b!dev servers\``, true)
            .addField(`guildLeave`, `\`b!dev guildLeave \``, true)
            .addField(`guildCreate`, `\`b!dev guildCreate\``, true)
            .addField(`guildDelete`, `\`b!dev guildDelete\``, true)
            .addField(`guildMemberAdd`, `\`b!dev guildMemberAdd\``, true)
            .addField(`guildMemberRemove`, `\`b!dev guildMemberRemove\``, true)
            .setColor('e35962')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))
        )

        if (args[0] === 'guildMemberAdd') {
            client.emit("guildMemberAdd", message.member)
            message.react('👍')
        }
        if (args[0] === 'guildMemberRemove') {
            client.emit("guildMemberRemove", message.member)
            message.react('👍')
        }
        if (args[0] === 'guildCreate') {
            client.emit("guildCreate", message.guild)
            message.react('👍')
        }
        if (args[0] === 'guildDelete') {
            client.emit("guildDelete", message.guild)
            message.react('👍')
        }
        if (args[0] === 'servers') {
            message.react('👍')
            client.guilds.cache.forEach(guild => {
                message.channel.send(`Guild name: ${guild.name} | Guild id: ${guild.id} | Data: none`);
            })
        }
        if (args[0] === 'guildLeave') {
            message.react('👍')

            message.guild.leave()
        }
        if (args[0] === 'say') {
            message.delete()

            const saye = args.slice(1).join(' ');

            message.channel.send(saye)
        }

        if (args[0] === 'restart') {
            if (!args[1]) {
                await message.react('👋')

                process.exit()
            }
        }

        if (args[0] === 'eval') {
            const command = args.slice(1).join(" ")
            const msg = message;
            
            if(!command) return;

            try{
                const evaled = eval(command)

                var embed = new MessageEmbed()
                .setTitle('Bubbly Developer')
                .addField('Command', `\`\`\`${command}\`\`\``)
                .addField('Evaled', `\`\`\`js\n${inspect(evaled, { depth: 0})}\`\`\``)
                .setColor('e35962')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))

                message.channel.send(embed)
            } catch (err) {
                var Embed = new MessageEmbed()
                .setTitle('Bubbly Developer')
                .addField('error', err)
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))

                message.channel.send(Embed)
            }
        }

        if (args[0] === 'guilds') {
            const messageSend = args.slice(2).join(' ');

            if (!messageSend) return message.channel.send(`You can't send nothing to all of the guild's mate!.`)

            client.guilds.cache.forEach((guild) => {
                let channels = guild.channels.cache.filter((channel) => {
                    return channel.type === 'text' && channel.permissionsFor(guild.me).has(['VIEW_CHANNEL', 'SEND_MESSAGES']);
                });
                if (channels.array().length > 0) {
                    channels = channels.sort((a, b) => {
                        return a.calculatedPosition - b.calculatedPosition;
                    }).array();
                    channels[0].send(
                        new MessageEmbed()
                        .setTitle('Announcement')
                        .setDescription(`${args[0]}`)
                        .setColor('e35962')
                        .setTimestamp()
                        .setFooter(`Announcement by ${message.author.tag} (Bot Owner)`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                    ).catch(e => console.error(e));

                    message.channel.send('Sent it.')
                }
            });
        }
    },
    ownerOnly: true,
}