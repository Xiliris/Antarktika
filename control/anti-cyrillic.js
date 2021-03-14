const loggingSchema = require("../schemas/logging-channel");
const controlSchema = require("../schemas/control-schema");
module.exports = (client, Discord) => {
  // Cirilica velka slova 'Б', 'Г', 'Д', 'Ђ', 'Ж', 'З', 'И', 'Л', 'Љ', 'Њ', 'П', 'Ћ', 'Ф', 'Ц', 'Ч', 'Џ', 'Ш'
  // Cirilica mala slova 'б', 'г', 'д', 'ђ', 'ж', 'з', 'и', 'л', 'љ', 'њ', 'п', 'ћ', 'ф', 'ц', 'ч', 'џ', 'ш'
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
  client.on("message", async (message) => {
    const check = await controlSchema.findOne({
      _id: message.guild.id,
    });
    if (!check) return;
    if (!check.cyrillic) return;
    if (blacklist.some((word) => message.content.includes(word))) {
      if (message.member.permissions.has("ADMINISTRATOR")) {
      } else {
        //Obrise poruku
        message.delete();

        client.on("messageDelete", async (messageDelete) => {
          const logEmbed = new Discord.MessageEmbed()
            .setAuthor(
              `${message.author.tag}`,
              message.author.displayAvatarURL(String)
            )
            .setColor("#ff0000")
            .addFields({
              name: `Tried to send blacklisted word:`,
              value: `${messageDelete.content}‏‏‎‎‏‏‎‎`,
            });

          const result = await loggingSchema.findOne({
            guildId: message.guild.id,
          });
          if (result.message) {
            let logChannel = message.guild.channels.cache.get(result.message);
            logChannel.send(logEmbed);
          }
        });

        //Posalje warn
        const antiAdd = new Discord.MessageEmbed()
          .setAuthor(
            `${message.author.tag} has been warned!`,
            message.author.displayAvatarURL(String)
          )
          .setColor("#ff00f8")
          .addFields({
            name: `Reason:`,
            value: `Cyrillic is blacklisted!`,
          });

        await message.channel.send(antiAdd);
      }
    }
  });
};
