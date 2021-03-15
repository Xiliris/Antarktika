const profileSchema = require("../../schemas/profile-schema");
module.exports = {
  commands: ["give", "give-money"],
  requiredChannel: "economy",
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel } = message;

    const guildId = guild.id;
    const userId = message.author.id;

    const target = message.mentions.users.first();
    const args = message.content.split(" ").slice(1); // Svi argumenti poslje prefixa
    const bank = "0";

    if (!target) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Couldn't find that user!");
      message.channel.send(embed);
      return;
    }
    if (!args[1]) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Please use !give <Tag> <Amount>");
      message.channel.send(embed);
      return;
    }
    if (isNaN(args[1])) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Please use !give <Tag> <Amount>");
      message.channel.send(embed);
      return;
    }
    if (args[1] < 0) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | You can't take money from someone!");
      message.channel.send(embed);
      return;
    }
    const result = await profileSchema.findOne({
      guildId,
      userId,
    });
    if (result.cash < args[1]) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | You don't have enough money");
      message.channel.send(embed);
      return;
    }
    const memberTarget = target.id;
    const cash = args[1];
    const take = -cash;

    await profileSchema.findOneAndUpdate(
      {
        guildId,
        userId,
      },
      {
        guildId,
        userId,
        $inc: {
          cash: take,
          bank,
        },
      },
      {
        upsert: true,
      }
    );

    await profileSchema.findOneAndUpdate(
      {
        guildId,
        userId: memberTarget,
      },
      {
        guildId,
        userId: memberTarget,
        $inc: {
          cash,
          bank,
        },
      },
      {
        upsert: true,
      }
    );

    const balanceEmbed = new Discord.MessageEmbed()
      .setAuthor(
        `${message.author.tag} `,
        message.author.displayAvatarURL(String)
      )
      .setColor("#036400")
      .setTitle(`You sucessfully transferred **$${cash}** to ${target.tag}`)
      .setTimestamp();

    await message.channel.send(balanceEmbed);

    return;
  },
};
