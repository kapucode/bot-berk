module.exports = {
  name: 'feedback-send',
  authorOnly: true,

  execute: async (client, interaction, args) => {

    const uuid = args[1]

    const data = client.getState('feedbacks', uuid)
    
    if (!data) {
      return interaction.reply({
        content: 'Feedback expirado.',
        ephemeral: true
      })
    }

    interaction.reply(`Nome: ${data.name}
Feedback: 
\`\`\`
${data.feedback}
\`\`\`
`)
  }
}