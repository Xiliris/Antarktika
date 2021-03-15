const profileSchema = require("../../schemas/profile-schema");
module.exports = {
  commands: ["topxp", "top-xp", "leaderboard-xp"],
  requiredChannel: "commands",
  callback: async (message, arguments, Discord, Canvas, text, client) => {
    const { guild, channel } = message;

    let top = "";

    const results = await profileSchema
      .find({
        guildId: guild.id,
      })
      .sort({
        level: -1,
      })
      .limit(10);

    for (let counter = 0; counter < results.length; ++counter) {
      const { userId, level = 1, xp = 0 } = results[counter];

      const exp = level * level * 150 + xp;

      top += `**${
        counter + 1
      }.** <@${userId}>\n➣ LEVEL : ${level.toLocaleString()} \n➣ XP: ${exp}\n\n`;
    }

    const topEmbed = new Discord.MessageEmbed()
      .setTitle("RANK LEADERBOARD")
      .setColor("#00ffbe")
      .setDescription(top)
      .setTimestamp();

    message.channel.send(topEmbed);

    return top;
  },
};
