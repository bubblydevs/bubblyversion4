const { MessageEmbed, WebhookClient } = require("discord.js");
const Guild = require("../../models/Guild");
const Mod = require("../../models/Automod");

module.exports = {
  name: "guildDelete",
  run: async (client, statcordClient, guild) => {
    if (guild.memberCount === undefined) return;

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
      "865304613040816168",
      "18kRo62vbxekYfh6_JkKmLJN2dKv4Jc6qWQsBsO1_hND40zbv00yzZ04SYzLF-jKQnsW"
    );

    guildClient.send(
      `> Bye Guild!\n > Name: ${guild.name}\n > ID: ${guild.id}\n > Members: ${guild.memberCount}\n > Now in ${client.guilds.cache.size} guilds`
    );
  },
};
