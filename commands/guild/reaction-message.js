const reactionSchema = require("../../schemas/reaction-schema");
module.exports = {
  commands: ["reaction-message", "rrmsg"],
  expectedArgs: "<Channel>",
  minArgs: 1,
  permissions: ["ADMINISTRATOR"],
  callback: async (message, arguments, Discord, text, client) => {
    const { guild } = message;
    const channel = guild.channels.cache.get(arguments[0]);
    if (!channel) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Couldn't find that channel!")
        .setTimestamp();
      message.channel.send(embed);
      return;
    }
    const filter = (m) => m.content;
    message.channel.send("**Please enter your text**").then(async () => {
      message.channel
        .awaitMessages(filter, { max: 1, time: 1000 * 60, errors: ["time"] })
        .then(async (collected) => {
          const text = collected.first().content;

          const newMessage = await channel.send(text);

          new reactionSchema({
            guildId: message.guild.id,
            channelId: channel.id,
            messageId: newMessage.id,
          })
            .save()
            .catch(() =>
              message.channel.send(
                "**Something went wrong saving to our database, please report this!**"
              )
            );
        });
    });
  },
};
