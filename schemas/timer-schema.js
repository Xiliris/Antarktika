const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const timerSchema = mongoose.Schema({
  guildId: reqString,
  type: reqString,
  counter: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("timers", timerSchema);
