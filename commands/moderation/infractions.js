const warnSchema = require("../../schemas/warn-schema");
const mongo = require("../../mongo");
module.exports = {
  commands: ["infractions", "list-warnings", "lw"],
  expectedArgs: "<Tag>",
  minArgs: 1,
  permissions: ["ADMINISTRATOR", "BAN_MEMBERS"],
  requiredRoles: [],
  callback: async (message, arguments, Discord, Canvas, client) => {
    const target = message.mentions.users.first();

    if (!target) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
        .setDescription(`❌ | Couldn't find that user!`);
      message.channel.send(embed);
      return;
    }

    const memberTarget = message.guild.members.cache.get(target.id);

    const guildId = message.guild.id;
    const userId = target.id;

    const results = await warnSchema.findOne({
      guildId,
      userId,
    });

    if (!results) {
      const noEmbed = new Discord.MessageEmbed()
        .setAuthor(
          `${memberTarget.user.tag} HAS NO WARNINGS.`,
          memberTarget.user.displayAvatarURL(String)
        )
        .setColor("#ffffff")
        .setFooter("Bot Developer Xiliris");

      message.channel.send(noEmbed);
      return;
    } else {
    }

    let reply = ``;

    for (const warning of results.warnings) {
      const { author, timestamp, reason } = warning;

      reply += `**Date :**  ${new Date(
        timestamp
      ).toLocaleString()}\n**Admin :** ${author} \n**Reason :** ${reason}\n\n`;
    }
    const count = reply.split("\n\n").length - 1;

    const listEmbed = new Discord.MessageEmbed()
      .setAuthor(
        `${memberTarget.user.tag}'s WARNING LIST.`,
        memberTarget.user.displayAvatarURL(String)
      )
      .setColor("#ffffff")
      .setDescription(`${reply}`);

    message.channel.send(listEmbed).then(async (message) => {
      if (count === 1) {
        await message.react("❌");
        await message.react("1️⃣");
      } else if (count === 2) {
        await message.react("❌");
        await message.react("1️⃣");
        await message.react("2️⃣");
      } else if (count === 3) {
        await message.react("❌");
        await message.react("1️⃣");
        await message.react("2️⃣");
        await message.react("3️⃣");
      } else if (count === 4) {
        await message.react("❌");
        await message.react("1️⃣");
        await message.react("2️⃣");
        await message.react("3️⃣");
        await message.react("4️⃣");
      } else if (count === 5) {
        await message.react("❌");
        await message.react("1️⃣");
        await message.react("2️⃣");
        await message.react("3️⃣");
        await message.react("4️⃣");
        await message.react("5️⃣");
      } else if (count === 6) {
        await message.react("❌");
        await message.react("1️⃣");
        await message.react("2️⃣");
        await message.react("3️⃣");
        await message.react("4️⃣");
        await message.react("5️⃣");
        await message.react("6️⃣");
      } else if (count === 7) {
        await message.react("❌");
        await message.react("1️⃣");
        await message.react("2️⃣");
        await message.react("3️⃣");
        await message.react("4️⃣");
        await message.react("5️⃣");
        await message.react("6️⃣");
        await message.react("7️⃣");
      } else if (count === 8) {
        await message.react("❌");
        await message.react("1️⃣");
        await message.react("2️⃣");
        await message.react("3️⃣");
        await message.react("4️⃣");
        await message.react("5️⃣");
        await message.react("6️⃣");
        await message.react("7️⃣");
        await message.react("8️⃣");
      } else if (count === 9) {
        await message.react("❌");
        await message.react("1️⃣");
        await message.react("2️⃣");
        await message.react("3️⃣");
        await message.react("4️⃣");
        await message.react("5️⃣");
        await message.react("6️⃣");
        await message.react("7️⃣");
        await message.react("8️⃣");
        await message.react("9️⃣");
      } else if (count === 10) {
        await message.react("❌");
        await message.react("1️⃣");
        await message.react("2️⃣");
        await message.react("3️⃣");
        await message.react("4️⃣");
        await message.react("5️⃣");
        await message.react("6️⃣");
        await message.react("7️⃣");
        await message.react("8️⃣");
        await message.react("9️⃣");
        await message.react("🔟");
      }

      await message.awaitReactions(async (reaction, user) => {
        const userTarget = message.guild.members.cache.get(user.id);
        const reactionName = reaction.emoji.name;

        if (!userTarget.hasPermission("ADMINISTRATOR")) return;
        if (user.id === client.id) return;

        if (reactionName === "❌") {
          await warnSchema.findOneAndDelete({
            guildId,
            userId,
          });

          const simpleEmbed = new Discord.MessageEmbed()
            .setAuthor(
              `${memberTarget.user.tag}`,
              memberTarget.user.displayAvatarURL(String)
            )
            .setColor("#ff0000")
            .setDescription(`All warnings were removed from this user!`);

          message.channel.send(simpleEmbed);
          message.delete();
        } else if (reactionName === "1️⃣") {
          await warnSchema.findOneAndUpdate(
            {
              guildId,
              userId,
            },
            {
              guildId,
              userId,
              $pull: {
                warnings: results.warnings[0],
              },
            }
          );

          const simpleEmbed = new Discord.MessageEmbed()
            .setAuthor(
              `${memberTarget.user.tag}`,
              memberTarget.user.displayAvatarURL(String)
            )
            .setColor("#5400ff")
            .setDescription(`1st warning was removed from this user!`);

          message.channel.send(simpleEmbed);
          message.delete();
        } else if (reactionName === "2️⃣") {
          await warnSchema.findOneAndUpdate(
            {
              guildId,
              userId,
            },
            {
              guildId,
              userId,
              $pull: {
                warnings: results.warnings[1],
              },
            }
          );

          const simpleEmbed = new Discord.MessageEmbed()
            .setAuthor(
              `${memberTarget.user.tag}`,
              memberTarget.user.displayAvatarURL(String)
            )
            .setColor("#5400ff")
            .setDescription(`2nd warning was removed from this user!`);

          message.channel.send(simpleEmbed);
          message.delete();
        } else if (reactionName === "3️⃣") {
          await warnSchema.findOneAndUpdate(
            {
              guildId,
              userId,
            },
            {
              guildId,
              userId,
              $pull: {
                warnings: results.warnings[2],
              },
            }
          );

          const simpleEmbed = new Discord.MessageEmbed()
            .setAuthor(
              `${memberTarget.user.tag}`,
              memberTarget.user.displayAvatarURL(String)
            )
            .setColor("#5400ff")
            .setDescription(`3rd warning was removed from this user!`);

          message.channel.send(simpleEmbed);
          message.delete();
        } else if (reactionName === "4️⃣") {
          await warnSchema.findOneAndUpdate(
            {
              guildId,
              userId,
            },
            {
              guildId,
              userId,
              $pull: {
                warnings: results.warnings[3],
              },
            }
          );

          const simpleEmbed = new Discord.MessageEmbed()
            .setAuthor(
              `${memberTarget.user.tag}`,
              memberTarget.user.displayAvatarURL(String)
            )
            .setColor("#5400ff")
            .setDescription(`4th warning was removed from this user!`);

          message.channel.send(simpleEmbed);
          message.delete();
        } else if (reactionName === "5️⃣") {
          await warnSchema.findOneAndUpdate(
            {
              guildId,
              userId,
            },
            {
              guildId,
              userId,
              $pull: {
                warnings: results.warnings[4],
              },
            }
          );

          const simpleEmbed = new Discord.MessageEmbed()
            .setAuthor(
              `${memberTarget.user.tag}`,
              memberTarget.user.displayAvatarURL(String)
            )
            .setColor("#5400ff")
            .setDescription(`5th warning was removed from this user!`);

          message.channel.send(simpleEmbed);
          message.delete();
        } else if (reactionName === "6️⃣") {
          await warnSchema.findOneAndUpdate(
            {
              guildId,
              userId,
            },
            {
              guildId,
              userId,
              $pull: {
                warnings: results.warnings[5],
              },
            }
          );

          const simpleEmbed = new Discord.MessageEmbed()
            .setAuthor(
              `${memberTarget.user.tag}`,
              memberTarget.user.displayAvatarURL(String)
            )
            .setColor("#5400ff")
            .setDescription(`6th warning was removed from this user!`);

          message.channel.send(simpleEmbed);
          message.delete();
        } else if (reactionName === "7️⃣") {
          await warnSchema.findOneAndUpdate(
            {
              guildId,
              userId,
            },
            {
              guildId,
              userId,
              $pull: {
                warnings: results.warnings[6],
              },
            }
          );

          const simpleEmbed = new Discord.MessageEmbed()
            .setAuthor(
              `${memberTarget.user.tag}`,
              memberTarget.user.displayAvatarURL(String)
            )
            .setColor("#5400ff")
            .setDescription(`7th warning was removed from this user!`);

          message.channel.send(simpleEmbed);
          message.delete();
        } else if (reactionName === "8️⃣") {
          await warnSchema.findOneAndUpdate(
            {
              guildId,
              userId,
            },
            {
              guildId,
              userId,
              $pull: {
                warnings: results.warnings[7],
              },
            }
          );

          const simpleEmbed = new Discord.MessageEmbed()
            .setAuthor(
              `${memberTarget.user.tag}`,
              memberTarget.user.displayAvatarURL(String)
            )
            .setColor("#5400ff")
            .setDescription(`8th warning was removed from this user!`);

          message.channel.send(simpleEmbed);
          message.delete();
        } else if (reactionName === "9️⃣") {
          await warnSchema.findOneAndUpdate(
            {
              guildId,
              userId,
            },
            {
              guildId,
              userId,
              $pull: {
                warnings: results.warnings[8],
              },
            }
          );

          const simpleEmbed = new Discord.MessageEmbed()
            .setAuthor(
              `${memberTarget.user.tag}`,
              memberTarget.user.displayAvatarURL(String)
            )
            .setColor("#5400ff")
            .setDescription(`9th warning was removed from this user!`);

          message.channel.send(simpleEmbed);
          message.delete();
        } else if (reactionName === "🔟") {
          await warnSchema.findOneAndUpdate(
            {
              guildId,
              userId,
            },
            {
              guildId,
              userId,
              $pull: {
                warnings: results.warnings[9],
              },
            }
          );

          const simpleEmbed = new Discord.MessageEmbed()
            .setAuthor(
              `${memberTarget.user.tag}`,
              memberTarget.user.displayAvatarURL(String)
            )
            .setColor("#5400ff")
            .setDescription(`10th warning was removed from this user!`);

          message.channel.send(simpleEmbed);
          message.delete();
        }
      });
    });
  },
};
