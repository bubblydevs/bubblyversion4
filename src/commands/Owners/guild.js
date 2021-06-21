const {
    MessageEmbed
} = require('discord.js');
const Mod = require('../../models/Automod')

module.exports = {
    name: 'g',
    description: `Nothing...`,
    ownerOnly: true,
    run: async (client, message, args) => {
        autoMod = new Mod({
            GuildID: args[0],
            AntiLink: 'Disabled',
            AntiSpam: 'Disabled',
            AntiSwear: 'Disabled',
        })

        autoMod.save()
            .then(result => console.log(result))
            .catch(err => console.error(err));

            message.react('👍')
    }
}