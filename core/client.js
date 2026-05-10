const { Client, Collection } = require('discord.js')

// Creation
const client = new Client({
  intents: 3276799
})

// Variables
client.prefix = `'`
client.developers = new Set(['1173408263920951356'])
client.botMention = (client, ctx) => {
  ctx.reply({
    content: `💫 **|** Olá! Meu prefixo é \`${client.prefix}\``
  })
}

// Collections (for handlers)
client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();
client.components = new Collection();

// Exportation
module.exports = client