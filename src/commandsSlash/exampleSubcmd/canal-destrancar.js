const {
  MessageFlags
} = require('discord.js')

async function unlockChannel(interaction) {
  const channel = interaction.channel
  await channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
    SendMessages: null,
  });
}

module.exports = async (client, interaction) => {
  try {
    await unlockChannel(interaction)
    
    interaction.reply({
      content: `:white_check_mark: **|** Canal trancado com sucesso!`,
      flags: MessageFlags.Ephemeral
    })
  } catch(err) {
    console.error(err)
  }
}