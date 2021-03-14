const loggingSchema = require("../schemas/logging-channel");
module.exports = (client, Discord) => {
  client.on("channelCreate", async (channel) => {
    const logs = await channel.guild.fetchAuditLogs({
      limit: 1,
      type: "CHANNEL_CREATE",
    });
    const log = logs.entries.first();
    if (!log) return;
    const { executor } = log;
    const logEmbed = new Discord.MessageEmbed()
      .setAuthor(`${executor.tag}`, executor.displayAvatarURL(String))
      .setTitle("Has created a channel")
      .setColor("BLUE")
      .addFields(
        { name: "Channel Name", value: channel.name },
        { name: "Channel Type", value: channel.type.toUpperCase() },
        { name: "Channel ID", value: channel.id }
      )
      .setTimestamp();

    const result = await loggingSchema.findOne({
      guildId: channel.guild.id,
    });
    if (!result) return;
    if (result.channel) {
      let logChannel = channel.guild.channels.cache.get(result.channel);
      logChannel.send(logEmbed);
    }
  });
};
