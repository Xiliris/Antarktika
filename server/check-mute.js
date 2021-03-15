const muteSchema = require("../schemas/mute-schema");
module.exports = (client) => {
  client.on("guildMemberAdd", async (member) => {
    const { guild, id } = member;

    let muteRole = guild.roles.cache.find((m) => m.name === "Muted");
    const targetUser = guild.members.cache.get(member.id);

    const result = await muteSchema.findOne({
      _id: guild.id,
      userId: id,
      muted: true,
    });

    if (result) {
      targetUser.roles.add(muteRole);
      console.log(`${member.user.tag} is muted again!`);
    }
  });
};
