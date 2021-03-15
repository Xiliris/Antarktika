module.exports = {
  commands: "unlock",
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
      .setColor("#0bff00")
      .setDescription("Has unlocked this channel!");

    message.channel.send(lockchannel);

    channel.updateOverwrite(message.guild.roles.everyone, {
      SEND_MESSAGES: true,
    });
  },
};
