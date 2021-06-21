const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    category: 'informational',
    description: 'To invite me.',
    run: async(client, message, args) => {
        message.channel.send(
            new MessageEmbed()
            .setTitle('Bubbly Invite')
            .setDescription(`${message.author}, You can invite me [here](https://discord.com/api/oauth2/authorize?client_id=763420472666357811&permissions=8&scope=bot)`)
            .setColor('e35962')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))
        )
    }
}