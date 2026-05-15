const {
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js')
const Modal = require('@structures/Modal')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('feedback')
    .setDescription('Demonstração de modal com Discord.JS'),
  
  run: async (client, interaction) => {
    const modal = new Modal()
      .setCustomId(`modal-feedback:${interaction.user.id}`)
      .setTitle('Seu Feedback')
      .setTextDisplay(`Pode nos ajudar dando seu feedback?`)
      .addFields(
        {
          label: 'Seu nome (Opcional)',
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