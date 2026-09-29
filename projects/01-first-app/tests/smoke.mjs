// Maintainer-only logic smoke test. This fake DOM does not replace browser or accessibility testing.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import vm from "node:vm";

const here = dirname(fileURLToPath(import.meta.url));
const html = await readFile(resolve(here, "../index.html"), "utf8");
const match = html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(match, "index.html should contain one inline script");

class FakeElement {
  constructor(tag = "div") {
    this.tagName = tag;
    this.listeners = {};
    this.children = [];
    this.attributes = {};
    this.classes = new Set();
    this.classList = {
      toggle: (name, force) => {
        const shouldAdd = force ?? !this.classes.has(name);
        if (shouldAdd) this.classes.add(name);
        else this.classes.delete(name);
      },
    };
  }

  addEventListener(type, callback) { this.listeners[type] = callback; }
  append(...children) { this.children.push(...children); }
  replaceChildren() { this.children = []; }
  setAttribute(name, value) { this.attributes[name] = value; }
  focus() {}
  reset() { input.value = ""; }
  setCustomValidity(message) { this.validationMessage = message; }
  reportValidity() { this.didReportValidity = true; return !this.validationMessage; }
  fire(type, event = {}) { this.listeners[type]?.(event); }
  get textContent() { return this._text ?? ""; }
  set textContent(value) { this._text = String(value); }
}

const form = new FakeElement("form");
const input = new FakeElement("input");
const list = new FakeElement("ul");
const status = new FakeElement("p");
const elements = {
  "#task-form": form,
  "#task-input": input,
  "#task-list": list,
  "#task-status": status,
};
const document = {
  querySelector: (selector) => elements[selector],
  createElement: (tag) => new FakeElement(tag),
};

vm.runInNewContext(match[1], { document });
assert.equal(list.children.length, 1, "starter task renders");
assert.equal(list.children[0].children[1].textContent, "Choose one useful next action");
assert.equal(status.textContent, "1 of 1 task left.");

const initialRow = list.children[0];
initialRow.children[0].checked = true;
initialRow.children[0].fire("change");
assert.equal(status.textContent, "0 of 1 task left.", "completion updates the count");

input.value = "  Finish draft  ";
form.fire("submit", { preventDefault() {} });
assert.equal(list.children.length, 2, "valid task is added");
assert.equal(list.children[1].children[1].textContent, "Finish draft", "title is trimmed");
assert.equal(status.textContent, "1 of 2 tasks left.");

input.value = "   ";
form.fire("submit", { preventDefault() {} });
assert.equal(list.children.length, 2, "whitespace-only task is rejected");
assert.equal(input.validationMessage, "Enter a short action before adding it.");
assert.equal(input.didReportValidity, true);

list.children[1].children[2].fire("click");
assert.equal(list.children.length, 1, "task can be removed");
assert.equal(status.textContent, "0 of 1 task left.");

console.log("TaskFlow logic smoke test passed (mock DOM; not a browser test).");
