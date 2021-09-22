import { AddToDOM } from "../../dom/AddToDOM";
import { CONFIG_DEFAULTS } from "../const";
import { ConfigStore } from "../ConfigStore";
import { RendererInstance } from "../../renderer/RendererInstance";
export function AddToParent() {
  const parent = ConfigStore.get(CONFIG_DEFAULTS.PARENT);
  const canvas = RendererInstance.get().canvas;
  if (parent && canvas) {
    AddToDOM(canvas, parent);
  }
}
