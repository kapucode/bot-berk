
===================================================
------ PASSO A PASSO

1. Crie um comando base slash (por exemplo, canal.js)
2. Crie os arquivos de subcommands (canal-destrancar.js) e faça ele exportar uma função anônima com o código do sub
3. Coloque o código para rodar os subcommands no comando base




===================================================
------ PASSO A PASSO EXIBIÇÃO 
1. Crie um comando base slash (por exemplo, canal.js)
`--- Create canal.js`



2. Crie os arquivos de subcommands (canal-destrancar.js) e faça ele exportar uma função anônima com o código do sub
`--- Create canal-destrancar.js`
```javascript
  module.exports = async (client, interaction) => {
    interaction.reply(`destrancou`)
  }
```



3. Coloque o código para rodar os subcommands no comando base
```javascript
  const sub = interaction.options?.getSubcommand() || null
  if (!sub) return
   
   
  const subcommands = {
    trancar: require('./canal-trancar'),
    destrancar: require('./canal-destrancar')
  }
   
  await subcommands[sub](client, interaction)
```




===================================================
------ CÓDIGOS 
commandsSlash/admin/canal.js
```javascript
  const {
    SlashCommandBuilder
  } = require('discord.js')
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName('canal')
      .setDescription(`Comando geral de canal`)
      .addSubcommand(sub =>
        sub
          .setName('trancar')
          .setDescription(`Trancar canal`)
      )
      .addSubcommand(sub =>
        sub
          .setName('destrancar')
          .setDescription(`Destrancar canal`)
      ),
    
    run: async (client, interaction) => {
      const sub = interaction.options?.getSubcommand() || null
       if (!sub) return
       
       const subcommands = {
         trancar: require('./canal-trancar'),
         destrancar: require('./canal-destrancar')
       }
       
       await subcommands[sub](client, interaction)
    }
  }
```




commandsSlash/admin/canal-trancar.js
```javascript
  module.exports = async (client, interaction) => {
    interaction.reply(`trancou`)
  }
```