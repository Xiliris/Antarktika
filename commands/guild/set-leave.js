const welcomeSchema = require("../../schemas/welcome-schema");
module.exports = {
  commands: "set-leave-message",
  permissions: ["ADMINISTRATOR"],
  callback: async (message, arguments, Discord, client) => {
    const members = message.guild.members.cache.filter(
      (member) => !member.user.bot
    ).size;
    const filter = (m) => m.content;
    message.channel
      .send(
        "**Enter your message, you can use:\n~Player~ for Username\n~PlayerTag~ for Mention\n~Count~ for MemberCount\n~Guild~ for Server Name**"
      )
      .then(async () => {
        message.channel
          .awaitMessages(filter, { max: 1, time: 1000 * 60, errors: ["time"] })
          .then(async (collected) => {
            await welcomeSchema.findOneAndUpdate(
              {
                guildId: message.guild.id,
              },
              {
                guildId: message.guild.id,
                leaveMessage: collected.first().content,
              },
              {
                upsert: true,
              }
            );
            const text4 = collected
              .first()
              .content.replace(/~Player~/g, `${message.member.user.tag}`);
            const text3 = text4.replace(
              /~PlayerTag~/g,
              `<@${message.member.user.id}>`
            );
            const text2 = text3.replace(
              /~Guild~/g,
              `${message.member.guild.name}`
            );
            const text1 = text2.replace(/~Count~/g, `${members}`);
            const embed = new Discord.MessageEmbed()
              .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL(String)
              )
              .addFields({
                name: "Leave Text",
                value: text1,
              });
            message.channel.send(embed);
          });
      });
  },
};
