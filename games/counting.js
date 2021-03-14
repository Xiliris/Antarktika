const profileSchema = require("../schemas/profile-schema");
const gameCountSchema = require("../schemas/count-game-schema");
const channelSchema = require("../schemas/channel-schema");
module.exports = (client, Discord) => {
  client.on("message", async (message) => {
    const { content, member, guild, channel } = message;
    const resultChannel = await channelSchema.findOne({
      _id: guild.id,
    });
    if (!resultChannel) return;
    if (channel.id !== resultChannel.counting) return;
    const result = await gameCountSchema.findOne({
      _id: guild.id,
    });
    if (!result) {
      if (content === "1") {
        await gameCountSchema.findOneAndUpdate(
          {
            _id: guild.id,
          },
          {
            _id: guild.id,
            count: 2,
            last: member.id,
          },
          {
            upsert: true,
          }
        );
        message.react("✅");
      } else {
        message.react("❌");
        return;
      }
    } else if (result) {
      if (member.id === result.last) {
        await gameCountSchema.findOneAndDelete({
          _id: guild.id,
        });
        message.react("❌");
        return;
      }
      if (content === result.count.toString()) {
        await gameCountSchema.findOneAndUpdate(
          {
            _id: guild.id,
          },
          {
            _id: guild.id,
            $inc: {
              count: 1,
            },
            last: member.id,
          },
          {
            upsert: true,
          }
        );
        if (content === "69") {
          message.react("<:devil:811934750117330954>");
        } else if (content === "420") {
          message.react("<:canabis:811930952288174111>");
        } else if (content === "1312") {
          message.react === "🚔";
        } else {
          message.react("✅");
        }
      } else {
        await gameCountSchema.findOneAndDelete({
          _id: guild.id,
        });
        message.react("❌");
        return;
      }
    }
  });
};
