module.exports = {
    commands: 'clear',
    permissions: ['ADMINISTRATOR','MANAGE_MESSAGES'],
    requiredRoles: [],
    callback: async (message, arguments, Discord, text, client) => {

        if(!arguments[0]) return message.channel.send("**How much messages do you want to delete?**");
        if(isNaN(arguments[0])) return message.channel.send("**Plese type the number!**");

        if(arguments[0] > 100) return message.channel.send("**You can't delete more than 100 messages**");
        if(arguments[0] < 1 ) return message.channel.send("**You can't delete less than 1 message**");

        await message.channel.messages.fetch({limit: arguments[0]}).then(messages =>{
              message.channel.bulkDelete(messages)
              message.channel.send(":white_check_mark: | **Successfully deleted** `"+ messages.size +" messages.`").then(message => {
                  setTimeout(() => {
                      message.delete()
                  }, 1500);
              })
        });

}}
