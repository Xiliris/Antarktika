const marriageSchema = require("../../schemas/marriage-schema");
module.exports = {
  commands: ["divorce"],
  expectedArgs: "<Tag>",
  minArgs: 1,
  maxArgs: 1,
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel, member } = message;

    const target = message.mentions.users.first();

    const userResult = await marriageSchema.findOne({
      userId: member.id,
      targetId: target.id,
    });
    if (userResult) {
      await marriageSchema.findOneAndDelete({
        userId: member.id,
      });

      await marriageSchema.findOneAndDelete({
        userId: target.id,
      });

      const divorceEmbed = new Discord.MessageEmbed()
        .setTitle(`${member.displayName} and ${target.username} divorced! 😭`)
        .setDescription(
          "It's an unhappy time when a marriage ends, but sometimes it needs to happen in order to move on to better things."
        )
        .setTimestamp();

      message.channel.send(divorceEmbed);
    } else {
      const embed = new Discord.MessageEmbed().setAuthor(
        `${message.author.tag} you are not married to ${target.username}!`,
        message.author.displayAvatarURL(String)
      );
      message.channel.send(embed);
    }
  },
};
