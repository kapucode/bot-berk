const {
  EmbedBuilder,
  MessageFlags,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder
} = require('discord.js')
const Messages = require('@ui/Messages')

const crypto = require('node:crypto')

module.exports = {
  name: 'modal-feedback',
  authorOnly: true,
  execute: async (client, interaction, args) => {
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
        feedbackText: feedback
      })
      
      const data = client.getState('feedbacks', uuid)
      
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`edit-feedback:${interaction.user.id}:${uuid}`)
            .setLabel('Editar')
            .setStyle(ButtonStyle.Primary)
            .setEmoji(`✏️`),
            
          new ButtonBuilder()
            .setCustomId(`feedback-send:${interaction.user.id}:${uuid}`)
            .setLabel('Enviar')
            .setStyle(ButtonStyle.Success)
            .setEmoji(`✅`)
        )
        
      client.debug(`=============================`)
      client.debug(`MODAL FEEDBACK SEND`)
      client.debug(`=============================`)
      client.debug(
        `USER: ${interaction.user.id}`,
        JSON.stringify(data, null, 2),
        `UUID: ${uuid}`,
        `ARGS: ${args}`
      )
      
      interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
        components: [row]
      })
    } catch (err) {
      client.error(err)
      Messages.errors.internal(interaction)
    }
  }
}