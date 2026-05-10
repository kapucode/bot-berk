const fs = require("fs");
const path = require("path");

const { Collection } = require("discord.js");

module.exports = (client) => {
  try {
    const componentsPath = path.join(__dirname, "../../src/components");

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

        });

    });

    console.log("COMPONENTS carregados!");

  } catch (err) {
    console.log(err);
  }

};