class Cooldowns extends Map {
  createKey(ctx, command) {
    const scope =
      command.cooldown?.scope || "user"

    switch (scope) {
      case "user":
        return `${ctx?.user?.id || ctx.author.id}:${command.name}`

      case "guild":
        return `${ctx.guild.id}:${command.name}`

      case "channel":
        return `${ctx.channel.id}:${command.name}`

      case "global":
        return command.name

      case "hybrid":
        return `${ctx?.user?.id || ctx.author.id}:${command.name}`
    }
  }

  check(ctx, command) {
    if (!command.cooldown) {
      return { allowed: true, remaining: 0 }
    }

    const now = Date.now()
    const key = this.createKey(ctx, command)

    const ms =
      typeof command.cooldown === "number"
        ? command.cooldown
        : command.cooldown.time

    if (Number.isNaN(ms)) {
      throw new Error(`Cooldown inválido no comando ${command.name}`)
    }

    const expires = this.get(key)

    if (!expires || now >= expires) {
      const expireAt = now + ms

      this.set(key, expireAt)

      // 🧹 auto cleanup
      setTimeout(() => {
        // só remove se ainda for o mesmo valor (evita bug de overwrite)
        if (this.get(key) === expireAt) {
          this.delete(key)
        }
      }, ms)

      return { allowed: true, remaining: 0 }
    }

    return {
      allowed: false,
      remaining: expires - now
    }
  }
}

module.exports = Cooldowns