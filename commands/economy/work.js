const profileSchema = require("../../schemas/profile-schema");
module.exports = {
  commands: ["work"],
  cooldown: 60,
  requiredChannel: "economy",
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel } = message;

    const guildId = guild.id;
    const userId = message.author.id;

    let cash = Math.floor(Math.random() * 500) + 50;
    const bank = "0";

    replies = [`You worked and earned **$${cash}**.`];

    const randomReply = replies[Math.floor(Math.random() * replies.length)];

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
    const workEmbed = new Discord.MessageEmbed()
      .setAuthor(
        `${message.author.tag} `,
        message.author.displayAvatarURL(String)
      )
      .setColor("#00ffbe")
      .setDescription(randomReply)
      .setFooter("Bot Developer Xiliris");

    message.channel.send(workEmbed);
  },
};
