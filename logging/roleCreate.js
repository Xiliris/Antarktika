const loggingSchema = require("../schemas/logging-channel");
module.exports = (client, Discord) => {
  client.on("roleCreate", async (create) => {
    const logs = await create.guild.fetchAuditLogs({
      limit: 1,
      type: "ROLE_CREATE",
    });
    const log = logs.entries.first();
    if (!log) return;
    const { executor } = log;
    const logEmbed = new Discord.MessageEmbed()
      .setAuthor(`${executor.tag}`, executor.displayAvatarURL(String))
      .setTitle("Has created a role!")
      .setColor("GREEN")
      .addFields(
        { name: "User ID", value: `${executor.id}` },
        { name: "Role ID", value: `${create.id}` }
      )
      .setTimestamp();
    const result = await loggingSchema.findOne({
      guildId: create.guild.id,
    });
    if (!result) return;
    if (result.server) {
      let logChannel = create.guild.channels.cache.get(result.server);
      logChannel.send(logEmbed);
    }
  });
};
