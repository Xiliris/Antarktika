const channelSchema = require("../../schemas/channel-schema");
module.exports = {
  commands: "set-reaction-chat",
  permissions: ["ADMINISTRATOR"],
  callback: async (message, arguments, Discord, text, client) => {
    const { member } = message;
    const channelId = message.channel.id;

    const embed = new Discord.MessageEmbed()
      .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
      .setDescription(
        `✅ | ReactionChat channel was successfully set to <#${channelId}>`
      );
    message.channel.send(embed);

    await channelSchema.findOneAndUpdate(
      {
        _id: message.guild.id,
      },
      {
        _id: message.guild.id,
        reaction: channelId,
      },
      {
        upset: true,
      }
    );
  },
};
