const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
  name: 'info',
  aliases: ['botinfo', 'bot-info'],
  category: 'informational',
  description: 'Info about me.',
  run: async (client, message, args) => {
    let secounds = client.uptime / 1000;
    const days = Math.floor(secounds / 86400)
    const hours = Math.floor(secounds / 3600)
    secounds %= 3600;
    const minutes = Math.floor(secounds / 60)
    let mainsecounds = Math.floor(secounds / 3600)

    const uptime = `${days.toFixed()} days, ${hours.toFixed()} hours, ${minutes.toFixed()} minutes, ${secounds.toFixed()} seconds`

    const embed = new MessageEmbed()
      .setAuthor('Bubbly Info', client.user.displayAvatarURL())
      .setColor('e35962')
      .setDescription('[Support Server](https://discord.gg/wRzUc3yc9D) | [Invite](https://discord.com/api/oauth2/authorize?client_id=763420472666357811&permissions=8&scope=bot)')
      .addField('Users', `\`\`\`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}\`\`\``, true)
      .addField('Guilds', `\`\`\`${client.guilds.cache.size.toLocaleString()}\`\`\``, true)
      .addField('Channels:', `\`\`\`${client.channels.cache.size.toLocaleString()}\`\`\``, true)
      .addField('Uptime', `\`\`\`${uptime}\`\`\``)
      .addField('Bot Owner', `\`\`\`{Bubbly}#3231\`\`\``)
      .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
        dynamic: true
      }))

    message.channel.send(embed)
  }
}