const prefixSchema = require("../schemas/prefix-schema");
const Discord = require("discord.js");
const Canvas = require("canvas");
const guildPrefixes = require("../cache/prefix-cache");
const channelSchema = require("../schemas/channel-schema");

const { prefix: globalPrefix } = require("../config.json");

const validatePermissions = (permissions) => {
  const validPermissions = [
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS",
  ];

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`Unknown permission node "${permission}"`);
    }
  }
};

let recentlyRan = [];

module.exports = (client, commandOptions) => {
  let {
    commands,
    expectedArgs = "",
    minArgs = 0,
    maxArgs = null,
    cooldown = -1,
    requiredChannel = "",
    enabled = true,
    permissions = [],
    requiredRoles = [],
    callback,
  } = commandOptions;

  // Ensure the command and aliases are in an array
  if (typeof commands === "string") {
    commands = [commands];
  }

  console.log(`Registering command "${commands[0]}"`);

  // Ensure the permissions are in an array and are all valid
  if (permissions.length) {
    if (typeof permissions === "string") {
      permissions = [permissions];
    }

    validatePermissions(permissions);
  }

  // Listen for messages
  client.on("message", async (message) => {
    const { member, content, guild, channel } = message;

    const prefix = guildPrefixes[guild.id] || globalPrefix;

    for (const alias of commands) {
      const command = `${prefix}${alias.toLowerCase()}`;

      if (
        content.toLowerCase().startsWith(`${command} `) ||
        content.toLowerCase() === command
      ) {
        // A command has been ran

        //Ensure we are in right channel
        const result = await channelSchema.findOne({
          _id: guild.id,
        });
        if (result) {
          if (requiredChannel !== "") {
            if (requiredChannel === "economy") {
              if (!result.economy) {
              }
              let gotChannel = message.guild.channels.cache.find(
                (channel) => channel.name === result.economy
              );
              if (result.economy) {
                if (channel !== gotChannel) {
                  const embed = new Discord.MessageEmbed()
                    .setAuthor(
                      member.user.tag,
                      member.user.displayAvatarURL(String)
                    )
                    .setDescription(
                      `✉️ | You can only use this command in <#${gotChannel.id}>`
                    );
                  message.channel.send(embed);
                  return;
                }
              }
            } else if (requiredChannel === "commands") {
              if (!result.commads) {
              }
              let gotChannel = message.guild.channels.cache.find(
                (channel) => channel.name === result.commands
              );
              if (result.commands) {
                if (channel !== gotChannel) {
                  const embed = new Discord.MessageEmbed()
                    .setAuthor(
                      member.user.tag,
                      member.user.displayAvatarURL(String)
                    )
                    .setDescription(
                      `✉️ | You can only use this command in <#${gotChannel.id}>`
                    );
                  message.channel.send(embed);
                  return;
                }
              }
            }
          }
        }

        // Ensure the user has the required permissions
        for (const permission of permissions) {
          if (!member.hasPermission(permission)) {
            const embed = new Discord.MessageEmbed()
              .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
              .setDescription(`⛔ | **You don't have permission for that!**`);
            message.channel.send(embed);
            return;
          }
        }

        // Ensure the user has the required roles
        for (const requiredRole of requiredRoles) {
          const role = guild.roles.cache.find(
            (role) => role.name === requiredRole
          );

          if (!role || !member.roles.cache.has(role.id)) {
            const embed = new Discord.MessageEmbed()
              .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
              .setDescription(
                `⛔ | **You don't have required role!** [ ${requiredRole} ].`
              );
            message.channel.send(embed);
            return;
          }
        }
        //Check to see if the command is enabled

        if (enabled === "false") return console.log("command disabled");

        // Ensure the user has not ran this command to fast
        let cooldownString = `${guild.id}-${member.id}-${commands[0]}`;
        if (cooldown > 0 && recentlyRan.includes(cooldownString)) {
          const embed = new Discord.MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
            .setDescription(
              `⏱️ | Please wait ${cooldown} seconds before using this command again!`
            );
          message.channel.send(embed);
          return;
        }

        // Split on any number of spaces
        const arguments = content.split(/[ ]+/);

        // Remove the command which is the first index
        arguments.shift();

        // Ensure we have the correct number of arguments
        if (
          arguments.length < minArgs ||
          (maxArgs !== null && arguments.length > maxArgs)
        ) {
          const embed = new Discord.MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
            .setDescription(
              `**Correct use : \n${prefix}${alias} ${expectedArgs}**`
            );
          message.channel.send(embed);
          return;
        }

        if (cooldown > 0) {
          recentlyRan.push(cooldownString);

          setTimeout(() => {
            recentlyRan = recentlyRan.filter((string) => {
              return string !== cooldownString;
            });
          }, 1000 * cooldown);
        }

        // Handle the custom command code
        callback(
          message,
          arguments,
          Discord,
          Canvas,
          client,
          arguments.join(" ")
        );

        return;
      }
    }
  });
};

module.exports.loadPrefixes = async (client) => {
  for (const guild of client.guilds.cache) {
    const guildId = guild[1].id;

    const result = await prefixSchema.findOne({ _id: guildId });
    if (!result) {
      guildPrefixes[guildId];
    } else {
      guildPrefixes[guildId] = result.prefix;
    }
  }
};

module.exports.prefix = guildPrefixes;
