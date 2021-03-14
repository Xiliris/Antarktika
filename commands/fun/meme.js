const randomPuppy = require("random-puppy");
module.exports = {
  commands: ["meme"],
  cooldown: 5,
  requiredChannel: "commands",
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel } = message;

    const subReddits = ["dankmeme", "meme", "me_irl"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const img = await randomPuppy(random);
    console.log(random);
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setImage(img)
      .setFooter("Bot Developer Xiliris")
      .setTimestamp();

    message.channel.send(embed);
  },
};
