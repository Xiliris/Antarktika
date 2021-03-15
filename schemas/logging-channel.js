const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const loggingSchema = mongoose.Schema({
  guildId: reqString,
  warn: reqString,
  mute: reqString,
  economy: reqString,
  kick: reqString,
  ban: reqString,
  unban: reqString,
  message: reqString,
  user: reqString,
  server: reqString,
  channel: reqString,
  voice: reqString,
  move: reqString,
});
module.exports = mongoose.model("logging", loggingSchema);
