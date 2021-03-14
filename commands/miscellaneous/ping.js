module.exports = {
  commands: "ping",
  callback: (message, arguments, text, client) => {
    message.channel.send("**Calculating ping...**").then((resultMessage) => {
      const ping = resultMessage.createdTimestamp - message.createdTimestamp;

      resultMessage.edit(`**BOT Latency : ${ping}ms**`);
    });
  },
};
