const channelSchema = require("../schemas/channel-schema");
const welcomeSchema = require("../schemas/welcome-schema");
module.exports = (client, Discord) => {
  client.on("guildMemberRemove", async (member) => {
    const result = await channelSchema.findOne({
      _id: member.guild.id,
    });
    if (!result.welcome) return;
    let channel = member.guild.channels.cache.get(result.leaveChannel);
    if (!channel) return;
    const results = await welcomeSchema.findOne({
      guildId: member.guild.id,
    });
    if (!results) return;
    const { leaveMessage } = results;
    const members = member.guild.members.cache.filter(
      (member) => !member.user.bot
    ).size;
    const text4 = leaveMessage.replace(/~Player~/g, `${member.user.tag}`);
    const text3 = text4.replace(/~PlayerTag~/g, `<@${member.user.id}>`);
    const text2 = text3.replace(/~Guild~/g, `${member.guild.name}`);
    const text1 = text2.replace(/~Count~/g, `${members}`);
    channel.send(text1);
  });
};
