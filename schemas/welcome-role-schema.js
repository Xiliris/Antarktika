<<<<<<< HEAD
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
=======
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
>>>>>>> 8a3754cccb498051759a59e25235a1c862f0b9a4
