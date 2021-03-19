const profileSchema = require("../../schemas/profile-schema");
module.exports = {
  commands: ["rob"],
  expectedArgs: "<Tag>",
  minArgs: 1,
  cooldown: 1000 * 60 * 5,
  requiredChannel: "economy",
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel } = message;

    const guildId = guild.id;
    const userId = message.author.id;

    const target = message.mentions.users.first();
    const memberTarget = message.guild.members.cache.get(target.id);

    const trueorfalse = ["1", "2"];
    const stat = trueorfalse[Math.floor(Math.random() * trueorfalse.length)];

    if (!target) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Couldn't find that user!");
      message.channel.send(embed);
      return;
    }
    if (target.bot) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | You can't rob a bot!");
      message.channel.send(embed);
      return;
    }
    if (target.id === message.author.id) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | You can't rob yourself!");
      message.channel.send(embed);
      return;
    }

    const resultTarget = await profileSchema.findOne({
      guildId,
      userId: target.id,
    });

    if (resultTarget) {
      if (resultTarget.cash < 1) {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL(String)
          )
          .setDescription("❌ | That user doesn't have enough money!");
        message.channel.send(embed);
        return;
      }
      if (stat === "1") {
        const percent = (resultTarget.cash / 100) * 30;
        const give = percent;
        const take = -percent;
        const bank = "0";
        await profileSchema.findOneAndUpdate(
          {
            guildId,
            userId: target.id,
          },
          {
            guildId,
            userId: target.id,
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
            userId,
          },
          {
            guildId,
            userId,
            $inc: {
              cash: give,
              bank,
            },
          }
        );

        posreplies = [
          `You sucessfully robbed ${target.tag} and took **$${percent}**.`,
        ];
        const posReply =
          posreplies[Math.floor(Math.random() * posreplies.length)];

        const positiveEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${message.author.tag} `,
            message.author.displayAvatarURL(String)
          )
          .setColor("#00ffbe")
          .setDescription(posReply);

        message.channel.send(positiveEmbed);
      } else if (stat === "2") {
        const cashloss = Math.floor(Math.random() * 1500) + 50;
        const loss = -cashloss;
        const bank = "0";
        await profileSchema.findOneAndUpdate(
          {
            guildId,
            userId,
          },
          {
            guildId,
            userId,
            $inc: {
              cash: loss,
              bank,
            },
          }
        );

        negreplies = [
          `You got caught trying to rob and lost **$${cashloss}**.`,
        ];
        const negReply =
          negreplies[Math.floor(Math.random() * negreplies.length)];

        const negativeEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${message.author.tag} `,
            message.author.displayAvatarURL(String)
          )
          .setColor("#ff0000")
          .setDescription(negReply);

        message.channel.send(negativeEmbed);
      }
    } else {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | That user doesn't have enough money!");
      message.channel.send(embed);
      return;
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
