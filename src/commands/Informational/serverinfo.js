const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'server-info',
    category: 'informational',
    description: 'Shows info of this server',
    aliases: ['serverinfo', 'server'],
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle(`Server info about ${message.guild.name}`)
        .setColor('e35962')
        .setThumbnail(message.guild.iconURL())
        .addField('Guild Made', `\`\`\`${moment(message.guild.createdAt).format("dddd MMMM Do YYYY")}\`\`\``, true)
        .addField('When i Joined This Server', `\`\`\`${moment(client.user.joinedAt).format("dddd MMMM Do YYYY")}\`\`\``, true)
        .addField('General', [
            `\`▪\` Name: ${message.guild.name}`,
            `\`▪\` Roles: ${message.guild.roles.cache.size}`,
            `\`▪\` Region: ${message.guild.region}`,
            `\`▪\` Channels: ${message.guild.channels.cache.size}`,
            `\`▪\` Member Count: ${message.guild.memberCount}`, 
            `\`▪\` Verification Level: ${message.guild.verificationLevel}`,
        ])
        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
            dynamic: true
          }))

        message.channel.send(embed)
    }
}