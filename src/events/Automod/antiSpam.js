const { MessageEmbed } = require('discord.js')
const Mod = require('../../models/Automod')
const mongoose = require('mongoose')

module.exports = {
    name: 'message',
    run: async (client, message) => {
        if (!message.guild || !message.author.bot) return;
        return;
        //if (message.author.bot) return;
        //if (!message.member.hasPermission('ADMINISTRATOR')) {
        //}
    }
}