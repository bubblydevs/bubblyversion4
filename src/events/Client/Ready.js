const mongoose = require('mongoose')
const dbots = require('dbots')

module.exports = {
    name: 'ready',
    run: async (client) => {
        client.manager.init(client.user.id);

        const poster = new dbots.Poster({
            client,
            apiKeys: {
                topgg: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2MzQyMDQ3MjY2NjM1NzgxMSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjE1NjE5NTcyfQ.Hb1KVDh6XcE4qFDdvynpwgjOinSz1AbzwPFFIfQ47ao',
                DiscordBotList: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoxLCJpZCI6Ijc2MzQyMDQ3MjY2NjM1NzgxMSIsImlhdCI6MTYxNTYyMDE4M30.dwlRzYreKwdFbxN-rDabSpFISFXjoOXZ6nyP_FWI9LY'
            },
            clientLibrary: 'discord.js',
            serverCount: async () => client.guilds.cache.size.toLocaleString(),
        })

        function pickStatus() {
            let status = [`${client.guilds.cache.size} Guilds 🎉`, `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Members 😲`, `bubblybot.xyz`, `b!help | b!info`]
            let Status = Math.floor(Math.random() * status.length);

            client.user.setActivity(status[Status], {
                type: "LISTENING"
            });
        };
        
        setInterval(pickStatus, 30000);

        try {
            poster.startInterval()

            console.log('✅ Api connected')
        } catch (err) {
            console.log(`❎ Api: ${err}`)
        }
    }
}