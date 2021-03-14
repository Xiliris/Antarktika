const roleCountSchema = require("../schemas/role-count-schema");
module.exports = (client) => {
  setInterval(async () => {
    for (const guild of client.guilds.cache) {
      //MEMBERS
      const server = guild[1];
      const guildId = guild[1].id;
      const result = await roleCountSchema.findOne({
        _id: guildId,
      });
      if (!result) return;
      for (const count of result.counter) {
        const { roleId, channelId } = count;
        let channel = server.channels.cache.get(channelId);
        let role = server.roles.cache.get(roleId).members;

        if (channel) return;
        if (role) return;
        const channelArray = channel.name.split(" ");
        const roleSize = (channelArray[channelArray.length - 1] = role.size);
        channelArray.length = channelArray.length - 1;
        const name = `${channelArray} ${roleSize}`;
        const finalName = name.toString().replace(/,/g, " ");
        channel.setName(finalName);
        console.log(finalName);
      }
    }
  }, 3000);
};
