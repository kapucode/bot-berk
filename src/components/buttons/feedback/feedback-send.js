const {
  EmbedBuilder,
  MessageFlags
} = require('discord.js')

module.exports = {
  name: 'feedback-send',
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
    
    const embed = new EmbedBuilder()
        .setTitle(`Feedback de ${data.name}`)
        .setColor(0x5b81df)
        .setDescription(`
\`\`\`
${data.feedbackText}
\`\`\`
`)
    
    client.debug(`==============================`)
    client.debug(`FEEDBACK SEND MSG`)
    client.debug(`==============================`)
    client.debug(`USER: ${interaction.user.id}`, JSON.stringify(data, null, 2), `UUID: ${uuid}`)
    
    interaction.reply({
      embeds: [embed]
    })
  }
}