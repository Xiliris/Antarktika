const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const snipeSchema = mongoose.Schema({
  _id: reqString,
  author: reqString,
  authorImage: reqString,
  text: reqString,
});
module.exports = mongoose.model("snipe", snipeSchema);
