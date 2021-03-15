const loggingSchema = require("../schemas/logging-channel");
const check = new Set();
module.exports = (client, Discord) => {
  client.on("channelUpdate", async (channel) => {
    if (check.has(channel.guild.id)) return;
    const logs = await channel.guild.fetchAuditLogs({
      limit: 1,
      type: "CHANNEL_OVERWRITE_UPDATE",
    });
    const log = logs.entries.first();
    if (!log) return;
    const { executor } = log;
    const logEmbed = new Discord.MessageEmbed()
      .setAuthor(`${executor.tag}`, executor.displayAvatarURL(String))
      .setTitle("Has updated a channel")
      .setColor("RED")
      .addFields(
        { name: "Channel Name", value: channel.name },
        { name: "Channel Type", value: channel.type.toUpperCase() },
        { name: "Channel ID", value: channel.id },
        { name: "Role Update", value: log.extra.name }
      )
      .setTimestamp();

    const result = await loggingSchema.findOne({
      guildId: channel.guild.id,
    });
    if (!result) return;
    if (result.channel) {
      let logChannel = channel.guild.channels.cache.get(result.channel);
      logChannel.send(logEmbed);
      check.add(channel.guild.id);
      setTimeout(() => {
        check.delete(channel.guild.id);
      }, 1000 * 3);
    }
  });
};
