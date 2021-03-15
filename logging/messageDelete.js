<<<<<<< HEAD
const loggingSchema = require("../schemas/logging-channel");
const snipeSchema = require("../schemas/snipe-schema");
const blacklist = [
  "Б",
  "Г",
  "Д",
  "Ђ",
  "Ж",
  "З",
  "И",
  "Л",
  "Љ",
  "Њ",
  "П",
  "Ћ",
  "Ф",
  "Ц",
  "Ч",
  "Џ",
  "Ш",
  "б",
  "г",
  "д",
  "ђ",
  "ж",
  "з",
  "и",
  "л",
  "љ",
  "њ",
  "п",
  "ћ",
  "ф",
  "ц",
  "ч",
  "џ",
  "ш",
];
module.exports = (client, Discord) => {
  client.on("messageDelete", async (message) => {
    if (!message.guild)
      // ignore direct messages
      return;
    const fetchedLogs = await message.guild.fetchAuditLogs({
      limit: 1,
      type: "MESSAGE_DELETE",
    });
    // Since we only have 1 audit log entry in this collection, we can simply grab the first one
    const deletionLog = fetchedLogs.entries.first();

    const { executor, target } = deletionLog;
    if (!message.cleanContent) return;
    await snipeSchema.findOneAndUpdate(
      {
        _id: message.guild.id,
      },
      {
        _id: message.guild.id,
        author: executor.tag,
        authorImage: executor.displayAvatarURL(String),
        text: message.cleanContent,
      },
      {
        upsert: true,
      }
    );
    if (message.cleanContent.includes("discord.gg/")) return;
    if (blacklist.some((word) => message.cleanContent.includes(word))) return;
    const logEmbed = new Discord.MessageEmbed()
      .setAuthor(`${executor.tag}`, executor.displayAvatarURL(String))
      .setTitle("Deleted a message")
      .setColor("#ff0000")
      .addFields({ name: "Message", value: message.cleanContent })
      .setTimestamp();
    const result = await loggingSchema.findOne({
      guildId: message.guild.id,
    });
    if (!message.cleanContent) return;
    if (!result) return;
    if (result.message) {
      let logChannel = message.guild.channels.cache.get(result.message);
      logChannel.send(logEmbed);
    }
  });
};
=======
const loggingSchema = require("../schemas/logging-channel");
const snipeSchema = require("../schemas/snipe-schema");
const blacklist = [
  "Б",
  "Г",
  "Д",
  "Ђ",
  "Ж",
  "З",
  "И",
  "Л",
  "Љ",
  "Њ",
  "П",
  "Ћ",
  "Ф",
  "Ц",
  "Ч",
  "Џ",
  "Ш",
  "б",
  "г",
  "д",
  "ђ",
  "ж",
  "з",
  "и",
  "л",
  "љ",
  "њ",
  "п",
  "ћ",
  "ф",
  "ц",
  "ч",
  "џ",
  "ш",
];
module.exports = (client, Discord) => {
  client.on("messageDelete", async (message) => {
    if (!message.guild)
      // ignore direct messages
      return;
    const fetchedLogs = await message.guild.fetchAuditLogs({
      limit: 1,
      type: "MESSAGE_DELETE",
    });
    // Since we only have 1 audit log entry in this collection, we can simply grab the first one
    const deletionLog = fetchedLogs.entries.first();

    const { executor, target } = deletionLog;
    if (!message.cleanContent) return;
    await snipeSchema.findOneAndUpdate(
      {
        _id: message.guild.id,
      },
      {
        _id: message.guild.id,
        author: executor.tag,
        authorImage: executor.displayAvatarURL(String),
        text: message.cleanContent,
      },
      {
        upsert: true,
      }
    );
    if (message.cleanContent.includes("discord.gg/")) return;
    if (blacklist.some((word) => message.cleanContent.includes(word))) return;
    const logEmbed = new Discord.MessageEmbed()
      .setAuthor(`${executor.tag}`, executor.displayAvatarURL(String))
      .setTitle("Deleted a message")
      .setColor("#ff0000")
      .addFields({ name: "Message", value: message.cleanContent })
      .setTimestamp();
    const result = await loggingSchema.findOne({
      guildId: message.guild.id,
    });
    if (!message.cleanContent) return;
    if (!result) return;
    if (result.message) {
      let logChannel = message.guild.channels.cache.get(result.message);
      logChannel.send(logEmbed);
    }
  });
};
>>>>>>> 8a3754cccb498051759a59e25235a1c862f0b9a4
