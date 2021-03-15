const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};
const nString = {
  type: String,
  required: false,
};

const logUserSchema = mongoose.Schema({
  _id: reqString,
  ban: reqString,
  banAvatar: reqString,
  kick: reqString,
  kickAvatar: reqString,
  unban: reqString,
  unbanAvatar: reqString,
});

module.exports = mongoose.model("logging-users", logUserSchema);
