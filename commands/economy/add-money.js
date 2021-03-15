const profileSchema = require("../../schemas/profile-schema");
module.exports = {
  commands: ["add-money", "addmoney"],
  permissions: ["ADMINISTRATOR"],
  expectedArgs: "<Tag> <Number>",
  minArgs: 2,
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel } = message;

    const target = message.mentions.users.first();
    const args = message.content.split(" ").slice(1); // Svi argumenti poslje prefixa

    const guildId = guild.id;
    const userId = target.id;

    if (!target) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Couldn't find that user!");
      message.channel.send(embed);
      return;
    }
    if (isNaN(args[1])) {
      const notEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription(
          "❌ | Please enter the amount of money you want to give!"
        );
      message.channel.send(notEmbed);
      return;
    }

    await profileSchema.findOneAndUpdate(
      {
        guildId,
        userId,
      },
      {
        guildId,
        userId,
        $inc: {
          cash: args[1],
          bank: 0,
        },
      },
      {
        upsert: true,
      }
    );
    const balanceEmbed = new Discord.MessageEmbed()
      .setAuthor(`${target.tag} `, target.displayAvatarURL(String))
      .setColor("#00c9ff")
      .setTitle(`You sucessfully added $${args[1].toLocaleString()} in cash!`)
      .setFooter("Bot Developer Xiliris")
      .setTimestamp();

    message.channel.send(balanceEmbed);
  },
};
