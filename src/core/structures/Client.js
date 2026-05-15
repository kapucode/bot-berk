const { Client, Collection } = require('discord.js')
const Cooldowns = require('@structures/Cooldowns')

require(`@extensions/TextChannel`)

const {
  WaitTimeoutError
} = require('@structures/Errors')

const crypto = require('node:crypto')

class BotClient extends Client {
  constructor(options = {}) {
    super({
      intents: 3276799
    })

    // Variables
    this.prefix = options.prefix || "'"
    this.developers = new Set(
      options.developers || []
    )
    
    this.debugMode = false
    
    // Collections
    this.commands = new Collection()
    this.aliases = new Collection()
    this.slashCommands = new Collection()
    this.components = new Collection()

    // Cooldowns
    this.cooldowns = new Cooldowns()
    
    // States
    this.states = {
      feedbacks: new Map()
    }
  }

  async botMention(ctx) {
    return ctx.reply({
      content: `💫 **|** Olá! Meu prefixo é \`${this.prefix}\``
    })
      .catch(() => {})
  }
  
  // LOGS
  log(type, ...args) {
    type = type.trim().toLowerCase()
    if (!this.debugMode && type === "debug") return
  
    const prefix = {
      debug: "[DEBUG] 🛠️",
      info: "[INFO] 📋",
      warn: "[WARN] ⚠️",
      error: "[ERROR] 🚨"
    }[type] || "[LOG] 📌"
  
    console.log(prefix, ...args, `\n`)
  }
  
  debug(...args) {
    if (!this.debugMode) return
    console.log(`[DEBUG] 🛠️`, ...args, `\n`)
  }
  
  info(...args) {
    console.log(`[INFO] 📋`, ...args, `\n`)
  }
  
  warn(...args) {
    console.log(`[WARN] ⚠️`, ...args, `\n`)
  }
  
  error(...args) {
    console.log(`[ERROR] 🚨`, ...args, `\n`)
  }
  
  // States
  createState(bucket, data, ttl = 300000) {
    const id = crypto.randomUUID()
  
    this.states[bucket].set(id, {
      data,
      expiresAt: Date.now() + ttl
    })
  
    return id
  }
  
  getState(bucket, id) {
    const state = this.states[bucket].get(id)
  
    if (!state) return null
  
    if (state.expiresAt <= Date.now()) {
      this.states[bucket].delete(id)
      return null
    }
  
    return state.data
  }
  
  // Await
  waitFor(event, options={}) {
    return new Promise((resolve, reject) => {
      const {
        filter = () => true,
        timeout = 30000
      } = options
  
      const listener = (...args) => {
        if (!filter(...args)) return
  
        cleanup()
        resolve(args.length === 1 ? args[0] : args)
      }
  
      const cleanup = () => {
        clearTimeout(timer)
        this.off(event, listener)
      }
  
      const timer = setTimeout(() => {
        cleanup()
        reject(new WaitTimeoutError())
      }, timeout)
  
      this.on(event, listener)
    })
  }
}

module.exports = BotClient