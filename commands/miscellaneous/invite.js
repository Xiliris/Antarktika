module.exports = {
  commands: ["invite"],
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel } = message;

    const embed = new Discord.MessageEmbed()
      .setAuthor(
        message.member.user.tag,
        message.member.user.displayAvatarURL(String)
      )
      .setDescription("Invite link will be free when bot gets out from BETA")
      .setColor("RANDOM");
    message.channel.send(embed);
  },
};
