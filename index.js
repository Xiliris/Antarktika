const path = require("path");
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
const commandBase = require("./commands/command-base");
const mongo = require("./mongo");
const Canvas = require("canvas");
const config = require("./config.json");

//Events
const checkMute = require("./server/check-mute");
const leveling = require("./server/leveling");
const messageCount = require("./server/messageCount");
const afkCheck = require("./server/afk-check");
const rewardLevel = require("./server/level-up-rewards");

const antiInvite = require("./control/anti-advertising");
const antiCyrillic = require("./control/anti-cyrillic");
const antiDuplicate = require("./control/anti-duplicate");
const antiRepeat = require("./control/anti-repeat");
const antiMassMention = require("./control/anti-mass-mention");
const antiExternal = require("./control/anti-external");

const counter = require("./server/counter");
const counterRole = require("./server/counter-role");
const welcomeImage = require("./server/welcome-image");
const welcomeText = require("./server/welcome-text");
const welcomeEmbed = require("./server/welcome-embed");
const welcomeRole = require("./server/welcome-role");
const leaveMessage = require("./server/goodbye-message");
const reactionRole = require("./server/reaction-role");

//Games
const counting = require("./games/counting");
const reactionChat = require("./games/reaction-chat");

//Logging
const banLog = require("./logging/banLog");
const kickLog = require("./logging/kickLog");
const unbanLog = require("./logging/unbanLog");
const messageDelete = require("./logging/messageDelete");
const messageEdit = require("./logging/messageEdit");
const nicknameLog = require("./logging/nicknameLog");
const userRoleLog = require("./logging/userRoleLog");
const voiceLog = require("./logging/voiceLog");
const moveLog = require("./logging/moveLog");
const channelDelete = require("./logging/channelDelete");
const channelCreate = require("./logging/channelCreate");
const channelUpdate = require("./logging/channelUpdate");
const channelOverwrite = require("./logging/channelOverwrite");
const roleCreate = require("./logging/roleCreate");
const roleDelete = require("./logging/roleDelete");
const roleUpdate = require("./logging/roleUpdate");

client.on("ready", async () => {
  console.log("DIXI BOT IS ONLINE!");

  client.user.setActivity("Antarktika", {
    type: "WATCHING",
  });

  //Events
  checkMute(client);
  leveling(client, Discord);
  messageCount(client);
  afkCheck(client, Discord);
  antiInvite(client, Discord);
  antiCyrillic(client, Discord);
  antiDuplicate(client, Discord);
  antiRepeat(client, Discord);
  antiMassMention(client, Discord);
  antiExternal(client, Discord);
  counter(client);
  counterRole(client);
  welcomeImage(client, Canvas, Discord);
  welcomeText(client, Discord);
  welcomeEmbed(client, Discord);
  welcomeRole(client);
  leaveMessage(client);
  reactionRole(client);
  rewardLevel(client);

  //Games
  counting(client, Discord);
  reactionChat(client, Discord, Canvas);

  //Logging
  banLog(client, Discord);
  kickLog(client, Discord);
  unbanLog(client, Discord);
  messageDelete(client, Discord);
  messageEdit(client, Discord, messageDelete);
  nicknameLog(client, Discord);
  userRoleLog(client, Discord);
  voiceLog(client, Discord);
  moveLog(client, Discord);
  channelDelete(client, Discord);
  channelCreate(client, Discord);
  channelUpdate(client, Discord);
  channelOverwrite(client, Discord);
  roleCreate(client, Discord);
  roleDelete(client, Discord);
  roleUpdate(client, Discord);

  await mongo()
    .then((mongoose) => {
      console.log("");
      console.log("DATABASE");
      console.log("Connected to mongo!");
      console.log(" ");
    })
    .catch((err) => {
      console.log(err);
      mongoose.connection.close();
    });

  commandBase.loadPrefixes(client);
  const baseFile = "command-base.js";
  const loadCommands = require(`./commands/${baseFile}`);

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file));
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file));
        loadCommands(client, option);
      }
    }
  };

  readCommands("commands");
});

client.login(config.token);
