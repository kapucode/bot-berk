const Messages = require('@ui/Messages')

async function handleCommand(client, message) {
  if (!message.content.startsWith(client.prefix)) return
  
  const args = message.content
    .slice(client.prefix.length)
    .trim()
    .split(" ")
  const commandName = args.shift()
    ?.toLowerCase()
  
  const command =
    client.commands.get(commandName) ||
    client.aliases.get(commandName);
  
  if (!command) return
  
  const guildOnly = command.guildOnly ?? true
  
  if (
    guildOnly &&
    !message?.guild
  ) {
    return message.reply(`:x: **|** Esse comando só pode ser usado em servidores!`)
      .catch(() => {})
  }
  
  if (command?.devOnly) {
    if (!client?.developers?.has?.(message.author.id)) return 
  }
  
  // Cooldown
  if (command.cooldown) {
    if (!Number.isInteger(command.cooldown.time)) throw new Error(`cooldown.time must be a Number!`)
    
    const cooldown =
      client.cooldowns.check(
        message,
        command
      )
    
    if (!cooldown.allowed) {
      return Messages.errors.cooldown(message, Math.ceil(cooldown.remaining / 1000))
    }
  }
  
  try {
    await command.run(client, message, args)
  } catch(err) {
    Messages.errors.internal(message)
    client.error(err)
  }
}

async function handleBotMention(client, message) {
  if (message.content.replace("!", "") === `<@${client.user.id}>`) {
    await Messages.geral.botMention(message, client.prefix)
  }
}

module.exports = {
  name: "messageCreate",
  run: async (client, message) => {
    await handleCommand(client, message)
    await handleBotMention(client, message)
  } 
}