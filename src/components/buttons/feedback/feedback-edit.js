const {
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} = require('discord.js')
const Modal = require('@structures/Modal.js')


module.exports = {
  name: 'edit-feedback',
  authorOnly: true,
  execute: async (client, interaction, args) => {
    const uuid = args[1]
    
    const data = client.getState('feedbacks', uuid)
    
    if (!data) {
      return interaction.reply({
        content: 'Feedback expirado.',
        flags: MessageFlags.Ephemeral
      })
    }
    
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
            .setValue(data.name)
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
            .setValue(data.feedbackText)
        }
      )
    
    client.debug(`===============================`)
    client.debug(`FEEDBACK EDIT`)
    client.debug(`===============================`)
    client.debug(
      `USER: ${interaction.user.id}`, 
      JSON.stringify(data, null, 2), 
      `UUID: ${uuid}`,
      `ARGS: ${args}`,
      `MODAL: ${JSON.stringify(modal, null, 2)}`
    )
  
    await interaction.showModal(
      modal.build(interaction)
    )
  }
}