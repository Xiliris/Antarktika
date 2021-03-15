const reactionSchema = require("../../schemas/reaction-schema");
module.exports = {
  commands: ["reaction", "rr"],
  expectedArgs: "<ChannelID> <MessageID> <RoleID> <Emoji>",
  minArgs: 4,
  permissions: ["ADMINISTRATOR"],
  callback: async (message, arguments, Discord, text, client) => {
    const channel = await message.guild.channels.cache.get(arguments[0]);
    if (!channel) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Couldn't find that channel");
      message.channel.send(embed);
      return;
    }
    const messageId = await channel.messages.fetch(arguments[1]);
    const role = await message.guild.roles.cache.get(arguments[2]);
    if (!role) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Couldn't find that role");
      message.channel.send(embed);
      return;
    }
    const result = await reactionSchema.findOne({
      guildId: message.guild.id,
      channelId: channel.id,
      messageId: messageId.id,
    });
    if (!result) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Couldn't find that reaction message!");
      message.channel.send(embed);
      return;
    }
    await reactionSchema.findOneAndUpdate(
      {
        guildId: message.guild.id,
        channelId: channel.id,
        messageId: messageId.id,
      },
      {
        guildId: message.guild.id,
        channelId: channel.id,
        messageId: messageId.id,
        $push: {
          roles: {
            emoji: arguments[3],
            role: role.id,
          },
        },
      },
      {
        upsert: true,
      }
    );
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
      .setDescription(
        `✅ | Sucessfully added ${role.name} role on reaction ${arguments[3]}`
      );
    message.channel.send(embed);
    messageId.react(arguments[3]);
  },
};
