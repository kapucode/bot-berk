const {
  ComponentType
} = require('discord.js');

const client = require('@structures/Client');

class ReactionCollector {
  constructor(message, options = {}) {
    this.message = message;

    this.emojis = options.emojis || [];
    this.filter = options.filter || (() => true);
    this.time = options.time || 60000;

    this.collect = options.collect || (() => {});
    this.end = options.end || (() => {});
  }

  async start() {
    try {
      for (const emoji of this.emojis) {
        await this.message.react(emoji);
      }
  
      const collector = this.message.createReactionCollector({
        filter: (reaction, user) => {
          return (
            this.emojis.includes(reaction.emoji.name) &&
            this.filter(reaction, user)
          );
        },
        time: this.time
      });
  
      collector.on('collect', (reaction, user) => {
        this.collect(reaction, user, collector);
      });
  
      collector.on('end', collected => {
        this.end(collected, collector);
      });
  
      return collector;
    } catch(err) {
      client.error(err)
    }
  }
}

module.exports = ReactionCollector;