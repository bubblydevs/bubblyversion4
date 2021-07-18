const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const ms = require("ms");

module.exports = {
  name: "message",
  run: async (client, statcordClient, message) => {
    if (!message.guild || message.author.bot) return;

    fetch(`http://localhost:4002/guilds/${message.guild.id}/data`)
      .then((res) => res.json())
      .then(async (json) => {
        let dataPrefix;

        if (json.Preifx) {
          dataPrefix = json.Preifx;
        } else {
          dataPrefix = ["b!"];
        }

        dataPrefix.push("<@!763420472666357811>");

        const prefix = dataPrefix.find((p) =>
          message.content.toLowerCase().startsWith(p)
        );

        if (!prefix) return;

        const [cmd, ...args] = message.content
          .slice(prefix.length)
          .trim()
          .split(/ +/g);
        const command =
          (await client.commands.get(cmd.toLowerCase())) ??
          client.commands.get(client.aliases.get(cmd.toLowerCase()));

        if (!command) return;

        if (command) {
          if (command.ownerOnly == true) {
            if (!client.owners.includes(message.author.id)) return;
          }

          if (client.cooldowns.has(`${message.author.id}-${command.name}`)) {
            return message.channel.send(
              `Dude Chill ${
                message.author
              }, Could you try runing this command in \`${ms(
                client.cooldowns.get(`${message.author.id}-${command.name}`) -
                  Date.now(),
                { long: true }
              )}\``
            );
          }

          if (command.cooldown) {
            client.cooldowns.set(
              `${message.author.id}-${command.name}`,
              Date.now() + command.cooldown
            );

            setTimeout(() => {
              client.cooldowns.delete(`${message.author.id}-${command.name}`);
            }, command.cooldown);
          }
          try {
            command.run(client, message, args);
            statcordClient.postCommand(cmd, message.author.id);
          } catch {
            return;
          }
        }
      });
  },
};
