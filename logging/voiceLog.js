const loggingSchema = require("../schemas/logging-channel");
module.exports = (client, Discord) => {
  client.on("voiceStateUpdate", async (oldMember, newMember) => {
    let newUserChannel = newMember.channelID;
    let oldUserChannel = oldMember.channelID;
    if (newUserChannel) {
      const channel = oldMember.guild.channels.cache.get(newUserChannel);
      const logEmbed = new Discord.MessageEmbed()
        .setAuthor(
          `${oldMember.member.user.username}`,
          oldMember.member.user.displayAvatarURL(String)
        )
        .setColor("GREEN")
        .addFields(
          { name: "Has Joined Channel:", value: `${channel.name}` },
          { name: "Has Joined at:", value: `${new Date().toLocaleString()}` }
        )
        .setTimestamp();
      const result = await loggingSchema.findOne({
        guildId: oldMember.guild.id,
      });
      if (result.voice) {
        let logChannel = oldMember.guild.channels.cache.get(result.voice);
        logChannel.send(logEmbed);
      }
    } else {
      const channel = oldMember.guild.channels.cache.get(oldUserChannel);
      const logEmbed = new Discord.MessageEmbed()
        .setAuthor(
          `${oldMember.member.user.username}`,
          oldMember.member.user.displayAvatarURL(String)
        )
        .setColor("RED")
        .addFields(
          { name: "Has Left Channel:", value: `${channel.name}` },
          { name: "Has Left at:", value: `${new Date().toLocaleString()}` }
        )
        .setTimestamp();
      const result = await loggingSchema.findOne({
        guildId: oldMember.guild.id,
      });
      if (!result) return;
      if (result.voice) {
        let logChannel = oldMember.guild.channels.cache.get(result.voice);
        logChannel.send(logEmbed);
      }
    }
  });
};
