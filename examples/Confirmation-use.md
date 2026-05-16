O Confirmation é usado para confirmar alguma ação com uma resposta de SIM ou NÃO do usuário. Ele utiliza o 'new ReactionCollector()'

O 'await Confirmation.ask()' retorna true ou false.
true - usuário confirmou com SIM
false - usuário confirmou com NÃO

--------------- USO ---------------
Argumento 1 (REQ) - Mensagem que será feita a confirmação e as reações serão adicionadas (✅ e ❌)
Argumento 2 (REQ) - Objeto do usuário da pessoa que deverá fazer a confirmação (para proteger que outras pessoas confirmem por ela)

Confirmation.ask(
  mensagem,
  autor
)

```javascript
run: async (client, message) => {
  const prankMsg = '-# Brincadeira! Isso é só um exemplo do Confirmation.'
  const confirmMsg = await message.reply(`Você tem certeza que deseja invadir o banco de dados da NASA?
${prankMsg}`)

  // ==============================================
  //                    USO
  // ==============================================
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
```