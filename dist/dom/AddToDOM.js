import {GetElement} from "./GetElement";
export function AddToDOM(element, parent) {
  const target = GetElement(parent);
  target.appendChild(element);
  return element;
}
