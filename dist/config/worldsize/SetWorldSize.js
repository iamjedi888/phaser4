import { CONFIG_DEFAULTS } from "../const";
import { ConfigStore } from "../ConfigStore";
export function SetWorldSize(size) {
  ConfigStore.set(CONFIG_DEFAULTS.WORLD_SIZE, size);
}
