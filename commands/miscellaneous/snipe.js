const snipeSchema = require("../../schemas/snipe-schema");
module.exports = {
  commands: ["snipe"],
  cooldown: 10,
  callback: async (message, arguments, Discord, Canvas, client) => {
    const result = await snipeSchema.findOne({
      _id: message.guild.id,
    });
    if (!result) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          message.member.user.tag,
          message.member.user.displayAvatarURL(String)
        )
        .setDescription("❌ | There are not recent snipes");
      message.channel.send(embed);
      return;
    }
    const embed = new Discord.MessageEmbed()
      .setAuthor(result.author, result.authorImage)
      .addFields({ name: "Message Text", value: result.text });
    await message.channel.send(embed);
  },
};
