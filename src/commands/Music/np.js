const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'np',
    aliases: ['nowplaying'],
    category: 'music',
    run: async (client, message, args) => {
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

        const track = player.queue.current;

        let min = Math.floor((track.duration / 1000 / 60) << 0),
            sec = Math.floor((track.duration / 1000) % 60);
        let sec2;
        if (sec < 10) {
            sec2 = `0${sec}`;
        } else {
            sec2 = sec;
        }

        message.channel.send(
            new MessageEmbed()
                .setTitle('Bubbly Music')
                .addField('Now playing', `\`${track.title}\``)
                .addField('Video Duration', `\`${min}:${sec2}\``)
                .addField('Requested by', `\`${track.requester.tag}\``)
                .addField('Viedo by', `\`${track.author}\``)
                .setThumbnail(track.thumbnail)
                .setColor('e35962')
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        )
    },
}
