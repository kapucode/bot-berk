module.exports = {
  name: 'ping',
  aliases: ['pg'], // opcional
  cooldown: {
    time: 3000,
    scope: 'hybrid'
  },
  
  run: async (client, message) => {
    message.reply({
      content: `🏓 **|** Pong! \`${client.ws.ping}\`ms`
    })
  }
}