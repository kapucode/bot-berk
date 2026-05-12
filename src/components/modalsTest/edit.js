const {
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} = require('discord.js')
const Modal = require('@structures/Modal.js')


module.exports = {
  name: 'edit-feedback',
  authorOnly: true,
  execute: async (client, interaction) => {
    const modal = new Modal()
      .setCustomId('feedback-modal')
      .setTitle('Feedback')
    
      .addComponents(
        new TextInputBuilder()
          .setCustomId('name')
          .setLabel('Seu nome')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('Nome')
          .setRequired(false)
          .setMinLength(3)
          .setMaxLength(20),
        
        new TextInputBuilder()
          .setCustomId('feedback')
          .setLabel('Nos dê seu feedback')
          .setPlaceholder('O que você achou do serviço?')
          .setStyle(TextInputStyle.Paragraph)
          .setMinLength(3)
          .setMaxLength(500)
          .setRequired(true)
      )
  
    await interaction.showModal(
      modal.build(interaction)
    )
  }
}