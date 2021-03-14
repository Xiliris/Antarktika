module.exports = {
  commands: ["dice"],
  requiredChannel: "commands",
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel } = message;

    const numbers = [
      "https://miro.medium.com/max/256/1*5i3bBsz_bMcGQ-UgDMCzQA.png",
      "https://miro.medium.com/max/256/1*dqZhjZbsbEBDXzKQPAagXw.png",
      "https://miro.medium.com/max/256/1*DrPdeWaJON0XbtmiEZc3jw.png",
      "https://miro.medium.com/max/256/1*5w7bpE0KdwXc21zUQoOtOw.png",
      "https://miro.medium.com/max/256/1*UYR8l1h7AI4MNtJWAugyjg.png",
      "https://miro.medium.com/max/256/1*15_KIo9vPHULoA98NYT9jQ.png",
    ];
    const dice = numbers[Math.floor(Math.random() * numbers.length)];

    const embed = new Discord.MessageEmbed().setImage(dice);
    message.channel.send(embed);
  },
};
