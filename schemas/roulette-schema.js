const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const rouletteSchema = mongoose.Schema({
  guildId: reqString,
  userId: reqString,
  bet: {
    type: Number,
    required: true,
  },
  card: reqString,
});

module.exports = mongoose.model("roulette", rouletteSchema);
