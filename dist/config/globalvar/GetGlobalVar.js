import { CONFIG_DEFAULTS } from "../const";
import { ConfigStore } from "../ConfigStore";
export function GetGlobalVar() {
  return ConfigStore.get(CONFIG_DEFAULTS.GLOBAL_VAR);
}
