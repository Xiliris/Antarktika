const muteSchema = require("../../schemas/mute-schema");
const loggingSchema = require("../../schemas/logging-channel");
module.exports = {
  commands: "unmute",
  expectedArgs: "<Tag>",
  minArgs: 1,
  maxArgs: 1,
  permissions: ["ADMINISTRATOR", "MUTE_MEMBERS"],
  requiredRoles: [],
  callback: async (message, arguments, Discord, text, client) => {
    const { guild } = message;

    const guildId = guild.id;
    const target = message.mentions.users.first();

    if (!target) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
        .setDescription(`❌ | Couldn't find that user!`);
      message.channel.send(embed);
      return;
    }

    let muteRole = message.guild.roles.cache.find((m) => m.name === "Muted");
    const memberTarget = message.guild.members.cache.get(target.id);

    memberTarget.roles.remove(muteRole.id);
    await muteSchema.findOneAndUpdate(
      {
        _id: guildId,
        userId: target.id,
      },
      {
        _id: guildId,
        userId: target.id,
        muted: false,
      },
      {
        upsert: true,
      }
    );

    const perma = new Discord.MessageEmbed()
      .setAuthor(
        `${memberTarget.user.tag} is unmuted!`,
        memberTarget.user.displayAvatarURL(String)
      )
      .setColor("#0bff00");

    message.channel.send(perma);

    const logEmbed = new Discord.MessageEmbed()
      .setAuthor(
        `${message.author.tag} has been unmuted ${memberTarget.user.tag} `,
        message.author.displayAvatarURL(String)
      )
      .setColor("#ff0000")
      .addFields({ name: `ID`, value: `${memberTarget.user.id}` })
      .setTimestamp()
      .setThumbnail(memberTarget.user.displayAvatarURL(String));
    const result = await loggingSchema.findOne({
      guildId,
    });
    if (result.unmute) {
      let logChannel = message.guild.channels.cache.get(result.unmute);
      logChannel.send(logEmbed);
    }
  },
};
