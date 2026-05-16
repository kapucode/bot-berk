1. Criação do new Modal()
```javascript
const Modal = require(
  '../../../core/structures/Modal.js'
)

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
```

2. Exibir modal:
```javascript
await interaction.showModal(
  feedbackModal.build(interaction)
)
````

3. Componente do modal:
```javascript
module.exports = {
  name: 'modal-feedback', // seu customId
  authorOnly: true, // authoronly é opcional
  execute: async (client, interaction, args) => {
    const name = interaction.fields.getTextInputValue('name')
    const feedback = interaction.fields.getTextInputValue('feedback')
    interaction.reply(`Nome: ${name}
Bio: ${feedback}`)
  }
}
```