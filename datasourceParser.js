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
