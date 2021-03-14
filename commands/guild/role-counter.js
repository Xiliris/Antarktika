const roleCountSchema = require("../../schemas/role-count-schema");
module.exports = {
  commands: "role-counter",
  expectedArgs: "<RoleID> <ChannelID>",
  minArgs: 2,
  permissions: ["ADMINISTRATOR"],
  callback: async (message, arguments, Discord, text, client) => {
    const roleA = arguments[0];
    const channelA = arguments[1];

    if (!roleA) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Role not found!");
      message.channel.send(embed);
      return;
    }
    if (!channelA) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | channel not found!");
      message.channel.send(embed);
      return;
    }
    let role = message.guild.roles.cache.find((rn) => rn.name === roleA);
    let member = message.guild.roles.cache.find((rn) => rn.name === roleA)
      .members;
    let channel = message.guild.channels.cache.get(channelA);
    if (!role) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Role not found!");
      message.channel.send(embed);
      return;
    }
    if (!channel) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | channel not found!");
      message.channel.send(embed);
      return;
    }
    const roleCounter = {
      roleId: role.id,
      channelId: channel.id,
    };
    await roleCountSchema.findOneAndUpdate(
      {
        _id: message.guild.id,
      },
      {
        _id: message.guild.id,
        $push: {
          counter: roleCounter,
        },
      },
      {
        upsert: true,
      }
    );
    console.log(member.size);
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
      .setDescription(`✅ | ${role.name} counter was sucessfully created`);
    message.channel.send(embed);
    channel.setName(`${role.name} : ${member.size.toString()}`);
  },
};
