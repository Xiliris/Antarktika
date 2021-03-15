<<<<<<< HEAD
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
=======
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
>>>>>>> 8a3754cccb498051759a59e25235a1c862f0b9a4
