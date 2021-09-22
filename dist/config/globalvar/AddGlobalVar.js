import { CONFIG_DEFAULTS } from "../const";
import { ConfigStore } from "../ConfigStore";
export function AddGlobalVar(game) {
  const globalVar = ConfigStore.get(CONFIG_DEFAULTS.GLOBAL_VAR);
  if (globalVar && window) {
    window[globalVar] = game;
  }
}
