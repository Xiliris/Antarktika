const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const counterSchema = mongoose.Schema({
  guildId: reqString,
  memberChannel: reqString,
  botsChannel: reqString,
});
module.exports = mongoose.model("guild-counter", counterSchema);
