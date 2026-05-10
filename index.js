require('dotenv').config()
const client = require('./core/client.js')

require('./core/handlers/indexPrefix.js')(client)
require('./core/handlers/indexSlash.js')(client)
require('./core/handlers/components.js')(client)
require('./core/handlers/events.js')(client)

client.login(process.env.BOT_TOKEN)