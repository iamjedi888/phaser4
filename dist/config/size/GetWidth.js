import { CONFIG_DEFAULTS } from "../const";
import { ConfigStore } from "../ConfigStore";
export function GetWidth() {
  return ConfigStore.get(CONFIG_DEFAULTS.SIZE).width;
}
