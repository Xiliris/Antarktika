const loggingSchema = require("../schemas/logging-channel");
module.exports = (client, Discord) => {
  client.on("channelUpdate", async (oldChannel, newChannel) => {
    const logs = await oldChannel.guild.fetchAuditLogs({
      limit: 1,
      type: "CHANNEL_UPDATE",
    });
    const log = logs.entries.first();
    if (!log) return;
    if (!oldChannel) return;
    if (!newChannel) return;
    if (oldChannel.name === newChannel.name) return;
    const { executor } = log;
    const logEmbed = new Discord.MessageEmbed()
      .setAuthor(`${executor.tag}`, executor.displayAvatarURL(String))
      .setTitle("Has updated a channel")
      .setColor("RED")
      .addFields(
        { name: "Channel Old Name", value: oldChannel.name },
        { name: "Channel New Name", value: newChannel.name },
        { name: "Channel Type", value: oldChannel.type.toUpperCase() },
        { name: "Channel ID", value: oldChannel.id }
      )
      .setTimestamp();

    const result = await loggingSchema.findOne({
      guildId: oldChannel.guild.id,
    });
    if (!result) return;
    if (result.channel) {
      let logChannel = oldChannel.guild.channels.cache.get(result.channel);
      logChannel.send(logEmbed);
    }
  });
};
