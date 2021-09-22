import { CONFIG_DEFAULTS } from "../const";
import { ConfigStore } from "../ConfigStore";
export function SetDefaultOrigin(x = 0.5, y = x) {
  ConfigStore.set(CONFIG_DEFAULTS.DEFAULT_ORIGIN, { x, y });
}
