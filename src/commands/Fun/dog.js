const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'dog',
    category: 'fun',
    description: 'Shows a dog',
    run: async(client, message, args) => {
        fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(async json => {
            const memeEmbed = new MessageEmbed()
                .setTitle('🐶 Dog')
                .setImage(json.message)
                .setColor('e45962')
                .setFooter(`Nothing loading? Redo the command.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setTimestamp()

            message.channel.send(memeEmbed)
        });
    }
}