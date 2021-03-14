const loggingSchema = require("../schemas/logging-channel");
let check;
const logUserSchema = require("../schemas/log-user-schema");
module.exports = (client, Discord) => {
  client.on("guildMemberRemove", async (member) => {
    const kickLogs = await member.guild.fetchAuditLogs({
      limit: 1,
      type: "MEMBER_KICK",
    });
    const kickLog = kickLogs.entries.first();

    if (!kickLog) return;
    if (kickLog.action !== "MEMBER_KICK") return;

    const { executor, target, reason } = kickLog;
    if (target.id === member.id) {
      if (target.id === check) return;
      check = target.id;
      const checking = await logUserSchema.findOne({
        _id: member.guild.id,
      });
      let mem;
      let avatar;
      if (checking.kick) {
        mem = checking.kick;
        avatar = checking.kickAvatar;
      } else {
        mem = executor.tag;
        avatar = executor.displayAvatarURL(String);
      }
      const logEmbed = new Discord.MessageEmbed()
        .setAuthor(`${mem} has kicked ${target.tag}`, avatar)
        .setThumbnail(target.displayAvatarURL(String))
        .setColor("#ff0000")
        .addFields({ name: "Reason", value: reason || "Reason Unspecified" })
        .setTimestamp();

      const result = await loggingSchema.findOne({
        guildId: member.guild.id,
      });
      if (!result) return;
      if (result.kick) {
        let logChannel = member.guild.channels.cache.get(result.kick);
        logChannel.send(logEmbed);
      }
    }
  });
};
