const fs = require("fs");
const path = require("path");

const { Collection } = require("discord.js");

module.exports = (client) => {
  try {
    const componentsPath = path.join(__dirname, "../../components");
    const folders = fs.readdirSync(componentsPath);

    folders.forEach((folder) => {
      const folderPath = path.join(componentsPath, folder);
      const files = fs.readdirSync(folderPath);

      files
        .filter(file => file.endsWith(".js"))
        .forEach((file) => {
          const filePath = path.join(folderPath, file);
          const component = require(filePath);

          if (!component?.name) return;

          client.components.set(component.name, component);
          
          // Debug (if true)
          client.debug(`COMPONENT set: ${JSON.stringify(component, null, 2)}`)
        });

    });

    client.info("COMPONENTS carregados!");
  } catch (err) {
    client.error(err);
  }

};