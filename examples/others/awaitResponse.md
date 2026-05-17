O awaitResponse é uma propriedade de CANAL, adicionada pelo criador dessa base de bot. A propriedade é utilizada para pegar uma mensagem que o usuário enviar.

Por exemplo, você quer saber o que um usuário achou do bot por um comando, mas não quer usar Modal para isso. Basta usar o awaitResponse, que a mensagem que o usuário mandar após usar o comando, será o dado recebido.

-------------- USO --------------
Argumentos (em formato de objeto):
- user (REQ): Usuário que terá sua mensagem aguardada
- time (OPT): Tempo até o bot parar de aguardar a mensagem do usuário
- filter (OPT): Filtro para pegar a mensagem

TextChannel.prototype.awaitResponse({
  user: 
})

EXEMPLO DE USO:
```javascript
run: async (client, message) => {
  message.reply(`Envie uma mensagem me dizendo seu nome!`)
  
  const name = await message.channel.awaitResponse({
    user: message.author
  })
  
  message.reply(`Olá, **${name}!**`)
}
```