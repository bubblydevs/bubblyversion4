const { ReactionPages } = require("reconlx");
const fetch = require('node-fetch')
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'help',
    description: `Nothing...`,
    cooldown: '5000',
    run: async (client, message, args) => {
        let options = [`Bubbly is a new multipurpose bot made in discord.js <:logosquare:811892314741669899>. Bubbly is a free bot and easy to use and Bubbly haves moderation and much more!`, `Why don't you vote me on [top.gg](https://top.gg/bot/763420472666357811/vote) <:topgg:823495871571558410>?  it will only take you a second.`, `Why don't you [invite me](https://discord.com/api/oauth2/authorize?client_id=763420472666357811&permissions=8&scope=bot) to your server? it will only take you a second.`]
        let Options = Math.floor(Math.random() * options.length)

        let prefix = '(p)'

        const HomeEmbed = new MessageEmbed()
            .setTitle('Bubbly help')
            .addField('Reactions', [
                `⏩: Goes to the next page.`,
                `⏪: Goes back to the page.`,
            ], true)
            .addField('New to Bubbly?', options[Options])
            .addField('Pages', [
                `Page 1: Moderation`,
                `Page 2: Informational`,
                `Page 3: Automod`,
                `Page 4: Welcome`,
                `Page 5: Music`,
                `Page 6: Fun`,
            ], true)
            .addField('Useful Links', `[Support](https://discord.gg/wRzUc3yc9D) | [Invite me!](https://discord.com/api/oauth2/authorize?client_id=763420472666357811&permissions=8&scope=bot)`, true)
            .setThumbnail(client.user.avatarURL())
            .setColor('#e35962')


        const ModEmbed = new MessageEmbed()
            .setTitle('Bubbly Moderation')
            .setDescription(`(p) stands for your guild prefix`)
            .addField('Commands', [
                `\`${prefix}ban (user) (reason)\`, \`${prefix}kick (user) (reason)\`, \`${prefix}mute (user) (time)\`, \`${prefix}purge (amount)\`, \`${prefix}unban (userID)\`, \`${prefix}unmute (user)\`, \`${prefix}unwarn (user) (warnID)\`, \`${prefix}warn (user) (reason)\`, \`${prefix}warnings (user)\``,
                '\u200b'
            ])
            .addField('Setup', [
                '`(p)settings enable Logs`: Able to get moderation notifications ',
                '`(p)muterole add (role)`: Adds a mute role for the mute command.',
                '`(p)muterole create`: creates a mute role for the mute command.',
            ])
            .setColor('e35962')
            .setTimestamp()
            .setThumbnail('https://res.cloudinary.com/bubblybot/image/upload/v1613588945/20c38d328dded4af07fc1cdb2f6f535d_ric5pv.png')
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))

        const InfoEmbed = new MessageEmbed()
            .setTitle('Bubbly Info')
            .setDescription(`(p) stands for your guild prefix`)
            .addField('Guild Informational', [
                '`(p)help,` `(p)userinfo (user),` `(p)serverinfo`',
                '\u200b'
            ])
            .addField('Bot Informational', [
                '`(p)info,` `(p)support,` `(p)invite`'
            ])
            .setColor('e35962')
            .setTimestamp()
            .setThumbnail('https://res.cloudinary.com/bubblybot/image/upload/v1613588945/20c38d328dded4af07fc1cdb2f6f535d_ric5pv.png')
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))

        const automod = new MessageEmbed()
            .setTitle('Bubbly Automod')
            .setDescription('(p) stands for your guild prefix\n\n💻 View what is enabled: `(p)automod`\n\n ✔️ Enable A Automod Option: `(p)automod enable (Name)`\n\n ❌ Disable A Automod Option: `(p)automod disable (Name)`')
            .setColor('e35962')
            .setTimestamp()
            .setThumbnail('https://res.cloudinary.com/bubblybot/image/upload/v1613588945/20c38d328dded4af07fc1cdb2f6f535d_ric5pv.png')
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))

        const WelcomeEmbed = new MessageEmbed()
            .setTitle('Bubbly Welcome')
            .setDescription('(p) stands for your guild prefix\n\n💻 View what is enabled: `(p)settings`\n\n 👷‍♂️ Set A Welcome Channel: `(p)settings enable Welcome`\n\n 💬 Welcome Text: `(p)settings enable Welcome Text`\n\n 👋 Set a role for Autorole: `(p)settings enable Autorole`')
            .setColor('e35962')
            .setTimestamp()
            .setThumbnail('https://res.cloudinary.com/bubblybot/image/upload/v1613588945/20c38d328dded4af07fc1cdb2f6f535d_ric5pv.png')
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))

        const MusicEmbed = new MessageEmbed()
            .setTitle('Bubbly Music')
            .setDescription(`(p) stands for your guild prefix`)
            .addField('Music commands', [
                '`(p)play (song),` `(p)loop,` `(p)np,` `(p)pause,` `(p)resume,` `(p)skip,` `(p)stop,` `(p)volume (amount)`',
                '\u200b'
            ])
            .setColor('e35962')
            .setTimestamp()
            .setThumbnail('https://res.cloudinary.com/bubblybot/image/upload/v1613588945/20c38d328dded4af07fc1cdb2f6f535d_ric5pv.png')
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))

        const funEmbed = new MessageEmbed()
            .setTitle('Bubbly Fun')
            .setDescription(`(p) stands for your guild prefix`)
            .addField('Fun commands', [
                '`(p)cat,` `(p)dog,` `(p)meme`',
                '\u200b'
            ])
            .setColor('e35962')
            .setTimestamp()
            .setThumbnail('https://res.cloudinary.com/bubblybot/image/upload/v1613588945/20c38d328dded4af07fc1cdb2f6f535d_ric5pv.png')
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))

        const pages = [HomeEmbed, ModEmbed, InfoEmbed, automod, WelcomeEmbed, MusicEmbed, funEmbed];

        const emojis = ["⏪", "⏩"];

        ReactionPages(message, pages, false, emojis, 30000)

    }
}