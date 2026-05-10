const {
  MessageFlags
} = require('discord.js')

async function lockChannel(interaction) {
  const channel = interaction.channel
  await channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
    SendMessages: false,
  });
}

module.exports = async (client, interaction) => {
  try {
    await lockChannel(interaction)
    
    interaction.reply({
      content: `:white_check_mark: **|** Canal trancado com sucesso!`,
      flags: MessageFlags.Ephemeral
    })
  } catch(err) {
    console.error(err)
  }
}