const levelUpRewardSchema = require("../schemas/leveling-reward");
const profileSchema = require("../schemas/profile-schema");
module.exports = (client) => {
  client.on("message", async (message) => {
    const { member } = message;
    const guildId = message.guild.id;
    const userId = message.author.id;
    const resultReward = await levelUpRewardSchema.findOne({
      guildId,
    });
    if (!resultReward) return;
    const result = await profileSchema.findOne({
      guildId,
      userId,
    });
    if (!result) return;
    for (reward of resultReward.reward) {
      const { role, level } = reward;
      if (result.level >= level) {
        const roleA = message.guild.roles.cache.get(role);
        await member.roles.add(roleA);
      }
    }
  });
};
