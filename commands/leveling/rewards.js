const levelUpRewardSchema = require("../../schemas/leveling-reward");
module.exports = {
  commands: ["rewards"],
  callback: async (message, arguments, Discord, Canvas, client) => {
    const result = await levelUpRewardSchema.findOne({
      guildId: message.guild.id,
    });
    let text;
    let count = 0;
    for (rewards of result.reward) {
      const { role, level } = rewards;
      const roles = message.guild.roles.cache.get(role);
      count++;
      text += `${count} : For Level ${level} you get role ${roles.name}\n\n`;
    }
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
      .setDescription(text.replace(/undefined/, ""))
      .setFooter("To remove use !remove-reward <Number>");
    message.channel.send(embed);
  },
};
