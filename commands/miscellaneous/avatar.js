module.exports = {
  commands: ["avatar"],
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
    // 4096 is the new biggest size of the avatar.
    // Enabling the dynamic, when the user avatar was animated/GIF, it will result as a GIF format.
    // If it's not animated, it will result as a normal image format.

    const embed = new Discord.MessageEmbed()
      .setAuthor(`${user.tag}`, `${avatar}`)
      .setDescription(`[**STEAL.COM**](${avatar})`)
      .setColor(0x1d1d1d)
      .setImage(avatar)
      .setFooter(
        `Requested by ${message.author.tag}`,
        `${message.author.displayAvatarURL(String)}`
      );

    return message.channel.send(embed);
  },
};
