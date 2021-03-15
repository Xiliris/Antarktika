const reportSchema = require("../../schemas/report-schema");
module.exports = {
  commands: "report",
  expectedArgs: "<Text>",
  minArgs: 1,
  cooldoown: 60 * 10,
  callback: async (message, arguments, Discord, text, client) => {
    const reason = arguments.slice(0).join(" ");
    await reportSchema.findOneAndUpdate(
      {
        user: message.author.tag,
        text: reason,
      },
      {
        user: message.author.tag,
        text: reason,
      },
      {
        upsert: true,
      }
    );
    message.delete();
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
      .setDescription("✅ | Successfully sent a report!");
    message.channel.send(embed);
  },
};
