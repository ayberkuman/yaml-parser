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
