const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'loop',
    category: 'music',
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Music')
                .setDescription('What do want to loop? Pick one of these options.\n\n `b!loop queue`\n\n **or** \n\n `b!loop song`')
                .setColor('e35962')
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        )

        if (args[0].toLowerCase() === 'queue') {
            const player = message.client.manager.players.get(message.guild.id);

            if (!player) return message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Music')
                    .setDescription('There is no music playing in this server')
                    .setColor('e35962')
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
            )

            const channel = message.member.voice.channel;

            if (!channel) return message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Music')
                    .setDescription(`${message.author}, You need to be in a voice channel for me to loop the music.`)
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

            player.setQueueRepeat(!player.queueRepeat);
            const queueRepeat = player.queueRepeat ? "enabled" : "disabled";
            return message.reply(
                new MessageEmbed()
                .setTitle('Bubbly Music')
                .setDescription(`${message.author}, Loop is now ${queueRepeat}`)
                .setColor('e35962')
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
            );
        }

        if (args[0].toLowerCase() === 'song') {
            const player = message.client.manager.players.get(message.guild.id);

            if (!player) return message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Music')
                    .setDescription('There is no music playing in this server')
                    .setColor('e35962')
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
            )

            const channel = message.member.voice.channel;

            if (!channel) return message.channel.send(
                new MessageEmbed()
                    .setTitle('Bubbly Music')
                    .setDescription(`${message.author}, You need to be in a voice channel for me to loop the music.`)
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

            player.setTrackRepeat(!player.trackRepeat);
            const trackRepeat = player.trackRepeat ? "enabled" : "disabled";
            return message.reply(
                new MessageEmbed()
                .setTitle('Bubbly Music')
                .setDescription(`${message.author}, Loop is now ${trackRepeat}`)
                .setColor('e35962')
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
            );
        }
    },
}
