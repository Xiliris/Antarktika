const welcomeSchema = require("../../schemas/welcome-schema");
module.exports = {
  commands: "set-welcome-embed",
  permissions: ["ADMINISTRATOR"],
  callback: async (message, arguments, Discord, client) => {
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL(String))
      .setThumbnail(message.author.displayAvatarURL(String))
      .setTimestamp()
      .addFields(
        { name: "First Title", value: "First Text" },
        { name: "Second Title", value: "Second Text" },
        { name: "Third Title", value: "Third Text" },
        { name: "‏‏‎ ‎", value: "Some Description" }
      );
    message.channel.send(embed);
    const filter = (m) => m.content;
    await message.channel
      .send("**Please write the first field title**")
      .then(async () => {
        message.channel
          .awaitMessages(filter, { max: 1, time: 1000 * 60, errors: ["time"] })
          .then(async (collected) => {
            await welcomeSchema.findOneAndUpdate(
              {
                guildId: message.guild.id,
              },
              {
                guildId: message.guild.id,
                firstField: collected.first().content,
              },
              {
                upsert: true,
              }
            );
            message.channel
              .send("**Please write the first field text**")
              .then(async () => {
                message.channel
                  .awaitMessages(filter, {
                    max: 1,
                    time: 1000 * 60,
                    errors: ["time"],
                  })
                  .then(async (collected) => {
                    await welcomeSchema.findOneAndUpdate(
                      {
                        guildId: message.guild.id,
                      },
                      {
                        guildId: message.guild.id,
                        firstText: collected.first().content,
                      },
                      {
                        upsert: true,
                      }
                    );
                    message.channel
                      .send("**Please write the second field title**")
                      .then(async () => {
                        message.channel
                          .awaitMessages(filter, {
                            max: 1,
                            time: 1000 * 60,
                            errors: ["time"],
                          })
                          .then(async (collected) => {
                            await welcomeSchema.findOneAndUpdate(
                              {
                                guildId: message.guild.id,
                              },
                              {
                                guildId: message.guild.id,
                                secondField: collected.first().content,
                              },
                              {
                                upsert: true,
                              }
                            );
                            message.channel
                              .send("**Please write the second field text**")
                              .then(async () => {
                                message.channel
                                  .awaitMessages(filter, {
                                    max: 1,
                                    time: 1000 * 60,
                                    errors: ["time"],
                                  })
                                  .then(async (collected) => {
                                    await welcomeSchema.findOneAndUpdate(
                                      {
                                        guildId: message.guild.id,
                                      },
                                      {
                                        guildId: message.guild.id,
                                        secondText: collected.first().content,
                                      },
                                      {
                                        upsert: true,
                                      }
                                    );
                                    message.channel
                                      .send(
                                        "**Please write the third field title**"
                                      )
                                      .then(async () => {
                                        message.channel
                                          .awaitMessages(filter, {
                                            max: 1,
                                            time: 1000 * 60,
                                            errors: ["time"],
                                          })
                                          .then(async (collected) => {
                                            await welcomeSchema.findOneAndUpdate(
                                              {
                                                guildId: message.guild.id,
                                              },
                                              {
                                                guildId: message.guild.id,
                                                thirdField: collected.first()
                                                  .content,
                                              },
                                              {
                                                upsert: true,
                                              }
                                            );
                                            message.channel
                                              .send(
                                                "**Please write the third field text**"
                                              )
                                              .then(async () => {
                                                message.channel
                                                  .awaitMessages(filter, {
                                                    max: 1,
                                                    time: 1000 * 60,
                                                    errors: ["time"],
                                                  })
                                                  .then(async (collected) => {
                                                    await welcomeSchema.findOneAndUpdate(
                                                      {
                                                        guildId:
                                                          message.guild.id,
                                                      },
                                                      {
                                                        guildId:
                                                          message.guild.id,
                                                        thirdText: collected.first()
                                                          .content,
                                                      },
                                                      {
                                                        upsert: true,
                                                      }
                                                    );
                                                    message.channel
                                                      .send(
                                                        "**Please write some description**"
                                                      )
                                                      .then(async () => {
                                                        message.channel
                                                          .awaitMessages(
                                                            filter,
                                                            {
                                                              max: 1,
                                                              time: 1000 * 60,
                                                              errors: ["time"],
                                                            }
                                                          )
                                                          .then(
                                                            async (
                                                              collected
                                                            ) => {
                                                              await welcomeSchema.findOneAndUpdate(
                                                                {
                                                                  guildId:
                                                                    message
                                                                      .guild.id,
                                                                },
                                                                {
                                                                  guildId:
                                                                    message
                                                                      .guild.id,
                                                                  descriptionEmbed: collected.first()
                                                                    .content,
                                                                },
                                                                {
                                                                  upsert: true,
                                                                }
                                                              );
                                                              message.channel.send(
                                                                "**All Done**"
                                                              );
                                                            }
                                                          )
                                                          .catch(
                                                            (collected) => {
                                                              message.channel.send(
                                                                "Time is out...."
                                                              );
                                                            }
                                                          );
                                                      });
                                                  })
                                                  .catch((collected) => {
                                                    message.channel.send(
                                                      "Time is out...."
                                                    );
                                                  });
                                              });
                                          })
                                          .catch((collected) => {
                                            message.channel.send(
                                              "Time is out...."
                                            );
                                          });
                                      });
                                  })
                                  .catch((collected) => {
                                    message.channel.send("Time is out....");
                                  });
                              });
                          })
                          .catch((collected) => {
                            message.channel.send("Time is out....");
                          });
                      });
                  })
                  .catch((collected) => {
                    message.channel.send("Time is out....");
                  });
              });
          })
          .catch((collected) => {
            message.channel.send("Time is out....");
          });
      });
  },
};
