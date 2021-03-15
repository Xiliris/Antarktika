const loggingSchema = require("../schemas/logging-channel");
module.exports = (client, Discord) => {
  client.on("roleUpdate", async (oldRole, newRole) => {
    const logs = await oldRole.guild.fetchAuditLogs({
      limit: 1,
      type: "ROLE_UPDATE",
    });
    const log = logs.entries.first();
    if (!log) return;
    if (oldRole.name !== newRole.name) {
      const { executor } = log;
      const logEmbed = new Discord.MessageEmbed()
        .setAuthor(executor.tag, executor.displayAvatarURL(String))
        .setTitle("Has updated a role!")
        .addFields(
          { name: "Old Role Name", value: `${oldRole.name}` },
          { name: "New Role Name", value: `${newRole.name}` },
          { name: "Role ID", value: `${log.target.id}` }
        );
      const result = await loggingSchema.findOne({
        guildId: oldRole.guild.id,
      });
      if (result.server) {
        let logChannel = oldRole.guild.channels.cache.get(result.server);
        logChannel.send(logEmbed);
      }
      return;
    }
    const { executor } = log;
    const logEmbed = new Discord.MessageEmbed()
      .setAuthor(executor.tag, executor.displayAvatarURL(String))
      .setTitle("Has updated a role!")
      .addFields(
        { name: "Role Name", value: `${log.target.name}` },
        { name: "Role ID", value: `${log.target.id}` }
      );
    const result = await loggingSchema.findOne({
      guildId: oldRole.guild.id,
    });
    if (!result) return;
    if (result.server) {
      let logChannel = oldRole.guild.channels.cache.get(result.server);
      logChannel.send(logEmbed);
    }
  });
};
