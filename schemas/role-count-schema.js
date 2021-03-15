const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const roleCountSchema = mongoose.Schema({
  _id: reqString,
  counter: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("guild-role-counter", roleCountSchema);
