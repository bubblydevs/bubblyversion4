const Guild = require('../../models/Guild')

module.exports = {
    name: 'repier',
    description: `Coming soon.`,
    run: async (client, message, args) => {
        const msg = await message.channel.send('Checking some stuff...')

        try {
            const db = await Guild.findOne({
                GuildID: message.guild.id
            }, async (err, guild) => {
                if (!guild) {
                    msg.edit('We did not find this server in the database we have added this server in the database...')
                }
            })
        } catch {
            msg.edit('We did not find this server in the database we have added this server in the database...')
        }

        msg.edit('We checked some stuff and every is fine...')
    }
}