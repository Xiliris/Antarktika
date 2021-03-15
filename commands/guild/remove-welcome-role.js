const welcomeRoleSchema = require("../../schemas/welcome-role-schema");
module.exports = {
  commands: ["remove-welcome-role"],
  expectedArgs: "<Number>",
  minArgs: 1,
  permissions: ["ADMINISTRATOR"],
  callback: async (message, arguments, Discord, Canvas, text, client) => {
    if (isNaN(arguments[0])) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Must be a number!");
      message.channel.send(embed);
      return;
    }
    const result = await welcomeRoleSchema.findOne({
      guildId: message.guild.id,
    });
    if (!result) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | No Welcome Roles");
      message.channel.send(embed);
      return;
    }
    await welcomeRoleSchema.findOneAndUpdate(
      {
        guildId: message.guild.id,
      },
      {
        guildId: message.guild.id,
        $pull: {
          roles: result.roles[arguments[0] - 1],
        },
      },
      {
        upsert: true,
      }
    );
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
      .setDescription(`✅ | You removed ${arguments[0]}. role!`);
    message.channel.send(embed);
  },
};
