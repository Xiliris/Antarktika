const channelSchema = require("../schemas/channel-schema");
const { Message, MessageAttachment } = require("discord.js");
const profileSchema = require("../schemas/profile-schema");
module.exports = (client, Discord, Canvas) => {
  const int = setInterval(async () => {
    const results = await channelSchema.find();
    for (result of results) {
      const { _id, reaction } = result;
      const guild = client.guilds.cache.get(_id);
      if (!guild) return;
      const channel = guild.channels.cache.get(reaction);
      if (!channel) return;

      function makeid(length) {
        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }
      let text;
      text = makeid(10);
      const canvas = Canvas.createCanvas(1000, 333);
      const ctx = canvas.getContext("2d");
      const background = await Canvas.loadImage("./images/reaction-type.jpg");

      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      ctx.textAlign = "center";
      ctx.font = "70px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(`Reaction Message`, canvas.width / 2.0, canvas.height / 3.0);

      ctx.textAlign = "center";
      ctx.font = "130px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(text, canvas.width / 2.0, canvas.height / 1.2);

      // prettier-ignore
      const attachment = new MessageAttachment(canvas.toBuffer(),"reaction-type.png");
      channel.send(attachment).then((message) => {
        const filter = (m) => m.content;
        message.channel
          .awaitMessages(filter, { max: 1, time: 1000 * 60, errors: ["time"] })
          .then(async (collected) => {
            const author = collected.first().author;

            const embed = new Discord.MessageEmbed()
              .setAuthor(author.tag, author.displayAvatarURL(String))
              .addFields({ name: "GOT IT FIRST", value: "And won $5000" })
              .setColor("RANDOM")
              .setThumbnail(
                "https://cdn.iconscout.com/icon/free/png-256/winner-trophy-cup-prize-award-best-first-achievement-29309.png"
              )
              .setTimestamp();
            message.channel.send(embed);
            await profileSchema.findOneAndUpdate(
              {
                guildId: guild.id,
                userId: author.id,
              },
              {
                guildId: guild.id,
                userId: author.id,
                $inc: {
                  cash: 5000,
                },
              },
              {
                upsert: true,
              }
            );
            return;
          });
      });
    }
  }, 1000 * 60 * 30);
};
