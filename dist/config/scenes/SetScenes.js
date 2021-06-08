import { CONFIG_DEFAULTS } from "../const";
import { ConfigStore } from "../ConfigStore";
export function SetScenes(scenes) {
  ConfigStore.set(CONFIG_DEFAULTS.SCENES, [].concat(scenes));
}
