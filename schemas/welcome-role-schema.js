const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const welcomeRoleSchema = mongoose.Schema({
  guildId: reqString,
  roles: [
    {
      role: reqString,
    },
  ],
});
module.exports = mongoose.model("guild-welcome-role", welcomeRoleSchema);
