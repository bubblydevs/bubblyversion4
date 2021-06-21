const { MessageEmbed } = require('discord.js');
const client = require('../..')
const moment = require("moment");


module.exports = {
    name: 'userinfo',
    category: 'informational',
    description: 'Find info about a user.',
    aliases: ['user-info', 'lookup', 'user'],
    run: async(client, message, args) => {
        let usersatus = []
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        
        if(!member) return message.channel.send('No member found.')

        if (member.user.presence.status === 'dnd') {
            usersatus = '<:dnd:821289791714623508> Do Not Disturb'
        }

        if (member.user.presence.status === 'offline') {
            usersatus = '<:invisible:821339812564566046> Offline'
        }

        if (member.user.presence.status === 'idle') {
            usersatus = '<:idle:821289791840321566> Idle'
        }

        if (member.user.presence.status === 'online') {
            usersatus = '<:online:821289791202656266> Online'
        }

        const roles = member.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1);

        const embed = new MessageEmbed()   
        .setAuthor(`User info about ${member.user.username}`, member.user.displayAvatarURL())
        .setColor('e35962')
        .addField('Joined This Guild', `\`\`\`${moment(member.joinedAt).format("dddd MMMM Do YYYY")}\`\`\``, true)
        .addField('Account Made', `\`\`\`${moment(member.user.createdAt).format("dddd MMMM Do YYYY")}\`\`\``, true)
        .addField(`Roles [${roles.length}]`, `${roles.length < 10 ? roles.join(', ') : 'None'}`)
        .addField('General', [
            `\`▪\` Discord Username: ${member.user.username}#${member.user.discriminator}`,
            `\`▪\` ID: ${member.user.id}`,
            `\`▪\` User Status: ${usersatus}`,
        ])
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
            dynamic: true
          }))
        message.channel.send(embed)
    }
}