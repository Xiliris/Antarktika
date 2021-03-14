const logUserSchema = require("../../schemas/log-user-schema");
module.exports = {
  commands: "kick",
  expectedArgs: "<Tag> <Reason>",
  minArgs: 1,
  permissions: ["ADMINISTRATOR", "KICK_MEMBERS"],
  requiredRoles: [],
  callback: async (message, arguments, Discord, text, client) => {
    const { guild } = message;

    const member = message.mentions.users.first();
    const args = message.content.split(" ").slice(1); // Svi argumenti poslje prefixa
    const banReason = args.slice(1).join(" "); //Svi argumenti poslje taga
    const reasonBan = banReason || "Reason Unspecified";
    const memberPerm = message.guild.members.cache.get(member.id);

    if (!member) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
        .setDescription(`❌ | Couldn't find that user!`);
      message.channel.send(embed);
      return;
    }
    if (member.id === message.author.id) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
        .setDescription(`❌ | You can't kick yourself!`);
      message.channel.send(embed);
      return;
    }
    const memberTarger = message.guild.members.cache.get(member.id);
    if (
      memberPerm.hasPermission("ADMINISTRATOR") ||
      memberPerm.hasPermission("KICK_MEMBERS")
    ) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
        .setDescription(`❌ | You can't kick that user!`);
      message.channel.send(embed);
      return;
    }

    //Private Message Embed
    const pm = new Discord.MessageEmbed()
      .setAuthor(
        `${message.author.tag}`,
        message.author.displayAvatarURL(String)
      )
      .setColor("#004dff")
      .addFields(
        { name: `You were kicked from`, value: ` ‏‏‎‎`, inline: true },
        { name: `${message.guild.name}`, value: `‏‏‎ ‎`, inline: true },
        { name: `Reason:`, value: `${reasonBan}` }
      );

    memberTarger.user.send(pm);

    //Chat Embed
    const newEmbed = new Discord.MessageEmbed()
      .setAuthor(
        `${memberTarger.user.tag} has been kicked!`,
        memberTarger.user.displayAvatarURL(String)
      )
      .setColor("#004dff")
      .addFields({ name: `Reason:`, value: `${reasonBan}` });

    message.channel.send(newEmbed);

    await memberTarger.kick();
    await logUserSchema.findOneAndUpdate(
      {
        _id: guild.id,
      },
      {
        _id: guild.id,
        kick: message.author.username,
        kickAvatar: message.author.displayAvatarURL(String),
      },
      {
        upsert: true,
      }
    );
  },
};
