const mongoose = require("mongoose");

const marriageSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  targetId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("marriage-profile", marriageSchema);
