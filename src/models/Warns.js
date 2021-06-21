const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    GuildID: String,
    User: String,
    Warns: Array,
})

module.exports = mongoose.model("warns", Schema)