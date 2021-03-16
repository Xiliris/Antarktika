const { MessageEmbed } = require("discord.js");
module.exports = {
  commands: ["help"],
  callback: async (message, arguments, Discord, text, client) => {
    const { guild } = message;
    if (arguments[0] === "economy") {
      const economy = new Discord.MessageEmbed()
        .setTitle(`${guild.name}`)
        .setDescription("‏‏‎ ‎")
        .addFields(
          { name: "Balance", value: "Check your's or someone's balance." },
          { name: "Deposit", value: "Deposit your money to the bank." },
          { name: "Withdraw", value: "Withdraw your money from the bank." },
          { name: "Work", value: "Earn some money." },
          { name: "Slut", value: "Earn some money." },
          { name: "Crime", value: "Earn some money." },
          { name: "Rob", value: "Rob someone for money." },
          { name: "BalTop", value: "Check users who have the most money." },
          { name: "Give", value: "Give someone money." },
          { name: "Rank-Shop", value: "Check economy ranks." },
          { name: "Buy-Rank", value: "Buy economy ranks." },
          { name: "Collect-Income", value: "Collect money for your rank." },
          { name: "Roulette", value: "Play a game of roulette." },
          { name: "Slot", value: "Play a game of slot." }
        )
        .setThumbnail(guild.iconURL());
      message.channel.send(economy);
    } else if (arguments[0] === "leveling") {
      const leveling = new Discord.MessageEmbed()
        .setTitle(`${guild.name}`)
        .setDescription("‏‏‎ ‎")
        .addFields(
          { name: "Rank", value: "Show your's or someone's rank card." },
          { name: "Top-xp", value: "Shows xp leaderboard." },
          { name: "Rewards", value: "Check rewards for levels." }
        )
        .setThumbnail(guild.iconURL());
      message.channel.send(leveling);
    } else if (arguments[0] === "miscellaneous" || arguments[0] === "misc") {
      const miscellaneous = new Discord.MessageEmbed()
        .setTitle(`${guild.name}`)
        .setDescription("‏‏‎ ‎")
        .addFields(
          { name: "Avatar", value: "Shows your's or someone's avatar." },
          { name: "Marry", value: "Marry someone you love." },
          { name: "Divorce", value: "Divorce if you don't love them anymore." },
          {
            name: "Server-Info",
            value: "Get some information about the server.",
          },
          { name: "User-Info", value: "Get some information about the user." },
          { name: "Profile", value: "Get users profile." },
          { name: "Ping", value: "Get bots ping." },
          { name: "8Bal", value: "Get a random answer." },
          { name: "Afk", value: "Toggle afk mode." },
          { name: "Dice", value: "Roll a dice." },
          { name: "Invite", value: "Get bots invite link." },
          { name: "Last-Message", value: "Get users last message." },
          { name: "Snipe", value: "Get last deleted message." }
        )
        .setThumbnail(guild.iconURL());
      message.channel.send(miscellaneous);
    } else if (arguments[0] === "fun") {
      const fun = new Discord.MessageEmbed()
        .setTitle(`${guild.name}`)
        .setDescription("‏‏‎ ‎")
        .addFields(
          { name: "Gay", value: "Get gay avatar." },
          { name: "Hate", value: "Check how much you hate someone." },
          { name: "Ship", value: "Check how much you love someone." },
          { name: "Tweet", value: "Tweet something on discord." },
          { name: "Meme", value: "Sends a random meme from redit." }
        )
        .setThumbnail(guild.iconURL());
      message.channel.send(fun);
    } else if (arguments[0] === "moderation" || arguments[0] === "mod") {
      const moderation = new Discord.MessageEmbed()
        .setTitle(`${guild.name}`)
        .setDescription("‏‏‎ ‎")
        .addFields(
          { name: "Ban", value: "Ban someone form your server." },
          { name: "Unban", value: "Unban someone by id." },
          { name: "Kick", value: "Kick someone from your server." },
          { name: "Clear", value: "Clear some messages from the chat." },
          { name: "Nuke", value: "Delete everything for the chat." },
          { name: "Lock", value: "Lock the chat." },
          { name: "Unlock", value: "Unlock the chat." },
          { name: "Mute", value: "Mute someone so they cant type." },
          { name: "Unmute", value: "Unmute someone." },
          { name: "Warn", value: "Warn someone." },
          { name: "Infractions", value: "Check warnings for someone." },
          { name: "Add-Money", value: "Add money to someone." },
          { name: "Remove-Money", value: "Remove money from someone." },
          { name: "Fake-Join", value: "Sends a welcome message." },
          { name: "Fake-Leave", value: "Sends a leave message." }
        )
        .setThumbnail(guild.iconURL());
      message.channel.send(moderation);
    } else if (arguments[0] === "settings") {
      const settings = new Discord.MessageEmbed()
        .setTitle(`${guild.name}`)
        .setDescription("‏‏‎ ‎")
        .addFields(
          { name: "Set-Prefix", value: "Set bot's prefix." },
          { name: "Set-Channel", value: "Set channel for something." },
          { name: "Set-Logging", value: "Set channel for loggs." },
          { name: "Clear-Logging", value: "Stop logs" },
          {
            name: "Set-Welcome-Embed",
            value: "Create a welcome embed message.",
          },
          { name: "Set-Welcome-Text", value: "Create a welcome text message." },
          { name: "Set-Leave-Message", value: "Create a leave text message." },
          { name: "Set-Counting", value: "Set channel for counting game." },
          {
            name: "Set-Reaction-Chat",
            value: "Set channel for reaction game.",
          },
          { name: "Create-Counter", value: "Create member counter." },
          { name: "Role-Counter", value: "Create a role counter." },
          { name: "Cyrilic", value: "Enable disable cyrilic." },
          { name: "Reaction-Message", value: "Send a reaction role message." },
          {
            name: "Reaction-Role",
            value: "Set a reaction role for reaction message.",
          },
          { name: "Add-Rewards", value: "Adds reward for leveling" },
          { name: "Remove-Rewards", value: "Removes reward for leveling" },
          { name: "Add-Welcome-Role", value: "Adds welcome role." },
          { name: "Remove-Welcome-Role", value: "Removes welcome role." },
          { name: "List-Welcome-Roles", value: "Lists all welcome roles." }
        )
        .setThumbnail(guild.iconURL());
      message.channel.send(settings);
    } else if (arguments[0] === "support") {
      const support = new Discord.MessageEmbed()
        .setTitle(`${guild.name}`)
        .setDescription("‏‏‎ ‎")
        .addFields(
          { name: "Report", value: "Report a bug or request something." },
          { name: "Update", value: "Check most recent update." }
        )
        .setThumbnail(guild.iconURL());
      message.channel.send(support);
    } else {
      const help = new Discord.MessageEmbed()
        .setTitle(`${guild.name}`)
        .setDescription("‏‏‎ ‎")
        .addFields(
          { name: "Economy", value: "!help economy" },
          { name: "Leveling", value: "!help leveling" },
          { name: "Miscellaneous", value: "!help miscellaneous" },
          { name: "Fun", value: "!help fun" },
          { name: "Moderation", value: "!help moderation" },
          { name: "Settings", value: "!help settings" },
          { name: "Support", value: "!help support" }
        )
        .setThumbnail(guild.iconURL());
      message.channel.send(help);
    }
  },
};
