const counterSchema = require("../schemas/counter-schema");
module.exports = (client) => {
  setInterval(async () => {
    for (const guild of client.guilds.cache) {
      //MEMBERS
      const server = guild[1];
      const guildId = guild[1].id;
      const result = await counterSchema.findOne({
        guildId,
      });
      if (!result) return;
      if (result.memberChannel) {
        const members = server.members.cache.filter(
          (member) => !member.user.bot
        ).size;
        const channel = server.channels.cache.get(result.memberChannel);
        if (!channel) return;
        const channelArray = channel.name.split(" ");
        const count = (channelArray[channelArray.length - 1] = members);
        channelArray.length = channelArray.length - 1;
        const name = `${channelArray} ${count}`;
        const finalName = name.toString().replace(/,/g, " ");
        channel.setName(finalName);
      }
      //BOTS
      if (result.botsChannel) {
        const bots = server.members.cache.filter((member) => member.user.bot)
          .size;
        const channel = server.channels.cache.get(result.botsChannel);
        if (!channel) return;
        const channelArray = channel.name.split(" ");
        const count = (channelArray[channelArray.length - 1] = bots);
        channelArray.length = channelArray.length - 1;
        const name = `${channelArray} ${count}`;
        const finalName = name.toString().replace(/,/g, " ");
        channel.setName(finalName);
      }
    }
  }, 1000 * 60 * 5);
};
