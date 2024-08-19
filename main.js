import { parseYAML } from "./parser.js";
import { applyActions } from "./util.js";

// Function to fetch and parse YAML
async function fetchAndParseYAML(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch YAML file: ${response.statusText}, Make sure the URL is correctly pointing at your yaml config file`
      );
    }

    const yamlText = await response.text();
    return parseYAML(yamlText);
  } catch (error) {
    console.error("Error fetching or parsing YAML:", error);
    throw error; // rethrow to be caught by the caller
  }
}

// Main function to run the parser
async function runParser() {
  try {
    const config = await fetchAndParseYAML("/actions.yaml");
    if (config.actions.length > 0) {
      applyActions(config.actions);
    } else {
      console.warn("No actions to apply.");
    }
  } catch (error) {
    console.error("Error running the parser:", error);
  }
}

// Run the parser when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", runParser);
