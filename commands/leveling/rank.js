const profileSchema = require("../../schemas/profile-schema");
const { loadImage } = require("canvas");
const { Message, MessageAttachment } = require("discord.js");
module.exports = {
  commands: ["rank"],
  requiredChannel: "commands",
  callback: async (message, arguments, Discord, Canvas, text, client) => {
    const { guild, channel } = message;

    const user = message.mentions.users.first() || message.author;

    const userId = user.id;
    const guildId = guild.id;

    const result = await profileSchema.findOne({
      guildId,
      userId,
    });

    if (!result) {
      const embed = new Discord.MessageEmbed().setDescription(
        `<@${userId}> doesn't have a rank!`
      );
      message.channel.send(embed);
      return;
    }

    const forLevel = result.level * result.level * 150;

    const canvas = Canvas.createCanvas(1000, 333);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage("./images/rank.jpg");

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    //LEVEL BORDER
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ffffff";
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#000000";
    ctx.fillRect(180, 216, 770, 65);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeRect(180, 216, 770, 65);
    ctx.stroke();

    //LEVEL FILL
    ctx.fillStyle = "#ffd738";
    ctx.globalAlpha = 0.6;
    ctx.fillRect(180, 216, (100 / forLevel) * result.xp * 7.7, 65);
    ctx.fill();
    ctx.globalAlpha = 1;

    //TEXT XP
    ctx.font = "30px Arial";
    ctx.textAligh = "center";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${result.xp} / ${forLevel} XP`, 600, 260);

    //USER TAGS
    ctx.font = "30px Arial";
    ctx.textAligh = "left";
    ctx.fillText(user.tag, 300, 120);

    //TEXT LEVEL
    ctx.font = "50px Arial";
    ctx.fillText("Level:", 300, 180);
    ctx.fillText(result.level, 470, 180);

    //AVATAR
    ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    const avatar = await loadImage(user.displayAvatarURL({ format: "jpg" }));
    ctx.drawImage(avatar, 40, 40, 250, 250);

    const attachment = new MessageAttachment(canvas.toBuffer(), "rank.png");

    message.channel.send(attachment);
  },
};
