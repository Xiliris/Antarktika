module.exports = {
  commands: ["8ball"],
  requiredChannel: "commands",
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel } = message;

    const numbers = [
      "JUST DO IT!",
      "Yeah try it!",
      "Maybe not sure!",
      "I don't recommend it!",
      "DONT DO IT!",
    ];
    const dice = numbers[Math.floor(Math.random() * numbers.length)];

    const embed = new Discord.MessageEmbed()
      .setAuthor(
        message.member.user.tag,
        message.member.user.displayAvatarURL(String)
      )
      .setDescription(dice)
      .setColor("RANDOM");
    message.channel.send(embed);
  },
};
