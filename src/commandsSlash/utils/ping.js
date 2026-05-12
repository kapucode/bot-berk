const {
  SlashCommandBuilder
} = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Comando de ping'),
  
  cooldown: {
    time: 3000,
    scope: 'hybrid'
  },
  
  run: async (client, interaction) => {

    interaction.reply({
      content: `🏓 **|** Pong! \`${client.ws.ping}\`ms`
    })
  }
}