<<<<<<< HEAD
const welcomeRoleSchema = require("../../schemas/welcome-role-schema");
module.exports = {
  commands: "add-welcome-role",
  expectedArgs: "<RoleID>",
  minArgs: 1,
  permissions: ["ADMINISTRATOR"],
  requiredRoles: [],
  callback: async (message, arguments, Discord, text, client) => {
    if (isNaN(arguments[0])) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | RoleID must be a number!");
      message.channel.send(embed);
      return;
    }
    const role = message.guild.roles.cache.get(arguments[0]);
    if (!role) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Couldn't find that role!");
      message.channel.send(embed);
      return;
    }
    await welcomeRoleSchema.findOneAndUpdate(
      {
        guildId: message.guild.id,
      },
      {
        guildId: message.guild.id,
        $push: {
          roles: {
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
      .setDescription(`✅ | You added welcome role ${role.name}`);
    message.channel.send(embed);
  },
};
=======
const welcomeRoleSchema = require("../../schemas/welcome-role-schema");
module.exports = {
  commands: "add-welcome-role",
  expectedArgs: "<RoleID>",
  minArgs: 1,
  permissions: ["ADMINISTRATOR"],
  requiredRoles: [],
  callback: async (message, arguments, Discord, text, client) => {
    if (isNaN(arguments[0])) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | RoleID must be a number!");
      message.channel.send(embed);
      return;
    }
    const role = message.guild.roles.cache.get(arguments[0]);
    if (!role) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Couldn't find that role!");
      message.channel.send(embed);
      return;
    }
    await welcomeRoleSchema.findOneAndUpdate(
      {
        guildId: message.guild.id,
      },
      {
        guildId: message.guild.id,
        $push: {
          roles: {
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
      .setDescription(`✅ | You added welcome role ${role.name}`);
    message.channel.send(embed);
  },
};
>>>>>>> 8a3754cccb498051759a59e25235a1c862f0b9a4
