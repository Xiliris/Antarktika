module.exports = {
  commands: ["server-info"],
  requiredChannel: "commands",
  callback: async (message, arguments, Discord, client) => {
    const { guild, channel } = message;

    const categories = guild.channels.cache.filter((c) => c.type === "category")
      .size;
    const voice = guild.channels.cache.filter((c) => c.type === "voice").size;
    const text = guild.channels.cache.filter((c) => c.type === "text").size;

    const members = guild.members.cache.filter((member) => !member.user.bot)
      .size;
    const bots = guild.members.cache.filter((member) => member.user.bot).size;

    const embed = new Discord.MessageEmbed()
      .addFields(
        { name: "Name", value: guild.name, inline: true },
        { name: "Owner", value: guild.owner.user.tag, inline: true },
        {
          name: "Created At",
          value: new Date(guild.createdTimestamp).toLocaleString(),
          inline: true,
        },
        {
          name: "Channels",
          value: `Total: ${
            categories + voice + text
          }\nCategories: ${categories}\nVoices: ${voice}\n Text: ${text}`,
          inline: true,
        },
        {
          name: "Members",
          value: `Total: ${guild.memberCount}\nMembers: ${members}\nBots: ${bots}\n`,
          inline: true,
        },
        {
          name: "Other",
          value: `Roles: ${guild.roles.cache.size}\n Emojis: ${guild.emojis.cache.size}`,
          inline: true,
        }
      )
      .setThumbnail(guild.iconURL())
      .setColor("#00ffab");

    return message.channel.send(embed);
  },
};
