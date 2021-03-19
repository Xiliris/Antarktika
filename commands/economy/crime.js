const profileSchema = require("../../schemas/profile-schema");
module.exports = {
  commands: ["crime"],
  cooldown: 180,
  requiredChannel: "economy",
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel } = message;
    const guildId = guild.id;
    const userId = message.author.id;

    const bank = "0";

    let cash1 = [
      Math.floor(Math.random() * 1500) + 50,
      Math.floor(Math.random() * -1500) + -50,
    ];
    let cash = cash1[Math.floor(Math.random() * cash1.length)];

    posreplies = [`You sucessfully robbed a shop and earned **$${cash}**.`];
    negreplies = [`You are caught robbing a shop and lost **$${cash * -1}**.`];
    const posReply = posreplies[Math.floor(Math.random() * posreplies.length)];
    const negReply = negreplies[Math.floor(Math.random() * negreplies.length)];

    await profileSchema.findOneAndUpdate(
      {
        guildId,
        userId,
      },
      {
        guildId,
        userId,
        $inc: {
          cash,
          bank,
        },
      },
      {
        upsert: true,
      }
    );
    if (cash > 0) {
      const positiveEmbed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.tag} `,
          message.author.displayAvatarURL(String)
        )
        .setColor("#00ffbe")
        .setDescription(posReply);

      message.channel.send(positiveEmbed);
    } else if (cash < 0) {
      const negativeEmbed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.tag} `,
          message.author.displayAvatarURL(String)
        )
        .setColor("#ff0000")
        .setDescription(negReply);

      message.channel.send(negativeEmbed);
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
