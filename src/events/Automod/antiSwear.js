const { MessageEmbed } = require('discord.js')
const Mod = require('../../models/Automod')
const list = require('../../config/antiSwear.json');

module.exports = {
    name: 'message',
    run: async (client, message) => {
        if (!message.guild || !message.author.bot) return;
        
        const db = await Mod.findOne({
            GuildID: message.guild.id
        }, async (err, guild) => { if (!guild) return; })

        
        for (let i = 0; i < list.length; i++) {
            if (message.content.includes(list[i])) {
                if (message.author.bot) return;
                if (!message.member.hasPermission('ADMINISTRATOR')) {
                    if (db.AntiSwear == 'enabled') {
                        try {
                            return message.delete()
                        } catch (error) {
                            return console.log(error);
                        }
                    }
                }
            }
        }
    }
}