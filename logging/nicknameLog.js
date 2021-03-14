const loggingSchema = require("../schemas/logging-channel");
module.exports = (client, Discord) => {
  client.on("guildMemberUpdate", async (oldMember, newMember) => {
    if (!oldMember) return;
    if (!newMember) return;
    if (oldMember.nickname === newMember.nickname) return;
    const logEmbed = new Discord.MessageEmbed()
      .setAuthor(oldMember.user.tag, oldMember.user.displayAvatarURL(String))
      .addFields(
        {
          name: "Old Nickname",
          value: oldMember.nickname || oldMember.user.username,
        },
        {
          name: "New Nickname",
          value: newMember.nickname || oldMember.user.username,
        },
        {
          name: "ID",
          value: oldMember.user.id,
        }
      )
      .setColor("#ff0000")
      .setTimestamp();
    const result = await loggingSchema.findOne({
      guildId: oldMember.guild.id,
    });
    if (!result) return;
    if (result.user) {
      let logChannel = oldMember.guild.channels.cache.get(result.user);
      logChannel.send(logEmbed);
    }
  });
};
