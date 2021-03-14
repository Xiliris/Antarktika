module.exports = {
  commands: "update",
  cooldoown: 60 * 10,
  callback: async (message, arguments, Discord, text, client) => {
    const patch = ["- Nema"];
    const embed = new Discord.MessageEmbed()
      .setTitle("Update v0.0")
      .setDescription(patch)
      .setFooter("Thanks for helping! <3");
    message.channel.send(embed);
  },
};
