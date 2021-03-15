const warnSchema = require("../../schemas/warn-schema");
const loggingSchema = require("../../schemas/logging-channel");
module.exports = {
  commands: "warn",
  expectedArgs: "<Tag> <Reason>",
  minArgs: 1,
  permissions: ["ADMINISTRATOR", "BAN_MEMBERS"],
  requiredRoles: [],
  callback: async (message, arguments, Discord, text, client) => {
    const { guild } = message;

    const target = message.mentions.users.first();
    const memberPerm = message.guild.members.cache.get(target.id);

    if (!target) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
        .setDescription(`❌ | Couldn't find that user!`);
      message.channel.send(embed);
      return;
    }
    if (target.id === message.author.id) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
        .setDescription(`❌ | You can't warn yourself!`);
      message.channel.send(embed);
      return;
    }
    const memberTarget = message.guild.members.cache.get(target.id);
    if (
      memberPerm.hasPermission("ADMINISTRATOR") ||
      memberPerm.hasPermission("KICK_MEMBERS")
    ) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription(`❌ | You cant warn that user!`);
      message.channel.send(embed);
      return;
    }
    arguments.shift();

    const guildId = guild.id;
    const userId = target.id;
    const reasonWarn = arguments.join(" ");
    const reason = reasonWarn || "Reason Unspecified";

    const warning = {
      author: message.member.user.tag,
      timestamp: new Date().getTime(),
      reason,
    };
    const results = await warnSchema.findOne({
      guildId,
      userId,
    });
    console.log(results.warnings.length);
    if (results.warnings.length > 9) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Has too much warnings");
      message.channel.send(embed);
      return;
    }
    const warnEmbed = new Discord.MessageEmbed()
      .setAuthor(
        `${memberTarget.user.tag} has beeen warned!`,
        memberTarget.user.displayAvatarURL(String)
      )
      .setColor("#ff00f8")
      .addFields({ name: `Reason:`, value: `${reason}` });

    const logEmbed = new Discord.MessageEmbed()
      .setAuthor(
        `${message.author.tag} has warned ${memberTarget.user.tag} `,
        message.author.displayAvatarURL(String)
      )
      .setColor("#ff0000")
      .addFields(
        { name: `Reason:`, value: `${reason}` },
        { name: `ID`, value: `${memberTarget.user.id}` }
      )
      .setTimestamp()
      .setThumbnail(memberTarget.user.displayAvatarURL(String));
    const result = await loggingSchema.findOne({
      guildId,
    });
    if (result.warn) {
      let logChannel = message.guild.channels.cache.get(result.warn);
      logChannel.send(logEmbed);
    }
    await warnSchema.findOneAndUpdate(
      {
        guildId,
        userId,
      },
      {
        guildId,
        userId,
        $push: {
          warnings: warning,
        },
      },
      {
        upsert: true,
      }
    );
    message.channel.send(warnEmbed);
  },
};
