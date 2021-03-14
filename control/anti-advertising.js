const muteSchema = require("../schemas/mute-schema");
const loggingSchema = require("../schemas/logging-channel");
const warnSchema = require("../schemas/warn-schema");
module.exports = async (client, Discord, messageDelete, message) => {
  const isInvite = async (guild, code) => {
    return await new Promise((resolve) => {
      guild.fetchInvites().then((invites) => {
        for (const invite of invites) {
          if (code === invite[0]) {
            resolve(true);
            return;
          }
        }

        resolve(false);
      });
    });
  };

  client.on("message", async (message) => {
    const { guild, member, content } = message;
    const guildId = guild.id;
    const target = message.author;
    // discord.gg/23RAN4

    const code = content.split("discord.gg/")[1];

    if (content.includes("discord.gg/")) {
      const isOurInvite = await isInvite(guild, code);
      if (!isOurInvite) {
        if (message.member.permissions.has("ADMINISTRATOR")) {
        } else {
          // Obrise Poruku
          message.delete();

          // Log Poruke
          client.on("messageDelete", async (messageDelete) => {
            const logEmbed = new Discord.MessageEmbed()
              .setAuthor(
                `${messageDelete.author.tag}`,
                messageDelete.author.displayAvatarURL(String)
              )
              .setColor("#ff0000")
              .addFields({
                name: `Tried to send invite link, mute 10 minutes:`,
                value: `${messageDelete.content}‏‏‎‎‏‏‎‎`,
              });
            const result = await loggingSchema.findOne({
              guildId: guild.id,
            });

            if (result.message) {
              let logChannel = guild.channels.cache.get(result.message);
              logChannel.send(logEmbed);
            }
          });

          //Mute
          let muteRole = message.guild.roles.cache.find(
            (m) => m.name === "Muted"
          );
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

          const user = message.author;

          const targetUser = guild.members.cache.get(user.id);

          targetUser.roles.add(muteRole);

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

          setTimeout(async function () {
            targetUser.roles.remove(muteRole.id);
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
          }, 600000);

          // Posalje Warn
          const antiAdd = new Discord.MessageEmbed()
            .setAuthor(
              `${message.author.tag} has been warned!`,
              message.author.displayAvatarURL(String)
            )
            .setColor("#ff00f8")
            .addFields({
              name: `Reason:`,
              value: `Tried to send invite link!`,
            });

          await message.channel.send(antiAdd);
          const warning = {
            author: message.member.user.tag,
            timestamp: new Date().getTime(),
            reason: "Tried to send invite link!",
          };
          const results = await warnSchema.findOne({
            guildId: message.guild.id,
            userId: message.author.id,
          });
          if (results.warnings.length > 9) {
            const embed = new Discord.MessageEmbed()
              .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL(String)
              )
              .setDescription("❌ | Has too much warnings");
            message.channel.send(embed);
            return;
          }
          await warnSchema.findOneAndUpdate(
            {
              guildId: message.guild.id,
              userId: message.author.id,
            },
            {
              guildId: message.guild.id,
              userId: message.author.id,
              warnings: warning,
            },
            {
              upsert: true,
            }
          );
        }
      }
    }
  });
};
