const levelUpRewardSchema = require("../../schemas/leveling-reward");
module.exports = {
  commands: ["remove-reward"],
  expectedArgs: "<Number>",
  minArgs: 1,
  permissions: ["ADMINISTRATOR"],
  callback: async (message, arguments, Discord, Canvas, text, client) => {
    if (isNaN(arguments[0])) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Must be a number!");
      message.channel.send(embed);
      return;
    }
    const result = await levelUpRewardSchema.findOne({
      guildId: message.guild.id,
    });
    if (!result) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | No rewards");
      message.channel.send(embed);
      return;
    }
    await levelUpRewardSchema.findOneAndUpdate(
      {
        guildId: message.guild.id,
      },
      {
        guildId: message.guild.id,
        $pull: {
          reward: result.reward[arguments[0] - 1],
        },
      },
      {
        upsert: true,
      }
    );
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
      .setDescription(`✅ | You removed ${arguments[0]}. reward!`);
    message.channel.send(embed);
  },
};
