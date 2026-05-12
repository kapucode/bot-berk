const { MessageFlags } = require('discord.js')
const Discord = require('discord.js')

async function handleCommand(client, interaction) {
  if (interaction.type === Discord.InteractionType.ApplicationCommand) {
    const command = client.slashCommands.get(interaction.commandName)
    if (!command) return interaction.reply(`Error`)
    
    interaction.member = interaction?.guild.members.cache.get(interaction.user.id) || null
    
    const guildOnly = command.guildOnly ?? true
    
    if (
      guildOnly &&
      !interaction?.guild
    ) {
      return interaction.reply(`:x: **|** Esse comando só pode ser usado em servidores!`)
        .catch(() => {})
    }
    
    if (
      command?.devOnly &&
      !client?.developers?.has(interaction.user.id)
    ) {
      return interaction.reply({
        content: `:x: **|** Esse comando só pode ser usado por meus desenvolvedores!`,
        flags: MessageFlags.Ephemeral
      })
        .catch(() => {})
    }
    
    // Cooldown
    if (command.cooldown) {
      if (!Number.isInteger(command.cooldown.time)) throw new Error(`cooldown.time must be a Number!`)
      
      command.name = `${command.data.name}`
      if (command.cooldown.scope !== "hybrid") {
        command.name += '-slash'
      }
      
      const cooldown =
        client.cooldowns.check(
          interaction,
          command
        )
      
      if (!cooldown.allowed) {
        return client.cooldownMessage(
          interaction,
          cooldown.remaining
        )
      }
    }
  
    try {
      await command.run(client, interaction)
    } catch(err) {
      interaction.reply(`:x: **|** FALHA INTERNA.`)
        .catch(() => {})
      client.error(err)
    }
  }
}

async function handleInteraction(client, interaction) {
  if (interaction.isChatInputCommand()) return;

  if (
    interaction.message &&
    interaction.message.createdTimestamp < (client.readyTimestamp || 0)
  ) {
    return interaction.reply({
      content: `:x: **|** Os dados da interação foram perdidos!`,
      flags: MessageFlags.Ephemeral
    });
  }

  const isComponent =
    interaction.isButton() ||
    interaction.isAnySelectMenu() ||
    interaction.isModalSubmit();

  if (!isComponent) return;

  const [interactionId, ...args] =
    interaction.customId.split(":");

  const component = client.components.get(interactionId);

  if (!component) return;
  
  const authorOnly = component.authorOnly ?? true
  
  if (
    authorOnly &&
    interaction.user.id !== args[0]
  ) {
    return interaction.reply({
      content: `:x: **|** Essa interação não é pra você!`,
      flags: MessageFlags.Ephemeral
    });
  }

  component.execute(client, interaction, args);
}


module.exports = {
  name: "interactionCreate",
  run: async (client, interaction) => {
    try {
      await handleCommand(client, interaction)
      await handleInteraction(client, interaction)
    } catch (err) {
      interaction.reply(`:x: **|** FALHA INTERNA.`)
      client.error(err)
    }
  }
}