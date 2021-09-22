import { CONFIG_DEFAULTS } from "../const";
import { ConfigStore } from "../ConfigStore";
export function CreateRenderer() {
  const renderer = ConfigStore.get(CONFIG_DEFAULTS.RENDERER);
  if (renderer) {
    new renderer();
  }
}
