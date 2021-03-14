const logUserSchema = require("../../schemas/log-user-schema");
module.exports = {
  commands: "ban",
  expectedArgs: "<Tag> <Reason>",
  minArgs: 1,
  permissions: ["ADMINISTRATOR", "BAN_MEMBERS"],
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
        .setDescription(`❌ | You can't ban yourself!`);
      message.channel.send(embed);
      return;
    }
    const memberTarger = message.guild.members.cache.get(member.id);
    if (
      memberPerm.hasPermission("ADMINISTRATOR") ||
      memberPerm.hasPermission("BAN_MEMBERS")
    ) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
        .setDescription(`❌ | You can't ban that user!`);
      message.channel.send(embed);
      return;
    }

    //Private Message Embed
    const pm = new Discord.MessageEmbed()
      .setAuthor(
        `${message.author.tag}`,
        message.author.displayAvatarURL(String)
      )
      .setColor("#ff0000")
      .addFields(
        { name: `You were banned from`, value: `${message.guild.name}` },
        { name: `Reason:`, value: `${reasonBan}` }
      );

    memberTarger.user.send(pm).catch((err) => console.log(err));

    //Chat Embed
    const newEmbed = new Discord.MessageEmbed()
      .setAuthor(
        `${memberTarger.user.tag} has been banned!`,
        memberTarger.user.displayAvatarURL(String)
      )
      .setColor("#ff0000")
      .addFields({ name: `Reason:`, value: `${reasonBan}` });

    message.channel.send(newEmbed);

    //Ban fukncija
    await memberTarger.ban({ reason: reasonBan });
    await logUserSchema.findOneAndUpdate(
      {
        _id: guild.id,
      },
      {
        _id: guild.id,
        ban: message.author.username,
        banAvatar: message.author.displayAvatarURL(String),
      },
      {
        upsert: true,
      }
    );
  },
};
