O ReactionCollector é usado para criar collector's de reações com Discord.JS, onde você passa os emojis na própria classe e ela já reage para você.

O ReactionCollector().start() retorna o collector, então você pode mexer no collector no seu código, sem mexer na estrutura de ReactionCollector.js

------------------- USO -------------------
Argumentos (são em objeto):
  message (REQ) - Mensagem que será adicionada o   collector e as reações desejadas.
  
  emojis (REQ) - ARRAY dos emojis que serão adicionados na mensagem para ser feito o collector.
  
  filter (OPC) - ARROW FUNCTION do FILTRO que será usado para coletar a reação. Uso: 
  (reaction, user) => {}
  
  collect (OPC/RECOMMENDED) -  ARROW FUNCTION do que acontecerá quando a pessoa COLETAR uma reação (ou seja, reagir). Uso:
  (reaction, user, collector) => {}
  
  end (OPC) - ARROW FUNCTION do que acontecerá quando o collector ser FINALIZADO (acabar o fempo ou usarem collector.stop()). Uso:
  
  time (OPC) - TEMPO em MS (tempo * 1000), que será o tempo qur o collector ficará ativo

```javascript
const {
  MessageFlags
} = require('discord.js');

const ReactionCollector = require('@structures/ReactionCollector');

const client = require('@structures/Client');

// ======================================
// USO
// ======================================
const emojis = ['✅', '❌'];

let choice = '❌';

const generatedCollector = new ReactionCollector(
  message, 
  {
    emojis,
    
    filter: (_, user) => 
      !user.bot && 
      user.id === author.id,
    
    collect: (reaction, _, collector) => {
      choice = reaction.emoji.name;
      if (choice === '✅') {
        console.log('CONFIRMOU')
      } else {
        console.log('NAO CONFIRMOU')
      }
      collector.stop();
    }
  }
);

await generatedCollector.start();
```