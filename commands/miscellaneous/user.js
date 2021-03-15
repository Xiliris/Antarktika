module.exports = {
  commands: ["user-info"],
  requiredChannel: "commands",
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel } = message;

    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (arguments[0]) {
      user = message.guild.members.cache.get(arguments[0]).user;
    } else {
      user = message.author;
    }

    let avatar = user.displayAvatarURL({ size: 4096, dynamic: true });

    const target = message.guild.members.cache.get(user.id);

    const embed = new Discord.MessageEmbed()
      .setTitle("User Info")
      .addFields(
        { name: "Tag:", value: `${user.tag}` },
        { name: "Bot:", value: user.bot.toString().toUpperCase() },
        { name: "Nickname:", value: `${user.nickname || "None"}` },
        {
          name: "Joined Server:",
          value: `${target.joinedAt.toLocaleString()}`,
        },
        {
          name: "Joined Discord:",
          value: new Date(user.createdTimestamp).toLocaleString(),
        }
      )
      .setThumbnail(avatar)
      .setColor("#00ffab");

    return message.channel.send(embed);
  },
};
