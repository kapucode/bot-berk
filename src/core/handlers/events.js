const fs = require("fs");
const path = require("path");

module.exports = (client) => {

  try {
    const eventsPath = path.join(__dirname, "../../events");
    const events = fs.readdirSync(eventsPath);

    events.forEach((eventFile) => {
      const eventPath = path.join(eventsPath, eventFile);
      const eventData = require(eventPath);

      if (!eventData?.name) return;

      if (eventData.once) {
        client.once(eventData.name, (...args) =>
          eventData.run(client, ...args)
        );
      } else {
        client.on(eventData.name, (...args) =>
          eventData.run(client, ...args)
        );
      }
      
      client.debug(`EVENT set: ${JSON.stringify(eventData, null, 2)}`)
    });

    client.info("EVENTS carregados!");

  } catch (err) {
    client.error(err);
  }

  process.on("unhandledRejection", (error) => {
    client.error(error);
  });

  process.on("uncaughtException", (error) => {
    client.error(error);
  });

};