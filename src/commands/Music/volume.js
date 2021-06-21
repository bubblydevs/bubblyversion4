const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'volume',
    aliases: ['vol'],
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
        
        if (Number(args[0]) <= 0 || Number(args[0]) > 200) return message.channel.send(
            new MessageEmbed()
            .setTitle('Bubbly Music')
            .setDescription(`${message.author}, The number only can go to to 0 to 200.`)
            .setColor('e35962')
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))
        )

        if (Number(args[0]) <= 0 || Number(args[0]) > 200) return message.channel.send(
            new MessageEmbed()
            .setTitle('Bubbly Music')
            .setDescription(`${message.author}, The number only can go to to 0 to 200.`)
            .setColor('e35962')
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))
        )

        if(isNaN(args[0])) return message.channel.send(
            new MessageEmbed()
            .setTitle('Bubbly Music')
            .setDescription(`${message.author}, This number is invalid number.`)
            .setColor('e35962')
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))
        )

        player.setVolume(Number(args[0]));

        message.channel.send(
            new MessageEmbed()
            .setTitle('Bubbly Music')
            .setDescription(`${message.author}, The volume has been set to **${args[0]}**`)
            .setColor('e35962')
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                dynamic: true
            }))
        )
    }
}