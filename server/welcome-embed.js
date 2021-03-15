<<<<<<< HEAD
const channelSchema = require("../schemas/channel-schema");
const welcomeSchema = require("../schemas/welcome-schema");
module.exports = (client, Discord) => {
  client.on("guildMemberAdd", async (member) => {
    const result = await channelSchema.findOne({
      _id: member.guild.id,
    });
    if (!result.welcome) return;
    let channel = member.guild.channels.cache.get(result.welcomeEmbed);
    if (!channel) return;
    const results = await welcomeSchema.findOne({
      guildId: member.guild.id,
    });
    if (!results) return;
    const {
      firstField,
      firstText,
      secondField,
      secondText,
      thirdField,
      thirdText,
      descriptionEmbed,
      imageEmbed,
    } = results;
    const embed = new Discord.MessageEmbed()
      .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
      .setThumbnail(member.user.displayAvatarURL(String))
      .setImage(imageEmbed)
      .setTimestamp()
      .addFields(
        { name: firstField, value: firstText },
        { name: secondField, value: secondText },
        { name: thirdField, value: thirdText },
        { name: "‏‏‎ ", value: descriptionEmbed }
      );
    channel.send(embed);
  });
};
=======
const channelSchema = require("../schemas/channel-schema");
const welcomeSchema = require("../schemas/welcome-schema");
module.exports = (client, Discord) => {
  client.on("guildMemberAdd", async (member) => {
    const result = await channelSchema.findOne({
      _id: member.guild.id,
    });
    if (!result.welcome) return;
    let channel = member.guild.channels.cache.get(result.welcomeEmbed);
    if (!channel) return;
    const results = await welcomeSchema.findOne({
      guildId: member.guild.id,
    });
    if (!results) return;
    const {
      firstField,
      firstText,
      secondField,
      secondText,
      thirdField,
      thirdText,
      descriptionEmbed,
      imageEmbed,
    } = results;
    const embed = new Discord.MessageEmbed()
      .setAuthor(member.user.tag, member.user.displayAvatarURL(String))
      .setThumbnail(member.user.displayAvatarURL(String))
      .setImage(imageEmbed)
      .setTimestamp()
      .addFields(
        { name: firstField, value: firstText },
        { name: secondField, value: secondText },
        { name: thirdField, value: thirdText },
        { name: "‏‏‎ ", value: descriptionEmbed }
      );
    channel.send(embed);
  });
};
>>>>>>> 8a3754cccb498051759a59e25235a1c862f0b9a4
