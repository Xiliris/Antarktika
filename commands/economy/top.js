const profileSchema = require("../../schemas/profile-schema");
module.exports = {
  commands: ["baltop", "balancetop", "topbal", "topbalance", "bal-top"],
  requiredChannel: "economy",
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel } = message;

    const guildId = guild.id;
    const userId = message.author.id;
    let top = "";

    const results = await profileSchema
      .find({
        guildId,
      })
      .sort({
        cash: -1,
        bank: -1,
      })
      .limit(10);

    for (let counter = 0; counter < results.length; ++counter) {
      const { userId, bank = 0, cash = 0 } = results[counter];
      const worth = bank + cash;

      top += `**${
        counter + 1
      }.** <@${userId}> ➣ $${worth.toLocaleString()}\n\n`;
    }

    const topEmbed = new Discord.MessageEmbed()
      .setTitle("BALANCE LEADERBOARD")
      .setColor("#00ffbe")
      .setDescription(top)
      .setTimestamp();

    message.channel.send(topEmbed);

    return top;
  },
};
