module.exports = {
  commands: ["memberCount"],
  callback: async (message, arguments, Discord, client) => {
    const members = message.guild.members.cache.filter(
      (member) => !member.user.bot
    ).size;
    const bots = message.guild.members.cache.filter((member) => member.user.bot)
      .size;
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
      .setColor("RANDOM")
      .addFields({
        name: `Total: ${members + bots}\nMembers: ${members}\nBots: ${bots}`,
        value: ` ‎`,
        inline: true,
      })
      .setThumbnail(message.guild.iconURL())
      .setTimestamp();
    message.channel.send(embed);
  },
};
