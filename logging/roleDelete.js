const loggingSchema = require("../schemas/logging-channel");
module.exports = (client, Discord) => {
  client.on("roleDelete", async (create) => {
    const logs = await create.guild.fetchAuditLogs({
      limit: 1,
      type: "ROLE_DELETE",
    });
    const log = logs.entries.first();
    if (!log) return;
    const { executor } = log;
    const logEmbed = new Discord.MessageEmbed()
      .setAuthor(`${executor.tag}`, executor.displayAvatarURL(String))
      .setTitle("Has deleted a role!")
      .setColor("RED")
      .addFields(
        { name: "User ID", value: `${executor.id}` },
        { name: "Role Name", value: `${create.name}` },
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
