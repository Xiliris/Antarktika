const { DiscordAPIError } = require("discord.js");
const lastMessageSchema = require("../schemas/lastMessage-schema");
module.exports = (client, Discord) => {
  client.on("message", async (message) => {
    const guildId = message.guild.id;
    const userId = message.author.id;
    const lastMessage = message.content;

    const result = await lastMessageSchema.findOne({
      guildId,
      userId,
    });
    if (message.member.hasPermission("ADMINISTRATOR")) return;
    if (result.message === lastMessage) {
      message.delete();
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setColor("RANDOM")
        .addFields({
          name: `Reason:`,
          value: `Please don't repeat yourself!`,
        })
        .setTimestamp();
      message.channel.send(embed);
      return;
    }
    await lastMessageSchema.findOneAndUpdate(
      {
        guildId,
        userId,
      },
      {
        guildId,
        userId,
        message: lastMessage,
      },
      {
        upsert: true,
      }
    );
  });
};
