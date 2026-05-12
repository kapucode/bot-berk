const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} = require('discord.js')
const Modal = require('@structures/Modal')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('modal_example')
    .setDescription('Formulario'),
  
  run: async (client, interaction) => {
    const modal = new Modal()
      .setCustomId('modal-feedback')
      .setTitle('Seu Feedback')
    
      .addComponents(
        new TextInputBuilder()
          .setCustomId('name')
          .setLabel('Seu nome (Opcional)')
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