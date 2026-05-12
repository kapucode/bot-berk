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
      .setCustomId('modal-feedback')
      .setTitle('Seu Feedback')
      .setTextDisplay(`Pode nos ajudar dando seu feedback?`)
      .addFields(
        {
          label: 'Seu nome (Opcional)',
          description: 'Nos diga seu nome',
          component: new TextInputBuilder()
            .setCustomId('name')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Nome')
            .setRequired(false)
            .setMinLength(3)
            .setMaxLength(20)
        },
        {
          label: 'Seu feedback',
          description: 'Conte um pouco do que você achou da sua experiência',
          component: new TextInputBuilder()
            .setCustomId('feedback')
            .setPlaceholder('O que você achou do serviço?')
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(3)
            .setMaxLength(500)
            .setRequired(true)
        }
      )
  
    await interaction.showModal(
      modal.build(interaction)
    )
  }
}