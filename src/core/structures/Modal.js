const {
  ModalBuilder,
  ActionRowBuilder
} = require('discord.js')

class Modal {

  constructor(options = {}) {

    this.customId =
      options.customId || null

    this.title =
      options.title || 'Sem título'

    this.rows =
      options.rows || []
  }

  setCustomId(customId) {
    this.customId = customId
    return this
  }

  setTitle(title) {
    this.title = title
    return this
  }

  addComponents(...components) {
    if (this.rows.length >= 5) {
      throw new Error(
        'Modal can only have 5 components.'
      )
    }
    
    for (const component of components) {

      const row =
        new ActionRowBuilder()
          .addComponents(component)
    
      this.rows.push(row)
    }

    return this
  }

  build(interaction) {

    const modal =
      new ModalBuilder()
        .setCustomId(
          `${this.customId}:${interaction.user.id}`
        )
        .setTitle(this.title)
        .addComponents(this.rows)

    return modal
  }
}

module.exports = Modal