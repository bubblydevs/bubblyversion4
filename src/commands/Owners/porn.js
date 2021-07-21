const { MessageEmbed } = require('discord.js')
const fetch = require("node-fetch");

module.exports = {
  name: "porn",
  run: async (client, message, args) => {
    fetch("https://nekobot.xyz/api/image?type=pgif")
      .then((res) => res.json())
      .then(async (json) => {
        const memeEmbed = new MessageEmbed()
          .setTitle("Here is your porn owner...")
          .setImage(json.message)
          .setColor("e45962")
          .setFooter(
            `Nothing loading? Redo the command.`,
            message.author.displayAvatarURL({
              dynamic: true,
            })
          )
          .setTimestamp();

        message.channel.send(memeEmbed);
      });
  },
  ownerOnly: true,
};
