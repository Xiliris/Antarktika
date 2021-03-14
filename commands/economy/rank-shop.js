module.exports = {
  commands: ["rank-shop"],
  requiredChannel: "economy",
  callback: async (message, arguments, Discord, text, client) => {
    const { guild, channel } = message;

    const guildId = guild.id;
    const userId = message.author.id;

    const shopEmbed = new Discord.MessageEmbed()
      .setAuthor("Rank Shop")
      .setThumbnail(
        "https://www.dictionary.com/e/wp-content/uploads/2018/09/money-mouth-emoji.png"
      )
      .addFields(
        {
          name: "Rank",
          value:
            "Tycoon\nBillionaire\nMillionaire\nNarkoBoss\nHitman\nLawyer\nDealer\nDoctor\nThief\nCitizen\nPoor",
          inline: true,
        },
        {
          name: "Cost",
          value:
            "$50,000,000\n$25,000,000\n$1,000,000\n$500,000\n$250,000\n$100,000\n$50,000\n$25,000\n$10,000\n$5,000\n$1000",
          inline: true,
        },
        {
          name: "Income/Day",
          value:
            "$5,000,000\n$2,500,000\n$100,000\n$50,000\n$25,000\n$10,000\n$5,000\n$2,500\n$1,000\n$500\n$100",
          inline: true,
        }
      )
      .setFooter("!buy-rank <Rank Name>");

    message.channel.send(shopEmbed);
  },
};
