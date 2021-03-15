const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const levelUpRewardSchema = mongoose.Schema({
  guildId: reqString,
  reward: [
    {
      level: reqString,
      role: reqString,
    },
  ],
});
module.exports = mongoose.model("level-up-reward", levelUpRewardSchema);
