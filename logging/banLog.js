const loggingSchema = require("../schemas/logging-channel");
const logUserSchema = require("../schemas/log-user-schema");
module.exports = (client, Discord) => {
  client.on("guildBanAdd", async (guild, user) => {
    const banLogs = await guild.fetchAuditLogs({
      limit: 1,
      type: "MEMBER_BAN_ADD",
    });
    const banLog = banLogs.entries.first();

    if (!banLog) return;

    const { executor, target, reason } = banLog;
    if (target.id === user.id) {
      const checking = await logUserSchema.findOne({
        _id: guild.id,
      });
      let mem;
      let avatar;
      if (checking.ban) {
        mem = checking.ban;
        avatar = checking.banAvatar;
      } else {
        mem = executor.tag;
        avatar = executor.displayAvatarURL(String);
      }
      const logEmbed = new Discord.MessageEmbed()
        .setAuthor(`${mem} has banned ${target.tag}`, avatar)
        .setThumbnail(target.displayAvatarURL(String))
        .setColor("#ff0000")
        .addFields({ name: "Reason", value: reason || "Reason Unspecified" })
        .setTimestamp();

      const result = await loggingSchema.findOne({
        guildId: guild.id,
      });
      if (!result) return;
      if (result.ban) {
        let logChannel = guild.channels.cache.get(result.ban);
        logChannel.send(logEmbed);
      }
    }
  });
};
