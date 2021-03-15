const loggingSchema = require("../schemas/logging-channel");
let check = {};
module.exports = (client, Discord) => {
  client.on("voiceStateUpdate", async (oldMember, newMember) => {
    const guildId = oldMember.guild.id;
    let data = check[guildId];
    const moveLogs = await oldMember.guild.fetchAuditLogs({
      type: "MEMBER_MOVE",
    });
    const moveLog = moveLogs.entries.first();
    let newUserChannel = newMember.channelID;
    let oldUserChannel = oldMember.channelID;
    let oldChannel = oldMember.guild.channels.cache.get(oldUserChannel);
    let newChannel = newMember.guild.channels.cache.get(newUserChannel);
    if (!moveLog) return;
    if (!newUserChannel) return;
    if (!oldUserChannel) return;
    if (!data) return (data = check[guildId] = moveLogs.entries.size);
    if (data > moveLogs.entries.size) return;
    if (data === moveLogs.entries.size) return;
    data = check[guildId] = moveLogs.entries.size;
    let { executor } = moveLog;
    let logEmbed = new Discord.MessageEmbed()
      .setAuthor(
        `${executor.tag} moved ${newMember.member.user.username}`,
        executor.displayAvatarURL(String)
      )
      .setThumbnail(newMember.member.user.displayAvatarURL(String))
      .setColor("BLUE")
      .addFields(
        { name: "Previous Channel", value: `${oldChannel.name}` },
        { name: "Current Channel", value: `${newChannel.name}` },
        { name: "Event Time", value: `${new Date().toLocaleString()}` }
      )
      .setTimestamp();
    const result = await loggingSchema.findOne({
      guildId: newMember.guild.id,
    });
    if (!result) return;
    if (result.move) {
      let logChannel = newMember.guild.channels.cache.get(result.move);
      logChannel.send(logEmbed);
    }
  });
};
