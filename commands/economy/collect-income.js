const profileSchema = require("../../schemas/profile-schema");
module.exports = {
  commands: ["collect-income"],
  cooldown: 60 * 60 * 24,
  requiredChannel: "economy",
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel } = message;

    const guildId = guild.id;
    const userId = message.author.id;

    const result = await profileSchema.findOne({
      guildId,
      userId,
    });
    const rank = result.rank;

    if (!result) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("You don't have any rank!");
      message.channel.send(embed);
      return;
    }
    if (rank === "tycoon") {
      await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            bank: 0,
            cash: 5000000,
          },
        },
        {
          upsert: true,
        }
      );
      const embeds = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription(`You sucessfully collected **$5,000,000**!`);
      message.channel.send(embeds);
    } else if (rank === "billionaire") {
      await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            bank: 0,
            cash: 2500000,
          },
        },
        {
          upsert: true,
        }
      );
      const embeds = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription(`You sucessfully collected **$2,500,000**!`);
      message.channel.send(embeds);
    } else if (rank === "millionaire") {
      await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            bank: 0,
            cash: 100000,
          },
        },
        {
          upsert: true,
        }
      );
      const embeds = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription(`You sucessfully collected **$100,000**!`);
      message.channel.send(embeds);
    } else if (rank === "narkoboss") {
      await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            bank: 0,
            cash: 50000,
          },
        },
        {
          upsert: true,
        }
      );
      const embeds = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription(`You sucessfully collected **$50,000**!`);
      message.channel.send(embeds);
    } else if (rank === "hitman") {
      await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            bank: 0,
            cash: 25000,
          },
        },
        {
          upsert: true,
        }
      );
      const embeds = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription(`You sucessfully collected **$25,000**!`);
      message.channel.send(embeds);
    } else if (rank === "lawyer") {
      await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            bank: 0,
            cash: 10000,
          },
        },
        {
          upsert: true,
        }
      );
      const embeds = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription(`You sucessfully collected **$10,000**!`);
      message.channel.send(embeds);
    } else if (rank === "dealer") {
      await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            bank: 0,
            cash: 5000,
          },
        },
        {
          upsert: true,
        }
      );
      const embeds = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription(`You sucessfully collected **$5,000**!`);
      message.channel.send(embeds);
    } else if (rank === "doctor") {
      await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            bank: 0,
            cash: 2500,
          },
        },
        {
          upsert: true,
        }
      );
      const embeds = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription(`You sucessfully collected **$2,500**!`);
      message.channel.send(embeds);
    } else if (rank === "thief") {
      await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            bank: 0,
            cash: 1000,
          },
        },
        {
          upsert: true,
        }
      );
      const embeds = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription(`You sucessfully collected **$1,000**!`);
      message.channel.send(embeds);
    } else if (rank === "citizen") {
      await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            bank: 0,
            cash: 500,
          },
        },
        {
          upsert: true,
        }
      );
      const embeds = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription(`You sucessfully collected **$500**!`);
      message.channel.send(embeds);
    } else if (rank === "poor") {
      await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            bank: 0,
            cash: 100,
          },
        },
        {
          upsert: true,
        }
      );
      const embeds = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription(`You sucessfully collected **$100**!`);
      message.channel.send(embeds);
    }
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
  },
};
