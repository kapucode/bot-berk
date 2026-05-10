const fs = require("fs");
const path = require("path");

module.exports = (client) => {

  try {
    const eventsPath = path.join(__dirname, "../../src/events");

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

    });

    console.log("EVENTS carregados!");

  } catch (err) {
    console.error(err);
  }

  process.on("unhandledRejection", (error) => {
    console.error(error);
  });

  process.on("uncaughtException", (error) => {
    console.error(error);
  });

};