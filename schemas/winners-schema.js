const mongoose = require("mongoose");

const winnersSchema = mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  game: {
    type: String,
    required: true,
  },
  winners: {
    type: [Object],
    required: true,
  },
});

module.exports = mongoose.model("winners", winnersSchema);
