const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};
const nString = {
  type: String,
  required: false,
};

const channelSchema = mongoose.Schema({
  _id: reqString,
  economy: nString,
  commands: nString,
  leveling: nString,
  welcome: nString,
  welcomeEmbed: nString,
  welcomeText: nString,
  leaveChannel: nString,
  counting: nString,
  reaction: nString,
});

module.exports = mongoose.model("guild-channel", channelSchema);
