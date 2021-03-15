const profileSchema = require("../../schemas/profile-schema");
module.exports = {
  commands: ["balance", "bal"],
  requiredChannel: "economy",
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel } = message;

    const target = message.mentions.users.first() || message.author;
    const guildId = guild.id;
    const userId = target.id;

    const result = await profileSchema.findOne({
      guildId,
      userId,
    });

    if (result) {
      const bank = result.bank || 0;
      const worth = bank + result.cash;
      const balanceEmbed = new Discord.MessageEmbed()
        .setAuthor(`${target.tag} `, target.displayAvatarURL(String))
        .setColor("#00c9ff")
        .addFields(
          {
            name: `Cash:`,
            value: `$${result.cash.toLocaleString()}`,
            inline: true,
          },
          {
            name: `Bank:‏‏‎`,
            value: `$${bank.toLocaleString()}`,
            inline: true,
          },
          {
            name: `Net Worth:`,
            value: `‏‏‎‎‏$${worth.toLocaleString()}`,
            inline: true,
          }
        )
        .setTimestamp();

      message.channel.send(balanceEmbed);
    } else {
      const balanceEmbed = new Discord.MessageEmbed()
        .setAuthor(`${target.tag} `, target.displayAvatarURL(String))
        .setColor("#00c9ff")
        .addFields(
          { name: `Cash:`, value: `$0`, inline: true },
          { name: `Bank:‏‏‎`, value: `$‏‏‎0`, inline: true },
          { name: `Net Worth:`, value: `‏‏‎‎‏$0`, inline: true }
        )
        .setTimestamp();

      message.channel.send(balanceEmbed);
    }
  },
};
