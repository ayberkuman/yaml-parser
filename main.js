import { parseYAML, parseDataSourceYAML } from "./parser.js";
import { applyActions } from "./util.js";
import { determineConfigFiles } from "./determine.js";

// Function to fetch and parse YAML
async function fetchAndParseYAML(url, isDataSource) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch YAML file: ${response.statusText}, Make sure the URL is correctly pointing at your yaml config file`
      );
    }

    const yamlText = await response.text();
    return isDataSource ? parseDataSourceYAML(yamlText) : parseYAML(yamlText);
  } catch (error) {
    console.error("Error fetching or parsing YAML:", error);
    throw error; // rethrow to be caught by the caller
  }
}

// Main function to run the parser
async function runParser() {
  try {
    // Fetch and parse the main config file
    const mainConfig = await fetchAndParseYAML("/mainConfig.yaml", true);
    // Determine which config files are applicable
    const configFiles = await determineConfigFiles(mainConfig);
    // Fetch, parse, and apply actions from each config file
    for (const file of configFiles) {
      const fileConfig = await fetchAndParseYAML(file, false); // These are action configs only
      if (fileConfig.actions && fileConfig.actions.length > 0) {
        applyActions(fileConfig.actions);
      } else {
        console.warn(`No actions found in config file: ${file}`);
      }
    }
  } catch (error) {
    console.error("Error running the parser:", error);
  }
}

// Run the parser when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", runParser);
