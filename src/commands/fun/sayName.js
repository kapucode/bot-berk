module.exports = {
  name: 'sayName',
  
  run: async (client, message) => {
    message.reply(`Envie uma mensagem me dizendo seu nome!`)
    
    const name = await message.channel.awaitResponse({
      user: message.author
    })
    
    message.reply(`Olá, **${name}!**`)
  }
}