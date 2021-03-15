const hateSchema = require("../../schemas/hate-schema.js");
module.exports = {
  commands: ["hate"],
  expectedArgs: "<Tag>",
  minArgs: 1,
  maxArgs: 1,
  requiredChannel: "commands",
  callback: async (message, arguments, Discord, Canvas, text, client) => {
    const { guild, channel } = message;

    const user = message.mentions.users.first();

    const userAuthor = message.author;

    const messages = [
      "1%",
      "2%",
      "3%",
      "4%",
      "5%",
      "6%",
      "7%",
      "8%",
      "9%",
      "10%",
      "12%",
      "13%",
      "14%",
      "15%",
      "16%",
      "17%",
      "18%",
      "19%",
      "20%",
      "21%",
      "22%",
      "23%",
      "24%",
      "25%",
      "26%",
      "27%",
      "28%",
      "29%",
      "30%",
      "31%",
      "32%",
      "33%",
      "34%",
      "35%",
      "36%",
      "37%",
      "38%",
      "39%",
      "40%",
      "41%",
      "42%",
      "43%",
      "44%",
      "45%",
      "46%",
      "47%",
      "48%",
      "49%",
      "50%",
      "51%",
      "52%",
      "53%",
      "54%",
      "55%",
      "56%",
      "57%",
      "58%",
      "59%",
      "60%",
      "61%",
      "62%",
      "63%",
      "64%",
      "65%",
      "66%",
      "67%",
      "68%",
      "69%",
      "70%",
      "71%",
      "72%",
      "73%",
      "74%",
      "75%",
      "76%",
      "77%",
      "78%",
      "79%",
      "80%",
      "81%",
      "82%",
      "83%",
      "84%",
      "85%",
      "86%",
      "87%",
      "88%",
      "89%",
      "90%",
      "91%",
      "92%",
      "93%",
      "94%",
      "95%",
      "96%",
      "97%",
      "98%",
      "99%",
      "100",
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    if (user) {
      if (user.id === message.author.id) {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL(String)
          )
          .setDescription("❌ | We know that you don't hate yourselff!");
        message.channel.send(embed);
        return;
      }

      const result = await hateSchema.findOne({
        userId: userAuthor.id,
        targetId: user.id,
      });

      if (result) {
        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext("2d");

        const background1 = await Canvas.loadImage("./images/hate.jpg");
        ctx.drawImage(background1, 0, 0, canvas.width, canvas.height);

        const heart1 = await Canvas.loadImage("./images/bomb.png");
        ctx.drawImage(heart1, 263, 10, 175, 175);

        ctx.strokeStyle = "#010103";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.font = "60px sans-serif";
        ctx.fillStyle = "#010103";
        ctx.fillText(result.hate, canvas.width / 2.3, canvas.height / 1.1);

        const avatar1 = await Canvas.loadImage(
          message.author.displayAvatarURL({ format: "jpg" })
        );
        ctx.drawImage(avatar1, 25, 25, 200, 200);

        const member1 = await Canvas.loadImage(
          user.displayAvatarURL({ format: "jpg" })
        );
        ctx.drawImage(member1, 475, 25, 200, 200);

        const attachment1 = new Discord.MessageAttachment(
          canvas.toBuffer(),
          "ship.png"
        );

        message.channel.send(attachment1);

        return;
      }

      const canvas = Canvas.createCanvas(700, 250);
      const ctx = canvas.getContext("2d");

      const background = await Canvas.loadImage("./images/hate.jpg");
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      const heart = await Canvas.loadImage("./images/bomb.png");
      ctx.drawImage(heart, 263, 10, 175, 175);

      ctx.strokeStyle = "#010103";
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      ctx.font = "60px sans-serif";
      ctx.fillStyle = "#010103";
      ctx.fillText(randomMessage, canvas.width / 2.3, canvas.height / 1.1);

      const avatar = await Canvas.loadImage(
        message.author.displayAvatarURL({ format: "jpg" })
      );
      ctx.drawImage(avatar, 25, 25, 200, 200);

      const member = await Canvas.loadImage(
        user.displayAvatarURL({ format: "jpg" })
      );
      ctx.drawImage(member, 475, 25, 200, 200);

      const attachment = new Discord.MessageAttachment(
        canvas.toBuffer(),
        "ship.png"
      );

      message.channel.send(attachment);

      await hateSchema.findOneAndUpdate(
        {
          userId: userAuthor.id,
          targetId: user.id,
        },
        {
          userId: userAuthor.id,
          targetId: user.id,
          hate: randomMessage,
        },
        {
          upsert: true,
        }
      );
    } else {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
        .setDescription("❌ | Couldn't find that user!");
      message.channel.send(embed);
      return;
    }
  },
};
