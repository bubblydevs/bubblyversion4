const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'meme',
    category: 'fun',
    description: '😂 Randoms memes',
    run: async (client, message, args) => {
        fetch('https://imageapi.fionn.live/reddit/memes')
            .then(res => res.json())
            .then(async json => {
                const memeEmbed = new MessageEmbed()
                    .setTitle(json.title)
                    .setImage(json.img)
                    .setColor('e45962')
                    .setFooter(`👍: ${json.upvotes} || 👎: ${json.downvotes} || Posted by ${json.author}`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()

                message.channel.send(memeEmbed)
            });
    },
}