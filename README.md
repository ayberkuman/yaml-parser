# YAML Configured DOM Manipulation

This JavaScript application dynamically modifies a webpage based on configurations provided in YAML files. It supports various actions like removing, replacing, inserting, and altering elements within the DOM.

## Getting Started

### Prerequisites

- A web server to serve the HTML and JavaScript files.
- A YAML configuration file with the necessary actions.

### Project Structure

```
/project-root
│
├── /scripts
│ ├── main.js
│ ├── parser.js
│ └── util.js
├── index.html
└── actions.yaml (Your YAML configuration file)
```

### Instructions

1. **Set Up the Project**

   - Place the JavaScript files (`main.js`, `parser.js`, `util.js`) in your `scripts` directory.
   - Create an `actions.yaml` file that contains your desired DOM manipulation actions.
   - Ensure your HTML file (e.g., `index.html`) includes the following script tag inside the head tag:

     ```html
     <script type="module" src="/scripts/main.js"></script>
     ```

2. **Edit the Configuration Path**

   - Open the `main.js` file located in the `scripts` directory.
   - On line 26, update the path to your YAML configuration file. For example:

     ```javascript
     const config = await fetchAndParseYAML("/your-path/actions.yaml");
     ```

   - Replace `/your-path/actions.yaml` with the correct path to your YAML file.

3. **Run the Application**
   - Serve your HTML file via a web server (You can try with `Live Server` in VSCode).
   - The application will fetch the YAML configuration, parse it, and apply the specified actions to the webpage.

### Example

Here’s a sample `actions.yaml` file:

```yaml
actions:
  - type: remove
    selector: ".ad-banner"
  - type: replace
    selector: "#old-header"
    newElement: "<header id='new-header'>New Header</header>"
  - type: insert
    position: "after"
    target: "body"
    element: "<footer>Footer Content</footer>"
  - type: alter
    oldValue: "Machine Learning"
    newValue: "AI"
```
