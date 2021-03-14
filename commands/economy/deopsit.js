const profileSchema = require("../../schemas/profile-schema");
module.exports = {
  commands: ["deposit", "dep"],
  requiredChannel: "economy",
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel } = message;

    const guildId = guild.id;
    const userId = message.author.id;

    const argss = message.content.split(" ").slice(1); // Svi argumenti poslje prefixa
    const banReason = argss.slice(0).join(" "); // Svi argumenti poslje taga
    const money = banReason;

    if (money === "all" || !money) {
      const result = await profileSchema.findOne({
        guildId,
        userId,
      });

      const take = -result.cash;
      const add = result.cash;

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
            bank: add,
          },
        }
      );
      const depositeEmbed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.tag} `,
          message.author.displayAvatarURL(String)
        )
        .setColor("#00c9ff")
        .setDescription(`You transferred **$${add.toLocaleString()}** to bank!`)
        .setFooter("Bot Developer Xiliris");

      message.channel.send(depositeEmbed);
    } else {
      const result1 = await profileSchema.findOne({
        guildId,
        userId,
      });

      if (result1.cash < money) {
        const depositEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${message.author.tag} `,
            message.author.displayAvatarURL(String)
          )
          .setColor("#00c9ff")
          .setDescription(`❌ | You don't have enough money!`)
          .setFooter("Bot Developer Xiliris");

        message.channel.send(depositEmbed);
        return;
      }

      const take1 = -money;
      const add1 = money;

      await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            cash: take1,
            bank: add1,
          },
        }
      );

      const depositEmbed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.tag} `,
          message.author.displayAvatarURL(String)
        )
        .setColor("#00c9ff")
        .setDescription(
          `You transferred **$${add1.toLocaleString()}** to bank!`
        )
        .setFooter("Bot Developer Xiliris");

      message.channel.send(depositEmbed);
    }
  },
};
