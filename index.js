require('module-alias/register');
const BotClient = require('@structures/Client.js')

require('dotenv').config()
const client = new BotClient({
  prefix: "'",
  developers: ['1173408263920951356']
})

client.debug(`======================================`)
client.debug(`HANDLERS INITIALIZATION`)
client.debug(`======================================`)

require('@handlers/indexPrefix.js')(client)
require('@handlers/indexSlash.js')(client)
require('@handlers/components.js')(client)
require('@handlers/events.js')(client)

client.login(process.env.BOT_TOKEN)