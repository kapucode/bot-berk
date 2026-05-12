const {
  EmbedBuilder,
  MessageFlags,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder
} = require('discord.js')

const crypto = require('node:crypto')

module.exports = {
  name: 'modal-feedback',
  authorOnly: true,
  execute: async (client, interaction) => {
    try {
      const fields = interaction.fields
      const name = fields.getTextInputValue('name') || interaction.user.username
      const feedback = fields.getTextInputValue('feedback')
      
      const embed = new EmbedBuilder()
        .setTitle(`Feedback de ${name}`)
        .setColor(0x5b81df)
        .setDescription(`
\`\`\`
${feedback}
\`\`\`
`)
      const uuid = client.createState('feedbacks', {
        name,
        feedback
      })
      
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`feedback-send:${interaction.user.id}:${uuid}`)
            .setLabel('Confirmar')
            .setStyle(ButtonStyle.Success)
            .setEmoji(`✅`),
          new ButtonBuilder()
            .setCustomId(`edit-feedback:${interaction.user.id}`)
            .setLabel('Editar')
            .setStyle(ButtonStyle.Primary)
            .setEmoji(`✏️`)
        )
      
      interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
        components: [row]
      })
    } catch (err) {
      console.error(err)
      interaction.reply(`:x: **|** FALHA INTERNA.`)
        .catch(() => {})
    }
  }
}