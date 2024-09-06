const definedElements = new Set();

export function defineCustomElement(name, elementClass) {
  if (!definedElements.has(name)) {
    customElements.define(name, elementClass);
    definedElements.add(name);
  }
}
