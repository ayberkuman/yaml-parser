// Function to iterate and apply all actions
export function applyActions(actions) {
  actions.forEach((action) => {
    try {
      switch (action.type) {
        case "remove":
          removeElements(action.selector);
          break;
        case "replace":
          replaceElements(action.selector, action.newElement);
          break;
        case "insert":
          insertElement(action.position, action.target, action.element);
          break;
        case "alter":
          alterText(action.oldValue, action.newValue);
          break;
        default:
          console.error("Unsupported action type:", action.type);
      }
    } catch (error) {
      console.error(`Error applying action ${JSON.stringify(action)}:`, error);
    }
  });
}

export function removeElements(selector) {
  if (!selector) {
    console.error("Selector is required for remove action");
    return;
  }
  document.querySelectorAll(selector).forEach((element) => element.remove());
}

export function replaceElements(selector, newElement) {
  if (!selector || !newElement) {
    console.error("Selector and New Element are required for replace action");
    return;
  }
  document.querySelectorAll(selector).forEach((element) => {
    element.outerHTML = newElement;
  });
}

export function insertElement(position, target, element) {
  if (!position || !target || !element) {
    console.error(
      "Position, target, and element are required for insert action"
    );
    return;
  }
  const targetEl = document.querySelector(target);
  if (targetEl) {
    targetEl.insertAdjacentHTML(
      position === "after" ? "beforeend" : "beforebegin", // Used beforeend for after because in the example target tag was body and I did not want to alter tags outside the body
      element
    );
  } else {
    console.error("Target element not found for insert action:", target);
  }
}

export function alterText(oldValue, newValue) {
  if (!oldValue || !newValue) {
    console.error("Target and New Text are required for alter action");
    return;
  }
  document.body.innerHTML = document.body.innerHTML.replace(
    new RegExp(oldValue, "g"),
    newValue
  );
}
