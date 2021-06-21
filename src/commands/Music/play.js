const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'music',
    run: async (client, message, args) => {
        const song = args.slice(0).join(" ")
        const channel = message.member.voice.channel;

        if (!channel) {
            return message.channel.send(new MessageEmbed()
                .setTitle('Bubbly Music')
                .setDescription(`${message.author}, You need to be in a voice channel for me to play music.`)
                .setColor('e35962')
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                })));
        }

        if (!song) {
            return new MessageEmbed()
                .setTitle('Bubbly Music')
                .setDescription(`${message.author}, You must enter something to play.`)
                .setColor('e35962')
                .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        }

        const player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: channel.id,
            textChannel: message.channel.id,
            volume: 100,
            selfDeafen: true,
        });

        if (player.state !== "CONNECTED") player.connect();

        const search = song;
        let res;

        try {
            res = await player.search(search, message.author);
            if (res.loadType === "LOAD_FAILED") {
                if (!player.queue.current) player.destroy();
            }
        } catch (err) {
            return message.channel.send(
                `Someting went wrong.`
            );
        }
        switch (res.loadType) {
            case "NO_MATCHES":
                if (!player.queue.current) {
                    player.destroy();
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Music')
                            .setDescription(`${message.author}, They where no search results.`)
                            .setColor('e35962')
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL()
                            ))
                }


            case "TRACK_LOADED":
                player.queue.add(res.tracks[0]);
                if (!player.playing && !player.paused && !player.queue.length)
                    player.play();
                return message.channel.send(
                    new MessageEmbed()
                        .setTitle('Bubbly Music')
                        .addField('Added to the queue', `\`${res.tracks[0].title}\``)
                        .setThumbnail(res.tracks[0].thumbnail)
                        .setColor('e35962')
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL())
                )

            case "PLAYLIST_LOADED":
                player.queue.add(res.tracks);
                player.play();
                return message.channel.send(
                    new MessageEmbed()
                        .setTitle('Bubbly Music')
                        .addField('Added to the queue', `\`${res.tracks[0].title}\``)
                        .setThumbnail(res.tracks[0].thumbnail)
                        .setColor('e35962')
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL()
                        ))

            case "SEARCH_RESULT":
                let max = 10,
                    collected,
                    filter = (m) =>
                        m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
                if (res.tracks.length < max) max = res.tracks.length;
                const results = res.tracks
                    .slice(0, max)
                    .map((track, index) => `${++index}. \`${track.title}\``)
                    .join("\n");

                const resultss = new MessageEmbed()
                    .setTitle("Please pick one of thesse search results")
                    .setDescription(results)
                    .setColor('e35962')
                    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                        dynamic: true
                    }))

                message.channel.send(resultss);

                try {
                    collected = await message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 30e3,
                        errors: ["time"],
                    });
                } catch (e) {
                    if (!player.queue.current) player.destroy();
                    return message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Music')
                            .setDescription(`${message.author}, You have ran out of time redo this command to play music.`)
                            .setColor('e35962')
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL()
                            ))
                }
                const first = collected.first().content;
                const index = Number(first) - 1;
                if (index < 0 || index > max - 1) {
                    return message.channel.send(
                        new MessageEmbed()
                            .setTitle('Bubbly Music')
                            .setDescription(`${message.author}, I can't see that search result.`)
                            .setColor('e35962')
                            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                    );
                }

                const track = res.tracks[index];
                player.queue.add(track);
                if (!player.playing && !player.paused && !player.queue.length)
                    player.play();
                return message.channel.send(
                    new MessageEmbed()
                        .setTitle('Bubbly Music')
                        .addField('Added to the queue', `\`${res.tracks[0].title}\``)
                        .setThumbnail(res.tracks[0].thumbnail)
                        .setColor('e35962')
                        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                );
        }
    }
}