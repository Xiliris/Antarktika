<<<<<<< HEAD
const loggingSchema = require("../schemas/logging-channel");
module.exports = (client, Discord) => {
  client.on("guildMemberUpdate", async (oldMember, newMember) => {
    // Old roles Collection is higher in size than the new one. A role has been removed.
    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
      // Checking logs
      const roleLogs = await newMember.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_ROLE_UPDATE",
      });
      const roleLog = roleLogs.entries.first();

      if (!roleLog) return;

      const { executor } = roleLog;
      // Creating an embed message.
      const Embed = new Discord.MessageEmbed();
      Embed.setColor("RED");
      Embed.setAuthor(
        `${executor.tag} Updated role for ${oldMember.user.tag}`,
        executor.displayAvatarURL(String)
      );
      Embed.setThumbnail(newMember.user.avatarURL(String));

      // Looping through the role and checking which role was removed.
      oldMember.roles.cache.forEach((role) => {
        if (!newMember.roles.cache.has(role.id)) {
          Embed.addField("Removed Role", role);
        }
      });
      const result = await loggingSchema.findOne({
        guildId: oldMember.guild.id,
      });
      if (!result) return;
      if (result.user) {
        let logChannel = oldMember.guild.channels.cache.get(result.user);
        logChannel.send(Embed);
      }
    } else if (oldMember.roles.cache.size < newMember.roles.cache.size) {
      const roleLogs = await newMember.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_ROLE_UPDATE",
      });
      const roleLog = roleLogs.entries.first();

      if (!roleLog) return;

      const { executor } = roleLog;
      // Creating an embed message.
      const Embed = new Discord.MessageEmbed();
      Embed.setColor("GREEN");
      Embed.setAuthor(
        `${executor.tag} Updated role for ${oldMember.user.tag}`,
        executor.displayAvatarURL(String)
      );
      Embed.setThumbnail(newMember.user.avatarURL(String));

      // Looping through the role and checking which role was added.
      newMember.roles.cache.forEach((role) => {
        if (!oldMember.roles.cache.has(role.id)) {
          Embed.addField("Added Role", role);
        }
      });
      const result = await loggingSchema.findOne({
        guildId: oldMember.guild.id,
      });
      if (!result) return;
      if (result.user) {
        let logChannel = oldMember.guild.channels.cache.get(result.user);
        logChannel.send(Embed);
      }
    }
  });
};
=======
const loggingSchema = require("../schemas/logging-channel");
module.exports = (client, Discord) => {
  client.on("guildMemberUpdate", async (oldMember, newMember) => {
    // Old roles Collection is higher in size than the new one. A role has been removed.
    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
      // Checking logs
      const roleLogs = await newMember.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_ROLE_UPDATE",
      });
      const roleLog = roleLogs.entries.first();

      if (!roleLog) return;

      const { executor } = roleLog;
      // Creating an embed message.
      const Embed = new Discord.MessageEmbed();
      Embed.setColor("RED");
      Embed.setAuthor(
        `${executor.tag} Updated role for ${oldMember.user.tag}`,
        executor.displayAvatarURL(String)
      );
      Embed.setThumbnail(newMember.user.avatarURL(String));

      // Looping through the role and checking which role was removed.
      oldMember.roles.cache.forEach((role) => {
        if (!newMember.roles.cache.has(role.id)) {
          Embed.addField("Removed Role", role);
        }
      });
      const result = await loggingSchema.findOne({
        guildId: oldMember.guild.id,
      });
      if (!result) return;
      if (result.user) {
        let logChannel = oldMember.guild.channels.cache.get(result.user);
        logChannel.send(Embed);
      }
    } else if (oldMember.roles.cache.size < newMember.roles.cache.size) {
      const roleLogs = await newMember.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_ROLE_UPDATE",
      });
      const roleLog = roleLogs.entries.first();

      if (!roleLog) return;

      const { executor } = roleLog;
      // Creating an embed message.
      const Embed = new Discord.MessageEmbed();
      Embed.setColor("GREEN");
      Embed.setAuthor(
        `${executor.tag} Updated role for ${oldMember.user.tag}`,
        executor.displayAvatarURL(String)
      );
      Embed.setThumbnail(newMember.user.avatarURL(String));

      // Looping through the role and checking which role was added.
      newMember.roles.cache.forEach((role) => {
        if (!oldMember.roles.cache.has(role.id)) {
          Embed.addField("Added Role", role);
        }
      });
      const result = await loggingSchema.findOne({
        guildId: oldMember.guild.id,
      });
      if (!result) return;
      if (result.user) {
        let logChannel = oldMember.guild.channels.cache.get(result.user);
        logChannel.send(Embed);
      }
    }
  });
};
>>>>>>> 8a3754cccb498051759a59e25235a1c862f0b9a4
