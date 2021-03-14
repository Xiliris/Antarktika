const loggingSchema = require("../../schemas/logging-channel");
module.exports = {
  commands: "set-logging",
  expectedArgs: "<Logging>",
  minArgs: 1,
  permissions: ["ADMINISTRATOR"],
  callback: async (message, arguments, Discord, text, client) => {
    const { guild } = message;
    const guildId = guild.id;
    const args = arguments[0].toLowerCase();
    const channel = message.channel.id;

    const logs = `
    Warn = Logging warns given to users.\n
    Mute = Logging mutes given to users.\n
    Economy = Logging every economy update.\n
    Kick = Logging every kick on the server.\n
    Ban = Logging every ban on the server.\n
    Unban = Logging every unbna on the server.\n
    Message = Logging every message event.\n
    User = Logging user updates.\n
    Server = Logging server changes.\n
    Channel = Logging server changes.\n
    Voice = Logging voice joins/leaves.\n
    Move = Logging moved users\n
    `;

    const embed = new Discord.MessageEmbed()
      .setAuthor("Logging")
      .setDescription(logs);

    const finishEmbed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
      .setDescription(
        `✅ | Sucessfully set ${args.toUpperCase()} Logging to ${
          message.channel.name
        }`
      );

    if (args === "warn") {
      await loggingSchema.findOneAndUpdate(
        {
          guildId,
        },
        {
          guildId,
          warn: channel,
        },
        {
          upsert: true,
        }
      );
      message.channel.send(finishEmbed);
    } else if (args === "mute") {
      await loggingSchema.findOneAndUpdate(
        {
          guildId,
        },
        {
          guildId,
          mute: channel,
        },
        {
          upsert: true,
        }
      );
      message.channel.send(finishEmbed);
    } else if (args === "economy") {
      await loggingSchema.findOneAndUpdate(
        {
          guildId,
        },
        {
          guildId,
          economy: channel,
        },
        {
          upsert: true,
        }
      );
      message.channel.send(finishEmbed);
    } else if (args === "kick") {
      await loggingSchema.findOneAndUpdate(
        {
          guildId,
        },
        {
          guildId,
          kick: channel,
        },
        {
          upsert: true,
        }
      );
      message.channel.send(finishEmbed);
    } else if (args === "ban") {
      await loggingSchema.findOneAndUpdate(
        {
          guildId,
        },
        {
          guildId,
          ban: channel,
        },
        {
          upsert: true,
        }
      );
      message.channel.send(finishEmbed);
    } else if (args === "unban") {
      await loggingSchema.findOneAndUpdate(
        {
          guildId,
        },
        {
          guildId,
          unban: channel,
        },
        {
          upsert: true,
        }
      );
      message.channel.send(finishEmbed);
    } else if (args === "message") {
      await loggingSchema.findOneAndUpdate(
        {
          guildId,
        },
        {
          guildId,
          message: channel,
        },
        {
          upsert: true,
        }
      );
      message.channel.send(finishEmbed);
    } else if (args === "user") {
      await loggingSchema.findOneAndUpdate(
        {
          guildId,
        },
        {
          guildId,
          user: channel,
        },
        {
          upsert: true,
        }
      );
      message.channel.send(finishEmbed);
    } else if (args === "server") {
      await loggingSchema.findOneAndUpdate(
        {
          guildId,
        },
        {
          guildId,
          server: channel,
        },
        {
          upsert: true,
        }
      );
      message.channel.send(finishEmbed);
    } else if (args === "channel") {
      await loggingSchema.findOneAndUpdate(
        {
          guildId,
        },
        {
          guildId,
          channel: channel,
        },
        {
          upsert: true,
        }
      );
      message.channel.send(finishEmbed);
    } else if (args === "voice") {
      await loggingSchema.findOneAndUpdate(
        {
          guildId,
        },
        {
          guildId,
          voice: channel,
        },
        {
          upsert: true,
        }
      );
      message.channel.send(finishEmbed);
    } else if (args === "move") {
      await loggingSchema.findOneAndUpdate(
        {
          guildId,
        },
        {
          guildId,
          move: channel,
        },
        {
          upsert: true,
        }
      );
      message.channel.send(finishEmbed);
    } else {
      message.channel.send(embed);
    }
  },
};
