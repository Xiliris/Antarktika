const profileSchema = require("../schemas/profile-schema");
const usedCommand = new Set();
const levelingCache = require("../cache/leveling-cache");
const channelSchema = require("../schemas/channel-schema");
module.exports = (client, Discord) => {
  client.on("message", async (message) => {
    const { member, guild } = message;

    const guildId = guild.id;
    const userId = member.id;
    const memberTarget = message.guild.members.cache.get(message.author.id);

    const trueorfalse = [
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "35",
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

      let data = levelingCache[guild.id];

      if (data) {
        const result = await channelSchema.findOne({
          guildId,
          userId,
        });

        const channel =
          client.channels.cache.get(result.leveling) || message.channel;

        const newEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${memberTarget.user.tag}`,
            memberTarget.user.displayAvatarURL(String)
          )
          .setThumbnail(memberTarget.user.displayAvatarURL(String))
          .setDescription(`\n‏‏‎ ‎YOU ARE NOW LEVEL **${level + 1}**`)
          .setColor("#7300ff")
          .setTimestamp();

        channel.send(newEmbed);
        usedCommand.add(message.author.id);
        setTimeout(() => {
          usedCommand.delete(message.author.id);
        }, 1000 * 3);
        return;
      } else {
        const newEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${memberTarget.user.tag}`,
            memberTarget.user.displayAvatarURL(String)
          )
          .setDescription(`\n‏‏‎ ‎YOU ARE NOW LEVEL **${level + 1}**`)
          .setColor("#7300ff")
          .setFooter("Bot Developer Xiliris");

        message.channel.send(newEmbed);
        return;
      }
    } else return;
  });
};
