const loggingSchema = require("../schemas/logging-channel");
const logUserSchema = require("../schemas/log-user-schema");
module.exports = (client, Discord) => {
  client.on("guildBanRemove", async (guild, user) => {
    const banLogs = await guild.fetchAuditLogs({
      limit: 1,
      type: "MEMBER_BAN_REMOVE",
    });
    const banLog = banLogs.entries.first();

    if (!banLog) return;

    const { executor, target } = banLog;
    if (target.id === user.id) {
      const checking = await logUserSchema.findOne({
        _id: guild.id,
      });
      let mem;
      let avatar;
      if (checking.unban) {
        mem = checking.unban;
        avatar = checking.unbanAvatar;
      } else {
        mem = executor.tag;
        avatar = executor.displayAvatarURL(String);
      }
      const logEmbed = new Discord.MessageEmbed()
        .setAuthor(`${mem} Has unbanned ${target.tag}`, avatar)
        .setThumbnail(target.displayAvatarURL(String))
        .addFields({ name: "ID", value: target.id })
        .setColor("#ff0000")
        .setTimestamp();

      const result = await loggingSchema.findOne({
        guildId: guild.id,
      });
      if (!result) return;
      if (result.unban) {
        let logChannel = guild.channels.cache.get(result.unban);
        logChannel.send(logEmbed);
      }
    }
  });
};
