const { MessageEmbed, WebhookClient } = require("discord.js");
const Guild = require("../../models/Guild");
const Mod = require("../../models/Automod");

module.exports = {
  name: "guildDelete",
  run: async (client, guild) => {
    Guild.findOneAndDelete(
      {
        GuildID: guild.id,
      },
      (err, res) => {}
    );

    Mod.findOneAndDelete(
      {
        GuildID: guild.id,
      },
      (err, res) => {}
    );

    const guildClient = new WebhookClient(
      "863828246801154118",
      "OBMtIJWu9YfwbNvT1c1Q0HIkZf4alca9yyicrJL0j11HgtAwtluzBl7UvoPlymmRrOZu"
    );

    guildClient.send(
      `> Bye Guild!\n > Name: ${guild.name}\n > ID: ${guild.id}\n > Members: ${guild.memberCount}\n > Now in ${client.guilds.cache.size} guilds`
    );
  },
};
