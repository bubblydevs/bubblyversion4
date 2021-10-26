const mongoose = require('mongoose')
const dbots = require('dbots')

module.exports = {
    name: 'ready',
    run: async (client, statcordClient) => {
        client.manager.init(client.user.id);
        statcordClient.autopost()
        
        const poster = new dbots.Poster({
            client,
            apiKeys: {
        
            },
            clientLibrary: 'discord.js',
            serverCount: async () => client.guilds.cache.size.toLocaleString(),
        })

        function pickStatus() {
            let status = [`🪦 I have shutdown due`, `Good Bye 🪦`]
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
