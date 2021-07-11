const { WebhookClient, MessageEmbed, Client } = require('discord.js')
const Topgg = require('@top-gg/sdk')
const Guild = require('./models/Guild')
const mongoose = require('mongoose')
const express = require('express')
const router = express()

const token = "ikjiajfijapofjkapojkfopakfpoakfokamf?"
const webHookID = "836266986437869578"
const webHookTOKEN = "7dRaN6Y2sVCZ9uBmMQNcxAha1W4jqYX5S2PTo7wiPNyPcAyZPdjQqOr3zPY52vn_0WWX"

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
}))

try {
    router.listen(4002)
    console.log('✅ Express')
} catch (err) {
    console.log(`❎ Express: ${err}`)
}

module.exports = router