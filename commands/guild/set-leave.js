const welcomeSchema = require("../../schemas/welcome-schema");
module.exports = {
  commands: "set-leave-message",
  expectedArgs:
    "<Some Welcome Message> \n\n~Player~ for username\n~PlayerTag~ for tag~\n~Guild~ for guild name\n~Count~ for member count\n\nTo work it needs to be typed just like this!",
  minArgs: 2,
  permissions: ["ADMINISTRATOR"],
  callback: async (message, arguments, Discord, client) => {
    const text = arguments.slice(0).join(" ");
    await welcomeSchema.findOneAndUpdate(
      {
        guildId: message.guild.id,
      },
      {
        guildId: message.guild.id,
        leaveMessage: text,
      },
      {
        upsert: true,
      }
    );
    message.channel.send(text);
  },
};
