const logUserSchema = require("../../schemas/log-user-schema");
module.exports = {
  commands: "unban",
  expectedArgs: "<UserID>",
  minArgs: 1,
  minArgs: 1,
  permissions: ["ADMINISTRATOR", "BAN_MEMBERS"],
  requiredRoles: [],
  callback: async (message, arguments, Discord, text, client) => {
    //unban Skica
    let userID = arguments[0];

    message.guild.fetchBans().then(async (bans) => {
      if (bans.size == 0) return;

      let bUser = bans.find((b) => b.user.id == userID);
      if (!bUser) return;

      //Unban Embed
      const unbanned = new Discord.MessageEmbed()
        .setAuthor(
          `${bUser.user.tag} is unbanned`,
          bUser.user.displayAvatarURL(String)
        )
        .setColor("#ff0000");

      // Unban Funkcija
      message.guild.members.unban(bUser.user);
      message.channel.send(unbanned);

      await logUserSchema.findOneAndUpdate(
        {
          _id: message.guild.id,
        },
        {
          _id: message.guild.id,
          unban: message.author.tag,
          unbanAvatar: message.author.displayAvatarURL(String),
        },
        {
          upsert: true,
        }
      );
    });
  },
};
