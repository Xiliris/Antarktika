const profileSchema = require("../../schemas/profile-schema");
module.exports = {
  commands: ["buy-rank"],
  expectedArgs: "<Rank Name>",
  minArgs: 1,
  maxArgs: 1,
  requiredChannel: "economy",
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel } = message;

    const guildId = guild.id;
    const userId = message.author.id;

    const args = arguments[0].toLowerCase();
    const result = await profileSchema.findOne({
      guildId,
      userId,
    });
    const check = result.cash;
    const a = result.rank;

    const notEmbed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
      .setDescription("❌ | You don't have enough money in cash!");
    async function buyRank(rank, cost) {
      await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          rank,
          $inc: {
            bank: 0,
            cash: -cost,
          },
        },
        {
          upsert: true,
        }
      );
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription(`You sucessfully bought **${rank}** for $**${cost}**`);
      message.channel.send(embed);
    }

    if (args === "tycoon") {
      if (check < 50000000) return message.channel.send(notEmbed);
      if (a !== "billionaire") {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL(String)
          )
          .setDescription(`You need to have **Billionaire** rank to buy this!`);
        message.channel.send(embed);
        return;
      }
      await buyRank("tycoon", 50000000);
    } else if (args === "billionaire") {
      if (check < 25000000) return message.channel.send(notEmbed);
      if (a !== "millionaire") {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL(String)
          )
          .setDescription(`You need to have **Millionaire** rank to buy this!`);
        message.channel.send(embed);
        return;
      }
      await buyRank("billionaire", 25000000);
    } else if (args === "millionaire") {
      if (check < 1000000) return message.channel.send(notEmbed);
      if (a !== "narkoboss") {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL(String)
          )
          .setDescription(`You need to have **NarkoBoss** rank to buy this!`);
        message.channel.send(embed);
        return;
      }
      await buyRank("millionaire", 1000000);
    } else if (args === "narkoboss") {
      if (check < 500000) return message.channel.send(notEmbed);
      if (a !== "hitman") {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL(String)
          )
          .setDescription(`You need to have **Hitman** rank to buy this!`);
        message.channel.send(embed);
        return;
      }
      await buyRank("narkoboss", 500000);
    } else if (args === "hitman") {
      if (check < 250000) return message.channel.send(notEmbed);
      if (a !== "lawyer") {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL(String)
          )
          .setDescription(`You need to have **Lawyer** rank to buy this!`);
        message.channel.send(embed);
        return;
      }
      await buyRank("hitman", 250000);
    } else if (args === "lawyer") {
      if (check < 100000) return message.channel.send(notEmbed);
      if (a !== "dealer") {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL(String)
          )
          .setDescription(`You need to have **Dealer** rank to buy this!`);
        message.channel.send(embed);
        return;
      }
      await buyRank("lawyer", 100000);
    } else if (args === "dealer") {
      if (check < 50000) return message.channel.send(notEmbed);
      if (a !== "doctor") {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL(String)
          )
          .setDescription(`You need to have **Doctor** rank to buy this!`);
        message.channel.send(embed);
        return;
      }
      await buyRank("dealer", 50000);
    } else if (args === "doctor") {
      if (check < 25000) return message.channel.send(notEmbed);
      if (a !== "doctor") {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL(String)
          )
          .setDescription(`You need to have **Thief** rank to buy this!`);
        message.channel.send(embed);
        return;
      }
      await buyRank("doctor", 25000);
    } else if (args === "thief") {
      if (check < 10000) return message.channel.send(notEmbed);
      if (a !== "citizen") {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL(String)
          )
          .setDescription(`You need to have **Citizen** rank to buy this!`);
        message.channel.send(embed);
        return;
      }
      await buyRank("thief", 10000);
    } else if (args === "citizen") {
      if (check < 5000) return message.channel.send(notEmbed);
      if (a !== "poor") {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL(String)
          )
          .setDescription(`You need to have **Poor** rank to buy this!`);
        message.channel.send(embed);
        return;
      }
      await buyRank("citizen", 5000);
    } else if (args === "poor") {
      if (check < 1000) return message.channel.send(notEmbed);
      await buyRank("poor", 1000);
    } else {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("That rank doesn't exist!");
      message.channel.send(embed);
      return;
    }
  },
};
/* 
Tycoon
Billionaire
Millionaire
Narko Boss
Hitman
Lawyer
Dealer
Doctor
Thief
Citizen
Poor*/
