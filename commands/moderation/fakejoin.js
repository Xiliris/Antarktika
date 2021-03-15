module.exports = {
  commands: "fake-join",
  permissions: ["ADMINISTRATOR", "MANAGE_MESSAGES"],
  requiredRoles: [],
  callback: async (message, arguments, Discord, text, client) => {
    client.emit("guildMemberAdd", message.member);
  },
};
