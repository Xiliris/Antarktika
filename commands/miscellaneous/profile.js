const profileSchema = require("../../schemas/profile-schema");
const marriageSchema = require("../../schemas/marriage-schema");
module.exports = {
  commands: ["profile"],
  cooldown: 5,
  requiredChannel: "commands",
  callback: async (message, arguments, Discord, Canvas, client) => {
    const { guild, channel, member } = message;
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (arguments[0]) {
      user = message.guild.members.cache.get(arguments[0]).user;
    } else {
      user = message.author;
    }
    const userId = user.id;
    const guildId = guild.id;

    if (!user) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL(String))
        .setDescription(`❌ | Couldn't find that user!`);
      message.channel.send(embed);
      return;
    }
    const result = await profileSchema.findOne({
      guildId,
      userId,
    });
    if (!result) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL(String))
        .setDescription(`❌ | This user doesn't have a profile!`);
      message.channel.send(embed);
      return;
    }
    const marriage = await marriageSchema.findOne({
      userId,
    });
    let economy;
    let rank;
    let level;
    let xp;
    let msg;
    let marriedText;
    let achievementsText;
    if (result.cash || result.bank) {
      economy = `Net Worth : ${
        result.cash + result.bank || result.cash || result.bank
      }`;
    } else {
      economy = `Net Worth : $0`;
    }
    if (result.rank) {
      rank = `Rank : ${result.rank}`;
    } else {
      rank = `Rank : None`;
    }
    if (result.level) {
      level = `Level : ${result.level}`;
      xp = `XP : ${result.xp} / ${result.level * result.level * 150}`;
    } else {
      level = `Level : None`;
      xp = `XP : None`;
    }
    if (result.message) {
      msg = `Messages : ${result.message}`;
    } else {
      msg = `Messages : None`;
    }
    if (marriage) {
      const target = client.users.cache.find(
        (membersT) => membersT.id === marriage.targetId
      );
      marriedText = `${target.username} ❣️ ( ${marriage.date} )`;
    } else {
      marriedText = `None`;
    }
    if (achievementsText) {
      achievementsText = `${result.achievements}`;
    } else {
      achievementsText = `None`;
    }
    const embed = new Discord.MessageEmbed()
      .setAuthor(user.tag, user.displayAvatarURL(String))
      .setThumbnail(user.displayAvatarURL(String))
      .addFields(
        {
          name: "Information",
          value: `${economy}‎\n${rank}\n\n${level}\n${xp}\n${msg}`,
          inline: true,
        },
        { name: " ‎‎", value: "‏‏‎ ‎", inline: true },
        { name: "‏‏‎ ‎", value: "‏‏‎ ‎", inline: true },
        { name: "Married to", value: marriedText, inline: true },
        { name: "Achievements", value: achievementsText, inline: true }
      );
    await message.channel.send(embed);
    return;
  },
};
