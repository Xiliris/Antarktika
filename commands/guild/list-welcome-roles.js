<<<<<<< HEAD
const welcomeRoleSchema = require("../../schemas/welcome-role-schema");
module.exports = {
  commands: ["list-welcome-roles"],
  callback: async (message, arguments, Discord, Canvas, client) => {
    const result = await welcomeRoleSchema.findOne({
      guildId: message.guild.id,
    });
    let text;
    let count = 0;
    for (rewards of result.roles) {
      const { role } = rewards;
      const roles = message.guild.roles.cache.get(role);
      count++;
      text += `${count}.\nRole Name : ${roles.name} \nRole ID: ${roles.id}\n\n`;
    }
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
      .setDescription(text.replace(/undefined/, ""))
      .setFooter("To remove use !remove-welcome-role <Number>");
    message.channel.send(embed);
  },
};
=======
const welcomeRoleSchema = require("../../schemas/welcome-role-schema");
module.exports = {
  commands: ["list-welcome-roles"],
  callback: async (message, arguments, Discord, Canvas, client) => {
    const result = await welcomeRoleSchema.findOne({
      guildId: message.guild.id,
    });
    let text;
    let count = 0;
    for (rewards of result.roles) {
      const { role } = rewards;
      const roles = message.guild.roles.cache.get(role);
      count++;
      text += `${count}.\nRole Name : ${roles.name} \nRole ID: ${roles.id}\n\n`;
    }
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
      .setDescription(text.replace(/undefined/, ""))
      .setFooter("To remove use !remove-welcome-role <Number>");
    message.channel.send(embed);
  },
};
>>>>>>> 8a3754cccb498051759a59e25235a1c862f0b9a4
