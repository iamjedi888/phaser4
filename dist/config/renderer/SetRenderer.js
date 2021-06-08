import { CONFIG_DEFAULTS } from "../const";
import { ConfigStore } from "../ConfigStore";
export function SetRenderer(renderer) {
  ConfigStore.set(CONFIG_DEFAULTS.RENDERER, renderer);
}
