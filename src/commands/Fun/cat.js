const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'cat',
    category: 'fun',
    description: 'Shows a cat',
    run: async(client, message, args) => {
        fetch('https://aws.random.cat/meow')
        .then(res => res.json())
        .then(async json => {
            const memeEmbed = new MessageEmbed()
                .setTitle('🐱 Cat')
                .setImage(json.file)
                .setColor('e45962')
                .setFooter(`Nothing loading? Redo the command.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setTimestamp()

            message.channel.send(memeEmbed)
        });
    }
}