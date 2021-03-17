const muteSchema = require("../../schemas/mute-schema");
const loggingSchema = require("../../schemas/logging-channel");
module.exports = {
  commands: "mute",
  expectedArgs: "<Tag> <Time> <Reason>",
  minArgs: 1,
  permissions: ["ADMINISTRATOR", "MUTE_MEMBERS"],
  requiredRoles: [],
  callback: async (message, arguments, Discord, text, client) => {
    const { guild } = message;
    const guildId = guild.id;
    const target = message.mentions.users.first();
    const member = message.mentions.users.first();
    const args = message.content.split(" ").slice(1); // Svi argumenti poslje prefixa
    const banReason = args.slice(2).join(" "); //Svi argumenti poslje taga
    const reasonBan = banReason || "Reason Unspecified";
    const memberPerm = message.guild.members.cache.get(member.id);

    if (!target) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
        .setDescription(`❌ | Couldn't find that user!`);
      message.channel.send(embed);
      return;
    }
    if (
      memberPerm.hasPermission("ADMINISTRATOR") ||
      memberPerm.hasPermission("MUTE_MEMBERS")
    ) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
        .setDescription(`❌ | You can't mute that user!`);
      message.channel.send(embed);
      return;
    }
    let muteRole = message.guild.roles.cache.find((m) => m.name === "Muted");
    if (!muteRole) {
      try {
        muteRole = await message.guild.roles.create({
          data: {
            name: "Muted",
            color: "#000000",
            permissions: [],
          },
        });

        message.guild.channels.cache.forEach(async (channel, id) => {
          await channel.createOverwrite(muteRole, {
            SEND_MESSAGES: false,
            MANAGE_MESSAGES: false,
            READ_MESSAGES: false,
            ADD_REACTIONS: false,
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }

    const memberTarget = message.guild.members.cache.get(target.id);

    if (isNaN(args[1])) {
      memberTarget.roles.add(muteRole.id);

      const reason = args.slice(1).join(" ");
      const muteReason = reason || "Reason Unspecified";

      await muteSchema.findOneAndUpdate(
        {
          _id: guildId,
          userId: target.id,
        },
        {
          _id: guildId,
          userId: target.id,
          muted: true,
        },
        {
          upsert: true,
        }
      );

      const perma = new Discord.MessageEmbed()
        .setAuthor(
          `${memberTarget.user.tag} is muted!`,
          memberTarget.user.displayAvatarURL(String)
        )
        .setColor("#ff0000")
        .addFields(
          { name: `Time:`, value: `Permanent‏‏‎‎‏‏‎‎` },
          { name: `Reason:`, value: `${muteReason}‏‏‎‎‏‏‎‎` }
        );

      message.channel.send(perma);

      const logEmbed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.tag} has muted ${memberTarget.user.tag} `,
          message.author.displayAvatarURL(String)
        )
        .setColor("#ff0000")
        .addFields(
          { name: `Reason:`, value: `${muteReason}` },
          { name: `Time`, value: `Permanent` },
          { name: `ID`, value: `${memberTarget.user.id}` }
        )
        .setTimestamp()
        .setThumbnail(memberTarget.user.displayAvatarURL(String));
      const result = await loggingSchema.findOne({
        guildId,
      });
      if (result) {
        if (result.mute) {
          let logChannel = message.guild.channels.cache.get(result.mute);
          logChannel.send(logEmbed);
        }
      }
    } else {
      const time = args[1];
      memberTarget.roles.add(muteRole.id);

      await muteSchema.findOneAndUpdate(
        {
          _id: guildId,
          userId: target.id,
        },
        {
          _id: guildId,
          userId: target.id,
          muted: true,
        },
        {
          upsert: true,
        }
      );

      const timed = new Discord.MessageEmbed()
        .setAuthor(
          `${memberTarget.user.tag} is muted!`,
          memberTarget.user.displayAvatarURL(String)
        )
        .setColor("#ff0000")
        .addFields(
          { name: `Time:`, value: `${time} second(s)` },
          { name: `Reason:`, value: `${reasonBan}‏‏‎‎‏‏‎‎` }
        );
      message.channel.send(timed);

      const logEmbed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.tag} has muted ${memberTarget.user.tag} `,
          message.author.displayAvatarURL(String)
        )
        .setColor("#ff0000")
        .addFields(
          { name: `Reason:`, value: `${reasonBan}` },
          { name: `Time`, value: `${time} seconds` },
          { name: `ID`, value: `${memberTarget.user.id}` }
        )
        .setTimestamp()
        .setThumbnail(memberTarget.user.displayAvatarURL(String));
      const result = await loggingSchema.findOne({
        guildId,
      });
      if (result) {
        if (result.mute) {
          let logChannel = message.guild.channels.cache.get(result.mute);
          logChannel.send(logEmbed);
        }
      }
      setTimeout(async () => {
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
      }, 1000 * time);
    }
  },
};
