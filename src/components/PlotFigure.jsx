import * as Plot from "@observablehq/plot";
import { createElement as h } from "react";

// For client-side rendering, see https://codesandbox.io/s/plot-react-csr-p4cr7t?file=/src/PlotFigure.jsx
// Based on https://github.com/observablehq/plot/blob/main/docs/components/PlotRender.js

export default function PlotFigure({ options, title, description }) {
  return (
    <div className="bg-zinc-100 p-8 rounded-md flex flex-col gap-4">
      <h1 className="text-xl font-bold">{title}</h1>
      {Plot.plot({ ...options, document: new Document() }).toHyperScript()}
      <span className="text-xs text-gray-400">{description}</span>
    </div>
  );
}

class Document {
  constructor() {
    this.documentElement = new Element(this, "html");
  }
  createElementNS(namespace, tagName) {
    return new Element(this, tagName);
  }
  createElement(tagName) {
    return new Element(this, tagName);
  }
  createTextNode(value) {
    return new TextNode(this, value);
  }
  querySelector() {
    return null;
  }
  querySelectorAll() {
    return [];
  }
}

class Style {
  static empty = new Style();
  setProperty() {}
  removeProperty() {}
}

class Element {
  constructor(ownerDocument, tagName) {
    this.ownerDocument = ownerDocument;
    this.tagName = tagName;
    this.attributes = {};
    this.children = [];
    this.parentNode = null;
  }
  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }
  setAttributeNS(namespace, name, value) {
    this.setAttribute(name, value);
  }
  getAttribute(name) {
    return this.attributes[name];
  }
  getAttributeNS(name) {
    return this.getAttribute(name);
  }
  hasAttribute(name) {
    return name in this.attributes;
  }
  hasAttributeNS(name) {
    return this.hasAttribute(name);
  }
  removeAttribute(name) {
    delete this.attributes[name];
  }
  removeAttributeNS(namespace, name) {
    this.removeAttribute(name);
  }
  addEventListener() {
    // ignored; interaction needs real DOM
  }
  removeEventListener() {
    // ignored; interaction needs real DOM
  }
  dispatchEvent() {
    // ignored; interaction needs real DOM
  }
  append(...children) {
    for (const child of children) {
      this.appendChild(
        child?.ownerDocument ? child : this.ownerDocument.createTextNode(child)
      );
    }
  }
  appendChild(child) {
    this.children.push(child);
    child.parentNode = this;
    return child;
  }
  insertBefore(child, after) {
    if (after == null) {
      this.children.push(child);
    } else {
      const i = this.children.indexOf(after);
      if (i < 0) throw new Error("insertBefore reference node not found");
      this.children.splice(i, 0, child);
    }
    child.parentNode = this;
    return child;
  }
  querySelector() {
    return null;
  }
  querySelectorAll() {
    return [];
  }
  set textContent(value) {
    this.children = [this.ownerDocument.createTextNode(value)];
  }
  set style(value) {
    this.attributes.style = value;
  }
  get style() {
    return Style.empty;
  }
  toHyperScript() {
    return h(
      this.tagName,
      this.attributes,
      this.children.map((c) => c.toHyperScript())
    );
  }
}

class TextNode {
  constructor(ownerDocument, nodeValue) {
    this.ownerDocument = ownerDocument;
    this.nodeValue = String(nodeValue);
  }
  toHyperScript() {
    return this.nodeValue;
  }
}
