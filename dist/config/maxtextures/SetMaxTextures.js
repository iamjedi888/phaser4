import { CONFIG_DEFAULTS } from "../const";
import { ConfigStore } from "../ConfigStore";
export function SetMaxTextures(max) {
  ConfigStore.set(CONFIG_DEFAULTS.MAX_TEXTURES, max);
}
