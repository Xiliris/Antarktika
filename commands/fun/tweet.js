module.exports = {
  commands: ["tweet"],
  expectedArgs: "<Text>",
  minArgs: 1,
  requiredChannel: "commands",
  callback: async (message, arguments, Discord, Canvas) => {
    const { guild, channel } = message;

    const args = message.content.split(" ").slice(1); // Svi argumenti poslje prefixa
    const text = args.slice(0).join(" "); // Svi argumenti poslje taga
    const time = new Date().toLocaleString();

    const applyText = (canvas, text) => {
      const ctx = canvas.getContext("2d");

      let fontSize = 30;

      do {
        ctx.font = `${(fontSize -= 10)}px sans-serif`;
      } while (ctx.measureText(text).width > canvas.width - 300);

      return ctx.font;
    };

    const applyTextTag = (canvas, text) => {
      const ctx = canvas.getContext("2d");

      let fontSize = 25;

      do {
        ctx.font = `${(fontSize -= 10)}px sans-serif`;
      } while (ctx.measureText(text).width > canvas.width - 300);

      return ctx.font;
    };

    const applyTextText = (canvas, text) => {
      const ctx = canvas.getContext("2d");

      let fontSize = 27;

      do {
        ctx.font = `${(fontSize -= 10)}px sans-serif`;
      } while (ctx.measureText(text).width > canvas.width - 300);

      return ctx.font;
    };

    const applyTime = (canvas, text) => {
      const ctx = canvas.getContext("2d");

      let fontSize = 23;

      do {
        ctx.font = `${(fontSize -= 9)}px sans-serif`;
      } while (ctx.measureText(text).width > canvas.width - 300);

      return ctx.font;
    };

    const canvas = Canvas.createCanvas(515, 220);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage("./images/tweet.jpg");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const avatar = await Canvas.loadImage(
      message.author.displayAvatarURL({ format: "jpg" })
    );
    ctx.font = applyTextText(canvas, message.author.tag);
    ctx.fillStyle = "#010103";
    ctx.fillText(`${text}`, 70 / 2.5, 170 / 1.8);

    const background1 = await Canvas.loadImage("./images/tweet.png");
    ctx.drawImage(background1, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(avatar, 25, 25, 40, 40);

    ctx.font = applyText(canvas, message.author.tag);
    ctx.fillStyle = "#010103";
    ctx.fillText(message.author.tag, 200 / 2.5, 80 / 1.8);

    ctx.font = applyTextTag(canvas, message.author.tag);
    ctx.fillStyle = "#3b3b3b";
    ctx.fillText(`@${message.author.tag}`, 200 / 2.5, 110 / 1.8);

    ctx.font = applyTime(canvas, message.author.tag);
    ctx.fillStyle = "#2e2e2e";
    ctx.fillText(`${time}`, 870 / 2.5, 345 / 1.8);

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "tweet.png"
    );

    message.channel.send(attachment);

    return;
  },
};
