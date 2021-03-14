const profileSchema = require("../../schemas/profile-schema");
const rouletteSchema = require("../../schemas/roulette-schema");
const timerSchema = require("../../schemas/timer-schema");
const winnersSchema = require("../../schemas/winners-schema");
module.exports = {
  commands: ["roulette"],
  requiredChannel: "economy",
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel } = message;
    let user = message.author;
    let guildId = guild.id;
    let userId = message.author.id;
    let bet = arguments[0];
    let card = arguments[1];
    if (isNaN(bet)) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL(String))
        .setDescription("❌ | You're bet isn't valid number!");
      message.channel.send(embed);
      return;
    } else if (bet < 100) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL(String))
        .setDescription("❌ | Minimum bet is $100");
      message.channel.send(embed);
      return;
    }
    if (card !== "black" && card !== "red" && card !== "green") {
      if (isNaN(card)) {
        const embed = new Discord.MessageEmbed()
          .setAuthor(user.tag, user.displayAvatarURL(String))
          .setDescription("❌ | Bet on  something!");
        message.channel.send(embed);
        return;
      } else if (card > 36) {
        const embed = new Discord.MessageEmbed()
          .setAuthor(user.tag, user.displayAvatarURL(String))
          .setDescription("❌ | Bet on  something!");
        message.channel.send(embed);
        return;
      } else if (card < 0) {
        const embed = new Discord.MessageEmbed()
          .setAuthor(user.tag, user.displayAvatarURL(String))
          .setDescription("❌ | Bet on  something!");
        message.channel.send(embed);
        return;
      }
    }
    let result = await profileSchema.findOne({ guildId, userId });
    if (result.cash < bet) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL(String))
        .setDescription("❌ | You don't have enough money in cash!");
      message.channel.send(embed);
      return;
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
    const timer = await timerSchema.findOne({
      guildId,
      type: "Roulette",
    });
    let countdown;
    if (!timer) countdown = `30`;
    if (timer) countdown = `${timer.counter}`;
    let startEmbed = new Discord.MessageEmbed()
      .setAuthor(user.tag, user.displayAvatarURL(String))
      .setDescription(
        `You placed bet of **$${bet}** on **${card.toUpperCase()}**`
      )
      .setFooter(`Time remaining: ${countdown} seconds`);
    message.channel.send(startEmbed);
    const number = [
      "00",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
    ];
    let random = number[Math.floor(Math.random() * number.length)];
    let color;
    if (random === "0" || random === "00") {
      color = "green";
    } else if (random % 2 === 0) {
      color = "black";
    } else {
      color = "red";
    }

    await rouletteSchema.findOneAndUpdate(
      {
        guildId,
        userId,
      },
      {
        guildId,
        userId,
        $inc: {
          bet,
        },
        card,
      },
      {
        upsert: true,
      }
    );
    if (!timer) {
      await timerSchema.findOneAndUpdate(
        {
          guildId,
          type: "Roulette",
        },
        {
          guildId,
          type: "Roulette",
          counter: 30,
        },
        {
          upsert: true,
        }
      );
    }

    if (timer) return;
    const inter = setInterval(async () => {
      let check = await timerSchema.findOne({
        guildId,
        type: "Roulette",
      });
      await timerSchema.findOneAndUpdate(
        {
          guildId,
          type: "Roulette",
        },
        {
          guildId,
          type: "Roulette",
          $inc: {
            counter: -1,
          },
        },
        {
          upsert: true,
        }
      );
      if (check.counter === 0) {
        clearInterval(inter);
        await timerSchema.findOneAndDelete({
          guildId,
          type: "Roulette",
        });

        const gambling = await rouletteSchema.find({
          guildId,
        });
        for (let count = 0; count < gambling.length; count++) {
          const { userId, bet, card } = gambling[count];
          if (card === color || card === random) {
            if (card === "black" || card === "red") {
              await profileSchema.findOneAndUpdate(
                {
                  guildId,
                  userId,
                },
                {
                  guildId,
                  userId,
                  $inc: {
                    cash: bet * 2,
                  },
                },
                {
                  upsert: true,
                }
              );
              await winnersSchema.findOneAndUpdate(
                {
                  guildId,
                  game: "Roulette",
                },
                {
                  guildId,
                  game: "Roulette",
                  $push: {
                    winners: `<@${userId}> won $${bet * 2}`,
                  },
                },
                {
                  upsert: true,
                }
              );
            } else if (card === "0") {
              await profileSchema.findOneAndUpdate(
                {
                  guildId,
                  userId,
                },
                {
                  guildId,
                  userId,
                  $inc: {
                    cash: bet * 32,
                  },
                },
                {
                  upsert: true,
                }
              );
              await winnersSchema.findOneAndUpdate(
                {
                  guildId,
                  game: "Roulette",
                },
                {
                  guildId,
                  game: "Roulette",
                  $push: {
                    winners: `<@${userId}> won $${bet * 32}`,
                  },
                },
                {
                  upsert: true,
                }
              );
            } else if (card === "00") {
              await profileSchema.findOneAndUpdate(
                {
                  guildId,
                  userId,
                },
                {
                  guildId,
                  userId,
                  $inc: {
                    cash: bet * 64,
                  },
                },
                {
                  upsert: true,
                }
              );
              await winnersSchema.findOneAndUpdate(
                {
                  guildId,
                  game: "Roulette",
                },
                {
                  guildId,
                  game: "Roulette",
                  $push: {
                    winners: `<@${userId}> won $${bet * 64}`,
                  },
                },
                {
                  upsert: true,
                }
              );
            } else if (card === random) {
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
              await winnersSchema.findOneAndUpdate(
                {
                  guildId,
                  game: "Roulette",
                },
                {
                  guildId,
                  game: "Roulette",
                  $push: {
                    winners: `<@${userId}> won $${bet * 16}`,
                  },
                },
                {
                  upsert: true,
                }
              );
            }
          }
        }
        let winners;
        const checking = await winnersSchema.findOne({
          guildId,
          game: "Roulette",
        });
        if (checking) {
          for (const winning of checking.winners) {
            winners += `${winning}\n\n`;
          }
        } else {
          winners = `None`;
        }
        let finishEmbed = new Discord.MessageEmbed()
          .setAuthor(`Ball landed on ${random} ${color.toUpperCase()}`)
          .setDescription(winners.replace(/undefined/, ""))
          .setThumbnail(
            "https://img.icons8.com/color/452/american-roulette.png"
          );
        await message.channel.send(finishEmbed);

        await setTimeout(async () => {
          await winnersSchema.findOneAndDelete({
            guildId,
            game: "Roulette",
          });
          await rouletteSchema.findOneAndDelete({
            guildId,
          });
        }, 1000 * 3);
      }
    }, 1000);
  },
};
