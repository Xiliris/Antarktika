const counterSchema = require("../../schemas/counter-schema");
module.exports = {
  commands: "create-counter",
  permissions: ["ADMINISTRATOR"],
  callback: async (message, arguments, Discord, text, client) => {
    const members = message.guild.members.cache.filter(
      (member) => !member.user.bot
    ).size;
    const bots = message.guild.members.cache.filter((member) => member.user.bot)
      .size;
    message.guild.channels
      .create("Server Stats", { type: "category" })
      .then((category) => {
        category.setPosition(0);
        message.guild.channels
          .create(`Members : ${members}`, {
            type: "voice",
            parent: category.id,
            permissionOverwrites: [
              {
                id: message.guild.roles.everyone.id,
                allow: ["VIEW_CHANNEL"],
                deny: ["CONNECT"],
              },
            ],
          })
          .then(async (channel) => {
            await counterSchema.findOneAndUpdate(
              {
                guildId: message.guild.id,
              },
              {
                guildId: message.guild.id,
                memberChannel: channel.id,
              },
              {
                upsert: true,
              }
            );
          });
        message.guild.channels
          .create(`Bots : ${bots}`, {
            type: "voice",
            parent: category.id,
            permissionOverwrites: [
              {
                id: message.guild.roles.everyone.id,
                allow: ["VIEW_CHANNEL"],
                deny: ["CONNECT"],
              },
            ],
          })
          .then(async (channel) => {
            await counterSchema.findOneAndUpdate(
              {
                guildId: message.guild.id,
              },
              {
                guildId: message.guild.id,
                botsChannel: channel.id,
              },
              {
                upsert: true,
              }
            );
          });
      });
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
      .setDescription("✅ | Counter was sucessfully created");
    message.channel.send(embed);
  },
};
