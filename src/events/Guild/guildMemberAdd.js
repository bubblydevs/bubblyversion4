const { MessageEmbed, MessageAttachment } = require('discord.js')
const Guild = require('../../models/Guild')
const Canvas = require('canvas')
const path = require('path')

module.exports = {
    name: 'guildMemberAdd',
    run: async (client, member) => {
        // databse / funcions
        let welcomeCustom = []
        let welcomeChannel = []

        try {
            const db = await Guild.findOne({
                GuildID: member.guild.id
            }, async (err, guild) => {
                if (!guild) {
                    return;
                }
            })

            welcomeChannel = member.guild.channels.cache.get(db.WelcomeChannelID);
            welcomeCustom = db.CustomWelcomeText
        } catch {
            return;
        }

        if (!welcomeChannel) return;

        if (welcomeCustom === 'disabled') {
            welcomeCustom = `Welcome to ${member.guild.name} make sure to enjoy your time at ${member.guild.name}!`
        }

        if (welcomeCustom)

        if (welcomeCustom.includes('{user}')) {
            welcomeCustom = welcomeCustom.replace(/{user}/gi, `${member}`)
        }
    
        if (welcomeCustom.includes('{User}')) {
            welcomeCustom = welcomeCustom.replace(/{User}/gi, `${member}`)
        }
    
        if (welcomeCustom.includes('{guild}')) {
            welcomeCustom = welcomeCustom.replace(/{guild}/gi, `${member.guild.name}`)
        }
    
        if (welcomeCustom.includes('{Guild}')) {
            welcomeCustom = welcomeCustom.replace(/{Guild}/gi, `${member.guild.name}`)
        }
    
        if (welcomeCustom.includes('{membercount}')) {
            welcomeCustom = welcomeCustom.replace(/{membercount}/gi, `${member.guild.memberCount}`)
        }
    
        if (welcomeCustom.includes('{memberCount}')) {
            welcomeCustom = welcomeCustom.replace(/{memberCount}/gi, `${member.guild.memberCount}`)
        }
        // image

        const canvas = Canvas.createCanvas(700, 250)
        const ctx = canvas.getContext('2d')
        const background = await Canvas.loadImage(path.join(__dirname, '../../images/welcome.png'))

        let x = 0
        let y = 0
        ctx.drawImage(background, x, y)

        const pfp = await Canvas.loadImage(
            member.user.displayAvatarURL({
                format: 'png'
            })
        )
        x = 360
        y = 25
        ctx.drawImage(pfp, x, y)

        ctx.fillStyle = "#ffffff"
        ctx.font = '16px sans-serif'
        let text = `Welcome ${member.user.tag}!`
        x = 319
        ctx.fillText(text, x, 60 + pfp.height)

        const attachment = new MessageAttachment(canvas.toBuffer(), 'bubbly-welcome.png')

        const embed = new MessageEmbed()
         .setAuthor(member.user.tag, member.user.displayAvatarURL())
         .setDescription(welcomeCustom)
         .setImage('attachment://bubbly-welcome.png')
         .setColor('RANDOM')

        welcomeChannel.send({embed, files: [attachment]})
    }
}