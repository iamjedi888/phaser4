import { CONFIG_DEFAULTS } from "../const";
import { ConfigStore } from "../ConfigStore";
export function GetRenderer() {
  return ConfigStore.get(CONFIG_DEFAULTS.RENDERER);
}
