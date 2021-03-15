const channelSchema = require("../../schemas/channel-schema");
module.exports = {
  commands: "set-counting",
  permissions: ["ADMINISTRATOR"],
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, member } = message;

    const channel = message.channel.name;
    const channelId = message.channel.id;
    const guildId = guild.id;

    const embed = new Discord.MessageEmbed()
      .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
      .setDescription(
        `✅ | Counting channel was successfully set to <#${channelId}>`
      );
    message.channel.send(embed);

    await channelSchema.findOneAndUpdate(
      {
        _id: guild.id,
      },
      {
        _id: guild.id,
        counting: channelId,
      },
      {
        upset: true,
      }
    );
  },
};
