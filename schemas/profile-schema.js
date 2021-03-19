const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
  default: "None",
};
const reqNumber = {
  type: Number,
  required: true,
  default: 0,
};
const profileSchema = mongoose.Schema({
  guildId: reqString,
  userId: reqString,
  cash: reqNumber,
  bank: reqNumber,
  worth: reqNumber,
  rank: reqString,
  xp: reqNumber,
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  message: reqNumber,
  afk: {
    type: Boolean,
    required: true,
    default: false,
  },
  afkSince: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model("profile", profileSchema);
