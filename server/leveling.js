<<<<<<< HEAD
const profileSchema = require("../schemas/profile-schema");
const usedCommand = new Set();
const channelSchema = require("../schemas/channel-schema");
const levelUpRewardSchema = require("../schemas/leveling-reward");
module.exports = (client, Discord) => {
  client.on("message", async (message) => {
    const { member, guild } = message;

    const guildId = guild.id;
    const userId = member.id;
    const memberTarget = message.guild.members.cache.get(message.author.id);

    const trueorfalse = [
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "25",
    ];
    const addXP = trueorfalse[Math.floor(Math.random() * trueorfalse.length)];

    if (message.author.bot) {
      return;
    }

    if (usedCommand.has(message.author.id)) {
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
          xp: addXP,
          level: 0,
        },
      },
      {
        upsert: true,
      }
    );

    const result = await profileSchema.findOne({
      guildId,
      userId,
    });

    const resultReward = await levelUpRewardSchema.findOne({
      guildId,
    });

    for (reward of resultReward.reward) {
      const { role, level } = reward;
      if (result.level >= level) {
        const roleA = message.guild.roles.cache.get(role);
        await member.roles.add(roleA);
      }
    }
    const { xp, level } = result;

    const getNeededXP = level * level * 150;

    if (xp >= getNeededXP) {
      const take = -getNeededXP;

      await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            xp: take,
            level: 1,
          },
        },
        {
          upsert: true,
        }
      );

      const result = await channelSchema.findOne({
        _id: guildId,
      });
      if (!result) {
        const newEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${memberTarget.user.tag}`,
            memberTarget.user.displayAvatarURL(String)
          )
          .setThumbnail(memberTarget.user.displayAvatarURL(String))
          .addFields({
            name: "Congratulations",
            value: `\n‏‏‎‎YOU ARE NOW LEVEL **${level + 1}**`,
          })
          .setColor("#7300ff")
          .setTimestamp();

        message.channel.send(newEmbed);
        usedCommand.add(message.author.id);
        setTimeout(() => {
          usedCommand.delete(message.author.id);
        }, 1000 * 3);
        return;
      }
      if (result.leveling) {
        const channel = guild.channels.cache.find(
          (channel) => channel.name === result.leveling
        );
        if (!channel) {
          const newEmbed = new Discord.MessageEmbed()
            .setAuthor(
              `${memberTarget.user.tag}`,
              memberTarget.user.displayAvatarURL(String)
            )
            .setThumbnail(memberTarget.user.displayAvatarURL(String))
            .addFields({
              name: "Congratulations",
              value: `\n‏‏‎‎YOU ARE NOW LEVEL **${level + 1}**`,
            })
            .setColor("#7300ff")
            .setTimestamp();

          message.channel.send(newEmbed);
          usedCommand.add(message.author.id);
          setTimeout(() => {
            usedCommand.delete(message.author.id);
          }, 1000 * 3);
        }
        const newEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${memberTarget.user.tag}`,
            memberTarget.user.displayAvatarURL(String)
          )
          .setThumbnail(memberTarget.user.displayAvatarURL(String))
          .addFields({
            name: "Congratulations",
            value: `\n‏‏‎‎YOU ARE NOW LEVEL **${level + 1}**`,
          })
          .setColor("#7300ff")
          .setTimestamp();

        channel.send(newEmbed);
        usedCommand.add(message.author.id);
        setTimeout(() => {
          usedCommand.delete(message.author.id);
        }, 1000 * 3);
      } else {
        const newEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${memberTarget.user.tag}`,
            memberTarget.user.displayAvatarURL(String)
          )
          .setThumbnail(memberTarget.user.displayAvatarURL(String))
          .addFields({
            name: "Congratulations",
            value: `\n‏‏‎‎YOU ARE NOW LEVEL **${level + 1}**`,
          })
          .setColor("#7300ff")
          .setTimestamp();

        message.channel.send(newEmbed);
        usedCommand.add(message.author.id);
        setTimeout(() => {
          usedCommand.delete(message.author.id);
        }, 1000 * 3);
      }
    } else return;
  });
};
=======
const profileSchema = require("../schemas/profile-schema");
const usedCommand = new Set();
const channelSchema = require("../schemas/channel-schema");
const levelUpRewardSchema = require("../schemas/leveling-reward");
module.exports = (client, Discord) => {
  client.on("message", async (message) => {
    const { member, guild } = message;

    const guildId = guild.id;
    const userId = member.id;
    const memberTarget = message.guild.members.cache.get(message.author.id);

    const trueorfalse = [
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "25",
    ];
    const addXP = trueorfalse[Math.floor(Math.random() * trueorfalse.length)];

    if (message.author.bot) {
      return;
    }

    if (usedCommand.has(message.author.id)) {
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
          xp: addXP,
          level: 0,
        },
      },
      {
        upsert: true,
      }
    );

    const result = await profileSchema.findOne({
      guildId,
      userId,
    });

    const resultReward = await levelUpRewardSchema.findOne({
      guildId,
    });

    for (reward of resultReward.reward) {
      const { role, level } = reward;
      if (result.level >= level) {
        const roleA = message.guild.roles.cache.get(role);
        await member.roles.add(roleA);
      }
    }
    const { xp, level } = result;

    const getNeededXP = level * level * 150;

    if (xp >= getNeededXP) {
      const take = -getNeededXP;

      await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            xp: take,
            level: 1,
          },
        },
        {
          upsert: true,
        }
      );

      const result = await channelSchema.findOne({
        _id: guildId,
      });
      if (!result) {
        const newEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${memberTarget.user.tag}`,
            memberTarget.user.displayAvatarURL(String)
          )
          .setThumbnail(memberTarget.user.displayAvatarURL(String))
          .addFields({
            name: "Congratulations",
            value: `\n‏‏‎‎YOU ARE NOW LEVEL **${level + 1}**`,
          })
          .setColor("#7300ff")
          .setTimestamp();

        message.channel.send(newEmbed);
        usedCommand.add(message.author.id);
        setTimeout(() => {
          usedCommand.delete(message.author.id);
        }, 1000 * 3);
        return;
      }

      if (result.leveling) {
        const channel = guild.channels.cache.find(
          (channel) => channel.name === result.leveling
        );

        if (!channel) {
          const newEmbed = new Discord.MessageEmbed()
            .setAuthor(
              `${memberTarget.user.tag}`,
              memberTarget.user.displayAvatarURL(String)
            )
            .setThumbnail(memberTarget.user.displayAvatarURL(String))
            .addFields({
              name: "Congratulations",
              value: `\n‏‏‎‎YOU ARE NOW LEVEL **${level + 1}**`,
            })
            .setColor("#7300ff")
            .setTimestamp();

          message.channel.send(newEmbed);
          usedCommand.add(message.author.id);
          setTimeout(() => {
            usedCommand.delete(message.author.id);
          }, 1000 * 3);
        }

        const newEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${memberTarget.user.tag}`,
            memberTarget.user.displayAvatarURL(String)
          )
          .setThumbnail(memberTarget.user.displayAvatarURL(String))
          .addFields({
            name: "Congratulations",
            value: `\n‏‏‎‎YOU ARE NOW LEVEL **${level + 1}**`,
          })
          .setColor("#7300ff")
          .setTimestamp();

        channel.send(newEmbed);
        usedCommand.add(message.author.id);
        setTimeout(() => {
          usedCommand.delete(message.author.id);
        }, 1000 * 3);
      } else {
        const newEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${memberTarget.user.tag}`,
            memberTarget.user.displayAvatarURL(String)
          )
          .setThumbnail(memberTarget.user.displayAvatarURL(String))
          .addFields({
            name: "Congratulations",
            value: `\n‏‏‎‎YOU ARE NOW LEVEL **${level + 1}**`,
          })
          .setColor("#7300ff")
          .setTimestamp();

        message.channel.send(newEmbed);
        usedCommand.add(message.author.id);
        setTimeout(() => {
          usedCommand.delete(message.author.id);
        }, 1000 * 3);
      }
    } else return;
  });
};
>>>>>>> 8a3754cccb498051759a59e25235a1c862f0b9a4
