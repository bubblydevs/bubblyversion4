const { MessageEmbed, APIMessage } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'ready',
    run: async (client, statcordClient) => {
        console.log('✅ Slash commands')
        
        client.api.applications(client.user.id).commands.post({}) 
        
        client.ws.on("INTERACTION_CREATE", async interaction => {
            const command = interaction.data.name.toLowerCase()
            const args = interaction.data.options

            const reply = async (interaction, response) => {
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: await createAPIMessage(interaction, response)
                    }
                })
            }

            if (command === 'meme') {
                fetch('https://imageapi.fionn.live/reddit/memes')
                    .then(res => res.json())
                    .then(async json => {
                        const memeEmbed = new MessageEmbed()
                        .setTitle(json.title)
                        .setImage(json.img)
                        .setColor('e45962')
                        .setFooter(`👍: ${json.upvotes} || 👎: ${json.downvotes} || Posted by ${json.author}`)
                        .setTimestamp()

                        reply(interaction, memeEmbed)
                    });
            }

            if (command === 'cat') {
                fetch('https://aws.random.cat/meow')
                    .then(res => res.json())
                    .then(async json => {
                        const memeEmbed = new MessageEmbed()
                        .setTitle('🐱 Cat')
                        .setImage(json.file)
                        .setColor('e45962')
                        .setFooter(`Nothing loading? Redo the command.`)
                        .setTimestamp()

                        reply(interaction, memeEmbed)
                    });
            }

            if (command === 'dog') {
                fetch('https://dog.ceo/api/breeds/image/random')
                    .then(res => res.json())
                    .then(async json => {
                        const memeEmbed = new MessageEmbed()
                        .setTitle('🐶 Dog')
                        .setImage(json.message)
                        .setColor('e45962')
                        .setFooter(`Nothing loading? Redo the command.`)
                        .setTimestamp()

                        reply(interaction, memeEmbed)
                    });
            }

            if (command === 'impostor') {
                const text = args.find(arg => arg.name.toLowerCase() === "content").value;

                let options = [`yellow`, `black`, `bule`, `red`]
                let Options = Math.floor(Math.random() * options.length)

                let options2 = [`red`, `black`, `bule`, `yellow`]
                let Options2 = Math.floor(Math.random() * options.length)

                const memeEmbed = new MessageEmbed()
                .setTitle('Bubbly impostor')
                .setImage(`https://vacefron.nl/api/ejected?name=${encodeURIComponent(text)}&impostor=${options[Options]}&crewmate=${options2[Options2]}`)
                .setColor('e45962')
                .setFooter(`Nothing loading? Redo the command.`)
                .setTimestamp()

                reply(interaction, memeEmbed)
            }

            if (command === 'stonks') {
                const memeEmbed = new MessageEmbed()
                .setTitle('Bubbly Stonks')
                .setImage(`https://vacefron.nl/api/stonks?user=https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.png?size=128[&notstonks=BOOL]`)
                .setColor('e45962')
                .setFooter(`Nothing loading? Redo the command.`)
                .setTimestamp()

                reply(interaction, memeEmbed)
            }

            if (command === 'drip') {
                const memeEmbed = new MessageEmbed()
                .setTitle('Bubbly Stonks')
                .setImage(`https://vacefron.nl/api/drip?user=https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.png?size=128`)
                .setColor('e45962')
                .setFooter(`Nothing loading? Redo the command.`)
                .setTimestamp()

                reply(interaction, memeEmbed)
            }
        })

        async function createAPIMessage(interaction, content) {
            const apiMessage = await APIMessage.create(client.channels.resolve(interaction.channel_id), content)
                .resolveData()
                .resolveFiles();

            return { ...apiMessage.data, files: apiMessage.files };
        }
    }
}