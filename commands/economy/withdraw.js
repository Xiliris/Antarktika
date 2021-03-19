const profileSchema = require("../../schemas/profile-schema");
module.exports = {
  commands: ["withdraw", "with"],
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

      const take = -result.bank;
      const add = result.bank;

      await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            cash: add,
            bank: take,
          },
        }
      );

      const depositeEmbed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.tag} `,
          message.author.displayAvatarURL(String)
        )
        .setColor("#00c9ff")
        .setDescription(
          `You withdraw **$${add.toLocaleString()}** from bank account!`
        );

      message.channel.send(depositeEmbed);
      const balanceCheck = await profileSchema.findOne({
        guildId: message.guild.id,
        userId: message.author.id,
      });
      if (!balanceCheck) return;
      await profileSchema.findOneAndUpdate(
        {
          guildId: message.guild.id,
          userId: message.author.id,
        },
        {
          guildId: message.guild.id,
          userId: message.author.id,
          worth: balanceCheck.bank + balanceCheck.cash,
        },
        {
          upsert: true,
        }
      );
    } else {
      const result1 = await profileSchema.findOne({
        guildId,
        userId,
      });

      if (result1.bank < money) {
        const depositEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${message.author.tag} `,
            message.author.displayAvatarURL(String)
          )
          .setDescription(`You don't have enough money!`);
        message.channel.send(depositEmbed);
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
            cash: add1,
            bank: take1,
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
          `You withdraw **$${add1.toLocaleString()}** from bank account!`
        );
      message.channel.send(depositEmbed);
      const balanceCheck = await profileSchema.findOne({
        guildId: message.guild.id,
        userId: message.author.id,
      });
      if (!balanceCheck) return;
      await profileSchema.findOneAndUpdate(
        {
          guildId: message.guild.id,
          userId: message.author.id,
        },
        {
          guildId: message.guild.id,
          userId: message.author.id,
          worth: balanceCheck.bank + balanceCheck.cash,
        },
        {
          upsert: true,
        }
      );
    }
  },
};
