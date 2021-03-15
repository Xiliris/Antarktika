const TimeAgo = require("javascript-time-ago");
const en = require("javascript-time-ago/locale/en");
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const profileSchema = require("../schemas/profile-schema");
module.exports = (client, Discord) => {
  client.on("message", async (message) => {
    const user = message.mentions.users.first();
    if (user) {
      const guildId = message.guild.id;
      const userId = user.id;
      const result = await profileSchema.findOne({
        guildId,
        userId,
      });
      if (!result) return;
      if (result.afk === true) {
        const embed = new Discord.MessageEmbed()
          .setAuthor(user.tag, user.displayAvatarURL(String))
          .setDescription(
            `⏱️ | Has been AFK for ${timeAgo
              .format(new Date(result.afkSince))
              .replace(/ago/, "")}`
          );
        message.channel.send(embed);
      } else return;
    }
  });
};
