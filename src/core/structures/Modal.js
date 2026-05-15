const {
  ModalBuilder,
  TextDisplayBuilder,
  LabelBuilder
} = require('discord.js')

class Modal {

  constructor(options = {}) {

    this.customId =
      options.customId || null

    this.title =
      options.title || 'Sem título'

    this.fields =
      options.fields || []
    
    this.textDisplay = options.textDisplay
      ? new TextDisplayBuilder()
          .setContent(options.textDisplay)
      : null
  }

  setCustomId(customId) {
    this.customId = customId
    return this
  }

  setTitle(title) {
    this.title = title
    return this
  }
  
  setTextDisplay(text) {
    this.textDisplay = new TextDisplayBuilder()
      .setContent(text)
    
    return this
  }
  
  addFields(...fields) {
    if (
      this.fields.length + fields.length > 5
    ) {
      throw new Error(
        'Modal can only have 5 components.'
      )
    }
  
    const methods = {
      TextInputBuilder: 'setTextInputComponent',
      StringSelectMenuBuilder:
        'setStringSelectMenuComponent',
  
      UserSelectMenuBuilder:
        'setUserSelectMenuComponent',
  
      RoleSelectMenuBuilder:
        'setRoleSelectMenuComponent',
  
      MentionableSelectMenuBuilder:
        'setMentionableSelectMenuComponent',
  
      ChannelSelectMenuBuilder:
        'setChannelSelectMenuComponent',
  
      FileUploadBuilder:
        'setFileUploadComponent'
    }
  
    for (const field of fields) {
      const label = new LabelBuilder()
        .setLabel(field.label)
  
      if (field.description) {
        label.setDescription(field.description)
      }
  
      const component =
        field.component
  
      const method =
        methods[component.constructor.name]
  
      if (!method) {
        throw new Error(
          `Unsupported component: ${component.constructor.name}`
        )
      }
  
      label[method](component)
  
      this.fields.push(label)
    }
  
    return this
  }

  build(interaction) {

    const modal = new ModalBuilder()
        .setCustomId(
          `${this.customId}`
        )
        .setTitle(this.title)
    
    if (this.textDisplay) {
      modal.addTextDisplayComponents(this.textDisplay)
    }
    
    modal.addLabelComponents(...this.fields)
    

    return modal
  }
}

module.exports = Modal