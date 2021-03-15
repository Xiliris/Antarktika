const levelUpRewardSchema = require("../../schemas/leveling-reward");
module.exports = {
  commands: ["add-reward"],
  expectedArgs: "<Level> <RoleID>",
  minArgs: 2,
  permissions: ["ADMINISTRATOR"],
  callback: async (message, arguments, Discord, Canvas, text, client) => {
    if (isNaN(arguments[0])) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Level must be a number!");
      message.channel.send(embed);
      return;
    }
    if (isNaN(arguments[1])) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | RoleID must be a number!");
      message.channel.send(embed);
      return;
    }
    const role = message.guild.roles.cache.get(arguments[1]);
    if (!role) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Couldn't find that role!");
      message.channel.send(embed);
      return;
    }
    await levelUpRewardSchema.findOneAndUpdate(
      {
        guildId: message.guild.id,
      },
      {
        guildId: message.guild.id,
        $push: {
          reward: {
            level: arguments[0],
            role: arguments[1],
          },
        },
      },
      {
        upsert: true,
      }
    );
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
      .setDescription(
        `✅ | You added role ${role.name} for level **${arguments[0]}**`
      );
    message.channel.send(embed);
  },
};
