```javascript;
  module.exports = {
    name: 'example',
    guildOnly: true, // opcional
    devOnly: false, // opcional
    cooldown: {
      time: 10_000,
      scope: 'user'
    }, // opcional
    
    run: async (client, message, args) => {
      // lógica 
    };
  };
```