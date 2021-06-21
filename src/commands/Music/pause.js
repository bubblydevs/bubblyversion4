const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'pause',
    aliases: [],
    run: async(client, message, args) => {
        const player = message.client.manager.players.get(message.guild.id);

        if(!player) return message.channel.send(
            new MessageEmbed()
            .setTitle('Bubbly Music')
            .setDescription('There is no music playing in this server')
            .setColor('e35962')
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))
        )

        const channel = message.member.voice.channel;

        if(!channel) return message.channel.send(
            new MessageEmbed()
            .setTitle('Bubbly Music')
            .setDescription(`${message.author}, You need to be in a voice channel for me to stop the music.`)
            .setColor('e35962')
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))
        )
        if (channel.id !== player.voiceChannel) return message.channel.send(
            new MessageEmbed()
            .setTitle('Bubbly Music')
            .setDescription(`${message.author}, Your in a different voice channel Then me`)
            .setColor('e35962')
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))
        )

        player.pause(true)
        message.react('👍')
    }
}