const loggingSchema = require("../schemas/logging-channel");
module.exports = (client, Discord) => {
  client.on("message", async (message) => {
    if (message.content.length > 1000) {
      if (message.member.permissions.has("ADMINISTRATOR")) {
      } else {
        //Obrise poruku
        message.delete();

        client.on("messageDelete", async (messageDelete) => {
          const logEmbed = new Discord.MessageEmbed()
            .setAuthor(
              `${message.author.tag}`,
              message.author.displayAvatarURL(String)
            )
            .setColor("#ff0000")
            .addFields({
              name: `Tried to send blacklisted word:`,
              value: `${messageDelete.content}‏‏‎‎‏‏‎‎`,
            });

          const result = await loggingSchema.findOne({
            guildId: message.guild.id,
          });
          if (result.message) {
            let logChannel = message.guild.channels.cache.get(result.message);
            logChannel.send(logEmbed);
          }
        });

        //Posalje warn
        const antiAdd = new Discord.MessageEmbed()
          .setAuthor(
            `${message.author.tag} has been warned!`,
            message.author.displayAvatarURL(String)
          )
          .setColor("#ff00f8")
          .addFields({
            name: `Reason:`,
            value: `Duplicated Text`,
          });

        await message.channel.send(antiAdd);
      }
    }
  });
};
