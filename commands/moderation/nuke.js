module.exports = {
  commands: "nuke",
  permissions: ["ADMINISTRATOR"],
  requiredRoles: [],
  callback: async (message, arguments, Discord, text, client) => {
    const { guild } = message;

    const nukeChannel = message.channel;

    const sendChannel = guild.channels.cache.get(nukeChannel.id);

    if (!nukeChannel.deletable) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
        .setDescription(`❌ | You can't nuke this channel!`);
      message.channel.send(embed);
      return;
    }

    const nukeEmbed = new Discord.MessageEmbed()
      .setAuthor(
        `${message.author.tag}`,
        message.author.displayAvatarURL(String)
      )
      .setDescription("This channel has been nuked!")
      .setColor("#ff8b00")
      .setThumbnail("https://media.giphy.com/media/oe33xf3B50fsc/giphy.gif");

    const posch = nukeChannel.position;

    await nukeChannel.clone().then((channel) => {
      channel.send(nukeEmbed).then((message) => {
        setTimeout(() => {
          message.delete();
        }, 1000 * 5);
      });
    });
    await nukeChannel.delete().catch((err) => console.log(err));
    await nukeChannel.setPosition(posch).catch((err) => console.log(err));
  },
};
