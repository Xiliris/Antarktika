const lastMessageSchema = require("../../schemas/lastMessage-schema");
module.exports = {
  commands: ["last-message"],
  expectedArgs: "<Tag>",
  minArgs: 1,
  maxArgs: 1,
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel } = message;

    const target = message.mentions.users.first();

    const result = await lastMessageSchema.findOne({
      guildId: guild.id,
      userId: target.id,
    });
    if (!result) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(target.tag, target.displayAvatarURL(String))
        .setDescription("❎ | This user didn't send any messages.")
        .setColor("RANDOM")
        .setFooter(
          `requested by ${message.member.user.tag}`,
          message.member.user.displayAvatarURL(String)
        );
      message.channel.send(embed);
    }

    const embed = new Discord.MessageEmbed()
      .setAuthor(target.tag, target.displayAvatarURL(String))
      .addFields({ name: "Message", value: result.message })
      .setColor("RANDOM")
      .setFooter(
        `${message.member.user.tag}`,
        message.member.user.displayAvatarURL(String)
      );
    message.channel.send(embed);
  },
};
