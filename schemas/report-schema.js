const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const reportSchema = mongoose.Schema({
  user: reqString,
  text: reqString,
});

module.exports = mongoose.model("REPORT's", reportSchema);
