import { CONFIG_DEFAULTS } from "../const";
import { ConfigStore } from "../ConfigStore";
export function GetCanvasContext() {
  return ConfigStore.get(CONFIG_DEFAULTS.CANVAS_CONTEXT);
}
