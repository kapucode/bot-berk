const Messages = require('@ui/Messages')
const Confirmation = require('@ui/Confirmation')

module.exports = {
  name: 'confirm',
  
  run: async (client, message) => {
    const prankMsg = '-# Brincadeira! Isso é só um exemplo do Confirmation.'
    const confirmMsg = await message.reply(`Você tem certeza que deseja invadir o banco de dados da NASA?
${prankMsg}`)
    const confirmed = await Confirmation.ask(confirmMsg, message.author)
    
    if (confirmed) {
      confirmMsg.edit({
        content: `Você invadiu o banco de dados da NASA com sucesso! Cuidado com o FBI...
${prankMsg}`
      })
    } else {
      confirmMsg.edit({
        content: `Você cancelou a invasão do banco de dados da NASA, que pena!
${prankMsg}`
      })
    }
  }
}