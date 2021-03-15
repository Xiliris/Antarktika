const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const lastMessageSchema = mongoose.Schema({
  guildId: reqString,
  userId: reqString,
  message: reqString,
});
module.exports = mongoose.model("guild-last-message", lastMessageSchema);
