const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const controlSchema = mongoose.Schema({
  _id: reqString,
  cyrillic: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model("guild-control", controlSchema);
