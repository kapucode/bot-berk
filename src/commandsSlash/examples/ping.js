const {
  SlashCommandBuilder
} = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Comando de ping'),
  
  run: async (client, interaction) => {

    interaction.reply({
      content: `🏓 **|** Pong! \`${client.ws.ping}\`ms`
    })
  }
}