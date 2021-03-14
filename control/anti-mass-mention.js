module.exports = (client, Discord) => {
  client.on("message", (message) => {
    const mentions = message.mentions.users;
    if (message.member.hasPermission("ADMINISTRATOR")) return;
    if (mentions.size > 5) {
      message.delete();
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .addFields({
          name: `Reason:`,
          value: `You tagged to many users!`,
        })
        .setTimestamp();
      message.channel.send(embed);
    }
  });
};
