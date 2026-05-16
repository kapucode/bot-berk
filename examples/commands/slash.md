```javascript
  const {
    SlashCommandBuilder
  } = require('discord.js')
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName('example')
      .setDescription(`Example`)
      
      // opcionais
      .setDefaultMemberPermissions(
        PermissionsBitField.Flags.YourPermission
      ) //seta quais permissoes conseguem ver o cmd
      .setDMPermission(false) // permite dm ou nao
      .setNSFW(false) // so prs canais nsfw
    
    guildOnly: true, // opcional
    devOnly: false, // opcional
    
    run: async (client, interaction) => {
      // lógica
    }
  }
```