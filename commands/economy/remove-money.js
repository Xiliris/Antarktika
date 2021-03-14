const profileSchema = require("../../schemas/profile-schema");
module.exports = {
  commands: ["remove-money", "removemoney"],
  permissions: ["ADMINISTRATOR"],
  expectedArgs: "<Tag> <Number>",
  minArgs: 2,
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel } = message;

    const target = message.mentions.users.first();
    const args = message.content.split(" ").slice(1); // Svi argumenti poslje prefixa

    const guildId = guild.id;
    const userId = target.id;

    if (!target) return message.channel.send("**Couldn't find that user!**");
    if (isNaN(args[1]))
      return message.channel.send(
        "**Please enter the amount of money you want to give!**"
      );

    await profileSchema.findOneAndUpdate(
      {
        guildId,
        userId,
      },
      {
        guildId,
        userId,
        $inc: {
          cash: -args[1],
          bank: 0,
        },
      },
      {
        upsert: true,
      }
    );
    const balanceEmbed = new Discord.MessageEmbed()
      .setAuthor(`${target.tag} `, target.displayAvatarURL(String))
      .setColor("#ff0000")
      .setTitle(`You sucessfully removed $${args[1].toLocaleString()} in cash!`)
      .setFooter("Bot Developer Xiliris")
      .setTimestamp();

    message.channel.send(balanceEmbed);
  },
};
