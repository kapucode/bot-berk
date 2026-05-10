const { REST, Routes } = require("discord.js");
require("dotenv").config();

const rest = new REST({ version: "10" })
  .setToken(process.env.BOT_TOKEN);

(async () => {

  try {

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: [] }
    );

    console.log("Todos os slash commands foram removidos.");

  } catch (err) {
    console.error(err);
  }

})();