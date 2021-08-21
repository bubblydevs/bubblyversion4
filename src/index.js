const { Client, Intents, Collection, MessageEmbed, WebhookClient } = require('discord.js')
const statcord = require('statcord.js')
const { Manager } = require('erela.js')
const Topgg = require('@top-gg/sdk')
const Guild = require('./models/Guild')
const Spotify = require("erela.js-spotify");
const mongoose = require('mongoose')


// clients
const client = new Client({
    repliedUser: false,
    ws: {
        intents: Intents.ALL
    },
})

const statcordClient = new statcord.Client({
    client,
    key: 'statcord.com-ReOYl2VKCu6z7he3A1Kz',
    postCpuStatistics: true, /* Whether to post memory statistics or not, defaults to true */
    postMemStatistics: true, /* Whether to post memory statistics or not, defaults to true */
    postNetworkStatistics: true, /* Whether to post memory statistics or not, defaults to true */
})

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
}

mongoose.connect('mongodb+srv://Bubbly:rmB6zkjCp3qyHfw6@bubbly.ioanw.mongodb.net/Bubbly?retryWrites=true&w=majority', dbOptions).then(console.log('✅ Database connected'))

const clientID = "efca6521b9374ea48c807c4b203531ac"
const clientSecret = "54262698df7a4903a557d92ce46d65d8"
const token = "ikjiajfijapofjkapojkfopakfpoakfokamf?"
const webHookID = "865303667204292649"
const webHookTOKEN = "_Mk8eDNYIzTU45pVbDw0KPykfaZG5gSO8y7ObBA2T1G7cYyjGqtpN_aiB7WBLZFmEr6u"

const { promisify } = require('util')
const glob = require('glob')
const globPromise = promisify(glob)

client.commands = new Collection();
client.categories = new Set()
client.events = new Collection()
client.cooldowns = new Collection()
client.aliases = new Collection()
client.owners = ['447680195604774922']
client.manager = new Manager({
    nodes: [
        {
            host: "localhost",
            port: 3010,
            password: "Bubblymusic"
        },
    ],
    plugins: [
        new Spotify({
            clientID,
            clientSecret
        })
    ],
    autoPlay: true,

    send(id, payload) {
        const guild = client.guilds.cache.get(id)
        if (guild) guild.shard.send(payload)
    },
})

    ; (async () => {
        const eventFiles = await globPromise(`${__dirname}/events/**/*.js`)
        const commandFiles = await globPromise(`${__dirname}/commands/**/*.js`)

        eventFiles.map((value) => {
            const file = require(value)
            client.events.set(file.name, file)
            client.on(file.name, file.run.bind(null, client, statcordClient))
        })

        commandFiles.map((value) => {
            const file = require(value)
            client.commands.set(file.name, file)
            client.categories.add(file.category)
            if (file.aliases) {
                file.aliases.map((value) => client.aliases.set(value, file.name))
            };
        })
    })();

try {
    const express = require('express')
    const router = express()

    const webhook = new Topgg.Webhook(token)
    const discordWebhook = new WebhookClient(webHookID, webHookTOKEN)

    router.get('/guilds/:guildId/data', async (req, res) => {
        const { guildId } = req.params
        const config = await Guild.findOne({ GuildID: guildId })
        return config ? res.send(config) : res.send({ "error": "no data" })
    })

    router.get('/guilds/:guildId/config', async (req, res) => {
        const { guildId } = req.params
        const config = await Guild.findOne({ GuildID: guildId })
        return config ? res.send(config) : res.send({ "error": "no data" })
    })

    router.post('/dblwebhook', webhook.listener(vote => {
        discordWebhook.send(`<@${vote.user}> **Has voted bubbly on top.gg**`)
        
        const userLOL = client.users.cache.get(vote.user)

        if (!userLOL) return 
        
        userLOL.send(
            new MessageEmbed()
            .setTitle('Bubbly Vote')
            .setDescription(`Thank you for voting for me on top.gg <@${vote.user}>! We will be giving out rewards in the next update.`)
            .setColor('e35962')
            .setTimestamp()
            .setFooter(`Bubbly`, client.user.displayAvatarURL({
                dynamic: true
            }))
        );
    }))

    router.listen(4002)
    console.log('✅ Express')
} catch (err) {
    console.log(`❎ Express: ${err}`)
}

client.login('NzYzNDIwNDcyNjY2MzU3ODEx.X33cuA.dSU_2htNoxyG5LPaYwXiw961K2w')

//  music
client.on("raw", (d) => client.manager.updateVoiceState(d))
client.manager.on("nodeConnect", node => console.log(`✅ Node ${node.options.identifier} connected`))
client.manager.on("nodeError", (node, error) => console.log(`❎ Node ${node.options.identifier} had an error: ${error.message}`))
client.manager.on("trackStart", (player, track) => {
    const channel = client.channels.cache.get(player.textChannel);

    let min = Math.floor((track.duration / 1000 / 60) << 0),
        sec = Math.floor((track.duration / 1000) % 60);
    let sec2;
    if (sec < 10) {
        sec2 = `0${sec}`;
    } else {
        sec2 = sec;
    }
    channel.send(
        new MessageEmbed()
            .setTitle('Bubbly Music')
            .addField('Now playing', `[\`${track.title}\`](${track.uri})`)
            .addField('Video Duration', `\`${min}:${sec2}\``)
            .addField('Requested by', `\`${track.requester.tag}\``)
            .setThumbnail(track.thumbnail)
            .setColor('e35962')
            .setFooter(`Video from ${track.author}`, client.user.displayAvatarURL())
    )
})
client.manager.on("queueEnd", (player) => {
    client.channels.cache
        .get(player.textChannel)

    player.destroy();
})

const convertToUnresolved = Spotify.convertToUnresolved;

Spotify.convertToUnresolved = (track) => {
    const unresolved = convertToUnresolved(track);
    unresolved.uri = track.external_urls.spotify;
    return unresolved;
}
