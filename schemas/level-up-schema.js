const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const levelUpMsgSchema = mongoose.Schema({
  guildId: reqString,
  message: reqString,
});
module.exports = mongoose.model("level-up-message", levelUpMsgSchema);
