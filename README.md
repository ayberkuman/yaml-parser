# YAML Configured DOM Manipulation

This JavaScript application dynamically modifies a webpage based on configurations provided in YAML files. It supports various actions like removing, replacing, inserting, and altering elements within the DOM. Additionally, the application now includes a bonus feature that allows different configurations to be applied based on the current URL, route, or host.

## Getting Started

### Prerequisites

- A web server to serve the HTML and JavaScript files.
- A YAML configuration file or multiple configuration files and a main configuration file specifying which configuration files to apply based on the current URL, route, or host.

### Project Structure

```
/project-root
│
├── /your-path
│ ├── main.js
│ ├── parser.js
│ ├── constants.js
│ ├── determine.js
│ └── util.js
├── mainConfig.yaml (Your main configuration file specifying which configuration files to apply based on the current URL, route, or host)
├── orders.yaml (Your configuration file for the orders page for example)
├── products.yaml  (Your configuration file for the products page for example)
├── index.html (Your main route)
├── products.html (Your products route)
└── orders.html (Your orders route)


```

### Instructions

1. **Set Up the Project**

   - Place the JavaScript files (`main.js`, `parser.js`, `util.js `, `constants.js`, `determine.js`) in your desired directory.
   - Create a `<your-main-config>.yaml` file that contains your main configuration file specifying which configuration files to apply based on the current URL, route, or host.
   - Create `<your-page-1>.yaml` and `<your-page-2>.yaml` files that contain your desired DOM manipulation actions for the respective pages.
   - Ensure your entry point and routes (e.g., `index.html`, `products.html`, `orders.html`) includes the following script tag inside the head tag and correctly points to the `main.js` file:

     ```html
     <script type="module" src="/your-path/main.js"></script>
     ```

2. **Edit the Configuration Path**

   - Open the `main.js` file.
   - On line 27, update the path to your main YAML configuration file. For example: `/your-path/<your-main-config>.yaml`

     ```javascript
     const mainConfig = await fetchAndParseYAML(
       "/<your-main-config>.yaml",
       true
     );
     ```

   - Replace `"/mainConfig.yaml"` with the correct path to your main YAML file.

   - Make sure the main YAML file is correctly pointing to the other YAML files that contain the DOM manipulation actions.

3. **Run the Application**
   - Serve your HTML file via a web server (You can try with `Live Server` in VSCode).
   - The application will fetch the YAML configuration, parse it, and apply the specified actions to the webpage.

### Example

Here’s a sample `mainConfig.yaml` file:

```yaml
datasource:
  pages:
    list: orders.yaml
    details: products.yaml
    cart: products.yaml

  urls:
    /products: products.yaml (This means the products route will use the products.yaml file)
    /orders: [orders.yaml, products.yaml] (This means the orders route will use both orders.yaml and products.yaml files)

  hosts:
    example.com: orders.yaml
    another.com: products.yaml
```

Here’s a sample `orders.yaml` file:

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
