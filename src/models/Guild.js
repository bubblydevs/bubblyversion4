const mongoose = require('mongoose')

const guildSchema = mongoose.Schema({
    GuildName: String,
    GuildID: String,
    Preifx: Array,
    WelcomeChannelID: String,
    CustomWelcomeText: String,
    LogsChannelID: String,
    AutoroleID: String,
    MuteRoleID: String,
})

module.exports = mongoose.model('Guild', guildSchema, 'guilds');