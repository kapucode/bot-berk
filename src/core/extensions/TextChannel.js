const { TextChannel } = require('discord.js')

TextChannel.prototype.awaitResponse = function(options={}) {
  const {
    user,
    timeout = 30000,
    filter = () => true
  } = options
  
  return this.client.waitFor('messageCreate', {
    timeout,

    filter: msg => {
      const commandName = msg.content
        .slice(this.client.prefix.length)
        .trim()
        .split(" ")
        [0].toLowerCase()
      const command =
        this.client.commands.has(commandName) ||
        this.client.aliases.has(commandName);
      
      if (msg.channel.id !== this.id) {
        return false
      }

      if (user && msg.author.id !== user.id) {
        return false
      }
      
      if (command) {
        return false
      }

      return filter(msg)
    }
  })
}