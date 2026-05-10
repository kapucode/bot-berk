module.exports = {
  name: 'devOnly',
  devOnly: true,
  run: async (client, message) => {
    message.reply(`👋 **|** Olá, desenvolvedor!`)
  }
}