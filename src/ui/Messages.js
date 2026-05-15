const {
  EmbedBuilder,
  MessageFlags
} = require('discord.js')

const client = require('@structures/Client')

class Messages {
  static errors = class {
    static createEmbed(options={}) {
      const {
        color,
        title,
        description,
        timestamp
      } = options
      
      return new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setTimestamp(timestamp)
    }
  
    static async send(ctx, options = {}) {
      const {
        title='❌ | Falha no Sistema',
        color='#ff4d4d',
        description='Ocorreu um erro',
        timestamp=Date.now(),
        ephemeral = true,
        embeds = []
      } = options
  
      const payload = {
        embeds: [
          this.createEmbed({
            title,
            color,
            description,
            timestamp,
            ephemeral
          }),
          ...embeds
        ],
        flags: ephemeral ? MessageFlags.Ephemeral : undefined
      }
  
      try {
        if (ctx.deferred || ctx.replied) {
          return await ctx.followUp(payload)
        }
  
        if (ctx.reply) {
          return await ctx.reply(payload)
        }
  
        if (ctx.channel?.send) {
          return await ctx.channel.send(payload)
        }
  
      } catch (err) {
        client.error(
          err
        )
      }
    }
  
    static async permission(ctx) {
      return this.send(ctx, {
        title: '❌ | Sem Permissão',
        description:
          'Você não tem permissão para usar isso!'
      })
    }
  
    static async botPermission(ctx) {
      return this.send(ctx, {
        title: '❌ | Sem Permissão',
        description:
          'Eu não tenho permissão para executar isso!'
      })
    }
  
    static async ownerOnly(ctx) {
      return this.send(ctx, {
        description:
          'Apenas os desenvolvedores podem usar isso!'
      })
    }
  
    static async guildOnly(ctx) {
      return this.send(ctx, {
        description:
          'Esse comando só pode ser usado em servidores!'
      })
    }
  
    static async nsfwOnly(ctx) {
      return this.send(ctx, {
        description:
          'Esse comando só pode ser usado em canais NSFW!'
      })
    }
  
    static async cooldown(ctx, time) {
      return this.send(ctx, {
        title: '⏳ | Cooldown',
        color: 0xdfb85b,
        description:
          `Calma aí! Aguarde **${time}s** para usar esse comando novamente.`
      })
    }
  
    static async invalid(ctx, value = 'Valor') {
      return this.send(ctx, {
        description:
          `${value} inválido.`
      })
    }
  
    static async missingArgument(ctx, args) {
      return this.send(ctx, {
        description:
          `Argumento(s) obrigatório(s) ausente(s): \`${args.join(`, `)}\`.`
      })
    }
  
    static async notFound(ctx, thing = 'Item') {
      return this.send(ctx, {
        description:
          `${thing} não encontrado.`
      })
    }
  
    static async alreadyExists(ctx, thing = 'Item') {
      return this.send(ctx, {
        description:
          `${thing} já existe.`
      })
    }
  
    static async limitReached(ctx) {
      return this.send(ctx, {
        description:
          'Você atingiu o limite permitido!'
      })
    }
  
    static async disabled(ctx) {
      return this.send(ctx, {
        title: '🗄️ | Sistema Offline',
        color: 0x1e1e1e,
        description:
          'Esse sistema está desativado atualmente!'
      })
    }
  
    static async maintenance(ctx) {
      return this.send(ctx, {
        title: '🛠️ | Manutenção',
        color: 0x935f30,
        description:
          'O sistema está em manutenção!'
      })
    }
  
    static async internal(ctx) {
      return this.send(ctx, {
        description:
          'Ocorreu um erro interno inesperado!'
      })
    }
  
    static async database(ctx) {
      return this.send(ctx, {
        title: '🗄️ | Erro de Comunicação',
        color: 0x5e5e5e,
        description:
          'Erro ao comunicar com o banco de dados !.'
      })
    }
  
    static async api(ctx) {
      return this.send(ctx, {
        description:
          'Erro ao comunicar com API externa!'
      })
    }
  
    static async timeout(ctx) {
      return this.send(ctx, {
        description:
          'A operação expirou!'
      })
    }
  
    static async rateLimit(ctx) {
      return this.send(ctx, {
        description:
          'Muitas requisições. Tente novamente mais tarde!'
      })
    }
  
    static async unsupported(ctx) {
      return this.send(ctx, {
        description:
          'Isso não é suportado!'
      })
    }
  
    static async blocked(ctx) {
      return this.send(ctx, {
        description:
          'Você está proibido(a) de usar esse sistema!'
      })
    }
    
    static async banned(ctx) {
      return this.send(ctx, {
        title: '🏴‍☠️ | Banido(a)',
        color: 0x1a1a1a,
        description:
          'Você está banido(a) de usar meus comandos!'
      })
    }
  }
}

module.exports = Messages