const { Client, Collection } = require('discord.js')
const Cooldowns = require('./Cooldowns')

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

  async cooldownMessage(ctx, remaining) {
    return ctx.reply({
      content:
        `⏳ **|** Calma aí! Aguarde **${Math.ceil(remaining / 1000)}s** para usar esse comando novamente.`
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
}

module.exports = BotClient