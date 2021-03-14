const profileSchema = require("../schemas/profile-schema");
module.exports = (client) => {
  client.on("message", async (message) => {
    const { guild } = message;
    const guildId = guild.id;
    const userId = message.author.id;
    if (message.author.bot) return;
    await profileSchema.findOneAndUpdate(
      {
        guildId,
        userId,
      },
      {
        guildId,
        userId,
        $inc: {
          message: 1,
        },
      },
      {
        upsert: true,
      }
    );
  });
};
