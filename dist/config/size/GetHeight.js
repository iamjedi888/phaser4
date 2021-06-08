import { CONFIG_DEFAULTS } from "../const";
import { ConfigStore } from "../ConfigStore";
export function GetHeight() {
  return ConfigStore.get(CONFIG_DEFAULTS.SIZE).height;
}
