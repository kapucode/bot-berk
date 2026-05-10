const {
  SlashCommandBuilder,
  PermissionsBitField,
  MessageFlags
} = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('canal')
    .setDescription('Comando geral de canal') // Esse comando não aparece como "canal"
    .addSubcommand(sub =>
      sub
        .setName('trancar')
        .setDescription('Tranca o canal')
    )
    .addSubcommand(sub =>
      sub
        .setName('destrancar')
        .setDescription('Destranca o canal')
    )
    .setDefaultMemberPermissions(
      PermissionsBitField.Flags.ManageChannels
    )
    .setDMPermission(false),
  
  run: async (client, interaction) => {
    // Se o bot ou o usuário não tiver permissão
    const botMember = interaction.guild.members.me;
    const userMember = interaction.member

    if (
      !botMember.permissions.has(PermissionsBitField.Flags.ManageChannels)
    ) {
      return interaction.reply({
        content: `:x: **|** Eu preciso da permissão \`Gerenciar Canais\` para usar esse comando!`,
        flags: MessageFlags.Ephemeral
      })
        .catch(() => {})
    }
    
    if (
      !userMember.permissions.has(PermissionsBitField.Flags.ManageChannels)
    ) {
      return interaction.reply({
        content: `:x: **|** Para usar esse comando, é necessária a permissão \`Gerenciar Canais\`!`,
        flags: MessageFlags.Ephemeral
      })
        .catch(() => {})
    }
    
    // Comando
    const sub = interaction.options.getSubcommand()
    
    if (!sub) return
    
    const subcommands = {
      trancar: require('./canal-trancar.js'),
      destrancar: require('./canal-destrancar.js')
    }
    
    await subcommands[sub](client, interaction)
  }
}