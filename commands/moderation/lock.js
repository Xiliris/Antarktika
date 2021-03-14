module.exports = {
  commands: "lock",
  permissions: ["ADMINISTRATOR"],
  requiredRoles: [],
  callback: async (message, arguments, Discord, text) => {
    const { channel, guild } = message;

    const avatar = message.author.displayAvatarURL({
      size: 4096,
      dynamic: true,
    });

    const lockchannel = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} `, avatar)
      .setColor("#ff0000")
      .setDescription("Has locked this channel!");

    message.channel.send(lockchannel);

    channel.updateOverwrite(message.guild.roles.everyone, {
      SEND_MESSAGES: false,
    });
  },
};
