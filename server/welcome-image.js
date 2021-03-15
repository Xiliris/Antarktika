const channelSchema = require("../schemas/channel-schema");
module.exports = (client, Canvas, Discord) => {
  client.on("guildMemberAdd", async (member) => {
    const { MessageAttachment } = Discord;
    const result = await channelSchema.findOne({
      _id: member.guild.id,
    });
    if (!result.welcome) return;
    let channel = member.guild.channels.cache.get(result.welcome);
    if (!channel) return;
    const canvas = Canvas.createCanvas(700, 350);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage("./images/welcome.jpg");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";
    ctx.font = "bold 35px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${member.user.tag}`, canvas.width / 2.0, canvas.height / 1.4);

    ctx.textAlign = "center";
    ctx.font = "bold 30px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`WELCOME`, canvas.width / 2.0, canvas.height / 1.2);

    ctx.textAlign = "center";
    ctx.font = "25px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      `Member #${member.guild.memberCount}`,
      canvas.width / 2.0,
      canvas.height / 1.05
    );

    ctx.arc(350, 125, 80, 0, Math.PI * 2, true);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ format: "jpg" })
    );
    ctx.drawImage(avatar, 250, 15, 200, 200);

    const attachment = new MessageAttachment(canvas.toBuffer(), "welcome.png");
    channel.send(attachment);
  });
};
