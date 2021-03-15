const marriageSchema = require("../../schemas/marriage-schema");
module.exports = {
  commands: ["marry"],
  expectedArgs: "<Tag>",
  minArgs: 1,
  maxArgs: 1,
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel, member } = message;
    const target = message.mentions.users.first();

    const randomMessage = [
      "I hope through the years you become even better friends and share every possible kind of happiness life can bring.",
      "Your wedding day may come and go, but may your love forever grow. Congratulations to the perfect couple!",
      "I love to see two people who deserve happiness so much find it with each other. Best wishes to you both.",
      "Congratulations on your wedding day and best wishes for a happy life together!",
      "May the love you share today grow stronger as you grow old together.",
      "You two are living proof of just how beautiful love can be.",
      "Here's to a long and happy marriage!",
      "Here’s to the love you share and to the joy you bring us all!",
      "May your marriage be filled with all the right ingredients: a heap of love, a dash of humor, a touch of romance, and a spoonful of understanding. May your joy last forever. Congratulations!",
      "The most important four words for a successful marriage: ‘Yes dear you’re right.’",
      "Marriage Tip: If at first you don’t succeed, try doing it the way your wife told you to.",
      "Our marriage advice: Love, honor and… PUT THE SEAT DOWN.",
      "BOOM! He put a ring on it!",
      "You may now update your Facebook status!",
    ];

    const wish =
      randomMessage[Math.floor(Math.random() * randomMessage.length)];
    var myDate = new Date();
    var d =
      myDate.getDate() + "/" + myDate.getMonth() + "/" + myDate.getFullYear();

    const resultUser = await marriageSchema.findOne({
      userId: member.id,
    });

    const resultTarget = await marriageSchema.findOne({
      userId: target.id,
    });
    if (resultTarget) {
      const embed = new Discord.MessageEmbed().setAuthor(
        `${target.tag} is already married!`,
        target.displayAvatarURL(String)
      );
      message.channel.send(embed);
      return;
    }
    if (resultUser) {
      const embed = new Discord.MessageEmbed().setAuthor(
        `${message.author.tag} you are already married!`,
        message.author.displayAvatarURL(String)
      );
      message.channel.send(embed);
      return;
    }

    const marriageEmbed = new Discord.MessageEmbed()
      .setTitle(`💍 ${member.displayName} has proposed to ${target.username}`)
      .setDescription(
        `A marriage is a voluntary and full commitment. It is made in the deepest sense to the exclusion of all others. Before you declare your vows to one another, I want to hear you confirm that it is your intention to be married today. ${target.username}, do you come here freely to give yourself to ${member.displayName} in marriage?`
      )
      .setThumbnail(
        "https://cdn1.iconfinder.com/data/icons/wedding-and-love-3/256/wedding-marriage-love-ring-infinity-512.png"
      )
      .addFields(
        { name: "✅ To accept", value: "‏‏‎ ‎", inline: true },
        { name: "❌ To decline", value: "‏‏‎ ‎", inline: true }
      )
      .setTimestamp();

    message.channel.send(marriageEmbed).then(async (message, user) => {
      await message.react("✅");
      await message.react("❌");

      await message.awaitReactions(async (reaction, user) => {
        const reactionName = reaction.emoji.name;

        if (user.id === client.id) return;
        if (user.id !== target.id) return;

        if (reactionName === "✅") {
          await marriageSchema.findOneAndUpdate(
            {
              userId: member.id,
            },
            {
              userId: member.id,
              targetId: target.id,
              date: d,
            },
            {
              upsert: true,
            }
          );

          await marriageSchema.findOneAndUpdate(
            {
              userId: target.id,
            },
            {
              userId: target.id,
              targetId: member.id,
              date: d,
            },
            {
              upsert: true,
            }
          );
          const marriedEmbed = new Discord.MessageEmbed()
            .setTitle(
              `💍 ${member.displayName} and ${target.username} are happily married! ❤️`
            )
            .setDescription(wish)
            .setTimestamp();

          message.channel.send(marriedEmbed);
          message.delete();
        } else if (reactionName === "❌") {
          const declineMarriage = new Discord.MessageEmbed()
            .setTitle(`${member.displayName} dont worry! 😫`)
            .setDescription(
              "There is plenty of fish in the sea!\ndon't be sad!"
            );
          message.channel.send(declineMarriage);
          message.delete();
        }
      });
    });
  },
};
