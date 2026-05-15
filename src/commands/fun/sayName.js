module.exports = {
  name: 'sayName',
  
  run: async (client, message) => {
    message.reply(`Me diga seu nome!`)
    
    const name = await message.channel.awaitResponse({
      user: message.author
    })
    
    message.reply(`Olá, ${name}!`)
  }
}