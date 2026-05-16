```javascript
  module.exports = {
    name: 'botao', // seu customId
    authorOnly: true, // authoronly é opcional
    execute: async (client, interaction, args) => {
      interaction.reply(`Clicou`)
    }
  }
```