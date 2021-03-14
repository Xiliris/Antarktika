const profileSchema = require("../../schemas/profile-schema");
module.exports = {
  commands: ["afk"],
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel } = message;
    const user = message.author;
    const guildId = guild.id;
    const userId = message.author.id;
    const username = message.member.displayName;
    const result = await profileSchema.findOne({
      guildId,
      userId,
    });
    if (result.afk === true) {
      const endNick = username.replace("[AFK] ", "");
      message.member.setNickname(endNick).catch((err) => {});
      await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          afk: false,
          afkSince: new Date().getTime(),
        },
        {
          upsert: false,
        }
      );
      const Embed = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL(String))
        .setDescription("‎‎‏‏‎❎ | Is no logner AFK")
        .setTimestamp();
      message.channel.send(Embed);
      return;
    } else if (result.afk === false) {
      message.member.setNickname(`[AFK] ` + username).catch((err) => {});
      await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          afk: true,
          afkSince: new Date().getTime(),
        },
        {
          upsert: true,
        }
      );
    }
    const Embed = new Discord.MessageEmbed()
      .setAuthor(user.tag, user.displayAvatarURL(String))
      .setDescription("‏‏‎‏‏‎‏‏‎‏‏‎‏‏‎‏‏‎✅ | You are now AFK")
      .setTimestamp();
    message.channel.send(Embed);
    return;
  },
};
