const {
  MessageFlags
} = require('discord.js');

const ReactionCollector = require('@structures/ReactionCollector');

const client = require('@structures/Client');

class Confirmation {
  static ask(message, author) {
    return new Promise(async (resolve) => {
      try {
        const emojis = ['✅', '❌'];
        
        let choice = '❌';
        
        const generatedCollector = new ReactionCollector(message, {
          emojis,
          
          filter: (_, user) => 
            !user.bot && 
            user.id === author.id,
          
          collect: async (reaction, _, collector) => {
            choice = reaction.emoji.name;
            if (choice === '✅') {
              resolve(true);
            } else {
              resolve(false);
            }
            await message.reactions.removeAll();
            collector.stop();
          }
        });
        
        await generatedCollector.start();
      } catch (err) {
        client.error(err);
      }
    });
  }
}

module.exports = Confirmation 