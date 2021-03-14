const loggingSchema = require("../schemas/logging-channel");
module.exports = (client, Discord, messageDelete) => {
  client.on("messageUpdate", async (oldMessage, newMessage) => {
    if (!oldMessage.content) return;
    if (!newMessage.content) return;
    const logEmbed = new Discord.MessageEmbed()
      .setAuthor(
        `${oldMessage.author.tag}`,
        oldMessage.author.displayAvatarURL(String)
      )
      .setTitle("Edited a message")
      .setColor("#ff0000")
      .addFields(
        { name: "Old Message", value: `${oldMessage.content}` },
        { name: "New Message", value: `${newMessage.content}` }
      )
      .setTimestamp();
    const result = await loggingSchema.findOne({
      guildId: oldMessage.guild.id,
    });
    if (!result) return;
    if (result.message) {
      let logChannel = oldMessage.guild.channels.cache.get(result.message);
      logChannel.send(logEmbed);
    }
  });
};
