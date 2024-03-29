const welcomeRoleSchema = require("../schemas/welcome-role-schema");
module.exports = (client) => {
  client.on("guildMemberAdd", async (member) => {
    const results = await welcomeRoleSchema.findOne({
      guildId: member.guild.id,
    });
    if (!results) return;
    for (result of results.roles) {
      const guild = member.guild;
      const { role } = result;
      const roleA = guild.roles.cache.get(role);
      member.roles.add(roleA);
    }
  });
};
