const Guild = require('../../models/Guild')


module.exports = {
    name: 'guildMemberAdd',
    run: async (client, member) => {
        const db = await Guild.findOne({
            GuildID: member.guild.id
        }, async (err, guild) => {
            if (!guild) {
                return;
            }
        })

        if (db.AutoroleID !== 'disabled') {
            try {
                member.roles.add(db.AutoroleID)
            } catch (err) {
                return;
            }
        }
    }
}