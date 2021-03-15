module.exports = {
  commands: "fake-leave",
  permissions: ["ADMINISTRATOR", "MANAGE_MESSAGES"],
  requiredRoles: [],
  callback: async (message, arguments, Discord, text, client) => {
    client.emit("guildMemberRemove", message.member);
  },
};
