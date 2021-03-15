const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const welcomeSchema = mongoose.Schema({
  guildId: reqString,
  welcomeText: reqString,
  leaveMessage: reqString,
  firstField: reqString,
  firstText: reqString,
  secondField: reqString,
  secondText: reqString,
  thirdField: reqString,
  thirdText: reqString,
  descriptionEmbed: reqString,
  imageEmbed: reqString,
});

module.exports = mongoose.model("guild-welcome", welcomeSchema);
