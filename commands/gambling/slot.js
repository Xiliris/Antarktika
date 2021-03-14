const profileSchema = require("../../schemas/profile-schema");
module.exports = {
  commands: ["slot"],
  expectedArgs: "<Bet>",
  minArgs: 1,
  cooldown: 3,
  requiredChannel: "economy",
  callback: async (message, arguments, Discord, text, client) => {
    const guildId = message.guild.id;
    const userId = message.author.id;

    const result = await profileSchema.findOne({
      guildId,
      userId,
    });
    if (!result) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | You don't have enough money!");
      message.channel.send(embed);
      return;
    }
    let bet;
    if (arguments[0] === "all") {
      if (result.cash < 100) {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL(String)
          )
          .setDescription("❌ | Minimum bet is **$100**");
        message.channel.send(embed);
        return;
      }
      bet = result.cash;
    } else {
      if (isNaN(arguments[0])) {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL(String)
          )
          .setDescription("❌ | Invalid bet!");
        message.channel.send(embed);
        return;
      }
      if (arguments[0] < 100) {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL(String)
          )
          .setDescription("❌ | Minimum bet is **$100**");
        message.channel.send(embed);
        return;
      }
      if (result.cash < arguments[0]) {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL(String)
          )
          .setDescription("❌ | You don't have enough money!");
        message.channel.send(embed);
        return;
      }
      bet = arguments[0];
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
          cash: -bet,
        },
      },
      {
        upsert: true,
      }
    );
    const canabis = "<:canabis:811930952288174111>";
    const seven = "<:7_:807209827524542467>";
    const hundred = "💯";
    const apple = "🍎";

    const balls = [canabis, canabis, hundred, hundred, apple, apple, seven];

    const ball1 = balls[Math.floor(Math.random() * balls.length)];
    const ball2 = balls[Math.floor(Math.random() * balls.length)];
    const ball3 = balls[Math.floor(Math.random() * balls.length)];

    const loseEmbed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
      .setDescription(`| ${ball1} | ${ball2} | ${ball3} |`)
      .setColor("RED")
      .setFooter(`You lost $${bet}`);

    if (ball1 === ball2 && ball2 === ball3) {
      if (ball1 === seven) {
        const winEmbed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL(String)
          )
          .setDescription(`| ${ball1} | ${ball2} | ${ball3} |`)
          .setColor("GREEN")
          .setFooter(`You won JACKPOT $${bet * 16}`);
        await profileSchema.findOneAndUpdate(
          {
            guildId,
            userId,
          },
          {
            guildId,
            userId,
            $inc: {
              cash: bet * 16,
            },
          },
          {
            upsert: true,
          }
        );
        message.channel.send(winEmbed);
      } else {
        const winEmbed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL(String)
          )
          .setDescription(`| ${ball1} | ${ball2} | ${ball3} |`)
          .setColor("GREEN")
          .setFooter(`You won $${bet * 8}`);
        await profileSchema.findOneAndUpdate(
          {
            guildId,
            userId,
          },
          {
            guildId,
            userId,
            $inc: {
              cash: bet * 8,
            },
          },
          {
            upsert: true,
          }
        );
        message.channel.send(winEmbed);
      }
    } else {
      message.channel.send(loseEmbed);
    }
  },
};
