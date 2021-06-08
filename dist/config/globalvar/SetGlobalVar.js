import { CONFIG_DEFAULTS } from "../const";
import { ConfigStore } from "../ConfigStore";
export function SetGlobalVar(name) {
  ConfigStore.set(CONFIG_DEFAULTS.GLOBAL_VAR, name);
}
