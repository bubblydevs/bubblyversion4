const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'message',
    run: async (client, statcordClient, message) => {
        if (message.author.bot) return;

        fetch(`http://localhost:4002/guilds/${message.guild.id}/data`)
            .then(res => res.json())
            .then(async json => {
                if (message.content === `<@!763420472666357811>`) {
                    return message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly')
                            .setDescription(`Hey there ${message.author}, I see you need my help, My prefix is \`${json.Preifx || 'b!'}\` And want to report a bug? You can report a bug by my  [Support server](https://discord.gg/wRzUc3yc9D)`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    )
                } else if (message.content === `<@763420472666357811>`) {
                    return message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly')
                            .setDescription(`Hey there ${message.author}, I see you need my help, My prefix is \`${json.Preifx || 'b!'}\` And want to report a bug? You can report a bug by my  [Support server](https://discord.gg/wRzUc3yc9D)`)
                            .setColor('e35962')
                            .setTimestamp()
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    )
                }
            })
    }
}
