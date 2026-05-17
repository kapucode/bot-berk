const { TextChannel } = require('discord.js');

TextChannel.prototype.awaitResponse = function(options = {}) {
  const {
    user,
    time = 30000,
    filter = () => true
  } = options;

  return this.awaitMessages({
    time,
    max: 1,

    filter: msg => {
      if (user && msg.author.id !== user.id) {
        return false;
      }

      if (msg.author.bot) {
        return false;
      }

      return filter(msg);
    }
  })
    .then(collected => collected.first())
};
