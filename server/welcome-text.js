const { Message } = require("discord.js");
const channelSchema = require("../schemas/channel-schema");
const welcomeSchema = require("../schemas/welcome-schema");
module.exports = (client, Discord) => {
  client.on("guildMemberAdd", async (member) => {
    const result = await channelSchema.findOne({
      _id: member.guild.id,
    });
    if (!result.welcome) return;
    let channel = member.guild.channels.cache.get(result.welcomeText);
    if (!channel) return;
    const results = await welcomeSchema.findOne({
      guildId: member.guild.id,
    });
    if (!results) return;
    const { welcomeText } = results;
    const members = member.guild.members.cache.filter(
      (member) => !member.user.bot
    ).size;
    const text4 = welcomeText.replace(/~Player~/g, `${member.user.tag}`);
    const text3 = text4.replace(/~PlayerTag~/g, `<@${member.user.id}>`);
    const text2 = text3.replace(/~Guild~/g, `${member.guild.name}`);
    const text1 = text2.replace(/~Count~/g, `${members}`);
    channel.send(text1);
  });
};
