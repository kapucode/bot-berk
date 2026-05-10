const {
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder
} = require('discord.js')

module.exports = {
  name: 'button',
  aliases: ['btn', 'botao'],
  
  run: async (client, message) => {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel(`Clique`)
          .setEmoji(`👆`)
          .setCustomId(`click:${message.author.id}`)
          .setStyle(ButtonStyle.Success)
      )
    
    message.reply({
      content: `Clique no botão!`,
      components: [row]
    })
  }
}