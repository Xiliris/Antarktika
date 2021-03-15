const controlSchema = require("../../schemas/control-schema");
module.exports = {
  commands: "cyrillic",
  expectedArgs: "<Enable | Disable>",
  minArgs: 1,
  permissions: ["ADMINISTRATOR"],
  callback: async (message, arguments, Discord, text, client) => {
    const { guild } = message;
    console.log(arguments[0].toLowerCase());
    if (arguments[0].toLowerCase() === "enable") {
      await controlSchema.findOneAndUpdate(
        {
          _id: guild.id,
        },
        {
          guildId: guild.id,
          cyrillic: true,
        },
        {
          upsert: true,
        }
      );
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("✅ | Sucessfully enabled cyrillic filter!");
      message.channel.send(embed);
    } else if (arguments[0].toLowerCase() === "disable") {
      await controlSchema.findOneAndUpdate(
        {
          _id: guild.id,
        },
        {
          guildId: guild.id,
          cyrillic: false,
        },
        {
          upsert: true,
        }
      );
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Sucessfully disabled cyrillic filter!");
      message.channel.send(embed);
    }
  },
};
