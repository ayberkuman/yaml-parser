// Simple YAML parser (for the given structure)
export function parseYAML(yamlText) {
  const lines = yamlText.split("\n");
  const actions = [];
  let currentAction = null;

  for (let line of lines) {
    line = line.trim();

    // Ensure each action starts with '- type:' and capture the type
    if (line.startsWith("- type:")) {
      if (currentAction) actions.push(currentAction);

      const type = line.split(":")[1]?.trim();
      if (!type) {
        console.error(
          "Unknown action type in YAML:",
          line,
          "Only remove, replace, insert and alter actions are allowed"
        );
        continue; // skip this action if type is not correctly specified
      }
      currentAction = { type };
    }
    // Capture key-value pairs for the action
    else if (line && currentAction) {
      const [key, value] = line.split(":").map((s) => s.trim());
      if (!key || value === undefined) {
        console.error("Incorrect key-value pair in YAML:", line);
        continue; // skip this line if key-value pair is not correctly specified
      }
      currentAction[key] = value.replace(/^["']|["']$/g, "");
    }
  }

  if (currentAction) actions.push(currentAction);

  if (actions.length === 0) {
    console.warn("No valid actions found in the YAML file.");
  }

  return { actions };
}

// Parser for the configuration YAML structure
export function parseDataSourceYAML(yamlText) {
  const lines = yamlText.split("\n");
  const config = {
    datasource: {
      pages: {},
      urls: {},
      hosts: {},
    },
  };
  let currentSubsection = null;

  for (let line of lines) {
    line = line.trim();

    if (!line || line.startsWith("#")) {
      // Skip empty lines and comments
      continue;
    }

    if (line.startsWith("datasource:")) {
      continue; // Move to the next line to avoid resetting currentSubsection
    }

    // Identify subsections under datasource
    if (line.startsWith("pages:")) {
      currentSubsection = "pages";
      continue;
    } else if (line.startsWith("urls:")) {
      currentSubsection = "urls";
      continue;
    } else if (line.startsWith("hosts:")) {
      currentSubsection = "hosts";
      continue;
    }

    // Process key-value pairs within the identified subsection
    if (
      currentSubsection &&
      (currentSubsection === "pages" ||
        currentSubsection === "urls" ||
        currentSubsection === "hosts")
    ) {
      const [key, value] = line.split(":").map((s) => s.trim());

      if (key && value) {
        const parsedValue = value
          .replace(/^["']|["']$/g, "") // Remove surrounding quotes
          .replace(/^\[|\]$/g, "") // Remove brackets if it's a list
          .split(",") // Split into an array if it's a list
          .map((v) => v.trim()); // Trim each value

        config.datasource[currentSubsection][key] =
          parsedValue.length > 1 ? parsedValue : parsedValue[0];
      } else {
        console.error(
          `Incorrect key-value pair in YAML for ${currentSubsection}:`,
          line
        );
      }
    }
  }
  return config;
}
