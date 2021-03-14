const channelSchema = require("../../schemas/channel-schema");
module.exports = {
  commands: "set-channel",
  expectedArgs:
    "<Economy | Commands> | Leveling | WelcomeImage | WelcomeText | WelcomeEmbed | LeaveChannel | Reaction Chat",
  minArgs: 1,
  permissions: ["ADMINISTRATOR"],
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, member } = message;

    const args = arguments[0].toLowerCase();
    const channel = message.channel.name;
    const channelId = message.channel.id;
    const guildId = guild.id;

    if (args === "economy") {
      await channelSchema.findOneAndUpdate(
        {
          _id: guildId,
        },
        await {
          guildId,
          economy: channel,
        },
        {
          upsert: true,
        }
      );
      const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
        .setDescription(
          `✅ | Economy channel was successfully set to <#${channelId}>`
        );
      message.channel.send(embed);
      return;https://github.com/Xiliris/AntarktikaBOT/blob/main/commands/guild/set-channel.js
    } else if (args === "commands") {
      await channelSchema.findOneAndUpdate(
        {
          _id: guildId,
        },
        {
          guildId,
          commands: channel,
        },
        {
          upsert: true,
        }
      );
      const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
        .setDescription(
          `✅ | Commands channel was successfully set to <#${channelId}>`
        );
      message.channel.send(embed);
      return;
    } else if (args === "leveling") {
      await channelSchema.findOneAndUpdate(
        {
          _id: guildId,
        },
        {
          guildId,
          leveling: channel,
        },
        {
          upsert: true,
        }
      );
      const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
        .setDescription(
          `✅ | Leveling channel was successfully set to <#${channelId}>`
        );
      message.channel.send(embed);
      return;
    } else if (args === "welcomeimage") {
      await channelSchema.findOneAndUpdate(
        {
          _id: guildId,
        },
        {
          guildId,
          welcome: channelId,
        },
        {
          upsert: true,
        }
      );
      const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
        .setDescription(
          `✅ | Welcome channel was successfully set to <#${channelId}>`
        );
      message.channel.send(embed);
      return;
    } else if (args === "welcomeembed") {
      await channelSchema.findOneAndUpdate(
        {
          _id: guildId,
        },
        {
          guildId,
          welcomeEmbed: channelId,
        },
        {
          upsert: true,
        }
      );
      const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
        .setDescription(
          `✅ | Welcome Embed channel was successfully set to <#${channelId}>`
        );
      message.channel.send(embed);
      return;
    } else if (args === "welcometext") {
      await channelSchema.findOneAndUpdate(
        {
          _id: guildId,
        },
        {
          guildId,
          welcomeText: channelId,
        },
        {
          upsert: true,
        }
      );
      const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
        .setDescription(
          `✅ | Welcome Text channel was successfully set to <#${channelId}>`
        );
      message.channel.send(embed);
      return;
    } else if (args === "leavechannel") {
      await channelSchema.findOneAndUpdate(
        {
          _id: guildId,
        },
        {
          guildId,
          leaveChannel: channelId,
        },
        {
          upsert: true,
        }
      );
      const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
        .setDescription(
          `✅ | Leave Message channel was successfully set to <#${channelId}>`
        );
      message.channel.send(embed);
      return;
    }
  },
};
