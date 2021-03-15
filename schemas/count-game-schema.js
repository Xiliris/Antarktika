const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const gameCountSchema = mongoose.Schema({
  _id: reqString,
  count: {
    type: Number,
    required: true,
    default: 1,
  },
  last: reqString,
});

module.exports = mongoose.model("game-counting", gameCountSchema);
