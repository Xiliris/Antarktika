module.exports = {
  commands: ["gay"],
  requiredChannel: "commands",
  callback: async (message, arguments, Discord, Canvas, text, client) => {
    const { guild, channel } = message;

    const target = message.mentions.users.first() || message.author;

    if (!target) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Couldn't find that user!");
      message.channel.send(embed);
      return;
    }

    const canvas = Canvas.createCanvas(500, 500);
    const ctx = canvas.getContext("2d");

    const avatar1 = await Canvas.loadImage(
      target.displayAvatarURL({ format: "jpg" })
    );
    ctx.drawImage(avatar1, 0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 0.7;
    const gay = await Canvas.loadImage("./images/gay.jpg");
    ctx.drawImage(gay, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#010103";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    const attachment1 = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "gay.png"
    );

    message.channel.send(attachment1);

    return;
  },
};
