const reactionSchema = require("../schemas/reaction-schema");
module.exports = async (client) => {
  client.on("messageReactionAdd", async (reaction, user) => {
    const results = await reactionSchema.find({});
    for (result of results) {
      const { guildId, channelId, messageId, roles } = result;
      if (user.bot) return;
      if (channelId !== reaction.message.channel.id) {
      } else if (messageId !== reaction.message.id) {
      } else {
        const guild = client.guilds.cache.get(guildId);

        for (reactions of roles) {
          let { role, emoji } = reactions;
          if (emoji === reaction._emoji.name) {
            let roleSet = guild.roles.cache.get(role);
            if (!roleSet) return;
            let target = guild.members.cache.get(user.id);
            target.roles.add(roleSet);
          }
        }
      }
    }
  });

  client.on("messageReactionRemove", async (reaction, user) => {
    const results = await reactionSchema.find();
    for (result of results) {
      const { guildId, channelId, messageId, roles } = result;

      if (channelId !== reaction.message.channel.id) {
      } else if (messageId !== reaction.message.id) {
      } else {
        const guild = client.guilds.cache.get(guildId);

        for (reactions of roles) {
          let { role, emoji } = reactions;
          if (emoji === reaction._emoji.name) {
            let roleSet = guild.roles.cache.get(role);
            if (!roleSet) return;
            let target = guild.members.cache.get(user.id);
            target.roles.remove(roleSet);
          }
        }
      }
    }
  });
};
