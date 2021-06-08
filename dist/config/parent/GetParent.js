import { CONFIG_DEFAULTS } from "../const";
import { ConfigStore } from "../ConfigStore";
export function GetParent() {
  return ConfigStore.get(CONFIG_DEFAULTS.PARENT);
}
