const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'support',
    category: 'informational',
    description: 'To join my support server',
    run: async(client, message, args) => {
        message.channel.send(
            new MessageEmbed()
            .setTitle('Bubbly Invite')
            .setDescription(`${message.author}, You can join my support server [here](https://discord.gg/wRzUc3yc9D)`)
            .setColor('e35962')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))
        )
    }
}