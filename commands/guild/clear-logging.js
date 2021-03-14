const loggingSchema = require("../../schemas/logging-channel");
module.exports = {
  commands: "clear-logging",
  permissions: ["ADMINISTRATOR"],
  requiredRoles: [],
  callback: async (message, arguments, Discord, text, client) => {
    const { guild } = message;
    await loggingSchema.findOneAndDelete({
      guildId,
    });
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
      .setDescription("✅ | Sucessfully cleared all logged channels");
    message.channel.send(embed);
  },
};
