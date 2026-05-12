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
      return client.cooldownMessage(
        message,
        cooldown.remaining
      )
    }
  }
  
  try {
    await command.run(client, message, args)
  } catch(err) {
    message.reply(`:x: **|** FALHA INTERNA.`)
      .catch(() => {})
    client.error(err)
  }
}

async function handleBotMention(client, message) {
  if (message.content.replace("!", "") === `<@${client.user.id}>`) {
    await client.botMention(message)
  }
}

module.exports = {
  name: "messageCreate",
  run: async (client, message) => {
    await handleCommand(client, message)
    await handleBotMention(client, message)
  } 
}