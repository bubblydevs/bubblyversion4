const mongoose = require('mongoose')

const autoSchema = mongoose.Schema({
    GuildID: String,
    AntiLink: String,
    AntiSpam: String,
    AntiSwear: String,
})

module.exports = mongoose.model('Automod', autoSchema, 'automod');