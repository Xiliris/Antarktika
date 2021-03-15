const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const reactionSchema = mongoose.Schema({
  guildId: reqString,
  channelId: reqString,
  messageId: reqString,
  roles: [
    {
      emoji: reqString,
      role: reqString,
    },
  ],
});

module.exports = mongoose.model("guild-reaction", reactionSchema);
