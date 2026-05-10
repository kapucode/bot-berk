module.exports = {
  name: 'ping',
  aliases: ['pg'], // opcional
  run: async (client, message) => {
    message.reply({
      content: `🏓 **|** Pong! \`${client.ws.ping}\`ms`
    })
  }
}