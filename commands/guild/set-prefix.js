const prefixSchema = require("../../schemas/prefix-schema");
const guildPrefixes = require("../../cache/prefix-cache");
module.exports = {
  commands: "set-prefix",
  permissions: ["ADMINISTRATOR"],
  requiredRoles: [],
  callback: async (message, arguments, Discord, text, client) => {
    const args = message.content.split(" ").slice(1); // Svi argumenti poslje prefixa

    if (!args[0]) return;
    if (args[1]) return;

    const guildId = message.channel.guild.id;
    const prefix = args[0];

    await prefixSchema.findOneAndUpdate(
      {
        _id: guildId,
      },
      {
        guildId,
        prefix,
      },
      {
        upsert: true,
      }
    );
    const embed = new Discord.MessageEmbed().setDescription(
      `✅ | Prefix changed to [ **${prefix}** ]`
    );
    message.channel.send(embed);
    guildPrefixes[guildId] = prefix;
    return;
  },
};
